'use client'
import { useState } from 'react'
import { videoCategories } from '@/data/videos'

function VideoRowCard({ id, title, date }: { id: string; title: string; date?: string }) {
  const [playing, setPlaying] = useState(false)

  return (
    <div className="vrow-card" onClick={() => !playing && setPlaying(true)}>
      <div className="vrow-thumb">
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
            <div className="vrow-play">
              <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" fill="white"/></svg>
            </div>
          </>
        )}
      </div>
      <div className="vrow-info">
        <p className="vrow-title">{title}</p>
        {date && <p className="vrow-date">{date}</p>}
      </div>
    </div>
  )
}

export default function VideoTeachings() {
  return (
    <div className="vt-platform">
      {videoCategories.map(cat => (
        <section key={cat.id} className="vrow-section">
          <div className="vrow-header">
            <span className="vrow-icon">{cat.icon}</span>
            <h2 className="vrow-title-section">{cat.label}</h2>
            <span className="vrow-count">{cat.videos.length} video{cat.videos.length !== 1 ? 's' : ''}</span>
          </div>
          <div className="vrow-scroll">
            {cat.videos.map(v => (
              <VideoRowCard key={v.id} id={v.id} title={v.title} date={v.date} />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
