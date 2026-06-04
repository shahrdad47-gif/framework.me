'use client'
import Link from 'next/link'
import { useState } from 'react'
import { shortsData } from '@/data/videos'

function ShortCard({ id, title }: { id: string; title: string }) {
  const [playing, setPlaying] = useState(false)
  return (
    <div className="short-card">
      <div className="short-thumb" onClick={() => setPlaying(true)}>
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
            <div className="short-play-overlay">
              <div className="short-play-btn">
                <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" fill="white"/></svg>
              </div>
            </div>
          </>
        )}
      </div>
      <p className="short-title">{title}</p>
    </div>
  )
}

export default function ShortsPage() {
  return (
    <div className="res-sub-page">
      <div className="res-sub-hero">
        <div className="container">
          <Link href="/resources" className="res-sub-back">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
            All Resources
          </Link>
          <h1>1 Minute Shorts</h1>
          <p>Quick one-minute teachings for daily encouragement — perfect for sharing.</p>
        </div>
      </div>
      <div className="container res-sub-body">
        <div className="shorts-grid">
          {shortsData.map(s => (
            <ShortCard key={s.id} id={s.id} title={s.title} />
          ))}
        </div>
      </div>
    </div>
  )
}
