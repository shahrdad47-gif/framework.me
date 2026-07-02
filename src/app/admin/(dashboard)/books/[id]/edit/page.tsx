import { notFound } from 'next/navigation'
import { getBookAdmin } from '@/lib/admin-books-db'
import BookForm from '@/components/admin/BookForm'

interface PageProps {
  params: { id: string }
}

export default async function EditBookPage({ params }: PageProps) {
  const id = Number(params.id)
  const book = Number.isInteger(id) ? await getBookAdmin(id) : null
  if (!book) notFound()

  return (
    <div className="admin-article-form-page">
      <h1>Edit Book</h1>
      <BookForm mode="edit" initial={book} />
    </div>
  )
}
