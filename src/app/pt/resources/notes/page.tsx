import Link from 'next/link'
import EmptyState from '@/components/ui/EmptyState'
import { translations } from '@/data/translations'
export const metadata = { title: 'Notes — Framework:ME' }
export default function Page() {
  const t = translations.pt
  const s = t.sections.notes
  return (
    <div className="res-sub-page" dir={t.dir}>
      <div className="res-sub-hero">
        <div className="res-sub-hero-bg" />
        <div className="container res-sub-hero-inner">
          <Link href={`/pt/resources`} className="res-sub-back">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
              style={t.dir === 'rtl' ? { transform: 'scaleX(-1)' } : undefined}>
              <polyline points="15 18 9 12 15 6"/>
            </svg>
            {s.back.replace(/^[←→]\s*/, '')}
          </Link>
          <span className="res-sub-eyebrow">Framework:ME</span>
          <h1>{s.title}</h1>
          <p>{s.sub}</p>
        </div>
      </div>
      <div className="container res-sub-body">
        <EmptyState icon="📝" message={s.comingSoon} />
      </div>
    </div>
  )
}
