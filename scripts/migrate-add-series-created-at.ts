/**
 * One-off migration: adds video_series.created_at for admin-panel pagination.
 * Run with: npx tsx --env-file=.env.local scripts/migrate-add-series-created-at.ts
 */
import { neon } from '../src/lib/neon-shim'

const sql = neon(process.env.DATABASE_URL!)

async function main() {
  await sql`ALTER TABLE video_series ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()`
  console.log('Column ensured.')
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
