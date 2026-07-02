import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { getBookAdmin, updateBookAdmin, deleteBookAdmin, validateBookInput } from '@/lib/admin-books-db'

function parseId(raw: string): number | null {
  const id = Number(raw)
  return Number.isInteger(id) ? id : null
}

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const id = parseId(params.id)
  if (id === null) return NextResponse.json({ error: 'Invalid id' }, { status: 400 })

  const book = await getBookAdmin(id)
  if (!book) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(book)
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const id = parseId(params.id)
  if (id === null) return NextResponse.json({ error: 'Invalid id' }, { status: 400 })

  const data = await req.json().catch(() => null)
  if (!data) return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })

  const error = validateBookInput(data)
  if (error) return NextResponse.json({ error }, { status: 400 })

  try {
    const book = await updateBookAdmin(id, data)
    if (!book) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    revalidatePath('/', 'layout')
    return NextResponse.json(book)
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 })
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const id = parseId(params.id)
  if (id === null) return NextResponse.json({ error: 'Invalid id' }, { status: 400 })

  try {
    const deleted = await deleteBookAdmin(id)
    if (!deleted) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    revalidatePath('/', 'layout')
    return NextResponse.json({ ok: true })
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 })
  }
}
