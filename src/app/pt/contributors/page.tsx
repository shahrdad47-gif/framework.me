import LangContributorsPage from '@/components/LangContributorsPage'
import { translations } from '@/data/translations'
export const metadata = { title: 'Contributors — Framework:ME' }
export default function Page() {
  return <LangContributorsPage t={translations.pt} locale="pt" />
}
