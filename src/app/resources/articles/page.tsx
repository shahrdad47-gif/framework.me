import { Suspense } from 'react'
import Link from 'next/link'
import ArticlesByNation from '@/components/resources/ArticlesByNation'

export const metadata = { title: 'Articles by Nation — Framework:ME' }

export default function ArticlesPage() {
  return (
    <div className="res-sub-page">
      <div className="res-sub-hero">
        <div className="res-sub-hero-bg" />
        <div className="container res-sub-hero-inner">
          <Link href="/resources" className="res-sub-back">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
            All Resources
          </Link>
          <span className="res-sub-eyebrow">Framework:ME Resources</span>
          <h1>Articles by Nation</h1>
          <p>Select a nation flag to read articles and commentary on God&apos;s purposes for that nation.</p>
        </div>
      </div>
      <div className="container res-sub-body">
        <Suspense>
          <ArticlesByNation />
        </Suspense>
      </div>
    </div>
  )
}
