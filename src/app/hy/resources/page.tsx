import LangResourcesPage from '@/components/LangResourcesPage'
import { translations } from '@/data/translations'
export const metadata = { title: 'Resources — Framework:ME' }
export default function Page() { return <LangResourcesPage t={translations.hy} locale="hy" /> }
