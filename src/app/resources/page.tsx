import type { CSSProperties } from 'react'
import Link from 'next/link'
import { articles } from '@/data/articles'
import { videoCategories } from '@/data/videos'
import { books } from '@/data/books'

const cards = [
  {
    href: '/resources/video-teachings',
    symbol: '▶',
    accent: '#7E2A3C',
    title: 'Video Teachings',
    description:
      'Explore teachings from the Framework:ME YouTube channel, organized across 7 biblical topics — House of Prayer, End Times, Israel, Missions, Bride of Christ, Christian Living, and Theology.',
    badge: `${videoCategories.length} Categories`,
  },
  {
    href: '/resources/books',
    symbol: '✦',
    accent: '#4D1520',
    title: 'Books',
    description:
      'Illuminate and expand your understanding of God\'s plan for the nations with our recommended library of Christian books on prophecy, Israel, and missions.',
    badge: books.length ? `${books.length} Books` : null,
  },
  {
    href: '/resources/articles',
    symbol: '◉',
    accent: '#5C1E2C',
    title: 'Articles by Nation',
    description:
      'In-depth blog articles covering God\'s redemptive purposes for specific nations — from Israel to the Middle East and beyond. Select a nation flag to read its articles.',
    badge: articles.length ? `${articles.length} Article${articles.length !== 1 ? 's' : ''}` : null,
  },
  {
    href: '/resources/notes',
    symbol: '≡',
    accent: '#3D1018',
    title: 'Notes',
    description:
      'Downloadable study notes and sermon outlines for personal reflection, small group study, and deeper engagement with the biblical text.',
    badge: null,
  },
  {
    href: '/resources/shorts',
    symbol: '⚡',
    accent: '#6B1E2E',
    title: '1 Minute Shorts',
    description:
      'Quick one-minute teachings for daily encouragement and biblical insight — perfect for sharing and on-the-go discipleship.',
    badge: null,
  },
]

export const metadata = { title: 'Resources — Framework:ME' }

export default function ResourcesLanding() {
  return (
    <div className="res-landing">

      {/* ── Hero ── */}
      <div className="res-landing-hero">
        <div className="res-landing-hero-bg" />
        <div className="container res-landing-hero-inner">
          <p className="res-landing-eyebrow">Free &amp; Open to All</p>
          <h1 className="res-landing-title">Bible Teaching Resources</h1>
          <p className="res-landing-sub">
            A growing library of teachings, articles, books, and notes — freely available
            to prepare the global Church for the return of Christ.
          </p>
          <div className="res-landing-badge">
            <span className="res-badge-dot" />
            Teachings on Israel, the Middle East &amp; the Nations
          </div>
        </div>
      </div>

      {/* ── Card Grid ── */}
      <div className="res-landing-body">
        <div className="container">
          <div className="res-card-grid">
            {cards.map(card => (
              <Link key={card.href} href={card.href} className="res-card">
                {/* Visual area */}
                <div className="res-card-visual" style={{ '--card-accent': card.accent } as CSSProperties}>
                  <div className="res-card-pattern" />
                  <span className="res-card-symbol">{card.symbol}</span>
                  {card.badge && <span className="res-card-badge">{card.badge}</span>}
                </div>
                {/* Body */}
                <div className="res-card-body">
                  <h2 className="res-card-title">{card.title}</h2>
                  <p className="res-card-desc">{card.description}</p>
                  <span className="res-card-cta">
                    Explore {card.title}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
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
