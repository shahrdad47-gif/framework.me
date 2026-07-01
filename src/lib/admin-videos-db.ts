/**
 * Admin write-path data layer for video teachings — the videos, and reading
 * the (site-managed) categories they belong to. Mirrors src/lib/admin-db.ts's
 * article layer. No static-file fallback: admin mutations require a live
 * Neon connection.
 */

import { neon } from '@neondatabase/serverless'
import type { VideoCategory, Video } from '@/types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Row = Record<string, any>

function getSql() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not set — admin writes require a live database')
  }
  return neon(process.env.DATABASE_URL, { fetchOptions: { cache: 'no-store' } })
}

/**
 * Extracts an 11-character YouTube video ID from a pasted URL
 * (watch?v=, youtu.be/, embed/, shorts/) or returns the input as-is
 * if it already looks like a bare video ID.
 */
export function extractYouTubeId(input: string): string | null {
  const trimmed = input.trim()
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtube\.com\/embed\/|youtube\.com\/shorts\/|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
  ]
  for (const re of patterns) {
    const match = trimmed.match(re)
    if (match) return match[1]
  }
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) return trimmed
  return null
}

// ── Categories ("sections") — read-only here; managed outside the admin UI ──

function rowToCategory(row: Row): VideoCategory & { active: boolean; displayOrder: number } {
  return {
    id: row.id,
    label: row.label,
    icon: row.icon ?? '',
    description: row.description ?? '',
    active: row.active,
    displayOrder: row.display_order,
    videos: [],
  }
}

export async function getVideoCategoriesAdmin() {
  const sql = getSql()
  const rows = await sql`SELECT id, label, icon, description, active, display_order FROM video_categories ORDER BY display_order ASC`
  return rows.map(rowToCategory)
}

// ── Videos ────────────────────────────────────────────────────────────────────

export type VideoInput = {
  id: string
  title: string
  date?: string
  speaker?: string
  categoryId: string
  status: 'published' | 'draft'
}

function rowToVideo(row: Row): Video & { categoryId: string; categoryLabel?: string; status: string } {
  return {
    id: row.id,
    title: row.title,
    date: row.date ?? undefined,
    speaker: row.speaker ?? undefined,
    categoryId: row.category_id,
    categoryLabel: row.category_label,
    status: row.status,
  }
}

export function validateVideoInput(data: Row, opts: { requireId: boolean }): string | null {
  if (opts.requireId) {
    if (typeof data.id !== 'string' || !/^[a-zA-Z0-9_-]{11}$/.test(data.id)) {
      return 'A valid YouTube video ID or URL is required'
    }
  }
  if (typeof data.title !== 'string' || !data.title.trim()) return 'Title is required'
  if (data.date !== undefined && data.date !== null && typeof data.date !== 'string') return 'Date must be a string'
  if (data.speaker !== undefined && data.speaker !== null && typeof data.speaker !== 'string') return 'Speaker must be a string'
  if (typeof data.categoryId !== 'string' || !data.categoryId.trim()) return 'Section is required'
  if (data.status !== 'published' && data.status !== 'draft') return 'Status must be "published" or "draft"'
  return null
}

export async function getVideosAdmin(opts: {
  page: number
  pageSize: number
  categoryId?: string
}) {
  const sql = getSql()
  const { page, pageSize, categoryId } = opts
  const offset = (page - 1) * pageSize

  const rows = categoryId
    ? await sql`
        SELECT v.id, v.title, v.date, v.speaker, v.category_id, v.status, v.created_at, c.label AS category_label
        FROM videos v JOIN video_categories c ON c.id = v.category_id
        WHERE v.category_id = ${categoryId}
        ORDER BY v.created_at DESC
        LIMIT ${pageSize} OFFSET ${offset}
      `
    : await sql`
        SELECT v.id, v.title, v.date, v.speaker, v.category_id, v.status, v.created_at, c.label AS category_label
        FROM videos v JOIN video_categories c ON c.id = v.category_id
        ORDER BY v.created_at DESC
        LIMIT ${pageSize} OFFSET ${offset}
      `

  const countRows = categoryId
    ? await sql`SELECT COUNT(*)::int AS count FROM videos WHERE category_id = ${categoryId}`
    : await sql`SELECT COUNT(*)::int AS count FROM videos`

  return { videos: rows.map(rowToVideo), total: countRows[0]?.count ?? 0 }
}

export async function getVideoAdmin(id: string) {
  const sql = getSql()
  const rows = await sql`
    SELECT v.id, v.title, v.date, v.speaker, v.category_id, v.status, c.label AS category_label
    FROM videos v JOIN video_categories c ON c.id = v.category_id
    WHERE v.id = ${id} LIMIT 1
  `
  return rows[0] ? rowToVideo(rows[0]) : null
}

export async function createVideoAdmin(data: VideoInput) {
  const sql = getSql()
  const existing = await sql`SELECT id FROM videos WHERE id = ${data.id} LIMIT 1`
  if (existing.length > 0) throw new Error('ID_TAKEN')

  const category = await sql`SELECT id FROM video_categories WHERE id = ${data.categoryId} LIMIT 1`
  if (category.length === 0) throw new Error('CATEGORY_NOT_FOUND')

  const maxOrder = await sql`SELECT COALESCE(MAX(display_order), -1) AS m FROM videos WHERE category_id = ${data.categoryId}`
  const rows = await sql`
    INSERT INTO videos (id, title, date, speaker, category_id, status, display_order)
    VALUES (${data.id}, ${data.title}, ${data.date ?? null}, ${data.speaker ?? null}, ${data.categoryId}, ${data.status}, ${maxOrder[0].m + 1})
    RETURNING id, title, date, speaker, category_id, status
  `
  return rowToVideo(rows[0])
}

export async function updateVideoAdmin(id: string, data: Omit<VideoInput, 'id'>) {
  const sql = getSql()

  const category = await sql`SELECT id FROM video_categories WHERE id = ${data.categoryId} LIMIT 1`
  if (category.length === 0) throw new Error('CATEGORY_NOT_FOUND')

  const rows = await sql`
    UPDATE videos SET
      title       = ${data.title},
      date        = ${data.date ?? null},
      speaker     = ${data.speaker ?? null},
      category_id = ${data.categoryId},
      status      = ${data.status}
    WHERE id = ${id}
    RETURNING id, title, date, speaker, category_id, status
  `
  return rows[0] ? rowToVideo(rows[0]) : null
}

export async function deleteVideoAdmin(id: string): Promise<boolean> {
  const sql = getSql()
  const rows = await sql`DELETE FROM videos WHERE id = ${id} RETURNING id`
  return rows.length > 0
}
