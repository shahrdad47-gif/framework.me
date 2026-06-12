import LangHomePage from '@/components/LangHomePage'
import { translations } from '@/data/translations'
export const metadata = { title: 'Framework:ME — AR' }
export default function Page() { return <LangHomePage t={translations.ar} locale="ar" /> }
