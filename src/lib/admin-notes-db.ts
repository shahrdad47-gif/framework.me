/**
 * Admin write-path data layer for downloadable study notes. Mirrors
 * src/lib/admin-db.ts's article layer. No static-file fallback: admin
 * mutations require a live Neon connection.
 */

import { neon } from '@/lib/neon-shim'
import type { Note } from '@/types'
import { sanitizeArticleBody } from '@/lib/sanitize'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Row = Record<string, any>

export type NoteInput = {
  slug: string
  title: string
  description: string
  pdf: string
  date: string
  createdAt: string // ISO timestamp
}

function getSql() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not set — admin writes require a live database')
  }
  return neon(process.env.DATABASE_URL, { fetchOptions: { cache: 'no-store' } })
}

function rowToNote(row: Row): Note {
  return {
    slug:        row.slug,
    title:       row.title,
    description: row.description ?? '',
    pdf:         row.pdf,
    date:        row.date,
  }
}

const SLUG_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/

export function isValidSlug(slug: string): boolean {
  return SLUG_PATTERN.test(slug)
}

export function validateNoteInput(data: Row, opts: { requireSlug: boolean }): string | null {
  if (opts.requireSlug) {
    if (typeof data.slug !== 'string' || !isValidSlug(data.slug)) {
      return 'Slug must be lowercase letters, numbers and hyphens only (e.g. "prayer-guide-iran")'
    }
  }
  if (typeof data.title !== 'string' || !data.title.trim()) return 'Title is required'
  if (typeof data.description !== 'string') return 'Description must be a string'
  if (typeof data.pdf !== 'string' || !data.pdf.trim()) return 'A PDF is required'
  if (typeof data.createdAt !== 'string' || isNaN(new Date(data.createdAt).getTime())) {
    return 'A valid date is required'
  }
  return null
}

export async function getNoteWithMetaAdmin(slug: string): Promise<(Note & { createdAt: string }) | null> {
  const sql = getSql()
  const rows = await sql`
    SELECT slug, title, description, pdf, date, created_at
    FROM study_notes WHERE slug = ${slug} LIMIT 1
  `
  if (!rows[0]) return null
  return { ...rowToNote(rows[0]), createdAt: new Date(rows[0].created_at).toISOString() }
}

export async function getNotesAdmin(opts: { page: number; pageSize: number }): Promise<{ notes: Note[]; total: number }> {
  const sql = getSql()
  const { page, pageSize } = opts
  const offset = (page - 1) * pageSize

  const rows = await sql`
    SELECT slug, title, description, pdf, date
    FROM study_notes
    ORDER BY created_at DESC
    LIMIT ${pageSize} OFFSET ${offset}
  `
  const countRows = await sql`SELECT COUNT(*)::int AS count FROM study_notes`

  return { notes: rows.map(rowToNote), total: countRows[0]?.count ?? 0 }
}

export async function createNoteAdmin(data: NoteInput): Promise<Note> {
  const sql = getSql()

  const existing = await sql`SELECT slug FROM study_notes WHERE slug = ${data.slug} LIMIT 1`
  if (existing.length > 0) throw new Error('SLUG_TAKEN')

  const rows = await sql`
    INSERT INTO study_notes (slug, title, description, pdf, date, created_at)
    VALUES (${data.slug}, ${data.title}, ${sanitizeArticleBody(data.description)}, ${data.pdf}, ${data.date}, ${data.createdAt})
    RETURNING slug, title, description, pdf, date
  `
  return rowToNote(rows[0])
}

export async function updateNoteAdmin(slug: string, data: Omit<NoteInput, 'slug'>): Promise<Note | null> {
  const sql = getSql()
  const rows = await sql`
    UPDATE study_notes SET
      title       = ${data.title},
      description = ${sanitizeArticleBody(data.description)},
      pdf         = ${data.pdf},
      date        = ${data.date},
      created_at  = ${data.createdAt}
    WHERE slug = ${slug}
    RETURNING slug, title, description, pdf, date
  `
  return rows[0] ? rowToNote(rows[0]) : null
}

export async function deleteNoteAdmin(slug: string): Promise<boolean> {
  const sql = getSql()
  const rows = await sql`DELETE FROM study_notes WHERE slug = ${slug} RETURNING slug`
  return rows.length > 0
}
