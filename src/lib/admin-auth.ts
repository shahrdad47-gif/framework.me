import { SignJWT, jwtVerify } from 'jose'

const COOKIE_NAME = 'admin_session'
const SESSION_DURATION = '8h'

function getSecret(): Uint8Array {
  const secret = process.env.ADMIN_JWT_SECRET
  if (!secret) throw new Error('ADMIN_JWT_SECRET is not set')
  return new TextEncoder().encode(secret)
}

export function checkAdminPassword(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD
  if (!expected) return false
  return password === expected
}

export async function signAdminToken(): Promise<string> {
  return new SignJWT({ role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(SESSION_DURATION)
    .sign(getSecret())
}

export async function verifyAdminToken(token: string): Promise<boolean> {
  try {
    const { payload } = await jwtVerify(token, getSecret())
    return payload.role === 'admin'
  } catch {
    return false
  }
}

export { COOKIE_NAME }
