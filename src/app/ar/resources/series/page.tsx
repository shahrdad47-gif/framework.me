import Link from 'next/link'
import SeriesTeachings from '@/components/resources/SeriesTeachings'
import { videoSeriesData } from '@/data/series'
import { translations } from '@/data/translations'

export const metadata = { title: 'السلاسل — Framework:ME' }

export default function Page() {
  const t = translations.ar
  const s = t.sections.series
  return (
    <div className="res-sub-page" dir={t.dir}>
      <div className="res-sub-hero">
        <div className="res-sub-hero-bg" />
        <div className="container res-sub-hero-inner">
          <Link href="/ar/resources" className="res-sub-back">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
              style={{ transform: 'scaleX(-1)' }}>
              <polyline points="15 18 9 12 15 6"/>
            </svg>
            {s.back.replace('← ', '')}
          </Link>
          <span className="res-sub-eyebrow">Framework:ME</span>
          <h1>{s.title}</h1>
          <p>{s.sub}</p>
          <div className="res-sub-hero-stat">{videoSeriesData.length} سلاسل</div>
        </div>
      </div>
      <div className="container res-sub-body">
        <SeriesTeachings />
      </div>
    </div>
  )
}
