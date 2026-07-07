/**
 * One-off migration: adds videos.description (rich HTML, same allowlist as
 * articles' body) for the video-detail page.
 * Run with: npx tsx --env-file=.env.local scripts/migrate-add-video-description.ts
 */
import { neon } from '../src/lib/neon-shim'

const sql = neon(process.env.DATABASE_URL!)

async function main() {
  await sql`ALTER TABLE videos ADD COLUMN IF NOT EXISTS description TEXT NOT NULL DEFAULT ''`
  console.log('Column ensured.')
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
