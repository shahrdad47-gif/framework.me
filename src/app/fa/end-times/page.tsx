import LangComingSoon from '@/components/LangComingSoon'
import { translations } from '@/data/translations'
export const metadata = { title: 'Framework:ME' }
export default function Page() {
  const t = translations.fa
  const s = t.sections.endTimes
  return <LangComingSoon t={t} locale="fa" title={s.title} desc={s.desc} />
}
