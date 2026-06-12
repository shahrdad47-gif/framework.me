import LangComingSoon from '@/components/LangComingSoon'
import { translations } from '@/data/translations'
export const metadata = { title: 'Framework:ME' }
export default function Page() {
  const t = translations.ar
  const s = t.sections.geopolitics
  return <LangComingSoon t={t} locale="ar" title={s.title} desc={s.desc} />
}
