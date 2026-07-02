import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { getShortsAdmin, createShortAdmin, validateShortInput, extractYouTubeId } from '@/lib/admin-shorts-db'

export async function GET(req: NextRequest) {
  const page = Math.max(1, Number(req.nextUrl.searchParams.get('page')) || 1)
  const pageSize = Math.min(100, Math.max(1, Number(req.nextUrl.searchParams.get('pageSize')) || 10))

  try {
    const result = await getShortsAdmin({ page, pageSize })
    return NextResponse.json({ ...result, page, pageSize })
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const data = await req.json().catch(() => null)
  if (!data) return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })

  if (typeof data.youtubeUrl !== 'string' || !data.youtubeUrl.trim()) {
    return NextResponse.json({ error: 'A YouTube URL or video ID is required' }, { status: 400 })
  }
  const id = extractYouTubeId(data.youtubeUrl)
  if (!id) {
    return NextResponse.json({ error: 'Could not find a valid YouTube video ID in that URL' }, { status: 400 })
  }

  const payload = { ...data, id }
  const error = validateShortInput(payload, { requireId: true })
  if (error) return NextResponse.json({ error }, { status: 400 })

  try {
    const short = await createShortAdmin(payload)
    revalidatePath('/', 'layout')
    return NextResponse.json(short, { status: 201 })
  } catch (err) {
    if ((err as Error).message === 'ID_TAKEN') {
      return NextResponse.json({ error: 'This short has already been added' }, { status: 409 })
    }
    return NextResponse.json({ error: (err as Error).message }, { status: 500 })
  }
}
