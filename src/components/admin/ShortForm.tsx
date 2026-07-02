'use client'
import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import QuillEditor from './QuillEditor'

interface ExistingShort {
  id: string
  title: string
  description?: string
  status: string
}

interface ShortFormProps {
  mode: 'create' | 'edit'
  initial?: ExistingShort
}

// Same 11-char-ID matcher the backend uses, just for the live thumbnail preview.
function extractYouTubeId(input: string): string | null {
  const trimmed = input.trim()
  const match = trimmed.match(/(?:youtube\.com\/watch\?v=|youtube\.com\/embed\/|youtube\.com\/shorts\/|youtu\.be\/)([a-zA-Z0-9_-]{11})/)
  if (match) return match[1]
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) return trimmed
  return null
}

export default function ShortForm({ mode, initial }: ShortFormProps) {
  const router = useRouter()
  const [youtubeUrl, setYoutubeUrl] = useState(initial?.id ?? '')
  const [title, setTitle] = useState(initial?.title ?? '')
  const [description, setDescription] = useState(initial?.description ?? '')
  const [status, setStatus] = useState(initial?.status ?? 'published')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const previewId = mode === 'create' ? extractYouTubeId(youtubeUrl) : initial?.id

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')

    const payload = { youtubeUrl, title, description, status }

    setBusy(true)
    const res = mode === 'create'
      ? await fetch('/api/admin/shorts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
      : await fetch(`/api/admin/shorts/${initial!.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
    setBusy(false)

    if (res.ok) {
      router.push('/admin/shorts')
      router.refresh()
    } else {
      const data = await res.json().catch(() => ({}))
      setError(data.error || 'Something went wrong')
    }
  }

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      {error && <p className="admin-error">{error}</p>}

      <label className="admin-field">
        <span>{mode === 'edit' ? 'YouTube Video ID (cannot be changed)' : 'YouTube URL or Video ID'}</span>
        <input
          value={youtubeUrl}
          onChange={e => setYoutubeUrl(e.target.value)}
          disabled={mode === 'edit'}
          placeholder="https://www.youtube.com/shorts/..."
          required
        />
      </label>

      {previewId && (
        <div className="admin-video-preview">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`https://img.youtube.com/vi/${previewId}/hqdefault.jpg`} alt="Video thumbnail preview" />
        </div>
      )}

      <label className="admin-field">
        <span>Title</span>
        <input value={title} onChange={e => setTitle(e.target.value)} required />
      </label>

      <label className="admin-field">
        <span>Description (optional)</span>
        <QuillEditor value={description} onChange={setDescription} placeholder="Write a description for this short…" />
      </label>

      <label className="admin-field">
        <span>Status</span>
        <select value={status} onChange={e => setStatus(e.target.value)}>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
      </label>

      <div className="admin-form-actions">
        <button type="submit" className="admin-btn admin-btn-primary" disabled={busy}>
          {busy ? 'Saving…' : mode === 'create' ? 'Add Short' : 'Save Changes'}
        </button>
      </div>
    </form>
  )
}
