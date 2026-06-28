import LangEndTimesPage from '@/components/LangEndTimesPage'
import { translations } from '@/data/translations'
import { getArticlesBySection } from '@/lib/db'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Tempos do Fim — Framework:ME' }

export default async function Page() {
  const articles = await getArticlesBySection('end-times')
  return <LangEndTimesPage t={translations.pt} locale="pt" articles={articles} />
}
