import type { Note } from '@/types'

// Zero-config fallback used when DATABASE_URL is not set.
// Add notes here directly, or manage them through /admin/notes once a
// database is connected.
export const notes: Note[] = []
