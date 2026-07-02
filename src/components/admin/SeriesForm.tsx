'use client'
import { useRef, useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import QuillEditor from './QuillEditor'

interface ExistingEpisode {
  id: string // youtube video id
  title: string
  date?: string
}

interface ExistingSeries {
  id: string
  title: string
  description?: string
  topic: string
  speaker?: string
  episodes: ExistingEpisode[]
}

interface SeriesFormProps {
  mode: 'create' | 'edit'
  initial?: ExistingSeries
}

type EpisodeRow = { uid: string; videoId: string; title: string; date: string }

let uidCounter = 0
function uid(): string {
  uidCounter += 1
  return `ep${Date.now()}${uidCounter}`
}

// Same 11-char-ID matcher the backend uses, just for the live thumbnail preview.
function extractYouTubeId(input: string): string | null {
  const trimmed = input.trim()
  const match = trimmed.match(/(?:youtube\.com\/watch\?v=|youtube\.com\/embed\/|youtube\.com\/shorts\/|youtu\.be\/)([a-zA-Z0-9_-]{11})/)
  if (match) return match[1]
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) return trimmed
  return null
}

export default function SeriesForm({ mode, initial }: SeriesFormProps) {
  const router = useRouter()
  const [id, setId] = useState(initial?.id ?? '')
  const [title, setTitle] = useState(initial?.title ?? '')
  const [topic, setTopic] = useState(initial?.topic ?? '')
  const [speaker, setSpeaker] = useState(initial?.speaker ?? '')
  const [description, setDescription] = useState(initial?.description ?? '')
  const [episodes, setEpisodes] = useState<EpisodeRow[]>(
    () => (initial?.episodes ?? []).map(ep => ({ uid: uid(), videoId: ep.id, title: ep.title, date: ep.date ?? '' }))
  )
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const episodesEndRef = useRef<HTMLDivElement>(null)

  function addEpisode() {
    setEpisodes(prev => [...prev, { uid: uid(), videoId: '', title: '', date: '' }])
    requestAnimationFrame(() => episodesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }))
  }

  function removeEpisode(u: string) {
    setEpisodes(prev => prev.filter(e => e.uid !== u))
  }

  function moveEpisode(u: string, dir: -1 | 1) {
    setEpisodes(prev => {
      const idx = prev.findIndex(e => e.uid === u)
      const target = idx + dir
      if (idx === -1 || target < 0 || target >= prev.length) return prev
      const next = [...prev]
      ;[next[idx], next[target]] = [next[target], next[idx]]
      return next
    })
  }

  function updateEpisode(u: string, field: keyof Omit<EpisodeRow, 'uid'>, value: string) {
    setEpisodes(prev => prev.map(e => e.uid === u ? { ...e, [field]: value } : e))
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')

    const payload = {
      id,
      title,
      topic,
      speaker: speaker.trim() || undefined,
      description,
      episodes: episodes.map(ep => ({
        videoId: ep.videoId,
        title: ep.title,
        date: ep.date.trim() || undefined,
      })),
    }

    setBusy(true)
    const res = mode === 'create'
      ? await fetch('/api/admin/series', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
      : await fetch(`/api/admin/series/${initial!.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
    setBusy(false)

    if (res.ok) {
      router.push('/admin/series')
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
        <span>Series ID {mode === 'edit' && '(cannot be changed)'}</span>
        <input
          value={id}
          onChange={e => setId(e.target.value.toLowerCase())}
          disabled={mode === 'edit'}
          placeholder="e.g. abrahamic-promise"
          required
        />
      </label>

      <label className="admin-field">
        <span>Title</span>
        <input value={title} onChange={e => setTitle(e.target.value)} required />
      </label>

      <div className="admin-field-row">
        <label className="admin-field">
          <span>Topic</span>
          <input value={topic} onChange={e => setTopic(e.target.value)} placeholder="e.g. Israel" required />
        </label>
        <label className="admin-field">
          <span>Speaker (optional)</span>
          <input value={speaker} onChange={e => setSpeaker(e.target.value)} />
        </label>
      </div>

      <label className="admin-field">
        <span>Description (optional)</span>
        <QuillEditor value={description} onChange={setDescription} placeholder="Describe this series…" />
      </label>

      <fieldset className="admin-field">
        <legend>Episodes</legend>
        <div className="admin-episodes">
          {episodes.length === 0 && (
            <p className="admin-wysiwyg-empty">No episodes yet. Add one below.</p>
          )}
          {episodes.map((ep, i) => {
            const previewId = extractYouTubeId(ep.videoId)
            return (
              <div key={ep.uid} className="admin-episode-row">
                <div className="admin-episode-head">
                  <span className="admin-episode-num">EP {i + 1}</span>
                  <div className="admin-block-actions">
                    <button type="button" onClick={() => moveEpisode(ep.uid, -1)} disabled={i === 0}>↑</button>
                    <button type="button" onClick={() => moveEpisode(ep.uid, 1)} disabled={i === episodes.length - 1}>↓</button>
                    <button type="button" className="admin-btn-danger-text" onClick={() => removeEpisode(ep.uid)}>Remove</button>
                  </div>
                </div>
                <div className="admin-episode-fields">
                  {previewId && (
                    <div className="admin-video-preview admin-episode-preview">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={`https://img.youtube.com/vi/${previewId}/default.jpg`} alt="Episode thumbnail preview" />
                    </div>
                  )}
                  <div className="admin-episode-inputs">
                    <input
                      value={ep.videoId}
                      onChange={e => updateEpisode(ep.uid, 'videoId', e.target.value)}
                      placeholder="YouTube URL or video ID"
                      required
                    />
                    <input
                      value={ep.title}
                      onChange={e => updateEpisode(ep.uid, 'title', e.target.value)}
                      placeholder="Episode title"
                      required
                    />
                    <input
                      value={ep.date}
                      onChange={e => updateEpisode(ep.uid, 'date', e.target.value)}
                      placeholder="Date (optional, e.g. May 2026)"
                    />
                  </div>
                </div>
              </div>
            )
          })}
          <div ref={episodesEndRef} />
        </div>
        <button type="button" className="admin-btn admin-btn-ghost" onClick={addEpisode}>+ Add Episode</button>
      </fieldset>

      <div className="admin-form-actions">
        <button type="submit" className="admin-btn admin-btn-primary" disabled={busy}>
          {busy ? 'Saving…' : mode === 'create' ? 'Create Series' : 'Save Changes'}
        </button>
      </div>
    </form>
  )
}
