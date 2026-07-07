import { NextResponse } from 'next/server'
import { neon } from '@/lib/neon-shim'

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  const sql = neon(process.env.DATABASE_URL, { fetchOptions: { cache: 'no-store' } })
  const rows = await sql`SELECT filename, content_type, data FROM images WHERE id = ${params.id} LIMIT 1`
  const row = rows[0]
  if (!row) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const buffer = Buffer.from(row.data)
  return new NextResponse(buffer, {
    headers: {
      'Content-Type': row.content_type || 'image/jpeg',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  })
}
