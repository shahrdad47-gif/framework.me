import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { getNoteWithMetaAdmin, updateNoteAdmin, deleteNoteAdmin, validateNoteInput } from '@/lib/admin-notes-db'

export async function GET(_req: NextRequest, { params }: { params: { slug: string } }) {
  const note = await getNoteWithMetaAdmin(params.slug)
  if (!note) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(note)
}

export async function PUT(req: NextRequest, { params }: { params: { slug: string } }) {
  const data = await req.json().catch(() => null)
  if (!data) return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })

  const error = validateNoteInput(data, { requireSlug: false })
  if (error) return NextResponse.json({ error }, { status: 400 })

  try {
    const note = await updateNoteAdmin(params.slug, data)
    if (!note) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    revalidatePath('/', 'layout')
    return NextResponse.json(note)
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 })
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const deleted = await deleteNoteAdmin(params.slug)
    if (!deleted) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    revalidatePath('/', 'layout')
    return NextResponse.json({ ok: true })
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 })
  }
}
