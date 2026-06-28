import { NextResponse } from 'next/server'
import { getBooks } from '@/lib/db'

export async function GET() {
  const data = await getBooks()
  return NextResponse.json(data)
}
