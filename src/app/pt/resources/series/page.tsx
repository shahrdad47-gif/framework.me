import Link from 'next/link'
import BackButton from '@/components/ui/BackButton'
import SeriesTeachings from '@/components/resources/SeriesTeachings'
import { videoSeriesData } from '@/data/series'
import { translations } from '@/data/translations'

export const metadata = { title: 'Séries — Framework:ME' }

export default function Page() {
  const t = translations.pt
  const s = t.sections.series
  return (
    <div className="res-sub-page" dir={t.dir}>
      <div className="res-sub-hero">
        <div className="res-sub-hero-bg" />
        <div className="container res-sub-hero-inner">
          <BackButton fallbackHref="/pt/resources" label={s.back.replace('← ', '')} className="res-sub-back" />
          <span className="res-sub-eyebrow">Framework:ME</span>
          <h1>{s.title}</h1>
          <p>{s.sub}</p>
          <div className="res-sub-hero-stat">{videoSeriesData.length} Séries</div>
        </div>
      </div>
      <div className="container res-sub-body">
        <SeriesTeachings />
      </div>
    </div>
  )
}
