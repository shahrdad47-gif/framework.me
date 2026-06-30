/**
 * One-off migration: converts articles.body from a JSONB ArticleBlock[]
 * array to a single sanitized HTML string (the new Quill-editor format).
 * Run with: npx tsx --env-file=.env.local scripts/migrate-body-to-html.ts
 */

import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL!)

type ScriptureItem = { text: string; ref: string }
type ArticleBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'subheading'; text: string }
  | { type: 'closing'; text: string }
  | { type: 'scripture-list'; items: ScriptureItem[] }

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function blocksToHtml(blocks: ArticleBlock[]): string {
  return blocks.map(b => {
    if (b.type === 'paragraph') return `<p>${esc(b.text)}</p>`
    if (b.type === 'subheading') return `<h3>${esc(b.text)}</h3>`
    if (b.type === 'closing') return `<blockquote>${esc(b.text)}</blockquote>`
    if (b.type === 'scripture-list') {
      return b.items.map(it => `<blockquote>${esc(it.text)} — <strong>${esc(it.ref)}</strong></blockquote>`).join('')
    }
    return ''
  }).join('')
}

async function main() {
  const rows = await sql`SELECT slug, body FROM articles`
  for (const row of rows) {
    if (typeof row.body === 'string') {
      console.log(`Skipping ${row.slug}: already a string`)
      continue
    }
    if (!Array.isArray(row.body)) {
      console.warn(`Skipping ${row.slug}: unexpected body shape`, row.body)
      continue
    }
    const html = blocksToHtml(row.body as ArticleBlock[])
    await sql`UPDATE articles SET body = ${JSON.stringify(html)} WHERE slug = ${row.slug}`
    console.log(`Migrated ${row.slug} (${row.body.length} blocks -> ${html.length} chars of HTML)`)
  }
  console.log('Done!')
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
