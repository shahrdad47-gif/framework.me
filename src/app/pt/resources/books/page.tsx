import Link from 'next/link'
import EmptyState from '@/components/ui/EmptyState'
import { books } from '@/data/books'
import { translations } from '@/data/translations'
export const metadata = { title: 'Books — Framework:ME' }
export default function Page() {
  const t = translations.pt
  const s = t.sections.books
  return (
    <div className="res-sub-page" dir={t.dir}>
      <div className="res-sub-hero">
        <div className="res-sub-hero-bg" />
        <div className="container res-sub-hero-inner">
          <Link href={`/pt/resources`} className="res-sub-back">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
              style={t.dir === 'rtl' ? { transform: 'scaleX(-1)' } : undefined}>
              <polyline points="15 18 9 12 15 6"/>
            </svg>
            {s.back.replace(/^[←→]\s*/, '')}
          </Link>
          <span className="res-sub-eyebrow">Framework:ME</span>
          <h1>{s.title}</h1>
          <p>{s.sub}</p>
        </div>
      </div>
      <div className="container res-sub-body">
        {books.length === 0 ? (
          <EmptyState icon="📚" message={s.comingSoon} />
        ) : (
          <div className="books-grid">
            {books.map((b, i) => (
              <div key={i} className="book-card">
                <h3>{b.title}</h3>
                <p className="book-author">{s.by} {b.author}</p>
                <p>{b.description}</p>
                {b.link && <a href={b.link} target="_blank" rel="noopener noreferrer" className="btn-give" style={{ marginTop: '14px', fontSize: '0.8rem', padding: '8px 18px' }}>{s.viewBook}</a>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
