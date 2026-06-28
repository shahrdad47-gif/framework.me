import { articles } from '@/data/articles'
import { translations } from '@/data/translations'
import LangArticleDetailPage from '@/components/LangArticleDetailPage'
import { getArticleBySlug } from '@/lib/articles'

export async function generateStaticParams() {
  return articles.map(a => ({ slug: a.slug }))
}

interface PageProps { params: { slug: string } }

export async function generateMetadata({ params }: PageProps) {
  const article = await getArticleBySlug(params.slug)
  if (!article) return {}
  return { title: `${article.title} — Framework:ME` }
}

export default function Page({ params }: PageProps) {
  return <LangArticleDetailPage slug={params.slug} t={translations.fa} locale="fa" />
}
