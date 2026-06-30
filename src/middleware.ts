import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminToken, COOKIE_NAME } from '@/lib/admin-auth'

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (pathname === '/admin/login' || pathname === '/api/admin/login') {
    return NextResponse.next()
  }

  const token = req.cookies.get(COOKIE_NAME)?.value
  const authed = token ? await verifyAdminToken(token) : false

  if (authed) return NextResponse.next()

  if (pathname.startsWith('/api/admin')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const loginUrl = new URL('/admin/login', req.url)
  return NextResponse.redirect(loginUrl)
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}
