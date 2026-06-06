'use client'
import { useState } from 'react'
import { videoCategories } from '@/data/videos'

function VideoCard({ id, title, date }: { id: string; title: string; date?: string }) {
  const [playing, setPlaying] = useState(false)

  return (
    <div className="ytv-card" onClick={() => !playing && setPlaying(true)}>
      <div className="ytv-thumb">
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
            <div className="ytv-play-btn">
              <svg viewBox="0 0 24 24" width="36" height="36">
                <path d="M8 5v14l11-7z" fill="white"/>
              </svg>
            </div>
          </>
        )}
      </div>
      <div className="ytv-info">
        <p className="ytv-title">{title}</p>
        {date && <p className="ytv-date">{date}</p>}
      </div>
    </div>
  )
}

export default function VideoTeachings() {
  return (
    <div className="ytv-page">
      {videoCategories.map(cat => (
        <section key={cat.id} className="ytv-section">
          <div className="ytv-section-head">
            <span className="ytv-section-icon">{cat.icon}</span>
            <h2 className="ytv-section-label">{cat.label}</h2>
            <span className="ytv-section-count">{cat.videos.length} video{cat.videos.length !== 1 ? 's' : ''}</span>
          </div>
          {cat.description && <p className="ytv-section-desc">{cat.description}</p>}
          <div className="ytv-row">
            {cat.videos.map(v => (
              <VideoCard key={v.id} id={v.id} title={v.title} date={v.date} />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
