/**
 * One-off migration: creates the shorts table for 1-Minute Shorts, and
 * seeds it from the static data/videos.ts catalog so the public site
 * doesn't go blank the moment it starts reading from the database.
 * Run with: npx tsx --env-file=.env.local scripts/migrate-add-shorts.ts
 */
import { neon } from '@neondatabase/serverless'
import { shortsData } from '../src/data/videos'

const sql = neon(process.env.DATABASE_URL!)

async function main() {
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
  console.log('shorts table ready.')

  for (let i = 0; i < shortsData.length; i++) {
    const s = shortsData[i]
    await sql`
      INSERT INTO shorts (id, title, description, display_order)
      VALUES (${s.id}, ${s.title}, ${s.description ?? ''}, ${i})
      ON CONFLICT (id) DO UPDATE SET
        title         = EXCLUDED.title,
        display_order = EXCLUDED.display_order
    `
  }
  console.log(`Seeded ${shortsData.length} shorts.`)
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
