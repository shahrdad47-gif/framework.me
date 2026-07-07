/**
 * One-off migration: adds articles.created_at and backfills it from the
 * existing free-text `date` column so admin-panel pagination sorts correctly.
 * Run with: npx tsx scripts/migrate-add-created-at.ts
 */

import { neon } from '../src/lib/neon-shim'

const sql = neon(process.env.DATABASE_URL!)

async function main() {
  await sql`ALTER TABLE articles ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()`
  console.log('Column ensured.')

  const rows = await sql`SELECT slug, date FROM articles`
  for (const row of rows) {
    const parsed = new Date(row.date as string)
    if (isNaN(parsed.getTime())) {
      console.warn(`Skipping ${row.slug}: unparseable date "${row.date}"`)
      continue
    }
    await sql`UPDATE articles SET created_at = ${parsed.toISOString()} WHERE slug = ${row.slug}`
    console.log(`Backfilled ${row.slug} -> ${parsed.toISOString()}`)
  }

  console.log('Done!')
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
