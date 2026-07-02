import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { getBooksAdmin, createBookAdmin, validateBookInput } from '@/lib/admin-books-db'

export async function GET(req: NextRequest) {
  const page = Math.max(1, Number(req.nextUrl.searchParams.get('page')) || 1)
  const pageSize = Math.min(100, Math.max(1, Number(req.nextUrl.searchParams.get('pageSize')) || 10))

  try {
    const result = await getBooksAdmin({ page, pageSize })
    return NextResponse.json({ ...result, page, pageSize })
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const data = await req.json().catch(() => null)
  if (!data) return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })

  const error = validateBookInput(data)
  if (error) return NextResponse.json({ error }, { status: 400 })

  try {
    const book = await createBookAdmin(data)
    revalidatePath('/', 'layout')
    return NextResponse.json(book, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 })
  }
}
