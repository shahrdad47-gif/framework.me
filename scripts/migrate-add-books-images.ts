/**
 * One-off migration: adds books.created_at (admin-panel sorting) and the
 * images table for uploaded pictures (book covers etc.), mirroring
 * pdf_files but for image bytes.
 * Run with: npx tsx --env-file=.env.local scripts/migrate-add-books-images.ts
 */
import { neon } from '../src/lib/neon-shim'

const sql = neon(process.env.DATABASE_URL!)

async function main() {
  await sql`ALTER TABLE books ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()`
  console.log('books.created_at ensured.')

  await sql`
    CREATE TABLE IF NOT EXISTS images (
      id           TEXT PRIMARY KEY,
      filename     TEXT NOT NULL,
      content_type TEXT NOT NULL DEFAULT 'image/jpeg',
      data         BYTEA NOT NULL,
      created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `
  console.log('images table ready.')
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
