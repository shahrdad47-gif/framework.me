import { NextRequest, NextResponse } from 'next/server'
import { checkAdminPassword, signAdminToken, COOKIE_NAME } from '@/lib/admin-auth'

export async function POST(req: NextRequest) {
  const { password } = await req.json().catch(() => ({ password: '' }))

  if (typeof password !== 'string' || !checkAdminPassword(password)) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
  }

  const token = await signAdminToken()
  const res = NextResponse.json({ ok: true })
  res.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 8,
  })
  return res
}
