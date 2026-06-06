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
  const related = cat.videos.filter(v => v.id !== params.id).slice(0, 6)

  return (
    <div className="vd-page">

      {/* Back breadcrumb */}
      <div className="vd-breadcrumb">
        <Link href="/resources/video-teachings" className="vd-back">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
          Video Teachings
        </Link>
        <span className="vd-breadcrumb-sep">/</span>
        <span className="vd-breadcrumb-current">{cat.label}</span>
      </div>

      {/* Main layout: player + sidebar */}
      <div className="vd-layout">

        {/* Left: player + info */}
        <div className="vd-main">
          <div className="vd-player">
            <iframe
              src={`https://www.youtube.com/embed/${video.id}?rel=0&modestbranding=1`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          <div className="vd-info">
            <div className="vd-tags">
              <span className="vd-tag">{cat.icon} {cat.label}</span>
              {video.date && <span className="vd-tag vd-tag-date">{video.date}</span>}
            </div>
            <h1 className="vd-title">{video.title}</h1>
            <p className="vd-channel">Framework:ME</p>
          </div>
        </div>

        {/* Right: related videos */}
        {related.length > 0 && (
          <aside className="vd-sidebar">
            <p className="vd-sidebar-label">More from {cat.label}</p>
            <div className="vd-related-list">
              {related.map(v => (
                <Link key={v.id} href={`/resources/video-teachings/${v.id}`} className="vd-rel-card">
                  <div className="vd-rel-thumb">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`https://img.youtube.com/vi/${v.id}/mqdefault.jpg`} alt={v.title} />
                  </div>
                  <div className="vd-rel-info">
                    <p className="vd-rel-title">{v.title}</p>
                    {v.date && <p className="vd-rel-date">{v.date}</p>}
                  </div>
                </Link>
              ))}
            </div>
          </aside>
        )}
      </div>

    </div>
  )
}
