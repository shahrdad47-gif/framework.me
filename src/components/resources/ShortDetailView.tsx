import Link from 'next/link'
import type { Short } from '@/types'

export interface ShortDetailStrings {
  breadcrumbRoot: string
  allShorts: string
  prev: string
  next: string
  bibleTeaching: string
  oneMinuteShort: string
  moreShorts: string
  defaultDesc: string
  notesTitle: string
  notesSub: string
  downloadPdf: string
}

interface ShortDetailViewProps {
  short: Short
  prev: Short | null
  next: Short | null
  related: Short[]
  hrefBase?: string
  dir?: 'ltr' | 'rtl'
  t: ShortDetailStrings
}

export default function ShortDetailView({ short, prev, next, related, hrefBase = '', dir, t }: ShortDetailViewProps) {
  return (
    <div className="vd-page" dir={dir}>
      <div className="vd-layout vd-layout-short">

        {/* ── LEFT: portrait player + nav ── */}
        <div className="vd-left">
          <div className="vd-left-sticky">
            <div className="vd-player-ratio vd-player-portrait">
              <iframe
                src={`https://www.youtube.com/embed/${short.id}?rel=0&modestbranding=1`}
                title={short.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="vd-nav-row">
              {prev ? (
                <Link href={`${hrefBase}/resources/shorts/${prev.id}`} className="vd-nav-btn">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="15 18 9 12 15 6"/>
                  </svg>
                  {t.prev}
                </Link>
              ) : (
                <span className="vd-nav-btn vd-nav-off">{t.prev}</span>
              )}

              <Link href={`${hrefBase}/resources/shorts`} className="vd-nav-all">
                {t.allShorts}
              </Link>

              {next ? (
                <Link href={`${hrefBase}/resources/shorts/${next.id}`} className="vd-nav-btn">
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

          <div className="vd-breadcrumb">
            <Link href={`${hrefBase}/resources/shorts`} className="vd-bc-link">{t.breadcrumbRoot}</Link>
            <span className="vd-bc-sep">›</span>
            <span className="vd-bc-cur">{t.oneMinuteShort}</span>
          </div>

          <h1 className="vd-title">{short.title}</h1>

          <div className="vd-meta-row">
            <span className="vd-meta-cat">{t.oneMinuteShort}</span>
            <span className="vd-meta-tag">{t.bibleTeaching}</span>
          </div>

          {short.description ? (
            <div className="vd-desc article-rich-body" dangerouslySetInnerHTML={{ __html: short.description }} />
          ) : (
            <p className="vd-desc">{t.defaultDesc}</p>
          )}

          {short.notes && (
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
              <a href={short.notes} target="_blank" rel="noopener noreferrer" className="vd-notes-btn">
                {t.downloadPdf}
              </a>
            </div>
          )}

          {related.length > 0 && (
            <div className="vd-related">
              <h3 className="vd-related-heading">{t.moreShorts}</h3>
              <div className="vd-related-list">
                {related.map(s => (
                  <Link key={s.id} href={`${hrefBase}/resources/shorts/${s.id}`} className="vd-related-item">
                    <div className="vd-related-thumb">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={`https://img.youtube.com/vi/${s.id}/hqdefault.jpg`} alt={s.title} loading="lazy" />
                      <div className="vd-related-play">
                        <svg viewBox="0 0 24 24" width="14" height="14"><path d="M8 5v14l11-7z" fill="white"/></svg>
                      </div>
                    </div>
                    <div className="vd-related-info">
                      <p className="vd-related-title">{s.title}</p>
                      <p className="vd-related-date">{t.oneMinuteShort}</p>
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
