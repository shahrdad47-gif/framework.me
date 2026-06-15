import { Suspense } from 'react'
import type { LangT } from '@/data/translations'
import ArticlesByNation from '@/components/resources/ArticlesByNation'

export default function LangArticlesPage({ t, locale }: { t: LangT; locale: string }) {
  const s = t.sections.articles
  const isRtl = t.dir === 'rtl'
  return (
    <div className="res-sub-page" dir={t.dir}>
      <div className="res-sub-hero">
        <div className="res-sub-hero-bg" />
        <div className="container res-sub-hero-inner">
          <a href={`/${locale}/resources`} className="res-sub-back">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
              style={isRtl ? { transform: 'scaleX(-1)' } : undefined}>
              <polyline points="15 18 9 12 15 6"/>
            </svg>
            {s.back.replace(/^[←→]\s*/, '')}
          </a>
          <span className="res-sub-eyebrow">Framework:ME</span>
          <h1>{s.title}</h1>
          <p>{s.sub}</p>
        </div>
      </div>
      <div className="container res-sub-body">
        <Suspense>
          <ArticlesByNation locale={locale} />
        </Suspense>
      </div>
    </div>
  )
}
