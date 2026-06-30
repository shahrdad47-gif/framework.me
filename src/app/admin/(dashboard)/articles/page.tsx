import Link from 'next/link'
import { getArticlesAdmin } from '@/lib/admin-db'
import { nations } from '@/data/nations'
import DeleteArticleButton from '@/components/admin/DeleteArticleButton'

const PAGE_SIZE = 10

interface PageProps {
  searchParams: { page?: string; nation?: string }
}

export default async function AdminArticlesPage({ searchParams }: PageProps) {
  const page = Math.max(1, Number(searchParams.page) || 1)
  const nation = searchParams.nation || undefined

  const { articles, total } = await getArticlesAdmin({ page, pageSize: PAGE_SIZE, nation })
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))

  return (
    <div className="admin-articles">
      <div className="admin-page-header">
        <div>
          <h1>Articles</h1>
          <p className="admin-page-sub">{total} article{total === 1 ? '' : 's'}</p>
        </div>
        <Link href="/admin/articles/new" className="admin-btn admin-btn-primary">+ New Article</Link>
      </div>

      <form className="admin-filter-bar" method="get">
        <label>
          Country
          <select name="nation" defaultValue={nation ?? ''}>
            <option value="">All countries</option>
            {nations.map(n => (
              <option key={n.key} value={n.key}>{n.name}</option>
            ))}
          </select>
        </label>
        <button type="submit" className="admin-btn admin-btn-ghost">Filter</button>
      </form>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Countries</th>
              <th>Date</th>
              <th>PDF</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {articles.length === 0 && (
              <tr><td colSpan={5} className="admin-table-empty">No articles found.</td></tr>
            )}
            {articles.map(a => (
              <tr key={a.slug}>
                <td>
                  <div className="admin-table-title">{a.title}</div>
                  <div className="admin-table-slug">{a.slug}</div>
                </td>
                <td>{a.nations.join(', ')}</td>
                <td>{a.date}</td>
                <td>{a.pdf ? '✓' : '—'}</td>
                <td className="admin-table-actions">
                  <Link href={`/admin/articles/${a.slug}/edit`} className="admin-btn admin-btn-ghost">Edit</Link>
                  <DeleteArticleButton slug={a.slug} title={a.title} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="admin-pagination">
          {page > 1 && (
            <Link href={`/admin/articles?page=${page - 1}${nation ? `&nation=${nation}` : ''}`} className="admin-btn admin-btn-ghost">
              ← Prev
            </Link>
          )}
          <span className="admin-pagination-status">Page {page} of {totalPages}</span>
          {page < totalPages && (
            <Link href={`/admin/articles?page=${page + 1}${nation ? `&nation=${nation}` : ''}`} className="admin-btn admin-btn-ghost">
              Next →
            </Link>
          )}
        </div>
      )}
    </div>
  )
}
