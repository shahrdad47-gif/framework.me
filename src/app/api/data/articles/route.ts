import { NextRequest, NextResponse } from 'next/server'
import { getArticles, getArticlesBySection } from '@/lib/db'

export async function GET(req: NextRequest) {
  const section = req.nextUrl.searchParams.get('section')
  const data = section ? await getArticlesBySection(section) : await getArticles()
  return NextResponse.json(data)
}
