import LangArticlesPage from '@/components/LangArticlesPage'
import { translations } from '@/data/translations'
export const metadata = { title: 'Articles — Framework:ME' }
export default function Page() { return <LangArticlesPage t={translations.pt} locale="pt" /> }
