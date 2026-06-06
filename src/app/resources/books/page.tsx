import Link from 'next/link'
import EmptyState from '@/components/ui/EmptyState'
import { books } from '@/data/books'

export const metadata = { title: 'Books — Framework:ME' }

export default function BooksPage() {
  return (
    <div className="res-sub-page">
      <div className="res-sub-hero">
        <div className="res-sub-hero-bg" />
        <div className="container res-sub-hero-inner">
          <Link href="/resources" className="res-sub-back">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
            All Resources
          </Link>
          <span className="res-sub-eyebrow">Framework:ME Resources</span>
          <h1>Books</h1>
          <p>Recommended reading for deeper study of God&apos;s plan for the nations and the prophetic Word.</p>
        </div>
      </div>
      <div className="container res-sub-body">
        {books.length === 0 ? (
          <EmptyState icon="📚" message="Book recommendations coming soon." />
        ) : (
          <div className="books-grid">
            {books.map((b, i) => (
              <div key={i} className="book-card">
                <h3>{b.title}</h3>
                <p className="book-author">by {b.author}</p>
                <p>{b.description}</p>
                {b.link && (
                  <a href={b.link} target="_blank" rel="noopener noreferrer" className="btn-give" style={{ marginTop: '14px', fontSize: '0.8rem', padding: '8px 18px' }}>
                    View Book
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
