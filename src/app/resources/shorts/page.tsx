import Link from 'next/link'
import BackButton from '@/components/ui/BackButton'
import { getShorts } from '@/lib/db'

export const dynamic = 'force-dynamic'
export const metadata = { title: '1 Minute Shorts — Framework:ME' }

export default async function ShortsPage() {
  const shorts = await getShorts()

  return (
    <div className="res-sub-page">
      <div className="res-sub-hero">
        <div className="res-sub-hero-bg" />
        <div className="container res-sub-hero-inner">
          <BackButton fallbackHref="/resources" label={"All Resources"} className="res-sub-back" />
          <span className="res-sub-eyebrow">Framework:ME Resources</span>
          <h1>1 Minute Shorts</h1>
          <p>Quick one-minute teachings for daily encouragement — perfect for sharing.</p>
        </div>
      </div>
      <div className="container res-sub-body">
        <div className="shorts-grid">
          {shorts.map(s => (
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
