import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { getSeriesOneAdmin, updateSeriesAdmin, deleteSeriesAdmin, validateSeriesInput } from '@/lib/admin-series-db'

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const series = await getSeriesOneAdmin(params.id)
  if (!series) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(series)
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const data = await req.json().catch(() => null)
  if (!data) return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })

  const error = validateSeriesInput(data, { requireId: false })
  if (error) return NextResponse.json({ error }, { status: 400 })

  try {
    const series = await updateSeriesAdmin(params.id, data)
    if (!series) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    revalidatePath('/', 'layout')
    return NextResponse.json(series)
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 })
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const deleted = await deleteSeriesAdmin(params.id)
    if (!deleted) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    revalidatePath('/', 'layout')
    return NextResponse.json({ ok: true })
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 })
  }
}
