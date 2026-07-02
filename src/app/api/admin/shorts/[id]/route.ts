import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { getShortAdmin, updateShortAdmin, deleteShortAdmin, validateShortInput } from '@/lib/admin-shorts-db'

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const short = await getShortAdmin(params.id)
  if (!short) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(short)
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const data = await req.json().catch(() => null)
  if (!data) return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })

  const error = validateShortInput(data, { requireId: false })
  if (error) return NextResponse.json({ error }, { status: 400 })

  try {
    const short = await updateShortAdmin(params.id, data)
    if (!short) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    revalidatePath('/', 'layout')
    return NextResponse.json(short)
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 })
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const deleted = await deleteShortAdmin(params.id)
    if (!deleted) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    revalidatePath('/', 'layout')
    return NextResponse.json({ ok: true })
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 })
  }
}
