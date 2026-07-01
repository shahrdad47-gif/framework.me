/**
 * Backend data layer.
 * - When DATABASE_URL is set: queries Neon PostgreSQL.
 * - Otherwise: reads from the static TypeScript data files (zero-config fallback).
 *
 * Setup: add Neon from the Vercel Storage tab, then run:
 *   npx tsx scripts/setup-db.ts
 */

import type { Article, Book, Note, VideoCategory, VideoSeries } from '@/types'
import { articles as staticArticles } from '@/data/articles'
import { books as staticBooks }       from '@/data/books'
import { notes as staticNotes }       from '@/data/notes'
import { videoCategories as staticCategories } from '@/data/videos'
import { videoSeriesData as staticSeries } from '@/data/series'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Row = Record<string, any>
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SqlFn = (strings: TemplateStringsArray, ...values: any[]) => Promise<Row[]>

// ── Neon connection ───────────────────────────────────────────────────────────
function getNeon(): SqlFn | null {
  if (!process.env.DATABASE_URL) return null
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { neon } = require('@neondatabase/serverless')
  // Neon's HTTP driver issues queries via fetch() — without this, Next.js's
  // automatic fetch cache would serve stale query results indefinitely after
  // an admin edit, since identical SQL text + params hash to the same cache key.
  return neon(process.env.DATABASE_URL, { fetchOptions: { cache: 'no-store' } }) as SqlFn
}

// ── Articles ──────────────────────────────────────────────────────────────────

export async function getArticles(): Promise<Article[]> {
  const sql = getNeon()
  if (!sql) return staticArticles

  try {
    const rows = await sql`
      SELECT slug, title, author, date, nations, sections, summary, pdf, body
      FROM articles
      ORDER BY date DESC
    `
    return rows.map(rowToArticle)
  } catch {
    return staticArticles
  }
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const sql = getNeon()
  if (!sql) return staticArticles.find(a => a.slug === slug) ?? null

  try {
    const rows = await sql`
      SELECT slug, title, author, date, nations, sections, summary, pdf, body
      FROM articles WHERE slug = ${slug} LIMIT 1
    `
    return rows[0] ? rowToArticle(rows[0]) : null
  } catch {
    return staticArticles.find(a => a.slug === slug) ?? null
  }
}

export async function getArticlesBySection(section: string): Promise<Article[]> {
  const sql = getNeon()
  if (!sql) return staticArticles.filter(a => a.sections?.includes(section))

  try {
    const rows = await sql`
      SELECT slug, title, author, date, nations, sections, summary, pdf, body
      FROM articles
      WHERE ${section} = ANY(sections)
      ORDER BY date DESC
    `
    return rows.map(rowToArticle)
  } catch {
    return staticArticles.filter(a => a.sections?.includes(section))
  }
}

export async function getArticlesForNation(nationKey: string): Promise<Article[]> {
  const sql = getNeon()
  if (!sql) return staticArticles.filter(a => a.nations.includes(nationKey))

  try {
    const rows = await sql`
      SELECT slug, title, author, date, nations, sections, summary, pdf, body
      FROM articles
      WHERE ${nationKey} = ANY(nations)
      ORDER BY date DESC
    `
    return rows.map(rowToArticle)
  } catch {
    return staticArticles.filter(a => a.nations.includes(nationKey))
  }
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

// ── Notes ─────────────────────────────────────────────────────────────────────

export async function getNotes(): Promise<Note[]> {
  const sql = getNeon()
  if (!sql) return staticNotes

  try {
    const rows = await sql`
      SELECT slug, title, description, pdf, date
      FROM study_notes
      ORDER BY created_at DESC
    `
    return rows.map(r => ({
      slug:        r.slug,
      title:       r.title,
      description: r.description ?? '',
      pdf:         r.pdf,
      date:        r.date,
    }))
  } catch {
    return staticNotes
  }
}

// ── Books ─────────────────────────────────────────────────────────────────────

export async function getBooks(): Promise<Book[]> {
  const sql = getNeon()
  if (!sql) return staticBooks

  try {
    const rows = await sql`
      SELECT title, author, description, link, cover_url
      FROM books
      ORDER BY display_order ASC
    `
    return rows.map(r => ({
      title:       r.title,
      author:      r.author,
      description: r.description ?? '',
      link:        r.link ?? undefined,
      coverUrl:    r.cover_url ?? undefined,
    }))
  } catch {
    return staticBooks
  }
}

// ── Videos ────────────────────────────────────────────────────────────────────

export async function getVideoCategories(): Promise<VideoCategory[]> {
  const sql = getNeon()
  if (!sql) return staticCategories

  try {
    const cats = await sql`
      SELECT id, label, icon, description
      FROM video_categories
      WHERE active = TRUE
      ORDER BY display_order ASC
    `
    const vids = await sql`
      SELECT id, title, date, speaker, category_id
      FROM videos
      WHERE status = 'published'
      ORDER BY category_id, display_order ASC
    `
    return cats.map(c => ({
      id:          c.id,
      label:       c.label,
      icon:        c.icon ?? '',
      description: c.description ?? '',
      videos:      vids.filter(v => v.category_id === c.id).map(v => ({
        id:      v.id,
        title:   v.title,
        date:    v.date ?? undefined,
        speaker: v.speaker ?? undefined,
      })),
    }))
  } catch {
    return staticCategories
  }
}

export async function getVideoById(id: string) {
  const sql = getNeon()
  if (!sql) {
    for (const cat of staticCategories) {
      const video = cat.videos.find(v => v.id === id)
      if (video) return { video, category: cat }
    }
    return null
  }

  try {
    const rows = await sql`
      SELECT v.id, v.title, v.date, v.speaker, v.category_id,
             c.label AS category_label, c.icon AS category_icon
      FROM videos v
      JOIN video_categories c ON c.id = v.category_id
      WHERE v.id = ${id} LIMIT 1
    `
    if (!rows[0]) return null
    const r = rows[0]
    return {
      video:    { id: r.id, title: r.title, date: r.date, speaker: r.speaker },
      category: { id: r.category_id, label: r.category_label, icon: r.category_icon, videos: [] },
    }
  } catch {
    for (const cat of staticCategories) {
      const video = cat.videos.find(v => v.id === id)
      if (video) return { video, category: cat }
    }
    return null
  }
}

// ── Series ────────────────────────────────────────────────────────────────────

export async function getVideoSeries(): Promise<VideoSeries[]> {
  const sql = getNeon()
  if (!sql) return staticSeries

  try {
    const series = await sql`
      SELECT id, title, description, topic, speaker
      FROM video_series
      ORDER BY display_order ASC
    `
    const episodes = await sql`
      SELECT series_id, video_id AS id, title, date
      FROM series_episodes
      ORDER BY series_id, episode_order ASC
    `
    return series.map(s => ({
      id:          s.id,
      title:       s.title,
      description: s.description ?? '',
      topic:       s.topic ?? '',
      speaker:     s.speaker ?? undefined,
      episodes:    episodes.filter(e => e.series_id === s.id).map(e => ({
        id:    e.id,
        title: e.title,
        date:  e.date ?? undefined,
      })),
    }))
  } catch {
    return staticSeries
  }
}
