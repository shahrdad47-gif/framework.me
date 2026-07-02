'use client'
import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import QuillEditor from './QuillEditor'
import PdfUploadField from './PdfUploadField'
import ImageUploadField from './ImageUploadField'

interface ExistingBook {
  id: number
  title: string
  author: string
  description?: string
  link?: string
  coverUrl?: string
}

interface BookFormProps {
  mode: 'create' | 'edit'
  initial?: ExistingBook
}

export default function BookForm({ mode, initial }: BookFormProps) {
  const router = useRouter()
  const [title, setTitle] = useState(initial?.title ?? '')
  const [author, setAuthor] = useState(initial?.author ?? '')
  const [description, setDescription] = useState(initial?.description ?? '')
  const [link, setLink] = useState(initial?.link ?? '')
  const [coverUrl, setCoverUrl] = useState(initial?.coverUrl ?? '')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')

    const payload = {
      title,
      author,
      description,
      link: link.trim() || undefined,
      coverUrl: coverUrl.trim() || undefined,
    }

    setBusy(true)
    const res = mode === 'create'
      ? await fetch('/api/admin/books', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
      : await fetch(`/api/admin/books/${initial!.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
    setBusy(false)

    if (res.ok) {
      router.push('/admin/books')
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
        <span>Title</span>
        <input value={title} onChange={e => setTitle(e.target.value)} required />
      </label>

      <label className="admin-field">
        <span>Author</span>
        <input value={author} onChange={e => setAuthor(e.target.value)} required />
      </label>

      <label className="admin-field">
        <span>Description (optional)</span>
        <QuillEditor value={description} onChange={setDescription} placeholder="Describe this book…" />
      </label>

      <div className="admin-field">
        <span>Cover Image (optional)</span>
        <ImageUploadField value={coverUrl} onChange={setCoverUrl} />
      </div>

      <div className="admin-field">
        <span>Book Link / PDF (optional)</span>
        <PdfUploadField value={link} onChange={setLink} />
      </div>

      <div className="admin-form-actions">
        <button type="submit" className="admin-btn admin-btn-primary" disabled={busy}>
          {busy ? 'Saving…' : mode === 'create' ? 'Add Book' : 'Save Changes'}
        </button>
      </div>
    </form>
  )
}
