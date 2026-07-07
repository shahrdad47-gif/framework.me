/**
 * One-time database setup + seed script.
 * Run with: npx tsx scripts/setup-db.ts
 *
 * Requires DATABASE_URL in your environment (from .env.local or Vercel dashboard).
 */

import { neon } from '../src/lib/neon-shim'
import { articles } from '../src/data/articles'
import { books }    from '../src/data/books'
import { videoCategories, shortsData } from '../src/data/videos'
import { videoSeriesData } from '../src/data/series'

const sql = neon(process.env.DATABASE_URL!)

async function main() {
  console.log('Creating tables…')

  await sql`
    CREATE TABLE IF NOT EXISTS articles (
      slug        TEXT PRIMARY KEY,
      title       TEXT NOT NULL,
      author      TEXT NOT NULL,
      date        TEXT NOT NULL,
      nations     TEXT[] NOT NULL DEFAULT '{}',
      sections    TEXT[] NOT NULL DEFAULT '{}',
      summary     TEXT NOT NULL DEFAULT '',
      pdf         TEXT,
      body        JSONB NOT NULL DEFAULT '""',
      created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `
  await sql`ALTER TABLE articles ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()`

  await sql`
    CREATE TABLE IF NOT EXISTS pdf_files (
      id           TEXT PRIMARY KEY,
      filename     TEXT NOT NULL,
      content_type TEXT NOT NULL DEFAULT 'application/pdf',
      data         BYTEA NOT NULL,
      created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `

  await sql`
    CREATE TABLE IF NOT EXISTS study_notes (
      slug        TEXT PRIMARY KEY,
      title       TEXT NOT NULL,
      description TEXT NOT NULL DEFAULT '',
      pdf         TEXT NOT NULL,
      date        TEXT NOT NULL,
      created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `

  await sql`
    CREATE TABLE IF NOT EXISTS books (
      id            SERIAL PRIMARY KEY,
      title         TEXT NOT NULL,
      author        TEXT NOT NULL,
      description   TEXT NOT NULL DEFAULT '',
      link          TEXT,
      cover_url     TEXT,
      display_order INT NOT NULL DEFAULT 0,
      created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `
  await sql`ALTER TABLE books ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()`

  await sql`
    CREATE TABLE IF NOT EXISTS images (
      id           TEXT PRIMARY KEY,
      filename     TEXT NOT NULL,
      content_type TEXT NOT NULL DEFAULT 'image/jpeg',
      data         BYTEA NOT NULL,
      created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `

  await sql`
    CREATE TABLE IF NOT EXISTS video_categories (
      id            TEXT PRIMARY KEY,
      label         TEXT NOT NULL,
      icon          TEXT,
      description   TEXT,
      active        BOOLEAN NOT NULL DEFAULT TRUE,
      display_order INT NOT NULL DEFAULT 0
    )
  `

  await sql`
    CREATE TABLE IF NOT EXISTS videos (
      id            TEXT PRIMARY KEY,
      title         TEXT NOT NULL,
      date          TEXT,
      speaker       TEXT,
      category_id   TEXT NOT NULL REFERENCES video_categories(id),
      status        TEXT NOT NULL DEFAULT 'published',
      display_order INT NOT NULL DEFAULT 0,
      description   TEXT NOT NULL DEFAULT '',
      created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `
  await sql`ALTER TABLE videos ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()`
  await sql`ALTER TABLE videos ADD COLUMN IF NOT EXISTS description TEXT NOT NULL DEFAULT ''`

  await sql`
    CREATE TABLE IF NOT EXISTS shorts (
      id            TEXT PRIMARY KEY,
      title         TEXT NOT NULL,
      description   TEXT NOT NULL DEFAULT '',
      status        TEXT NOT NULL DEFAULT 'published',
      display_order INT NOT NULL DEFAULT 0,
      created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `

  await sql`
    CREATE TABLE IF NOT EXISTS video_series (
      id            TEXT PRIMARY KEY,
      title         TEXT NOT NULL,
      description   TEXT,
      topic         TEXT,
      speaker       TEXT,
      display_order INT NOT NULL DEFAULT 0,
      created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `
  await sql`ALTER TABLE video_series ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()`

  await sql`
    CREATE TABLE IF NOT EXISTS series_episodes (
      id            SERIAL PRIMARY KEY,
      series_id     TEXT NOT NULL REFERENCES video_series(id),
      video_id      TEXT NOT NULL,
      title         TEXT NOT NULL,
      date          TEXT,
      episode_order INT NOT NULL DEFAULT 0
    )
  `

  console.log('Tables ready. Seeding…')

  // Seed articles
  for (const a of articles) {
    const createdAt = new Date(a.date).toISOString()
    await sql`
      INSERT INTO articles (slug, title, author, date, nations, sections, summary, pdf, body, created_at)
      VALUES (
        ${a.slug}, ${a.title}, ${a.author}, ${a.date},
        ${a.nations}, ${a.sections ?? []},
        ${a.summary}, ${a.pdf ?? null}, ${JSON.stringify(a.body)}, ${createdAt}
      )
      ON CONFLICT (slug) DO UPDATE SET
        title      = EXCLUDED.title,
        author     = EXCLUDED.author,
        date       = EXCLUDED.date,
        nations    = EXCLUDED.nations,
        sections   = EXCLUDED.sections,
        summary    = EXCLUDED.summary,
        pdf        = EXCLUDED.pdf,
        body       = EXCLUDED.body,
        created_at = EXCLUDED.created_at
    `
  }
  console.log(`Seeded ${articles.length} articles.`)

  // Seed books
  await sql`DELETE FROM books`
  for (let i = 0; i < books.length; i++) {
    const b = books[i]
    await sql`
      INSERT INTO books (title, author, description, link, cover_url, display_order)
      VALUES (${b.title}, ${b.author}, ${b.description}, ${b.link ?? null}, ${b.coverUrl ?? null}, ${i})
    `
  }
  console.log(`Seeded ${books.length} books.`)

  // Seed video categories + videos
  for (let ci = 0; ci < videoCategories.length; ci++) {
    const cat = videoCategories[ci]
    await sql`
      INSERT INTO video_categories (id, label, icon, description, display_order)
      VALUES (${cat.id}, ${cat.label}, ${cat.icon ?? ''}, ${cat.description ?? ''}, ${ci})
      ON CONFLICT (id) DO UPDATE SET
        label         = EXCLUDED.label,
        icon          = EXCLUDED.icon,
        description   = EXCLUDED.description,
        display_order = EXCLUDED.display_order
    `
    for (let vi = 0; vi < cat.videos.length; vi++) {
      const v = cat.videos[vi]
      await sql`
        INSERT INTO videos (id, title, date, speaker, category_id, display_order)
        VALUES (${v.id}, ${v.title}, ${v.date ?? null}, ${v.speaker ?? null}, ${cat.id}, ${vi})
        ON CONFLICT (id) DO UPDATE SET
          title         = EXCLUDED.title,
          date          = EXCLUDED.date,
          speaker       = EXCLUDED.speaker,
          category_id   = EXCLUDED.category_id,
          display_order = EXCLUDED.display_order
      `
    }
  }
  console.log(`Seeded ${videoCategories.length} video categories.`)

  // Seed shorts
  for (let si = 0; si < shortsData.length; si++) {
    const s = shortsData[si]
    await sql`
      INSERT INTO shorts (id, title, description, display_order)
      VALUES (${s.id}, ${s.title}, ${s.description ?? ''}, ${si})
      ON CONFLICT (id) DO UPDATE SET
        title         = EXCLUDED.title,
        display_order = EXCLUDED.display_order
    `
  }
  console.log(`Seeded ${shortsData.length} shorts.`)

  // Seed series
  for (let si = 0; si < videoSeriesData.length; si++) {
    const s = videoSeriesData[si]
    await sql`
      INSERT INTO video_series (id, title, description, topic, speaker, display_order)
      VALUES (${s.id}, ${s.title}, ${s.description ?? ''}, ${s.topic ?? ''}, ${s.speaker ?? null}, ${si})
      ON CONFLICT (id) DO UPDATE SET
        title         = EXCLUDED.title,
        description   = EXCLUDED.description,
        topic         = EXCLUDED.topic,
        speaker       = EXCLUDED.speaker,
        display_order = EXCLUDED.display_order
    `
    for (let ei = 0; ei < s.episodes.length; ei++) {
      const ep = s.episodes[ei]
      await sql`
        INSERT INTO series_episodes (series_id, video_id, title, date, episode_order)
        VALUES (${s.id}, ${ep.id}, ${ep.title}, ${ep.date ?? null}, ${ei})
      `
    }
  }
  console.log(`Seeded ${videoSeriesData.length} series.`)

  console.log('Done!')
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
