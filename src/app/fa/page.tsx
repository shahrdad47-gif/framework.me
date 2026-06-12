import LangHomePage from '@/components/LangHomePage'
import { translations } from '@/data/translations'
export const metadata = { title: 'Framework:ME — FA' }
export default function Page() { return <LangHomePage t={translations.fa} locale="fa" /> }
