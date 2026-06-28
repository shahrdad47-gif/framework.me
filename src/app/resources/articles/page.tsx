import { Suspense } from 'react'
import Link from 'next/link'
import BackButton from '@/components/ui/BackButton'
import ArticlesByNation from '@/components/resources/ArticlesByNation'

export const metadata = { title: 'Articles by Nation — Framework:ME' }

export default function ArticlesPage() {
  return (
    <div className="res-sub-page">
      <div className="res-sub-hero">
        <div className="res-sub-hero-bg" />
        <div className="container res-sub-hero-inner">
          <BackButton fallbackHref="/resources" label={"All Resources"} className="res-sub-back" />
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
