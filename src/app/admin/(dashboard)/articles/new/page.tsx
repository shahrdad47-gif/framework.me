import ArticleForm from '@/components/admin/ArticleForm'

export default function NewArticlePage() {
  return (
    <div className="admin-article-form-page">
      <h1>New Article</h1>
      <ArticleForm mode="create" />
    </div>
  )
}
