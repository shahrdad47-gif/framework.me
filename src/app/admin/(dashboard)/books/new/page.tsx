import BookForm from '@/components/admin/BookForm'

export default function NewBookPage() {
  return (
    <div className="admin-article-form-page">
      <h1>New Book</h1>
      <BookForm mode="create" />
    </div>
  )
}
