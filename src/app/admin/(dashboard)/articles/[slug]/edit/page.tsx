import { notFound } from 'next/navigation'
import { getArticleWithMetaAdmin } from '@/lib/admin-db'
import ArticleForm from '@/components/admin/ArticleForm'

interface PageProps {
  params: { slug: string }
}

export default async function EditArticlePage({ params }: PageProps) {
  const article = await getArticleWithMetaAdmin(params.slug)
  if (!article) notFound()

  return (
    <div className="admin-article-form-page">
      <h1>Edit Article</h1>
      <ArticleForm mode="edit" initial={article} />
    </div>
  )
}
