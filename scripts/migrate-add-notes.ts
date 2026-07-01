/**
 * One-off migration: creates the study_notes table for downloadable study
 * notes. Named "study_notes" (not "notes") because this database already
 * has an unrelated, empty "notes" table with a different schema.
 * Run with: npx tsx --env-file=.env.local scripts/migrate-add-notes.ts
 */
import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL!)

async function main() {
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
  console.log('study_notes table ready.')
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
