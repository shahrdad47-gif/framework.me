import BackButton from '@/components/ui/BackButton'
import EmptyState from '@/components/ui/EmptyState'
import ArticlePdfChip from '@/components/ui/ArticlePdfChip'
import { getNotes } from '@/lib/db'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Notes — Framework:ME' }

export default async function NotesPage() {
  const notes = await getNotes()

  return (
    <div className="res-sub-page">
      <div className="res-sub-hero">
        <div className="res-sub-hero-bg" />
        <div className="container res-sub-hero-inner">
          <BackButton fallbackHref="/resources" label={"All Resources"} className="res-sub-back" />
          <span className="res-sub-eyebrow">Framework:ME Resources</span>
          <h1>Notes</h1>
          <p>Downloadable study notes and sermon outlines for personal and group study.</p>
        </div>
      </div>
      <div className="container res-sub-body">
        {notes.length === 0 ? (
          <EmptyState icon="📝" message="Study notes coming soon." />
        ) : (
          <div className="articles-list">
            {notes.map(n => (
              <div key={n.slug} className="article-card">
                <div className="article-card-meta">
                  <span className="article-card-date">{n.date}</span>
                </div>
                <h4>{n.title}</h4>
                {n.description && <p>{n.description}</p>}
                <div className="article-card-actions">
                  <ArticlePdfChip href={n.pdf} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
