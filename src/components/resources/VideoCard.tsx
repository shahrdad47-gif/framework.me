'use client'
import { useState } from 'react'

interface Props {
  id: string
  title: string
  date?: string
  categoryLabel: string
  categoryIcon: string
}

export default function VideoCard({ id, title, date, categoryLabel, categoryIcon }: Props) {
  const [playing, setPlaying] = useState(false)

  return (
    <div className="vt-card">
      <div className="vt-thumb" onClick={() => setPlaying(true)}>
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
            <div className="vt-play-overlay">
              <div className="vt-play-btn">
                <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" fill="white"/></svg>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="vt-card-body">
        <span className="vt-series">{categoryIcon} {categoryLabel}</span>
        <h3 className="vt-title">{title}</h3>
        <div className="vt-card-footer">
          <span className="vt-tag">{categoryLabel}</span>
          {date && <span className="vt-date">{date}</span>}
        </div>
      </div>
    </div>
  )
}
