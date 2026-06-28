import PageHeroSm from '@/components/ui/PageHeroSm'
import Link from 'next/link'
import { getArticlesBySection } from '@/lib/db'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Geopolitics — Framework:ME' }

export default async function GeopoliticsPage() {
  const articles = await getArticlesBySection('geopolitics')

  return (
    <>
      <PageHeroSm
        title="Geopolitics"
        subtitle="Current events and geopolitical analysis interpreted through the lens of Scripture and biblical prophecy."
      />
      <div className="container" style={{ padding: '48px 24px', maxWidth: 860 }}>
        {articles.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'var(--bronze-text)', padding: '64px 0' }}>Articles coming soon.</p>
        ) : (
          <div className="articles-list">
            {articles.map(a => (
              <div key={a.slug} className="article-card-wrap">
                <Link href={`/articles/${a.slug}`} className="article-card-link">
                  <div className="article-card">
                    <div className="article-card-meta">
                      <span className="article-card-author">{a.author}</span>
                      <span className="article-card-dot">·</span>
                      <span className="article-card-date">{a.date}</span>
                    </div>
                    <h4>{a.title}</h4>
                    <p>{a.summary}</p>
                    <div className="article-card-actions">
                      <span className="article-read-more">Read Article →</span>
                      {a.pdf && (
                        <a href={a.pdf} target="_blank" rel="noopener noreferrer" className="article-pdf-chip" onClick={e => e.stopPropagation()}>
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                            <polyline points="7 10 12 15 17 10"/>
                            <line x1="12" y1="15" x2="12" y2="3"/>
                          </svg>
                          PDF
                        </a>
                      )}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
