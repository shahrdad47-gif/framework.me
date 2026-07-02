import Link from 'next/link'
import { getSeriesAdmin } from '@/lib/admin-series-db'
import DeleteSeriesButton from '@/components/admin/DeleteSeriesButton'

const PAGE_SIZE = 10

interface PageProps {
  searchParams: { page?: string }
}

export default async function AdminSeriesPage({ searchParams }: PageProps) {
  const page = Math.max(1, Number(searchParams.page) || 1)

  const { series, total } = await getSeriesAdmin({ page, pageSize: PAGE_SIZE })
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))

  return (
    <div className="admin-articles">
      <div className="admin-page-header">
        <div>
          <h1>Series</h1>
          <p className="admin-page-sub">{total} series</p>
        </div>
        <div className="admin-page-header-actions">
          <Link href="/admin/series/new" className="admin-btn admin-btn-primary">+ New Series</Link>
        </div>
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Series</th>
              <th>Topic</th>
              <th>Speaker</th>
              <th>Episodes</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {series.length === 0 && (
              <tr><td colSpan={5} className="admin-table-empty">No series found.</td></tr>
            )}
            {series.map(s => (
              <tr key={s.id}>
                <td>
                  <div className="admin-table-title">{s.title}</div>
                  <div className="admin-table-slug">{s.id}</div>
                </td>
                <td>{s.topic}</td>
                <td>{s.speaker || '—'}</td>
                <td>{s.episodeCount ?? 0}</td>
                <td className="admin-table-actions">
                  <Link href={`/admin/series/${s.id}/edit`} className="admin-btn admin-btn-ghost">Edit</Link>
                  <DeleteSeriesButton id={s.id} title={s.title} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="admin-pagination">
          {page > 1 && (
            <Link href={`/admin/series?page=${page - 1}`} className="admin-btn admin-btn-ghost">← Prev</Link>
          )}
          <span className="admin-pagination-status">Page {page} of {totalPages}</span>
          {page < totalPages && (
            <Link href={`/admin/series?page=${page + 1}`} className="admin-btn admin-btn-ghost">Next →</Link>
          )}
        </div>
      )}
    </div>
  )
}
