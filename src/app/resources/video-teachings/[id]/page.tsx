import Link from 'next/link'
import { notFound } from 'next/navigation'
import { videoCategories } from '@/data/videos'
import type { Video, VideoCategory } from '@/types'

export function generateStaticParams() {
  return videoCategories.flatMap(cat =>
    cat.videos.map(v => ({ id: v.id }))
  )
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  for (const cat of videoCategories) {
    const video = cat.videos.find(v => v.id === params.id)
    if (video) return { title: `${video.title} — Framework:ME` }
  }
  return { title: 'Video — Framework:ME' }
}

function findVideo(id: string): { video: Video; cat: VideoCategory } | null {
  for (const cat of videoCategories) {
    const video = cat.videos.find(v => v.id === id)
    if (video) return { video, cat }
  }
  return null
}

export default function VideoDetailPage({ params }: { params: { id: string } }) {
  const found = findVideo(params.id)
  if (!found) return notFound()

  const { video, cat } = found
  const related = cat.videos.filter(v => v.id !== params.id).slice(0, 3)

  return (
    <div className="vd-page">

      {/* ── Dark hero — title + breadcrumb ── */}
      <div className="vd-hero">
        <div className="vd-hero-inner">
          <Link href="/resources/video-teachings" className="vd-back">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
            Video Teachings
          </Link>
          <p className="vd-series-label">{cat.icon} {cat.label}</p>
          <h1 className="vd-hero-title">{video.title}</h1>
          <p className="vd-hero-meta">Framework:ME{video.date ? ` · ${video.date}` : ''}</p>
        </div>
      </div>

      {/* ── Full-width video player on black ── */}
      <div className="vd-player-wrap">
        <div className="vd-player-inner">
          <iframe
            src={`https://www.youtube.com/embed/${video.id}?rel=0&modestbranding=1`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>

      {/* ── White content area — tags ── */}
      <div className="vd-body">
        <div className="vd-body-inner">
          <div className="vd-tag-row">
            <span className="vd-tag">{cat.icon} {cat.label}</span>
            <span className="vd-tag">Bible Teaching</span>
          </div>
        </div>
      </div>

      {/* ── Other videos ── */}
      {related.length > 0 && (
        <div className="vd-more">
          <div className="vd-more-inner">
            <h2 className="vd-more-title">More from {cat.label}</h2>
            <div className="vd-more-grid">
              {related.map(v => (
                <Link key={v.id} href={`/resources/video-teachings/${v.id}`} className="vd-more-card">
                  <div className="vd-more-thumb">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`https://img.youtube.com/vi/${v.id}/hqdefault.jpg`} alt={v.title} loading="lazy" />
                    <div className="vd-more-play">
                      <svg viewBox="0 0 24 24" width="32" height="32">
                        <path d="M8 5v14l11-7z" fill="white"/>
                      </svg>
                    </div>
                  </div>
                  <div className="vd-more-info">
                    <p className="vd-more-cat">{cat.label}</p>
                    <p className="vd-more-name">{v.title}</p>
                    {v.date && <p className="vd-more-date">{v.date}</p>}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
