import Link from 'next/link'
import BackButton from '@/components/ui/BackButton'
import EmptyState from '@/components/ui/EmptyState'

export const metadata = { title: 'Notes — Framework:ME' }

export default function NotesPage() {
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
        <EmptyState icon="📝" message="Study notes coming soon." />
      </div>
    </div>
  )
}
