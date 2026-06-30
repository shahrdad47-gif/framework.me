import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { getArticleBySlug } from '@/lib/db'
import { updateArticleAdmin, deleteArticleAdmin, validateArticleInput } from '@/lib/admin-db'

export async function GET(_req: NextRequest, { params }: { params: { slug: string } }) {
  const article = await getArticleBySlug(params.slug)
  if (!article) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(article)
}

export async function PUT(req: NextRequest, { params }: { params: { slug: string } }) {
  const data = await req.json().catch(() => null)
  if (!data) return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })

  const error = validateArticleInput(data, { requireSlug: false })
  if (error) return NextResponse.json({ error }, { status: 400 })

  try {
    const article = await updateArticleAdmin(params.slug, data)
    if (!article) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    revalidatePath('/', 'layout')
    return NextResponse.json(article)
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 })
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const deleted = await deleteArticleAdmin(params.slug)
    if (!deleted) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    revalidatePath('/', 'layout')
    return NextResponse.json({ ok: true })
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 })
  }
}
