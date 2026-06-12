import LangComingSoon from '@/components/LangComingSoon'
import { translations } from '@/data/translations'
export const metadata = { title: 'Contributors — Framework:ME' }
export default function Page() {
  const t = translations.fa
  return <LangComingSoon t={t} locale="fa" title={t.sections.authors.title} desc={t.sections.authors.comingSoon} />
}
