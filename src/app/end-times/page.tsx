import PageHeroSm from '@/components/ui/PageHeroSm'
import Link from 'next/link'
import { getArticlesBySection, getVideoCategories } from '@/lib/db'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'End Times — Framework:ME' }

export default async function EndTimesPage() {
  const [articles, categories] = await Promise.all([
    getArticlesBySection('end-times'),
    getVideoCategories(),
  ])

  const endTimesVideos = categories
    .flatMap(c => c.videos.map(v => ({ ...v, category: c.label })))
    .filter(v => v.title.toLowerCase().includes('end') || v.title.toLowerCase().includes('last') || v.title.toLowerCase().includes('eschat'))
    .slice(0, 6)

  return (
    <>
      <PageHeroSm
        title="End Times"
        subtitle="Teaching and resources on biblical eschatology — understanding the signs, seasons, and alignment of nations in the last days."
      />
      <div className="container" style={{ padding: '48px 24px', maxWidth: 860 }}>
        {articles.length === 0 && endTimesVideos.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'var(--bronze-text)', padding: '64px 0' }}>Content coming soon.</p>
        ) : (
          <>
            {articles.length > 0 && (
              <>
                <h2 style={{ marginBottom: 24, fontSize: '1.3rem', fontWeight: 700 }}>Articles</h2>
                <div className="articles-list">
                  {articles.map(a => (
                    <Link key={a.slug} href={`/articles/${a.slug}`} className="article-card-link">
                      <div className="article-card">
                        <div className="article-card-meta">
                          <span className="article-card-author">{a.author}</span>
                          <span className="article-card-dot">·</span>
                          <span className="article-card-date">{a.date}</span>
                        </div>
                        <h4>{a.title}</h4>
                        <p>{a.summary}</p>
                        <span className="article-read-more">Read Article →</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </>
            )}

            {endTimesVideos.length > 0 && (
              <>
                <h2 style={{ margin: '48px 0 24px', fontSize: '1.3rem', fontWeight: 700 }}>Video Teachings</h2>
                <div className="yt-grid">
                  {endTimesVideos.map(v => (
                    <a
                      key={v.id}
                      href={`https://www.youtube.com/watch?v=${v.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="yt-card"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`https://img.youtube.com/vi/${v.id}/hqdefault.jpg`}
                        alt={v.title}
                        className="yt-thumb"
                        loading="lazy"
                      />
                      <div className="yt-info">
                        <p className="yt-title">{v.title}</p>
                        <p className="yt-meta">{v.category}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </>
  )
}
