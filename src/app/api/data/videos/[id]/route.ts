import { NextResponse } from 'next/server'
import { getVideoById } from '@/lib/db'

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const result = await getVideoById(params.id)
  if (!result) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(result)
}
