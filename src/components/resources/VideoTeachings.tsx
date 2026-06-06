'use client'
import { useState } from 'react'
import { videoCategories } from '@/data/videos'
import type { VideoCategory } from '@/types'

/* ── Video card inside a category ── */
function VideoCard({ id, title, date }: { id: string; title: string; date?: string }) {
  const [playing, setPlaying] = useState(false)
  return (
    <div className="vtv-card" onClick={() => !playing && setPlaying(true)}>
      <div className="vtv-thumb">
        {playing ? (
          <iframe
            src={`https://www.youtube.com/embed/${id}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`} alt={title} loading="lazy" />
            <div className="vtv-play">
              <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" fill="white"/></svg>
            </div>
          </>
        )}
      </div>
      <div className="vtv-info">
        <p className="vtv-title">{title}</p>
        {date && <p className="vtv-date">{date}</p>}
      </div>
    </div>
  )
}

/* ── Category detail view ── */
function CategoryDetail({ cat, onBack }: { cat: VideoCategory; onBack: () => void }) {
  return (
    <div className="vtd-wrap">
      <button className="vtd-back" onClick={onBack}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="15 18 9 12 15 6"/>
        </svg>
        All Categories
      </button>
      <div className="vtd-header">
        <span>{cat.icon}</span>
        <h2>{cat.label}</h2>
        <span className="vtd-count">{cat.videos.length} video{cat.videos.length !== 1 ? 's' : ''}</span>
      </div>
      {cat.description && <p className="vtd-desc">{cat.description}</p>}
      <div className="vtd-grid">
        {cat.videos.map(v => (
          <VideoCard key={v.id} id={v.id} title={v.title} date={v.date} />
        ))}
      </div>
    </div>
  )
}

/* ── Category grid — side by side, dark background ── */
export default function VideoTeachings() {
  const [selected, setSelected] = useState<VideoCategory | null>(null)

  if (selected) {
    return <CategoryDetail cat={selected} onBack={() => setSelected(null)} />
  }

  return (
    <div className="vtcat-page">
      <div className="vtcat-grid">
        {videoCategories.map(cat => {
          const thumb = cat.videos[0]?.id
          return (
            <button key={cat.id} className="vtcat-card" onClick={() => setSelected(cat)}>
              {thumb && (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={`https://img.youtube.com/vi/${thumb}/hqdefault.jpg`}
                  alt={cat.label}
                  className="vtcat-bg"
                />
              )}
              <div className="vtcat-overlay">
                <span className="vtcat-icon">{cat.icon}</span>
                <h3 className="vtcat-name">{cat.label}</h3>
                {cat.description && <p className="vtcat-desc">{cat.description}</p>}
                <span className="vtcat-count">{cat.videos.length} video{cat.videos.length !== 1 ? 's' : ''}</span>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
