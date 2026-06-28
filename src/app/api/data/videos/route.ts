import { NextResponse } from 'next/server'
import { getVideoCategories } from '@/lib/db'

export async function GET() {
  const data = await getVideoCategories()
  return NextResponse.json(data)
}
