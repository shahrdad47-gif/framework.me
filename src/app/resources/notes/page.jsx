import Link from 'next/link'
import EmptyState from '@/components/ui/EmptyState'

export const metadata = { title: 'Notes — Framework:ME' }

export default function NotesPage() {
  return (
    <div className="res-sub-page">
      <div className="res-sub-hero">
        <div className="container">
          <Link href="/resources" className="res-sub-back">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
            All Resources
          </Link>
          <h1>Notes</h1>
          <p>Downloadable study notes and sermon outlines for personal and group study.</p>
        </div>
      </div>
      <div className="container res-sub-body">
        <EmptyState icon="📝" message="Study notes coming soon." />
      </div>
    </div>
  )
}
