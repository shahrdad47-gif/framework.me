import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { getVideoAdmin, updateVideoAdmin, deleteVideoAdmin, validateVideoInput } from '@/lib/admin-videos-db'

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const video = await getVideoAdmin(params.id)
  if (!video) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(video)
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const data = await req.json().catch(() => null)
  if (!data) return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })

  const error = validateVideoInput(data, { requireId: false })
  if (error) return NextResponse.json({ error }, { status: 400 })

  try {
    const video = await updateVideoAdmin(params.id, data)
    if (!video) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    revalidatePath('/', 'layout')
    return NextResponse.json(video)
  } catch (err) {
    if ((err as Error).message === 'CATEGORY_NOT_FOUND') {
      return NextResponse.json({ error: 'That section does not exist' }, { status: 400 })
    }
    return NextResponse.json({ error: (err as Error).message }, { status: 500 })
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const deleted = await deleteVideoAdmin(params.id)
    if (!deleted) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    revalidatePath('/', 'layout')
    return NextResponse.json({ ok: true })
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 })
  }
}
