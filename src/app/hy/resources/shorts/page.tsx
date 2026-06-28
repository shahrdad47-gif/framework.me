import Link from 'next/link'
import BackButton from '@/components/ui/BackButton'
import { translations } from '@/data/translations'
import { shortsData } from '@/data/videos'
export const metadata = { title: 'Shorts — Framework:ME' }
export default function Page() {
  const t = translations.hy
  const s = t.sections.shorts
  return (
    <div className="res-sub-page" dir={t.dir}>
      <div className="res-sub-hero">
        <div className="res-sub-hero-bg" />
        <div className="container res-sub-hero-inner">
          <BackButton fallbackHref="/hy/resources" label={s.back.replace(/^[←→]\s*/, '')} className="res-sub-back" rtl={t.dir === 'rtl'} />
          <span className="res-sub-eyebrow">Framework:ME</span>
          <h1>{s.title}</h1>
          <p>{s.sub}</p>
        </div>
      </div>
      <div className="container res-sub-body">
        <div className="shorts-grid">
          {shortsData.map(v => (
            <Link key={v.id} href={`/resources/shorts/${v.id}`} className="short-card">
              <div className="short-thumb">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`https://img.youtube.com/vi/${v.id}/hqdefault.jpg`} alt={v.title} loading="lazy" />
                <div className="short-thumb-overlay">
                  <div className="ytv-play-btn">
                    <svg viewBox="0 0 24 24" width="22" height="22"><path d="M8 5v14l11-7z" fill="white"/></svg>
                  </div>
                </div>
              </div>
              <div className="short-body">
                <h3 className="short-title">{v.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
