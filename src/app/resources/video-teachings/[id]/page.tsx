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

function findVideo(id: string): { video: Video; cat: VideoCategory; index: number } | null {
  for (const cat of videoCategories) {
    const index = cat.videos.findIndex(v => v.id === id)
    if (index !== -1) return { video: cat.videos[index], cat, index }
  }
  return null
}

export default function VideoDetailPage({ params }: { params: { id: string } }) {
  const found = findVideo(params.id)
  if (!found) return notFound()

  const { video, cat, index } = found
  const prev = index > 0 ? cat.videos[index - 1] : null
  const next = index < cat.videos.length - 1 ? cat.videos[index + 1] : null
  const related = cat.videos.filter(v => v.id !== params.id)

  return (
    <div className="vd-page">
      <div className="vd-layout">

        {/* ── LEFT: player + nav ── */}
        <div className="vd-left">
          <div className="vd-left-sticky">
            <div className="vd-player-ratio">
              <iframe
                src={`https://www.youtube.com/embed/${video.id}?rel=0&modestbranding=1`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="vd-nav-row">
              {prev ? (
                <Link href={`/resources/video-teachings/${prev.id}`} className="vd-nav-btn">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="15 18 9 12 15 6"/>
                  </svg>
                  Prev
                </Link>
              ) : (
                <span className="vd-nav-btn vd-nav-off">Prev</span>
              )}

              <Link href="/resources/video-teachings" className="vd-nav-all">
                All Videos
              </Link>

              {next ? (
                <Link href={`/resources/video-teachings/${next.id}`} className="vd-nav-btn">
                  Next
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="9 18 15 12 9 6"/>
                  </svg>
                </Link>
              ) : (
                <span className="vd-nav-btn vd-nav-off">Next</span>
              )}
            </div>
          </div>
        </div>

        {/* ── RIGHT: info panel ── */}
        <div className="vd-right">

          {/* Breadcrumb */}
          <div className="vd-breadcrumb">
            <Link href="/resources/video-teachings" className="vd-bc-link">Video Teachings</Link>
            <span className="vd-bc-sep">›</span>
            <span className="vd-bc-cur">{cat.label}</span>
          </div>

          {/* Title */}
          <h1 className="vd-title">{video.title}</h1>

          {/* Meta row */}
          <div className="vd-meta-row">
            <span className="vd-meta-cat">{cat.label}</span>
            {video.date && <span className="vd-meta-date">{video.date}</span>}
            <span className="vd-meta-tag">Bible Teaching</span>
          </div>

          {/* Description */}
          {cat.description && <p className="vd-desc">{cat.description}</p>}

          {/* Related */}
          {related.length > 0 && (
            <div className="vd-related">
              <h3 className="vd-related-heading">More from {cat.label}</h3>
              <div className="vd-related-list">
                {related.map(v => (
                  <Link key={v.id} href={`/resources/video-teachings/${v.id}`} className="vd-related-item">
                    <div className="vd-related-thumb">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={`https://img.youtube.com/vi/${v.id}/hqdefault.jpg`} alt={v.title} loading="lazy" />
                      <div className="vd-related-play">
                        <svg viewBox="0 0 24 24" width="14" height="14"><path d="M8 5v14l11-7z" fill="white"/></svg>
                      </div>
                    </div>
                    <div className="vd-related-info">
                      <p className="vd-related-title">{v.title}</p>
                      {v.date && <p className="vd-related-date">{v.date}</p>}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
