import Link from 'next/link'
import { notFound } from 'next/navigation'
import { shortsData } from '@/data/videos'
import { getShorts } from '@/lib/db'

export function generateStaticParams() {
  return shortsData.map(s => ({ id: s.id }))
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const shorts = await getShorts()
  const short = shorts.find(s => s.id === params.id)
  if (short) return { title: `${short.title} — Framework:ME` }
  return { title: 'Short — Framework:ME' }
}

export default async function ShortDetailPage({ params }: { params: { id: string } }) {
  const shorts = await getShorts()
  const index = shorts.findIndex(s => s.id === params.id)
  if (index === -1) return notFound()

  const short = shorts[index]
  const prev = index > 0 ? shorts[index - 1] : null
  const next = index < shorts.length - 1 ? shorts[index + 1] : null
  const related = shorts.filter(s => s.id !== params.id).slice(0, 10)

  return (
    <div className="vd-page">
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
                <Link href={`/resources/shorts/${prev.id}`} className="vd-nav-btn">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="15 18 9 12 15 6"/>
                  </svg>
                  Prev
                </Link>
              ) : (
                <span className="vd-nav-btn vd-nav-off">Prev</span>
              )}

              <Link href="/resources/shorts" className="vd-nav-all">
                All Shorts
              </Link>

              {next ? (
                <Link href={`/resources/shorts/${next.id}`} className="vd-nav-btn">
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

          <div className="vd-breadcrumb">
            <Link href="/resources/shorts" className="vd-bc-link">1 Minute Shorts</Link>
            <span className="vd-bc-sep">›</span>
            <span className="vd-bc-cur">Short</span>
          </div>

          <h1 className="vd-title">{short.title}</h1>

          <div className="vd-meta-row">
            <span className="vd-meta-cat">1 Minute Short</span>
            <span className="vd-meta-tag">Bible Teaching</span>
          </div>

          {short.description ? (
            <div className="vd-desc article-rich-body" dangerouslySetInnerHTML={{ __html: short.description }} />
          ) : (
            <p className="vd-desc">
              A quick one-minute teaching from Framework:ME — bite-sized biblical insight, perfect for daily encouragement and sharing.
            </p>
          )}

          {related.length > 0 && (
            <div className="vd-related">
              <h3 className="vd-related-heading">More Shorts</h3>
              <div className="vd-related-list">
                {related.map(s => (
                  <Link key={s.id} href={`/resources/shorts/${s.id}`} className="vd-related-item">
                    <div className="vd-related-thumb">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={`https://img.youtube.com/vi/${s.id}/hqdefault.jpg`} alt={s.title} loading="lazy" />
                      <div className="vd-related-play">
                        <svg viewBox="0 0 24 24" width="14" height="14"><path d="M8 5v14l11-7z" fill="white"/></svg>
                      </div>
                    </div>
                    <div className="vd-related-info">
                      <p className="vd-related-title">{s.title}</p>
                      <p className="vd-related-date">1 Minute Short</p>
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
