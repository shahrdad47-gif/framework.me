import LangGeopoliticsPage from '@/components/LangGeopoliticsPage'
import { translations } from '@/data/translations'
import { getArticlesBySection } from '@/lib/db'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'الجيوسياسة — Framework:ME' }

export default async function Page() {
  const articles = await getArticlesBySection('geopolitics')
  return <LangGeopoliticsPage t={translations.ar} locale="ar" articles={articles} />
}
