'use client'
import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import QuillEditor from './QuillEditor'
import PdfUploadField from './PdfUploadField'

interface VideoCategoryOption {
  id: string
  label: string
}

interface ExistingVideo {
  id: string
  title: string
  date?: string
  speaker?: string
  description?: string
  notes?: string
  categoryId: string
  status: string
}

interface VideoFormProps {
  mode: 'create' | 'edit'
  categories: VideoCategoryOption[]
  initial?: ExistingVideo
}

// Same 11-char-ID matcher the backend uses, just for the live thumbnail preview.
function extractYouTubeId(input: string): string | null {
  const trimmed = input.trim()
  const match = trimmed.match(/(?:youtube\.com\/watch\?v=|youtube\.com\/embed\/|youtube\.com\/shorts\/|youtu\.be\/)([a-zA-Z0-9_-]{11})/)
  if (match) return match[1]
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) return trimmed
  return null
}

export default function VideoForm({ mode, categories, initial }: VideoFormProps) {
  const router = useRouter()
  const [youtubeUrl, setYoutubeUrl] = useState(initial?.id ?? '')
  const [title, setTitle] = useState(initial?.title ?? '')
  const [date, setDate] = useState(initial?.date ?? '')
  const [speaker, setSpeaker] = useState(initial?.speaker ?? '')
  const [description, setDescription] = useState(initial?.description ?? '')
  const [notes, setNotes] = useState(initial?.notes ?? '')
  const [categoryId, setCategoryId] = useState(initial?.categoryId ?? categories[0]?.id ?? '')
  const [status, setStatus] = useState(initial?.status ?? 'published')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const previewId = mode === 'create' ? extractYouTubeId(youtubeUrl) : initial?.id

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')

    const payload = {
      youtubeUrl,
      title,
      date: date.trim() || undefined,
      speaker: speaker.trim() || undefined,
      description,
      notes: notes.trim() || undefined,
      categoryId,
      status,
    }

    setBusy(true)
    const res = mode === 'create'
      ? await fetch('/api/admin/videos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
      : await fetch(`/api/admin/videos/${initial!.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
    setBusy(false)

    if (res.ok) {
      router.push('/admin/videos')
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
          placeholder="https://www.youtube.com/watch?v=..."
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
        <QuillEditor value={description} onChange={setDescription} placeholder="Write a description for this video…" />
      </label>

      <div className="admin-field">
        <span>Notes (PDF, optional)</span>
        <PdfUploadField value={notes} onChange={setNotes} />
      </div>

      <div className="admin-field-row">
        <label className="admin-field">
          <span>Speaker (optional)</span>
          <input value={speaker} onChange={e => setSpeaker(e.target.value)} />
        </label>
        <label className="admin-field">
          <span>Date (optional)</span>
          <input value={date} onChange={e => setDate(e.target.value)} placeholder="e.g. May 2026" />
        </label>
      </div>

      <div className="admin-field-row">
        <label className="admin-field">
          <span>Section</span>
          <select value={categoryId} onChange={e => setCategoryId(e.target.value)} required>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.label}</option>
            ))}
          </select>
        </label>
        <label className="admin-field">
          <span>Status</span>
          <select value={status} onChange={e => setStatus(e.target.value)}>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </label>
      </div>

      <div className="admin-form-actions">
        <button type="submit" className="admin-btn admin-btn-primary" disabled={busy || categories.length === 0}>
          {busy ? 'Saving…' : mode === 'create' ? 'Add Video' : 'Save Changes'}
        </button>
      </div>
      {categories.length === 0 && (
        <p className="admin-error">You need at least one section before adding a video.</p>
      )}
    </form>
  )
}
