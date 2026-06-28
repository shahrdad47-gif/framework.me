import LangGeopoliticsPage from '@/components/LangGeopoliticsPage'
import { translations } from '@/data/translations'
import { getArticlesBySection } from '@/lib/db'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Երկրաքաղաքականություն — Framework:ME' }

export default async function Page() {
  const articles = await getArticlesBySection('geopolitics')
  return <LangGeopoliticsPage t={translations.hy} locale="hy" articles={articles} />
}
