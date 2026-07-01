import { NextRequest, NextResponse } from 'next/server'
import mammoth from 'mammoth'
import { marked } from 'marked'
import { sanitizeArticleBody } from '@/lib/sanitize'

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function textToHtml(text: string): string {
  return text
    .split(/\n\s*\n/)
    .map(p => p.trim())
    .filter(Boolean)
    .map(p => `<p>${escapeHtml(p)}</p>`)
    .join('')
}

function titleFromFilename(name: string): string {
  return name
    .replace(/\.[^.]+$/, '')
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, c => c.toUpperCase())
}

/** Pulls the first heading out of the HTML to use as the article title. */
function extractTitle(html: string, fallback: string): { title: string; body: string } {
  const match = html.match(/^\s*<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/i)
  if (!match) return { title: fallback, body: html }
  const title = match[1].replace(/<[^>]+>/g, '').trim()
  const body = html.slice(match[0].length)
  return { title: title || fallback, body }
}

export async function POST(req: NextRequest) {
  const form = await req.formData().catch(() => null)
  const file = form?.get('file')
  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
  }

  const name = file.name.toLowerCase()
  const fallbackTitle = titleFromFilename(file.name)

  try {
    let html: string

    if (name.endsWith('.docx')) {
      const buffer = Buffer.from(await file.arrayBuffer())
      const result = await mammoth.convertToHtml({ buffer })
      html = result.value
    } else if (name.endsWith('.md') || name.endsWith('.markdown')) {
      const text = await file.text()
      html = await marked.parse(text)
    } else if (name.endsWith('.txt')) {
      const text = await file.text()
      html = textToHtml(text)
    } else {
      return NextResponse.json({ error: 'Unsupported file type — use .docx, .md, or .txt' }, { status: 400 })
    }

    const { title, body } = extractTitle(html, fallbackTitle)
    return NextResponse.json({ title, body: sanitizeArticleBody(body) })
  } catch (err) {
    return NextResponse.json({ error: `Could not parse file: ${(err as Error).message}` }, { status: 400 })
  }
}
