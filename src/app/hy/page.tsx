import LangHomePage from '@/components/LangHomePage'
import { translations } from '@/data/translations'
export const metadata = { title: 'Framework:ME — HY' }
export default function Page() { return <LangHomePage t={translations.hy} locale="hy" /> }
