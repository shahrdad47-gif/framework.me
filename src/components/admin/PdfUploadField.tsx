'use client'
import { useRef, useState } from 'react'

interface PdfUploadFieldProps {
  value: string
  onChange: (url: string) => void
}

export default function PdfUploadField({ value, onChange }: PdfUploadFieldProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setError('')
    setUploading(true)
    try {
      const form = new FormData()
      form.append('file', file)
      const res = await fetch('/api/admin/pdf-upload', { method: 'POST', body: form })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Upload failed')
      }
      const data = await res.json()
      onChange(data.url)
    } catch (err) {
      setError((err as Error).message || 'Upload failed. Please try again.')
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  return (
    <div className="admin-pdf-field">
      {value && (
        <div className="admin-pdf-current">
          <a href={value} target="_blank" rel="noopener noreferrer">View current PDF</a>
          <button type="button" className="admin-btn-danger-text" onClick={() => onChange('')}>Remove</button>
        </div>
      )}

      <div className="admin-pdf-actions">
        <button
          type="button"
          className="admin-btn admin-btn-ghost"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
        >
          {uploading ? 'Uploading…' : value ? 'Replace PDF' : 'Upload PDF'}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          hidden
        />
        <span className="admin-pdf-or">or paste a URL</span>
        <input
          type="url"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder="https://example.com/article.pdf"
          className="admin-pdf-url-input"
        />
      </div>

      {error && <p className="admin-error">{error}</p>}
    </div>
  )
}
