import Link from 'next/link'
import { shortsData } from '@/data/videos'

export const metadata = { title: '1 Minute Shorts — Framework:ME' }

export default function ShortsPage() {
  return (
    <div className="res-sub-page">
      <div className="res-sub-hero">
        <div className="res-sub-hero-bg" />
        <div className="container res-sub-hero-inner">
          <Link href="/resources" className="res-sub-back">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
            All Resources
          </Link>
          <span className="res-sub-eyebrow">Framework:ME Resources</span>
          <h1>1 Minute Shorts</h1>
          <p>Quick one-minute teachings for daily encouragement — perfect for sharing.</p>
        </div>
      </div>
      <div className="container res-sub-body">
        <div className="shorts-grid">
          {shortsData.map(s => (
            <Link key={s.id} href={`/resources/shorts/${s.id}`} className="short-card">
              <div className="short-thumb">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`https://img.youtube.com/vi/${s.id}/hqdefault.jpg`} alt={s.title} loading="lazy" />
                <div className="short-play-overlay">
                  <div className="short-play-btn">
                    <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" fill="white"/></svg>
                  </div>
                </div>
              </div>
              <p className="short-title">{s.title}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
