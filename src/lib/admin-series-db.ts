/**
 * Admin write-path data layer for video series. Mirrors
 * src/lib/admin-db.ts's article layer, plus nested episode management
 * (each series owns an ordered list of episodes, replaced wholesale on
 * every update — simplest way to support add/remove/reorder together).
 * No static-file fallback: admin mutations require a live Neon connection.
 */

import { neon } from '@/lib/neon-shim'
import type { VideoSeries, Video } from '@/types'
import { sanitizeArticleBody } from '@/lib/sanitize'
import { extractYouTubeId } from '@/lib/admin-videos-db'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Row = Record<string, any>

function getSql() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not set — admin writes require a live database')
  }
  return neon(process.env.DATABASE_URL, { fetchOptions: { cache: 'no-store' } })
}

const SLUG_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/

export function isValidSlug(slug: string): boolean {
  return SLUG_PATTERN.test(slug)
}

export type SeriesEpisodeInput = {
  videoId: string
  title: string
  date?: string
}

export type SeriesInput = {
  id: string
  title: string
  description?: string
  topic: string
  speaker?: string
  episodes: SeriesEpisodeInput[]
}

function rowToSeries(row: Row): VideoSeries & { episodeCount?: number } {
  return {
    id: row.id,
    title: row.title,
    description: row.description ?? '',
    topic: row.topic ?? '',
    speaker: row.speaker ?? undefined,
    episodes: [],
    episodeCount: row.episode_count !== undefined ? Number(row.episode_count) : undefined,
  }
}

export function validateSeriesInput(data: Row, opts: { requireId: boolean }): string | null {
  if (opts.requireId) {
    if (typeof data.id !== 'string' || !isValidSlug(data.id)) {
      return 'Series ID must be lowercase letters, numbers and hyphens only (e.g. "abrahamic-promise")'
    }
  }
  if (typeof data.title !== 'string' || !data.title.trim()) return 'Title is required'
  if (typeof data.topic !== 'string' || !data.topic.trim()) return 'Topic is required'
  if (data.speaker !== undefined && data.speaker !== null && typeof data.speaker !== 'string') return 'Speaker must be a string'
  if (data.description !== undefined && data.description !== null && typeof data.description !== 'string') {
    return 'Description must be a string'
  }
  if (!Array.isArray(data.episodes) || data.episodes.length === 0) {
    return 'A series needs at least one episode'
  }
  for (const ep of data.episodes) {
    if (!ep || typeof ep !== 'object') return 'Each episode must be an object'
    if (typeof ep.videoId !== 'string' || !extractYouTubeId(ep.videoId)) {
      return 'Each episode needs a valid YouTube URL or video ID'
    }
    if (typeof ep.title !== 'string' || !ep.title.trim()) return 'Each episode needs a title'
    if (ep.date !== undefined && ep.date !== null && typeof ep.date !== 'string') return 'Episode date must be a string'
  }
  return null
}

export async function getSeriesAdmin(opts: { page: number; pageSize: number }) {
  const sql = getSql()
  const { page, pageSize } = opts
  const offset = (page - 1) * pageSize

  const rows = await sql`
    SELECT s.id, s.title, s.description, s.topic, s.speaker,
           COUNT(e.id)::int AS episode_count
    FROM video_series s
    LEFT JOIN series_episodes e ON e.series_id = s.id
    GROUP BY s.id
    ORDER BY s.created_at DESC
    LIMIT ${pageSize} OFFSET ${offset}
  `
  const countRows = await sql`SELECT COUNT(*)::int AS count FROM video_series`

  return { series: rows.map(rowToSeries), total: countRows[0]?.count ?? 0 }
}

export async function getSeriesOneAdmin(id: string): Promise<(VideoSeries & { createdAt: string }) | null> {
  const sql = getSql()
  const rows = await sql`SELECT id, title, description, topic, speaker, created_at FROM video_series WHERE id = ${id} LIMIT 1`
  if (!rows[0]) return null

  const episodeRows = await sql`
    SELECT video_id, title, date FROM series_episodes
    WHERE series_id = ${id} ORDER BY episode_order ASC
  `
  const episodes: Video[] = episodeRows.map(e => ({ id: e.video_id, title: e.title, date: e.date ?? undefined }))

  return {
    ...rowToSeries(rows[0]),
    episodes,
    createdAt: new Date(rows[0].created_at).toISOString(),
  }
}

async function replaceEpisodes(sql: ReturnType<typeof getSql>, seriesId: string, episodes: SeriesEpisodeInput[]) {
  await sql`DELETE FROM series_episodes WHERE series_id = ${seriesId}`
  for (let i = 0; i < episodes.length; i++) {
    const ep = episodes[i]
    const videoId = extractYouTubeId(ep.videoId)!
    await sql`
      INSERT INTO series_episodes (series_id, video_id, title, date, episode_order)
      VALUES (${seriesId}, ${videoId}, ${ep.title}, ${ep.date ?? null}, ${i})
    `
  }
}

export async function createSeriesAdmin(data: SeriesInput) {
  const sql = getSql()
  const existing = await sql`SELECT id FROM video_series WHERE id = ${data.id} LIMIT 1`
  if (existing.length > 0) throw new Error('ID_TAKEN')

  const maxOrder = await sql`SELECT COALESCE(MAX(display_order), -1) AS m FROM video_series`
  await sql`
    INSERT INTO video_series (id, title, description, topic, speaker, display_order)
    VALUES (
      ${data.id}, ${data.title}, ${sanitizeArticleBody(data.description ?? '')},
      ${data.topic}, ${data.speaker ?? null}, ${maxOrder[0].m + 1}
    )
  `
  await replaceEpisodes(sql, data.id, data.episodes)
  return getSeriesOneAdmin(data.id)
}

export async function updateSeriesAdmin(id: string, data: Omit<SeriesInput, 'id'>) {
  const sql = getSql()
  const rows = await sql`
    UPDATE video_series SET
      title       = ${data.title},
      description = ${sanitizeArticleBody(data.description ?? '')},
      topic       = ${data.topic},
      speaker     = ${data.speaker ?? null}
    WHERE id = ${id}
    RETURNING id
  `
  if (rows.length === 0) return null
  await replaceEpisodes(sql, id, data.episodes)
  return getSeriesOneAdmin(id)
}

export async function deleteSeriesAdmin(id: string): Promise<boolean> {
  const sql = getSql()
  await sql`DELETE FROM series_episodes WHERE series_id = ${id}`
  const rows = await sql`DELETE FROM video_series WHERE id = ${id} RETURNING id`
  return rows.length > 0
}
