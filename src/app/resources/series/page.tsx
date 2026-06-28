import Link from 'next/link'
import SeriesTeachings from '@/components/resources/SeriesTeachings'
import { getVideoSeries } from '@/lib/db'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Series — Framework:ME' }

export default async function SeriesPage() {
  const series = await getVideoSeries()

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
          <h1>Series</h1>
          <p>Go deep on key biblical topics through curated multi-part teaching series.</p>
          <div className="res-sub-hero-stat">{series.length} Series Available</div>
        </div>
      </div>
      <div className="container res-sub-body">
        <SeriesTeachings series={series} />
      </div>
    </div>
  )
}
