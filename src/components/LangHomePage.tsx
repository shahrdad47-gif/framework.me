import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { LangT, Locale } from '@/data/translations'

/* ── SVG icon components (same as FrameworkSection) ─────────────────── */
const ChurchIcon = () => (
  <svg width="44" height="44" viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="22" y2="11"/>
    <line x1="17" y1="6.5" x2="27" y2="6.5"/>
    <polyline points="4,22 22,8 40,22"/>
    <rect x="4" y="22" width="36" height="20"/>
    <rect x="16" y="30" width="12" height="12"/>
  </svg>
)
const IsraelIcon = () => (
  <svg width="44" height="44" viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="22,4 34,24 10,24"/>
    <polygon points="22,40 10,20 34,20"/>
  </svg>
)
const MissionsIcon = () => (
  <svg width="44" height="44" viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="22" cy="10" r="4"/>
    <path d="M14 30v-6a8 8 0 0 1 16 0v6"/>
    <circle cx="8" cy="14" r="3"/>
    <path d="M2 30v-4a6 6 0 0 1 9.5-4.9"/>
    <circle cx="36" cy="14" r="3"/>
    <path d="M42 30v-4a6 6 0 0 0-9.5-4.9"/>
    <path d="M4 42h36"/>
  </svg>
)
const EndTimesIcon = () => (
  <svg width="44" height="44" viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 4h24M10 40h24"/>
    <path d="M13 4c0 10 18 14 18 18S13 30 13 40"/>
    <path d="M31 4c0 10-18 14-18 18s18 10 18 18"/>
    <line x1="10" y1="22" x2="34" y2="22"/>
  </svg>
)
const HousePrayerIcon = () => (
  <svg width="44" height="44" viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="4,22 22,6 40,22"/>
    <path d="M8 22v18h28V22"/>
    <line x1="22" y1="13" x2="22" y2="21"/>
    <line x1="18" y1="17" x2="26" y2="17"/>
    <rect x="17" y="30" width="10" height="10"/>
  </svg>
)

const icons = [ChurchIcon, IsraelIcon, MissionsIcon, EndTimesIcon, HousePrayerIcon]

/* ─────────────────────────────────────────────────────────────────────── */

export default function LangHomePage({ t, locale }: { t: LangT; locale: Locale }) {
  const isRtl = t.dir === 'rtl'

  return (
    <div dir={t.dir}>

      {/* ── HERO ── */}
      <div className="hero">
        <div className="hero-bg" />
        <div className="hero-content">
          <p className="hero-eyebrow">{t.hero.eyebrow}</p>
          <h1 className="hero-title" style={{ fontStyle: 'normal' }}>{t.hero.title}</h1>
          <p className="hero-sub">{t.hero.sub}</p>
          <div className="hero-divider" />
          <div className="hero-actions">
            <Link href={`/${locale}/resources`} className="btn-give">{t.hero.cta}</Link>
            <a
              href="https://www.youtube.com/@frameworkme-earth"
              target="_blank" rel="noopener noreferrer"
              className="btn-ghost-light"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              {t.hero.youtube}
            </a>
          </div>
        </div>
        <div className="hero-scroll-hint">
          <span>↓</span>
          <div className="scroll-line" />
        </div>
      </div>

      {/* ── SCRIPTURE BANNER ── */}
      <div className="scripture-banner">
        <div className="container">
          <blockquote>
            {t.scripture.verse}
            <cite>{t.scripture.ref}</cite>
          </blockquote>
        </div>
      </div>

      {/* ── ABOUT ── */}
      <div className="about-body">
        <div className="container">
          <div className="about-grid">

            <div className="about-text">
              <h2 className="section-heading">{t.about.heading}</h2>
              <div className="gold-rule" />
              <p>{t.about.body1}</p>
              <p>{t.about.body2}</p>
              <p className="italic-note">{t.about.body3}</p>
            </div>

            <div className="about-card-box">
              <div className="mission-card">
                <div className="mc-icon">✝</div>
                <h3>{t.about.missionTitle}</h3>
                <p>{t.about.missionBody}</p>
              </div>
              <div className="mission-card">
                <div className="mc-icon">✡</div>
                <h3>{t.about.focusTitle}</h3>
                <p>{t.about.focusBody}</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── FRAMEWORK ── */}
      <div className="framework-section">
        <div className="container">

          <div className="framework-intro">
            <h2 className="section-heading centered">{t.framework.heading}</h2>
            <div className="gold-rule centered" />
            <p className="framework-lead">{t.framework.lead}</p>
            <p className="framework-sub">{t.framework.sub}</p>
          </div>

          <div className="diagram-wrap">
            <Image
              src="/images/framework-diagram.png"
              alt="Framework Diagram"
              width={540}
              height={440}
              className="diagram-img"
            />
          </div>

          <div className="expressions-grid">
            {t.framework.expressions.map(({ num, title, sub, body }, i) => {
              const Icon = icons[i] ?? ChurchIcon
              return (
                <div key={num} className="expr-card">
                  <div className="expr-number">{num}</div>
                  <div className="expr-icon"><Icon /></div>
                  <h3>{title}</h3>
                  <span className="expr-sub">{sub}</span>
                  <p>{body}</p>
                </div>
              )
            })}
          </div>

        </div>
      </div>

      {/* ── GIVE ── */}
      <section className="give-section">
        <div className="give-bg" />
        <div className="container give-inner">

          <div className="give-text-col">
            <p className="give-eyebrow">{t.give.eyebrow}</p>
            <h2 className="give-title">{t.give.title}</h2>
            <div className="give-gold-rule" />
            <p className="give-desc">{t.give.desc}</p>
            <ul className="give-reasons">
              <li>
                <span className="give-reason-icon">📖</span>
                <div>
                  <strong>{t.give.reason1Title}</strong>
                  <span>{t.give.reason1Body}</span>
                </div>
              </li>
              <li>
                <span className="give-reason-icon">🌍</span>
                <div>
                  <strong>{t.give.reason2Title}</strong>
                  <span>{t.give.reason2Body}</span>
                </div>
              </li>
              <li>
                <span className="give-reason-icon">🙏</span>
                <div>
                  <strong>{t.give.reason3Title}</strong>
                  <span>{t.give.reason3Body}</span>
                </div>
              </li>
            </ul>
          </div>

          <div className="give-card-col">
            <div className="give-card">
              <div className="give-card-top">
                <div className="give-card-icon">♥</div>
                <h3>{t.give.monthlyTitle}</h3>
                <p>{t.give.monthlyDesc}</p>
              </div>
              <div className="give-card-body">
                <a
                  href="https://www.zeffy.com/en-US/donation-form/lee-family-monthly-support"
                  target="_blank" rel="noopener noreferrer"
                  className="give-btn-main"
                >
                  {t.give.giveCTA}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                    style={isRtl ? { transform: 'scaleX(-1)' } : undefined}>
                    <line x1="5" y1="12" x2="19" y2="12"/>
                    <polyline points="12 5 19 12 12 19"/>
                  </svg>
                </a>
                <p className="give-secure-note">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                  {t.give.secure}
                </p>
              </div>
              <div className="give-card-footer">
                <p>{t.give.questions} <a href="mailto:frameworkmenaca@gmail.com">frameworkmenaca@gmail.com</a></p>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  )
}
