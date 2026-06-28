/**
 * Translates contributor bios and roles into FA, AR, HY, PT.
 * Outputs: src/data/contributor-translations.ts
 * Run: npx tsx scripts/translate-contributors.ts
 */

import { writeFileSync } from 'fs'
import { contributors } from '../src/data/contributors'

const LOCALES = ['fa', 'ar', 'hy', 'pt'] as const

function sleep(ms: number) { return new Promise(r => setTimeout(r, ms)) }

async function translateChunk(text: string, lang: string): Promise<string> {
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${lang}&dt=t&q=${encodeURIComponent(text)}`
  try {
    const res = await fetch(url)
    const data = await res.json() as Array<Array<[string]>>
    const out = data[0].map((x: [string]) => x[0]).join('')
    if (out) return out
  } catch { /* ignore */ }
  return text
}

async function translateText(text: string, lang: string): Promise<string> {
  if (!text?.trim()) return text
  const MAX = 1000
  if (text.length <= MAX) { await sleep(150); return translateChunk(text, lang) }
  const sentences = text.match(/[^.!?]+[.!?]+(\s|$)|[^.!?]+$/g) ?? [text]
  const chunks: string[] = []; let cur = ''
  for (const s of sentences) {
    if ((cur + s).length > MAX) { if (cur) chunks.push(cur.trim()); cur = s } else cur += s
  }
  if (cur.trim()) chunks.push(cur.trim())
  const parts: string[] = []
  for (const chunk of chunks) { await sleep(150); parts.push(await translateChunk(chunk, lang)) }
  return parts.join(' ')
}

interface ContribTx { role: string; bio: string }

async function main() {
  const result: Record<string, Partial<Record<string, ContribTx>>> = {}

  for (const c of contributors) {
    const key = c.name
    result[key] = {}
    for (const locale of LOCALES) {
      console.log(`\n→ "${c.name}" [${locale}]`)
      const role = await translateText(c.role, locale)
      // Translate each paragraph separately to preserve spacing
      const paras = c.bio.split('\n\n')
      const txParas: string[] = []
      for (const p of paras) { txParas.push(await translateText(p, locale)) }
      const bio = txParas.join('\n\n')
      console.log(`  role: ${role}`)
      result[key][locale] = { role, bio }
    }
  }

  const ts = `// AUTO-GENERATED — do not edit by hand. Run scripts/translate-contributors.ts to regenerate.

export interface ContribTranslation { role: string; bio: string }

export const contributorTranslations: Record<string, Partial<Record<string, ContribTranslation>>> =
${JSON.stringify(result, null, 2)}
`
  writeFileSync('src/data/contributor-translations.ts', ts, 'utf8')
  console.log('\n✅  Wrote src/data/contributor-translations.ts')
}

main().catch(e => { console.error(e); process.exit(1) })
