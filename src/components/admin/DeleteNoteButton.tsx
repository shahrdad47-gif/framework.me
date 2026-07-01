'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function DeleteNoteButton({ slug, title }: { slug: string; title: string }) {
  const router = useRouter()
  const [busy, setBusy] = useState(false)

  async function handleDelete() {
    if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return
    setBusy(true)
    const res = await fetch(`/api/admin/notes/${slug}`, { method: 'DELETE' })
    setBusy(false)
    if (res.ok) {
      router.refresh()
    } else {
      const data = await res.json().catch(() => ({}))
      window.alert(data.error || 'Failed to delete note')
    }
  }

  return (
    <button className="admin-btn admin-btn-danger" onClick={handleDelete} disabled={busy}>
      {busy ? 'Deleting…' : 'Delete'}
    </button>
  )
}
