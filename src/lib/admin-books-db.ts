/**
 * Admin write-path data layer for books. Mirrors src/lib/admin-db.ts's
 * article layer. Books use a numeric SERIAL id (no slug) since there's no
 * public per-book detail page to key off of. No static-file fallback:
 * admin mutations require a live Neon connection.
 */

import { neon } from '@/lib/neon-shim'
import type { Book } from '@/types'
import { sanitizeArticleBody } from '@/lib/sanitize'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Row = Record<string, any>

function getSql() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not set — admin writes require a live database')
  }
  return neon(process.env.DATABASE_URL, { fetchOptions: { cache: 'no-store' } })
}

export type BookInput = {
  title: string
  author: string
  description?: string
  link?: string
  coverUrl?: string
}

function rowToBook(row: Row): Book & { id: number } {
  return {
    id:          row.id,
    title:       row.title,
    author:      row.author,
    description: row.description ?? '',
    link:        row.link ?? undefined,
    coverUrl:    row.cover_url ?? undefined,
  }
}

export function validateBookInput(data: Row): string | null {
  if (typeof data.title !== 'string' || !data.title.trim()) return 'Title is required'
  if (typeof data.author !== 'string' || !data.author.trim()) return 'Author is required'
  if (data.description !== undefined && data.description !== null && typeof data.description !== 'string') {
    return 'Description must be a string'
  }
  if (data.link !== undefined && data.link !== null && typeof data.link !== 'string') return 'Link must be a string'
  if (data.coverUrl !== undefined && data.coverUrl !== null && typeof data.coverUrl !== 'string') return 'Cover URL must be a string'
  return null
}

export async function getBooksAdmin(opts: { page: number; pageSize: number }) {
  const sql = getSql()
  const { page, pageSize } = opts
  const offset = (page - 1) * pageSize

  const rows = await sql`
    SELECT id, title, author, description, link, cover_url
    FROM books
    ORDER BY created_at DESC
    LIMIT ${pageSize} OFFSET ${offset}
  `
  const countRows = await sql`SELECT COUNT(*)::int AS count FROM books`

  return { books: rows.map(rowToBook), total: countRows[0]?.count ?? 0 }
}

export async function getBookAdmin(id: number) {
  const sql = getSql()
  const rows = await sql`SELECT id, title, author, description, link, cover_url FROM books WHERE id = ${id} LIMIT 1`
  return rows[0] ? rowToBook(rows[0]) : null
}

export async function createBookAdmin(data: BookInput) {
  const sql = getSql()
  const maxOrder = await sql`SELECT COALESCE(MAX(display_order), -1) AS m FROM books`
  const rows = await sql`
    INSERT INTO books (title, author, description, link, cover_url, display_order)
    VALUES (
      ${data.title}, ${data.author}, ${sanitizeArticleBody(data.description ?? '')},
      ${data.link ?? null}, ${data.coverUrl ?? null}, ${maxOrder[0].m + 1}
    )
    RETURNING id, title, author, description, link, cover_url
  `
  return rowToBook(rows[0])
}

export async function updateBookAdmin(id: number, data: BookInput) {
  const sql = getSql()
  const rows = await sql`
    UPDATE books SET
      title       = ${data.title},
      author      = ${data.author},
      description = ${sanitizeArticleBody(data.description ?? '')},
      link        = ${data.link ?? null},
      cover_url   = ${data.coverUrl ?? null}
    WHERE id = ${id}
    RETURNING id, title, author, description, link, cover_url
  `
  return rows[0] ? rowToBook(rows[0]) : null
}

export async function deleteBookAdmin(id: number): Promise<boolean> {
  const sql = getSql()
  const rows = await sql`DELETE FROM books WHERE id = ${id} RETURNING id`
  return rows.length > 0
}
