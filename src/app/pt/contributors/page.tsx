import LangComingSoon from '@/components/LangComingSoon'
import { translations } from '@/data/translations'
export const metadata = { title: 'Contributors — Framework:ME' }
export default function Page() {
  const t = translations.pt
  return <LangComingSoon t={t} locale="pt" title={t.sections.authors.title} desc={t.sections.authors.comingSoon} />
}
