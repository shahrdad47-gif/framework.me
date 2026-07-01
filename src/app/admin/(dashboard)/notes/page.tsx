import Link from 'next/link'
import { getNotesAdmin } from '@/lib/admin-notes-db'
import DeleteNoteButton from '@/components/admin/DeleteNoteButton'

const PAGE_SIZE = 10

interface PageProps {
  searchParams: { page?: string }
}

export default async function AdminNotesPage({ searchParams }: PageProps) {
  const page = Math.max(1, Number(searchParams.page) || 1)

  const { notes, total } = await getNotesAdmin({ page, pageSize: PAGE_SIZE })
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))

  return (
    <div className="admin-articles">
      <div className="admin-page-header">
        <div>
          <h1>Notes</h1>
          <p className="admin-page-sub">{total} note{total === 1 ? '' : 's'}</p>
        </div>
        <div className="admin-page-header-actions">
          <Link href="/admin/notes/new" className="admin-btn admin-btn-primary">+ New Note</Link>
        </div>
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Date</th>
              <th>PDF</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {notes.length === 0 && (
              <tr><td colSpan={5} className="admin-table-empty">No notes found.</td></tr>
            )}
            {notes.map(n => (
              <tr key={n.slug}>
                <td>
                  <div className="admin-table-title">{n.title}</div>
                  <div className="admin-table-slug">{n.slug}</div>
                </td>
                <td>{n.description || '—'}</td>
                <td>{n.date}</td>
                <td>{n.pdf ? '✓' : '—'}</td>
                <td className="admin-table-actions">
                  <Link href={`/admin/notes/${n.slug}/edit`} className="admin-btn admin-btn-ghost">Edit</Link>
                  <DeleteNoteButton slug={n.slug} title={n.title} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="admin-pagination">
          {page > 1 && (
            <Link href={`/admin/notes?page=${page - 1}`} className="admin-btn admin-btn-ghost">← Prev</Link>
          )}
          <span className="admin-pagination-status">Page {page} of {totalPages}</span>
          {page < totalPages && (
            <Link href={`/admin/notes?page=${page + 1}`} className="admin-btn admin-btn-ghost">Next →</Link>
          )}
        </div>
      )}
    </div>
  )
}
