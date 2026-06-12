import LangHomePage from '@/components/LangHomePage'
import { translations } from '@/data/translations'
export const metadata = { title: 'Framework:ME — PT' }
export default function Page() { return <LangHomePage t={translations.pt} locale="pt" /> }
