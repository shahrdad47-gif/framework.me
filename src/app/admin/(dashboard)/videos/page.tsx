import Link from 'next/link'
import { getVideosAdmin, getVideoCategoriesAdmin } from '@/lib/admin-videos-db'
import DeleteVideoButton from '@/components/admin/DeleteVideoButton'

const PAGE_SIZE = 10

interface PageProps {
  searchParams: { page?: string; categoryId?: string }
}

export default async function AdminVideosPage({ searchParams }: PageProps) {
  const page = Math.max(1, Number(searchParams.page) || 1)
  const categoryId = searchParams.categoryId || undefined

  const [{ videos, total }, categories] = await Promise.all([
    getVideosAdmin({ page, pageSize: PAGE_SIZE, categoryId }),
    getVideoCategoriesAdmin(),
  ])
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))

  return (
    <div className="admin-articles">
      <div className="admin-page-header">
        <div>
          <h1>Video Teachings</h1>
          <p className="admin-page-sub">{total} video{total === 1 ? '' : 's'}</p>
        </div>
        <div className="admin-page-header-actions">
          <Link href="/admin/videos/new" className="admin-btn admin-btn-primary">+ New Video</Link>
        </div>
      </div>

      <form className="admin-filter-bar" method="get">
        <label>
          Section
          <select name="categoryId" defaultValue={categoryId ?? ''}>
            <option value="">All sections</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.label}</option>
            ))}
          </select>
        </label>
        <button type="submit" className="admin-btn admin-btn-ghost">Filter</button>
      </form>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Video</th>
              <th>Section</th>
              <th>Speaker</th>
              <th>Date</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {videos.length === 0 && (
              <tr><td colSpan={6} className="admin-table-empty">No videos found.</td></tr>
            )}
            {videos.map(v => (
              <tr key={v.id}>
                <td>
                  <div className="admin-video-row">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`https://img.youtube.com/vi/${v.id}/default.jpg`} alt="" className="admin-video-thumb" />
                    <div>
                      <div className="admin-table-title">{v.title}</div>
                      <div className="admin-table-slug">{v.id}</div>
                    </div>
                  </div>
                </td>
                <td>{v.categoryLabel}</td>
                <td>{v.speaker || '—'}</td>
                <td>{v.date || '—'}</td>
                <td>
                  <span className={`admin-badge ${v.status === 'published' ? 'admin-badge-success' : 'admin-badge-muted'}`}>
                    {v.status === 'published' ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="admin-table-actions">
                  <Link href={`/admin/videos/${v.id}/edit`} className="admin-btn admin-btn-ghost">Edit</Link>
                  <DeleteVideoButton id={v.id} title={v.title} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="admin-pagination">
          {page > 1 && (
            <Link href={`/admin/videos?page=${page - 1}${categoryId ? `&categoryId=${categoryId}` : ''}`} className="admin-btn admin-btn-ghost">
              ← Prev
            </Link>
          )}
          <span className="admin-pagination-status">Page {page} of {totalPages}</span>
          {page < totalPages && (
            <Link href={`/admin/videos?page=${page + 1}${categoryId ? `&categoryId=${categoryId}` : ''}`} className="admin-btn admin-btn-ghost">
              Next →
            </Link>
          )}
        </div>
      )}
    </div>
  )
}
