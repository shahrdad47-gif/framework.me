import { NextResponse } from 'next/server'
import { getVideoSeries } from '@/lib/db'

export async function GET() {
  const data = await getVideoSeries()
  return NextResponse.json(data)
}
