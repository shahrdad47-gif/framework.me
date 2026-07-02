import ShortForm from '@/components/admin/ShortForm'

export default function NewShortPage() {
  return (
    <div className="admin-article-form-page">
      <h1>New Short</h1>
      <ShortForm mode="create" />
    </div>
  )
}
