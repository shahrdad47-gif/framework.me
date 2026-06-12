import LangComingSoon from '@/components/LangComingSoon'
import { translations } from '@/data/translations'
export const metadata = { title: 'Framework:ME' }
export default function Page() {
  const t = translations.hy
  const s = t.sections.nations
  return <LangComingSoon t={t} locale="hy" title={s.title} desc={s.desc} />
}
