/**
 * One-off migration: creates the pdf_files table used to store uploaded
 * article PDFs directly in Postgres (no Vercel Blob dependency).
 * Run with: npx tsx --env-file=.env.local scripts/migrate-add-pdf-files.ts
 */

import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL!)

async function main() {
  await sql`
    CREATE TABLE IF NOT EXISTS pdf_files (
      id           TEXT PRIMARY KEY,
      filename     TEXT NOT NULL,
      content_type TEXT NOT NULL DEFAULT 'application/pdf',
      data         BYTEA NOT NULL,
      created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `
  console.log('pdf_files table ready.')
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
