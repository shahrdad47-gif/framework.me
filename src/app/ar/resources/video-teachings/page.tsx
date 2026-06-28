import Link from 'next/link'
import BackButton from '@/components/ui/BackButton'
import VideoTeachings from '@/components/resources/VideoTeachings'
import { translations } from '@/data/translations'
export const metadata = { title: 'Video Teachings — Framework:ME' }
export default function Page() {
  const t = translations.ar
  const s = t.sections.videoTeachings
  return (
    <div className="res-sub-page" dir={t.dir}>
      <div className="res-sub-hero">
        <div className="res-sub-hero-bg" />
        <div className="container res-sub-hero-inner">
          <BackButton fallbackHref="/ar/resources" label={s.back.replace(/^[←→]\s*/, '')} className="res-sub-back" rtl={t.dir === 'rtl'} />
          <span className="res-sub-eyebrow">{s.eyebrow}</span>
          <h1>{s.title}</h1>
          <p>{s.sub}</p>
        </div>
      </div>
      <div className="container res-sub-body">
        <VideoTeachings categoryNames={s.categories} dir={t.dir} videoLabel={s.video} videosLabel={s.videos} searchPlaceholder={s.searchPlaceholder} searchHints={s.searchHints} />
      </div>
    </div>
  )
}
