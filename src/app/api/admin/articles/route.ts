import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { getArticlesAdmin, createArticleAdmin, validateArticleInput } from '@/lib/admin-db'

export async function GET(req: NextRequest) {
  const page = Math.max(1, Number(req.nextUrl.searchParams.get('page')) || 1)
  const pageSize = Math.min(100, Math.max(1, Number(req.nextUrl.searchParams.get('pageSize')) || 10))
  const nation = req.nextUrl.searchParams.get('nation') || undefined

  try {
    const result = await getArticlesAdmin({ page, pageSize, nation })
    return NextResponse.json({ ...result, page, pageSize })
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const data = await req.json().catch(() => null)
  if (!data) return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })

  const error = validateArticleInput(data, { requireSlug: true })
  if (error) return NextResponse.json({ error }, { status: 400 })

  try {
    const article = await createArticleAdmin(data)
    revalidatePath('/', 'layout')
    return NextResponse.json(article, { status: 201 })
  } catch (err) {
    if ((err as Error).message === 'SLUG_TAKEN') {
      return NextResponse.json({ error: 'An article with this slug already exists' }, { status: 409 })
    }
    return NextResponse.json({ error: (err as Error).message }, { status: 500 })
  }
}
