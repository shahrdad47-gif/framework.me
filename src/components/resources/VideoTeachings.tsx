'use client'
import Link from 'next/link'
import { videoCategories } from '@/data/videos'

function VideoCard({ id, title, date }: { id: string; title: string; date?: string }) {
  return (
    <Link href={`/resources/video-teachings/${id}`} className="ytv-card">
      <div className="ytv-thumb">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`} alt={title} loading="lazy" />
        <div className="ytv-overlay">
          <div className="ytv-play-btn">
            <svg viewBox="0 0 24 24" width="28" height="28">
              <path d="M8 5v14l11-7z" fill="white"/>
            </svg>
          </div>
        </div>
      </div>
      <div className="ytv-info">
        <p className="ytv-title">{title}</p>
        {date && <p className="ytv-date">{date}</p>}
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
