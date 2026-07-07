/**
 * Drop-in replacement for `@neondatabase/serverless`'s `neon()` tagged-template
 * client, backed by standard `pg` wire-protocol connections. Neon's HTTP driver
 * only speaks to Neon's own proxy, so self-hosted Postgres needs this instead.
 */
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { Pool } = require('pg')

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Row = Record<string, any>
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SqlFn = (strings: TemplateStringsArray, ...values: any[]) => Promise<Row[]>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const pools = new Map<string, any>()

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getPool(connectionString: string): any {
  let pool = pools.get(connectionString)
  if (!pool) {
    const useSSL = /sslmode=require|neon\.tech/.test(connectionString)
    pool = new Pool({ connectionString, ssl: useSSL ? { rejectUnauthorized: false } : false })
    pools.set(connectionString, pool)
  }
  return pool
}

export function neon(connectionString: string, _opts?: unknown): SqlFn {
  const pool = getPool(connectionString)
  return async (strings: TemplateStringsArray, ...values: unknown[]) => {
    let text = strings[0]
    for (let i = 0; i < values.length; i++) {
      text += `$${i + 1}` + strings[i + 1]
    }
    const result = await pool.query(text, values)
    return result.rows as Row[]
  }
}
