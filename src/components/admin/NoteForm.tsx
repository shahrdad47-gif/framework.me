'use client'
import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import type { Note } from '@/types'
import PdfUploadField from './PdfUploadField'
import QuillEditor from './QuillEditor'

function isoToDateInput(iso: string): string {
  return iso.slice(0, 10)
}

interface NoteFormProps {
  mode: 'create' | 'edit'
  initial?: Note & { createdAt: string }
}

export default function NoteForm({ mode, initial }: NoteFormProps) {
  const router = useRouter()
  const [slug, setSlug] = useState(initial?.slug ?? '')
  const [title, setTitle] = useState(initial?.title ?? '')
  const [description, setDescription] = useState(initial?.description ?? '')
  const [pdf, setPdf] = useState(initial?.pdf ?? '')
  const [dateInput, setDateInput] = useState(
    initial ? isoToDateInput(initial.createdAt) : new Date().toISOString().slice(0, 10)
  )
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')

    const createdAt = new Date(`${dateInput}T00:00:00`).toISOString()
    const displayDate = new Date(`${dateInput}T00:00:00`).toLocaleDateString('en-US', {
      month: 'long', day: 'numeric', year: 'numeric',
    })

    const payload = { slug, title, description, pdf, date: displayDate, createdAt }

    setBusy(true)
    const res = mode === 'create'
      ? await fetch('/api/admin/notes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
      : await fetch(`/api/admin/notes/${initial!.slug}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
    setBusy(false)

    if (res.ok) {
      router.push('/admin/notes')
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
        <span>Slug {mode === 'edit' && '(cannot be changed)'}</span>
        <input
          value={slug}
          onChange={e => setSlug(e.target.value.toLowerCase())}
          disabled={mode === 'edit'}
          placeholder="my-study-note"
          required
        />
      </label>

      <label className="admin-field">
        <span>Title</span>
        <input value={title} onChange={e => setTitle(e.target.value)} required />
      </label>

      <label className="admin-field">
        <span>Description (optional)</span>
        <QuillEditor value={description} onChange={setDescription} placeholder="Describe this note…" />
      </label>

      <label className="admin-field">
        <span>Date</span>
        <input type="date" value={dateInput} onChange={e => setDateInput(e.target.value)} required />
      </label>

      <div className="admin-field">
        <span>PDF</span>
        <PdfUploadField value={pdf} onChange={setPdf} />
      </div>

      <div className="admin-form-actions">
        <button type="submit" className="admin-btn admin-btn-primary" disabled={busy}>
          {busy ? 'Saving…' : mode === 'create' ? 'Create Note' : 'Save Changes'}
        </button>
      </div>
    </form>
  )
}
