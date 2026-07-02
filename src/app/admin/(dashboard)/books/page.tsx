import Link from 'next/link'
import { getBooksAdmin } from '@/lib/admin-books-db'
import DeleteBookButton from '@/components/admin/DeleteBookButton'

const PAGE_SIZE = 10

interface PageProps {
  searchParams: { page?: string }
}

export default async function AdminBooksPage({ searchParams }: PageProps) {
  const page = Math.max(1, Number(searchParams.page) || 1)

  const { books, total } = await getBooksAdmin({ page, pageSize: PAGE_SIZE })
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))

  return (
    <div className="admin-articles">
      <div className="admin-page-header">
        <div>
          <h1>Books</h1>
          <p className="admin-page-sub">{total} book{total === 1 ? '' : 's'}</p>
        </div>
        <div className="admin-page-header-actions">
          <Link href="/admin/books/new" className="admin-btn admin-btn-primary">+ New Book</Link>
        </div>
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Book</th>
              <th>Author</th>
              <th>Cover</th>
              <th>Link</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {books.length === 0 && (
              <tr><td colSpan={5} className="admin-table-empty">No books found.</td></tr>
            )}
            {books.map(b => (
              <tr key={b.id}>
                <td>
                  <div className="admin-table-title">{b.title}</div>
                </td>
                <td>{b.author}</td>
                <td>{b.coverUrl ? '✓' : '—'}</td>
                <td>{b.link ? '✓' : '—'}</td>
                <td className="admin-table-actions">
                  <Link href={`/admin/books/${b.id}/edit`} className="admin-btn admin-btn-ghost">Edit</Link>
                  <DeleteBookButton id={b.id} title={b.title} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="admin-pagination">
          {page > 1 && (
            <Link href={`/admin/books?page=${page - 1}`} className="admin-btn admin-btn-ghost">← Prev</Link>
          )}
          <span className="admin-pagination-status">Page {page} of {totalPages}</span>
          {page < totalPages && (
            <Link href={`/admin/books?page=${page + 1}`} className="admin-btn admin-btn-ghost">Next →</Link>
          )}
        </div>
      )}
    </div>
  )
}
