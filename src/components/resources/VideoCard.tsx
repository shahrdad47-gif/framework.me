'use client'
import { useState } from 'react'

interface Props {
  id: string
  title: string
  date?: string
}

export default function VideoCard({ id, title, date }: Props) {
  const [playing, setPlaying] = useState(false)

  return (
    <div className="video-card">
      <div className="video-thumb" onClick={() => setPlaying(true)}>
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
            <img
              src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`}
              alt={title}
              loading="lazy"
            />
            <div className="play-overlay">
              <div className="play-btn">
                <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" fill="white"/></svg>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="video-info">
        <div className="video-title">{title}</div>
        {date && <div className="video-meta">{date}</div>}
      </div>
    </div>
  )
}
