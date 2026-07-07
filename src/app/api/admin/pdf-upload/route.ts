import { NextRequest, NextResponse } from 'next/server'
import { neon } from '@/lib/neon-shim'
import { randomUUID } from 'crypto'

const MAX_SIZE = 4 * 1024 * 1024 // stay under Vercel's serverless body-size limit

export async function POST(req: NextRequest) {
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ error: 'DATABASE_URL is not set — PDF storage requires a live database' }, { status: 500 })
  }

  const form = await req.formData().catch(() => null)
  const file = form?.get('file')
  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
  }
  if (file.type !== 'application/pdf') {
    return NextResponse.json({ error: 'Only PDF files are allowed' }, { status: 400 })
  }
  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: `File too large — max ${MAX_SIZE / (1024 * 1024)}MB` }, { status: 400 })
  }

  const id = randomUUID()
  const buffer = Buffer.from(await file.arrayBuffer())

  const sql = neon(process.env.DATABASE_URL, { fetchOptions: { cache: 'no-store' } })
  await sql`
    INSERT INTO pdf_files (id, filename, content_type, data)
    VALUES (${id}, ${file.name}, ${file.type}, ${buffer})
  `

  return NextResponse.json({ url: `/api/pdf/${id}` })
}
