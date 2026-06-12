import Link from 'next/link'
import type { LangT, Locale } from '@/data/translations'

interface Props {
  t: LangT
  locale: Locale
  title: string
  desc: string
}

export default function LangComingSoon({ t, locale, title, desc }: Props) {
  return (
    <div className="coming-soon-page" dir={t.dir}>
      <div className="cs-inner">
        <div className="cs-ornament">✦</div>
        <Link href={`/${locale}`} className="res-sub-back" style={{ marginBottom: '16px', display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', opacity: 0.7 }}>
          {t.sections.backToHome}
        </Link>
        <p className="cs-eyebrow">{t.sections.comingSoon}</p>
        <h2>{title}</h2>
        <p>{desc}</p>
        <div className="cs-divider" />
        <a href="mailto:frameworkmenaca@gmail.com" className="btn-give">{t.sections.getNotified}</a>
      </div>
    </div>
  )
}
