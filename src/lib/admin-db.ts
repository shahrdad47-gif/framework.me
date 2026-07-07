/**
 * Admin write-path data layer. Unlike src/lib/db.ts, this has no static-file
 * fallback — admin mutations require a live Neon connection.
 */

import { neon } from '@/lib/neon-shim'
import type { Article } from '@/types'
import { sanitizeArticleBody } from '@/lib/sanitize'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Row = Record<string, any>

export type ArticleInput = {
  slug: string
  title: string
  author: string
  date: string
  nations: string[]
  sections: string[]
  summary: string
  pdf?: string
  body: string
  createdAt: string // ISO timestamp
}

function getSql() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not set — admin writes require a live database')
  }
  // See src/lib/db.ts getNeon() — Neon's HTTP driver uses fetch(), which
  // Next.js would otherwise cache indefinitely.
  return neon(process.env.DATABASE_URL, { fetchOptions: { cache: 'no-store' } })
}

function rowToArticle(row: Row): Article {
  return {
    slug:     row.slug,
    title:    row.title,
    author:   row.author,
    date:     row.date,
    nations:  row.nations ?? [],
    sections: row.sections ?? [],
    summary:  row.summary ?? '',
    pdf:      row.pdf ?? undefined,
    body:     row.body ?? '',
  }
}

const SLUG_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/

export function isValidSlug(slug: string): boolean {
  return SLUG_PATTERN.test(slug)
}

/** Validates an admin-submitted article payload. Returns an error string, or null if valid. */
export function validateArticleInput(data: Row, opts: { requireSlug: boolean }): string | null {
  if (opts.requireSlug) {
    if (typeof data.slug !== 'string' || !isValidSlug(data.slug)) {
      return 'Slug must be lowercase letters, numbers and hyphens only (e.g. "my-article-title")'
    }
  }
  if (typeof data.title !== 'string' || !data.title.trim()) return 'Title is required'
  if (typeof data.author !== 'string' || !data.author.trim()) return 'Author is required'
  if (typeof data.createdAt !== 'string' || isNaN(new Date(data.createdAt).getTime())) {
    return 'A valid date is required'
  }
  if (!Array.isArray(data.nations) || data.nations.length === 0 || !data.nations.every((n: unknown) => typeof n === 'string')) {
    return 'At least one nation must be selected'
  }
  if (!Array.isArray(data.sections) || !data.sections.every((s: unknown) => typeof s === 'string')) {
    return 'Sections must be an array of strings'
  }
  if (typeof data.summary !== 'string' || !data.summary.trim()) return 'Summary is required'
  if (data.pdf !== undefined && data.pdf !== null && typeof data.pdf !== 'string') return 'PDF must be a URL string'
  if (typeof data.body !== 'string' || !data.body.trim()) return 'Body is required'
  return null
}

export async function getArticleWithMetaAdmin(slug: string): Promise<(Article & { createdAt: string }) | null> {
  const sql = getSql()
  const rows = await sql`
    SELECT slug, title, author, date, nations, sections, summary, pdf, body, created_at
    FROM articles WHERE slug = ${slug} LIMIT 1
  `
  if (!rows[0]) return null
  return { ...rowToArticle(rows[0]), createdAt: new Date(rows[0].created_at).toISOString() }
}

export async function getArticlesAdmin(opts: {
  page: number
  pageSize: number
  nation?: string
}): Promise<{ articles: Article[]; total: number }> {
  const sql = getSql()
  const { page, pageSize, nation } = opts
  const offset = (page - 1) * pageSize

  const rows = nation
    ? await sql`
        SELECT slug, title, author, date, nations, sections, summary, pdf, body
        FROM articles
        WHERE ${nation} = ANY(nations)
        ORDER BY created_at DESC
        LIMIT ${pageSize} OFFSET ${offset}
      `
    : await sql`
        SELECT slug, title, author, date, nations, sections, summary, pdf, body
        FROM articles
        ORDER BY created_at DESC
        LIMIT ${pageSize} OFFSET ${offset}
      `

  const countRows = nation
    ? await sql`SELECT COUNT(*)::int AS count FROM articles WHERE ${nation} = ANY(nations)`
    : await sql`SELECT COUNT(*)::int AS count FROM articles`

  return {
    articles: rows.map(rowToArticle),
    total: countRows[0]?.count ?? 0,
  }
}

export async function createArticleAdmin(data: ArticleInput): Promise<Article> {
  const sql = getSql()

  const existing = await sql`SELECT slug FROM articles WHERE slug = ${data.slug} LIMIT 1`
  if (existing.length > 0) {
    throw new Error(`SLUG_TAKEN`)
  }

  const rows = await sql`
    INSERT INTO articles (slug, title, author, date, nations, sections, summary, pdf, body, created_at)
    VALUES (
      ${data.slug}, ${data.title}, ${data.author}, ${data.date},
      ${data.nations}, ${data.sections},
      ${data.summary}, ${data.pdf ?? null}, ${JSON.stringify(sanitizeArticleBody(data.body))}, ${data.createdAt}
    )
    RETURNING slug, title, author, date, nations, sections, summary, pdf, body
  `
  return rowToArticle(rows[0])
}

export async function updateArticleAdmin(slug: string, data: Omit<ArticleInput, 'slug'>): Promise<Article | null> {
  const sql = getSql()
  const rows = await sql`
    UPDATE articles SET
      title      = ${data.title},
      author     = ${data.author},
      date       = ${data.date},
      nations    = ${data.nations},
      sections   = ${data.sections},
      summary    = ${data.summary},
      pdf        = ${data.pdf ?? null},
      body       = ${JSON.stringify(sanitizeArticleBody(data.body))},
      created_at = ${data.createdAt}
    WHERE slug = ${slug}
    RETURNING slug, title, author, date, nations, sections, summary, pdf, body
  `
  return rows[0] ? rowToArticle(rows[0]) : null
}

export async function deleteArticleAdmin(slug: string): Promise<boolean> {
  const sql = getSql()
  const rows = await sql`DELETE FROM articles WHERE slug = ${slug} RETURNING slug`
  return rows.length > 0
}
