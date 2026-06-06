'use client'
import Link from 'next/link'
import { videoCategories } from '@/data/videos'

function VideoCard({ id, title, date }: { id: string; title: string; date?: string }) {
  return (
    <Link href={`/resources/video-teachings/${id}`} className="ytv-card">
      {/* Full-bleed thumbnail */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`}
        alt={title}
        className="ytv-card-img"
        loading="lazy"
      />

      {/* Dark gradient overlay */}
      <div className="ytv-card-overlay" />

      {/* Play icon — center */}
      <div className="ytv-card-play">
        <svg viewBox="0 0 24 24" width="40" height="40">
          <path d="M8 5v14l11-7z" fill="white"/>
        </svg>
      </div>

      {/* Title + date — bottom */}
      <div className="ytv-card-info">
        <p className="ytv-card-title">{title}</p>
        {date && <p className="ytv-card-date">{date}</p>}
      </div>
    </Link>
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
            <span className="ytv-section-count">{cat.videos.length}</span>
          </div>
          <div className="ytv-grid">
            {cat.videos.map(v => (
              <VideoCard key={v.id} id={v.id} title={v.title} date={v.date} />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
