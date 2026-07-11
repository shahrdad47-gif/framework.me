import Link from 'next/link'
import type { Video, VideoCategory } from '@/types'

export interface VideoDetailStrings {
  breadcrumbRoot: string
  allVideos: string
  prev: string
  next: string
  bibleTeaching: string
  moreFrom: string
  notesTitle: string
  notesSub: string
  downloadPdf: string
}

interface VideoDetailViewProps {
  video: Video
  category: VideoCategory
  prev: Video | null
  next: Video | null
  related: Video[]
  hrefBase?: string
  dir?: 'ltr' | 'rtl'
  t: VideoDetailStrings
}

export default function VideoDetailView({ video, category: cat, prev, next, related, hrefBase = '', dir, t }: VideoDetailViewProps) {
  return (
    <div className="vd-page" dir={dir}>
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
                <Link href={`${hrefBase}/resources/video-teachings/${prev.id}`} className="vd-nav-btn">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="15 18 9 12 15 6"/>
                  </svg>
                  {t.prev}
                </Link>
              ) : (
                <span className="vd-nav-btn vd-nav-off">{t.prev}</span>
              )}

              <Link href={`${hrefBase}/resources/video-teachings`} className="vd-nav-all">
                {t.allVideos}
              </Link>

              {next ? (
                <Link href={`${hrefBase}/resources/video-teachings/${next.id}`} className="vd-nav-btn">
                  {t.next}
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="9 18 15 12 9 6"/>
                  </svg>
                </Link>
              ) : (
                <span className="vd-nav-btn vd-nav-off">{t.next}</span>
              )}
            </div>
          </div>
        </div>

        {/* ── RIGHT: info panel ── */}
        <div className="vd-right">

          {/* Breadcrumb */}
          <div className="vd-breadcrumb">
            <Link href={`${hrefBase}/resources/video-teachings`} className="vd-bc-link">{t.breadcrumbRoot}</Link>
            <span className="vd-bc-sep">›</span>
            <span className="vd-bc-cur">{cat.label}</span>
          </div>

          {/* Title */}
          <h1 className="vd-title">{video.title}</h1>

          {/* Meta row */}
          <div className="vd-meta-row">
            <span className="vd-meta-cat">{cat.label}</span>
            {video.date && <span className="vd-meta-date">{video.date}</span>}
            <span className="vd-meta-tag">{t.bibleTeaching}</span>
          </div>

          {/* Description */}
          {video.description && (
            <div className="vd-desc article-rich-body" dangerouslySetInnerHTML={{ __html: video.description }} />
          )}
          {cat.description && <p className="vd-desc">{cat.description}</p>}

          {/* Notes */}
          {video.notes && (
            <div className="vd-notes-box vd-notes-box-light">
              <div className="vd-notes-info">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                </svg>
                <div className="vd-notes-info-text">
                  <span className="vd-notes-title">{t.notesTitle}</span>
                  <span className="vd-notes-sub">{t.notesSub}</span>
                </div>
              </div>
              <a href={video.notes} target="_blank" rel="noopener noreferrer" className="vd-notes-btn">
                {t.downloadPdf}
              </a>
            </div>
          )}

          {/* Related */}
          {related.length > 0 && (
            <div className="vd-related">
              <h3 className="vd-related-heading">{t.moreFrom} {cat.label}</h3>
              <div className="vd-related-list">
                {related.map(v => (
                  <Link key={v.id} href={`${hrefBase}/resources/video-teachings/${v.id}`} className="vd-related-item">
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
