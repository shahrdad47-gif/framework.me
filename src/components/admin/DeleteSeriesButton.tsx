'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function DeleteSeriesButton({ id, title }: { id: string; title: string }) {
  const router = useRouter()
  const [busy, setBusy] = useState(false)

  async function handleDelete() {
    if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return
    setBusy(true)
    const res = await fetch(`/api/admin/series/${id}`, { method: 'DELETE' })
    setBusy(false)
    if (res.ok) {
      router.refresh()
    } else {
      const data = await res.json().catch(() => ({}))
      window.alert(data.error || 'Failed to delete series')
    }
  }

  return (
    <button className="admin-btn admin-btn-danger" onClick={handleDelete} disabled={busy}>
      {busy ? 'Deleting…' : 'Delete'}
    </button>
  )
}
