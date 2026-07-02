import Link from 'next/link'
import { getShortsAdmin } from '@/lib/admin-shorts-db'
import DeleteShortButton from '@/components/admin/DeleteShortButton'

const PAGE_SIZE = 10

interface PageProps {
  searchParams: { page?: string }
}

export default async function AdminShortsPage({ searchParams }: PageProps) {
  const page = Math.max(1, Number(searchParams.page) || 1)

  const { shorts, total } = await getShortsAdmin({ page, pageSize: PAGE_SIZE })
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))

  return (
    <div className="admin-articles">
      <div className="admin-page-header">
        <div>
          <h1>1 Minute Shorts</h1>
          <p className="admin-page-sub">{total} short{total === 1 ? '' : 's'}</p>
        </div>
        <div className="admin-page-header-actions">
          <Link href="/admin/shorts/new" className="admin-btn admin-btn-primary">+ New Short</Link>
        </div>
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Short</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {shorts.length === 0 && (
              <tr><td colSpan={3} className="admin-table-empty">No shorts found.</td></tr>
            )}
            {shorts.map(s => (
              <tr key={s.id}>
                <td>
                  <div className="admin-video-row">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`https://img.youtube.com/vi/${s.id}/default.jpg`} alt="" className="admin-video-thumb" />
                    <div>
                      <div className="admin-table-title">{s.title}</div>
                      <div className="admin-table-slug">{s.id}</div>
                    </div>
                  </div>
                </td>
                <td>{s.status === 'draft' ? 'Draft' : '✓ Published'}</td>
                <td className="admin-table-actions">
                  <Link href={`/admin/shorts/${s.id}/edit`} className="admin-btn admin-btn-ghost">Edit</Link>
                  <DeleteShortButton id={s.id} title={s.title} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="admin-pagination">
          {page > 1 && (
            <Link href={`/admin/shorts?page=${page - 1}`} className="admin-btn admin-btn-ghost">← Prev</Link>
          )}
          <span className="admin-pagination-status">Page {page} of {totalPages}</span>
          {page < totalPages && (
            <Link href={`/admin/shorts?page=${page + 1}`} className="admin-btn admin-btn-ghost">Next →</Link>
          )}
        </div>
      )}
    </div>
  )
}
