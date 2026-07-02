import { NextRequest, NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'
import { randomUUID } from 'crypto'

const MAX_SIZE = 4 * 1024 * 1024 // stay under Vercel's serverless body-size limit
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']

export async function POST(req: NextRequest) {
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ error: 'DATABASE_URL is not set — image storage requires a live database' }, { status: 500 })
  }

  const form = await req.formData().catch(() => null)
  const file = form?.get('file')
  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
  }
  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({ error: 'Only JPEG, PNG, WebP, or GIF images are allowed' }, { status: 400 })
  }
  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: `File too large — max ${MAX_SIZE / (1024 * 1024)}MB` }, { status: 400 })
  }

  const id = randomUUID()
  const buffer = Buffer.from(await file.arrayBuffer())

  const sql = neon(process.env.DATABASE_URL, { fetchOptions: { cache: 'no-store' } })
  await sql`
    INSERT INTO images (id, filename, content_type, data)
    VALUES (${id}, ${file.name}, ${file.type}, ${buffer})
  `

  return NextResponse.json({ url: `/api/image/${id}` })
}
