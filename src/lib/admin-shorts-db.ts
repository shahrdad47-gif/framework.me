/**
 * Admin write-path data layer for 1-Minute Shorts. Mirrors
 * src/lib/admin-videos-db.ts, minus categories (shorts are a flat list).
 * No static-file fallback: admin mutations require a live Neon connection.
 */

import { neon } from '@neondatabase/serverless'
import type { Short } from '@/types'
import { sanitizeArticleBody } from '@/lib/sanitize'
import { extractYouTubeId } from '@/lib/admin-videos-db'

export { extractYouTubeId }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Row = Record<string, any>

function getSql() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not set — admin writes require a live database')
  }
  return neon(process.env.DATABASE_URL, { fetchOptions: { cache: 'no-store' } })
}

export type ShortInput = {
  id: string
  title: string
  description?: string
  status: 'published' | 'draft'
}

function rowToShort(row: Row): Short & { status: string } {
  return {
    id:          row.id,
    title:       row.title,
    description: row.description ?? '',
    status:      row.status,
  }
}

export function validateShortInput(data: Row, opts: { requireId: boolean }): string | null {
  if (opts.requireId) {
    if (typeof data.id !== 'string' || !/^[a-zA-Z0-9_-]{11}$/.test(data.id)) {
      return 'A valid YouTube video ID or URL is required'
    }
  }
  if (typeof data.title !== 'string' || !data.title.trim()) return 'Title is required'
  if (data.description !== undefined && data.description !== null && typeof data.description !== 'string') {
    return 'Description must be a string'
  }
  if (data.status !== 'published' && data.status !== 'draft') return 'Status must be "published" or "draft"'
  return null
}

export async function getShortsAdmin(opts: { page: number; pageSize: number }) {
  const sql = getSql()
  const { page, pageSize } = opts
  const offset = (page - 1) * pageSize

  const rows = await sql`
    SELECT id, title, description, status
    FROM shorts
    ORDER BY created_at DESC
    LIMIT ${pageSize} OFFSET ${offset}
  `
  const countRows = await sql`SELECT COUNT(*)::int AS count FROM shorts`

  return { shorts: rows.map(rowToShort), total: countRows[0]?.count ?? 0 }
}

export async function getShortAdmin(id: string) {
  const sql = getSql()
  const rows = await sql`SELECT id, title, description, status FROM shorts WHERE id = ${id} LIMIT 1`
  return rows[0] ? rowToShort(rows[0]) : null
}

export async function createShortAdmin(data: ShortInput) {
  const sql = getSql()
  const existing = await sql`SELECT id FROM shorts WHERE id = ${data.id} LIMIT 1`
  if (existing.length > 0) throw new Error('ID_TAKEN')

  const maxOrder = await sql`SELECT COALESCE(MAX(display_order), -1) AS m FROM shorts`
  const rows = await sql`
    INSERT INTO shorts (id, title, description, status, display_order)
    VALUES (${data.id}, ${data.title}, ${sanitizeArticleBody(data.description ?? '')}, ${data.status}, ${maxOrder[0].m + 1})
    RETURNING id, title, description, status
  `
  return rowToShort(rows[0])
}

export async function updateShortAdmin(id: string, data: Omit<ShortInput, 'id'>) {
  const sql = getSql()
  const rows = await sql`
    UPDATE shorts SET
      title       = ${data.title},
      description = ${sanitizeArticleBody(data.description ?? '')},
      status      = ${data.status}
    WHERE id = ${id}
    RETURNING id, title, description, status
  `
  return rows[0] ? rowToShort(rows[0]) : null
}

export async function deleteShortAdmin(id: string): Promise<boolean> {
  const sql = getSql()
  const rows = await sql`DELETE FROM shorts WHERE id = ${id} RETURNING id`
  return rows.length > 0
}
