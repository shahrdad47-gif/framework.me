'use client'
import { useRef, useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { nations } from '@/data/nations'
import type { Article } from '@/types'
import QuillEditor from './QuillEditor'
import PdfUploadField from './PdfUploadField'

const SECTIONS = ['geopolitics', 'end-times'] as const

function isoToDateInput(iso: string): string {
  return iso.slice(0, 10)
}

interface ArticleFormProps {
  mode: 'create' | 'edit'
  initial?: Article & { createdAt: string }
}

export default function ArticleForm({ mode, initial }: ArticleFormProps) {
  const router = useRouter()
  const [slug, setSlug] = useState(initial?.slug ?? '')
  const [title, setTitle] = useState(initial?.title ?? '')
  const [author, setAuthor] = useState(initial?.author ?? '')
  const [dateInput, setDateInput] = useState(
    initial ? isoToDateInput(initial.createdAt) : new Date().toISOString().slice(0, 10)
  )
  const [selectedNations, setSelectedNations] = useState<string[]>(initial?.nations ?? [])
  const [selectedSections, setSelectedSections] = useState<string[]>(initial?.sections ?? [])
  const [summary, setSummary] = useState(initial?.summary ?? '')
  const [pdf, setPdf] = useState(initial?.pdf ?? '')
  const [body, setBody] = useState(initial?.body ?? '')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [importing, setImporting] = useState(false)
  const importInputRef = useRef<HTMLInputElement>(null)

  async function handleImportFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    if ((title.trim() || body.trim()) && !window.confirm('This will replace the current title and body. Continue?')) {
      if (importInputRef.current) importInputRef.current.value = ''
      return
    }

    setError('')
    setImporting(true)
    const form = new FormData()
    form.append('file', file)
    const res = await fetch('/api/admin/parse-document', { method: 'POST', body: form })
    setImporting(false)
    if (importInputRef.current) importInputRef.current.value = ''

    if (res.ok) {
      const data = await res.json()
      setTitle(data.title)
      setBody(data.body)
    } else {
      const data = await res.json().catch(() => ({}))
      setError(data.error || 'Could not import that file')
    }
  }

  function toggleNation(key: string) {
    setSelectedNations(prev => prev.includes(key) ? prev.filter(n => n !== key) : [...prev, key])
  }

  function toggleSection(key: string) {
    setSelectedSections(prev => prev.includes(key) ? prev.filter(s => s !== key) : [...prev, key])
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')

    const createdAt = new Date(`${dateInput}T00:00:00`).toISOString()
    const displayDate = new Date(`${dateInput}T00:00:00`).toLocaleDateString('en-US', {
      month: 'long', day: 'numeric', year: 'numeric',
    })

    const payload = {
      slug,
      title,
      author,
      date: displayDate,
      createdAt,
      nations: selectedNations,
      sections: selectedSections,
      summary,
      pdf: pdf.trim() || undefined,
      body,
    }

    setBusy(true)
    const res = mode === 'create'
      ? await fetch('/api/admin/articles', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
      : await fetch(`/api/admin/articles/${initial!.slug}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
    setBusy(false)

    if (res.ok) {
      router.push('/admin/articles')
      router.refresh()
    } else {
      const data = await res.json().catch(() => ({}))
      setError(data.error || 'Something went wrong')
    }
  }

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      {error && <p className="admin-error">{error}</p>}

      <div className="admin-import-bar">
        <p>Import the title and body from a .docx, .md, or .txt file — you can still edit everything below before saving.</p>
        <button
          type="button"
          className="admin-btn admin-btn-ghost"
          onClick={() => importInputRef.current?.click()}
          disabled={importing}
        >
          {importing ? 'Importing…' : 'Import from file'}
        </button>
        <input
          ref={importInputRef}
          type="file"
          accept=".docx,.md,.markdown,.txt"
          onChange={handleImportFile}
          hidden
        />
      </div>

      <label className="admin-field">
        <span>Slug {mode === 'edit' && '(cannot be changed)'}</span>
        <input
          value={slug}
          onChange={e => setSlug(e.target.value.toLowerCase())}
          disabled={mode === 'edit'}
          placeholder="my-article-title"
          required
        />
      </label>

      <label className="admin-field">
        <span>Title</span>
        <input value={title} onChange={e => setTitle(e.target.value)} required />
      </label>

      <div className="admin-field-row">
        <label className="admin-field">
          <span>Author</span>
          <input value={author} onChange={e => setAuthor(e.target.value)} required />
        </label>
        <label className="admin-field">
          <span>Date</span>
          <input type="date" value={dateInput} onChange={e => setDateInput(e.target.value)} required />
        </label>
      </div>

      <fieldset className="admin-field">
        <legend>Countries</legend>
        <div className="admin-checkbox-grid">
          {nations.map(n => (
            <label key={n.key} className="admin-checkbox">
              <input
                type="checkbox"
                checked={selectedNations.includes(n.key)}
                onChange={() => toggleNation(n.key)}
              />
              {n.name}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="admin-field">
        <legend>Sections</legend>
        <div className="admin-checkbox-grid">
          {SECTIONS.map(s => (
            <label key={s} className="admin-checkbox">
              <input
                type="checkbox"
                checked={selectedSections.includes(s)}
                onChange={() => toggleSection(s)}
              />
              {s}
            </label>
          ))}
        </div>
      </fieldset>

      <label className="admin-field">
        <span>Summary</span>
        <textarea value={summary} onChange={e => setSummary(e.target.value)} rows={3} required />
      </label>

      <div className="admin-field">
        <span>PDF (optional)</span>
        <PdfUploadField value={pdf} onChange={setPdf} />
      </div>

      <label className="admin-field">
        <span>Body</span>
        <QuillEditor value={body} onChange={setBody} placeholder="Write the article…" />
      </label>

      <div className="admin-form-actions">
        <button type="submit" className="admin-btn admin-btn-primary" disabled={busy}>
          {busy ? 'Saving…' : mode === 'create' ? 'Create Article' : 'Save Changes'}
        </button>
      </div>
    </form>
  )
}
