import Link from 'next/link'
import type { Article } from '@/types'
import type { LangT as Translations } from '@/data/translations'
import { articleTranslations } from '@/data/article-translations'

interface Props {
  t: Translations
  locale: string
  articles: Article[]
}

export default function LangGeopoliticsPage({ t, locale, articles }: Props) {
  const s = t.sections.geopolitics
  const dir = locale === 'fa' || locale === 'ar' ? 'rtl' : 'ltr'

  return (
    <div dir={dir}>
      <section className="hero-section" style={{ background: 'linear-gradient(135deg,#1a1a2e 0%,#16213e 50%,#0f3460 100%)' }}>
        <div className="container" style={{ padding: '80px 24px 60px', textAlign: 'center' }}>
          <h1 style={{ color: '#fff', fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 800, marginBottom: 12 }}>
            {s.title}
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.05rem', maxWidth: 600, margin: '0 auto' }}>
            {s.desc}
          </p>
        </div>
      </section>

      <div className="container" style={{ padding: '48px 24px', maxWidth: 860 }}>
        {articles.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'var(--bronze-text)', padding: '64px 0' }}>
            {t.nav.articles}...
          </p>
        ) : (
          <div className="articles-list">
            {articles.map(a => {
              const tx = articleTranslations[a.slug]?.[locale]
              return (
                <Link key={a.slug} href={`/${locale}/articles/${a.slug}`} className="article-card-link">
                  <div className="article-card">
                    <div className="article-card-meta">
                      <span className="article-card-author">{a.author}</span>
                      <span className="article-card-dot">·</span>
                      <span className="article-card-date">{a.date}</span>
                    </div>
                    <h4>{tx?.title ?? a.title}</h4>
                    <p>{tx?.summary ?? a.summary}</p>
                    <span className="article-read-more">→</span>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
