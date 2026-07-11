import Link from 'next/link'
import BackButton from '@/components/ui/BackButton'
import EmptyState from '@/components/ui/EmptyState'
import { getBooks } from '@/lib/db'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Books — Framework:ME' }

export default async function BooksPage() {
  const books = await getBooks()
  const singleBook = books.length === 1 ? books[0] : null

  return (
    <div className="res-sub-page">
      <div className="res-sub-hero">
        <div className="res-sub-hero-bg" />
        <div className="container res-sub-hero-inner">
          <BackButton fallbackHref="/resources" label={"All Resources"} className="res-sub-back" />
          <span className="res-sub-eyebrow">Framework:ME Resources</span>
          <h1>Books</h1>
          <p>Download and read books that will illuminate and expand your understanding of God&apos;s plan for the nations.</p>
        </div>
      </div>
      <div className="container res-sub-body">
        {books.length === 0 ? (
          <EmptyState icon="📚" message="Book recommendations coming soon." />
        ) : singleBook ? (
          <div className="book-featured-wrap">
            <div className="book-card-featured">
              {singleBook.coverUrl && (
                <div className="book-featured-cover">
                  <a href={singleBook.link ?? '#'} target="_blank" rel="noopener noreferrer" className="book-featured-cover-link">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={singleBook.coverUrl} alt={singleBook.title} className="book-featured-cover-img" />
                  </a>
                </div>
              )}
              <div className="book-featured-body">
                <p className="book-featured-eyebrow">Featured Book</p>
                <h2 className="book-featured-title">{singleBook.title}</h2>
                <p className="book-featured-author">by {singleBook.author}</p>
                <div className="book-featured-divider" />
                {singleBook.description && (
                  <div className="book-featured-desc article-rich-body" dangerouslySetInnerHTML={{ __html: singleBook.description }} />
                )}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                  {singleBook.link && (
                    <a href={singleBook.link} target="_blank" rel="noopener noreferrer" className="btn-give">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                        <polyline points="14 2 14 8 20 8"/>
                      </svg>
                      Read Now
                    </a>
                  )}
                  <a href="https://read.bookcreator.com/vm4dnmNRvqNaj48Cv7KRcrKn5qr1/xLG_hsL-RV2rU0LLdnmiKQ" target="_blank" rel="noopener noreferrer" className="btn-give">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                      <polyline points="14 2 14 8 20 8"/>
                    </svg>
                    Read on BookCreator
                  </a>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="books-grid">
            {books.map((b, i) => (
              <div key={i} className="book-card">
                {b.coverUrl && (
                  <a href={b.link ?? '#'} target="_blank" rel="noopener noreferrer" className="book-cover-link">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={b.coverUrl} alt={b.title} className="book-cover-img" />
                  </a>
                )}
                <h3>{b.title}</h3>
                <p className="book-author">by {b.author}</p>
                {b.description && (
                  <div className="article-rich-body" dangerouslySetInnerHTML={{ __html: b.description }} />
                )}
                {b.link && (
                  <a href={b.link} target="_blank" rel="noopener noreferrer" className="btn-give" style={{ marginTop: '14px', fontSize: '0.8rem', padding: '8px 18px' }}>
                    Read Online
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
