import type { CSSProperties } from 'react'
import Link from 'next/link'
import type { LangT, Locale } from '@/data/translations'
import { videoCategories } from '@/data/videos'
import { videoSeriesData } from '@/data/series'
import { articles } from '@/data/articles'
import { books } from '@/data/books'

const symbols = ['▶', '◈', '✦', '◉', '≡', '⚡']
const accents = ['#7E2A3C', '#5A1229', '#4D1520', '#5C1E2C', '#3D1018', '#6B1E2E']

function getHrefs(locale: Locale) {
  const base = `/${locale}/resources`
  return [
    `${base}/video-teachings`,
    `${base}/series`,
    `${base}/books`,
    `/${locale}/articles`,
    `${base}/notes`,
    `${base}/shorts`,
  ]
}
const badges = [
  `${videoCategories.length} Categories`,
  `${videoSeriesData.length} Series`,
  books.length ? `${books.length} Books` : null,
  articles.length ? `${articles.length} Articles` : null,
  null,
  null,
]

export default function LangResourcesPage({ t, locale }: { t: LangT; locale: Locale }) {
  const s = t.sections.resources
  const isRtl = t.dir === 'rtl'
  const hrefs = getHrefs(locale)
  return (
    <div className="res-landing" dir={t.dir}>

      <div className="res-landing-hero">
        <div className="res-landing-hero-bg" />
        <div className="container res-landing-hero-inner">
          <p className="res-landing-eyebrow">{s.eyebrow}</p>
          <h1 className="res-landing-title">{s.title}</h1>
          <p className="res-landing-sub">{s.sub}</p>
          <div className="res-landing-badge">
            <span className="res-badge-dot" />
            {s.badge}
          </div>
        </div>
      </div>

      <div className="res-landing-body">
        <div className="container">
          <div className="res-card-grid">
            {s.cards.map((card, i) => (
              <Link key={hrefs[i]} href={hrefs[i]} className="res-card">
                <div className="res-card-visual" style={{ '--card-accent': accents[i] } as CSSProperties}>
                  <div className="res-card-pattern" />
                  <span className="res-card-symbol">{symbols[i]}</span>
                  {badges[i] && <span className="res-card-badge">{badges[i]}</span>}
                </div>
                <div className="res-card-body">
                  <h2 className="res-card-title">{card.title}</h2>
                  <p className="res-card-desc">{card.desc}</p>
                  <span className="res-card-cta">
                    {card.cta}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                      style={isRtl ? { transform: 'scaleX(-1)' } : undefined}>
                      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}
