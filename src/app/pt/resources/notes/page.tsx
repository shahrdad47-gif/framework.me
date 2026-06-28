import Link from 'next/link'
import BackButton from '@/components/ui/BackButton'
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
          <BackButton fallbackHref="/pt/resources" label={s.back.replace(/^[←→]\s*/, '')} className="res-sub-back" rtl={t.dir === 'rtl'} />
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
