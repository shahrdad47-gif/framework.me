import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { articles } from '@/data/articles'
import { getArticleBySlug } from '@/lib/articles'
import { nations } from '@/data/nations'

export async function generateStaticParams() {
  return articles.map(a => ({ slug: a.slug }))
}

interface PageProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: PageProps) {
  const article = getArticleBySlug(params.slug)
  if (!article) return {}
  return { title: `${article.title} — Framework:ME` }
}

export default function ArticlePage({ params }: PageProps) {
  const article = getArticleBySlug(params.slug)
  if (!article) notFound()

  const relatedNations = nations.filter(n => article.nations.includes(n.key))

  return (
    <div className="article-page">

      {/* ── Header ── */}
      <div className="article-hero">
        <div className="container">
          <Link href="/resources?tab=articles" className="article-breadcrumb">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
            Articles by Nation
          </Link>
          <div className="article-nations-row">
            {relatedNations.map(n => (
              <span key={n.key} className="article-nation-chip">
                {n.svg
                  ? <Image src={`/img/${n.svg}`} alt={n.name} width={16} height={16} className="article-nation-chip-map" />
                  : n.flag
                }
                {n.name}
              </span>
            ))}
          </div>
          <h1 className="article-title">{article.title}</h1>
          <div className="article-meta">
            <span className="article-author">By {article.author}</span>
            <span className="article-dot">·</span>
            <span className="article-date">{article.date}</span>
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="article-body-wrap">
        <div className="container">
          <div className="article-layout">

            <article className="article-content">
              {article.body.map((block, i) => {
                if (block.type === 'paragraph') {
                  return <p key={i} className="article-p">{block.text}</p>
                }
                if (block.type === 'subheading') {
                  return <h3 key={i} className="article-subheading">{block.text}</h3>
                }
                if (block.type === 'closing') {
                  return <p key={i} className="article-p article-closing">{block.text}</p>
                }
                if (block.type === 'scripture-list') {
                  return (
                    <div key={i} className="scripture-list">
                      {block.items.map((item, j) => (
                        <div key={j} className="scripture-item">
                          <div className="scripture-text">{item.text}</div>
                          <div className="scripture-ref">{item.ref}</div>
                        </div>
                      ))}
                    </div>
                  )
                }
                return null
              })}

              {/* PDF download */}
              {article.pdf && (
                <div className="article-pdf-row">
                  <a
                    href={article.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-give article-pdf-btn"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                      <polyline points="7 10 12 15 17 10"/>
                      <line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                    Download PDF
                  </a>
                </div>
              )}
            </article>

            {/* ── Sidebar ── */}
            <aside className="article-sidebar">
              <div className="sidebar-card">
                <h4>About the Author</h4>
                <p><strong>{article.author}</strong> is a teacher and founder of Framework:ME, committed to preparing the global Church for the return of Christ through biblical teaching on the nations.</p>
              </div>

              <div className="sidebar-card">
                <h4>Nations Covered</h4>
                <div className="sidebar-nations">
                  {relatedNations.map(n => (
                    <Link key={n.key} href={`/resources/articles?nation=${n.key}`} className="sidebar-nation">
                      {n.flag_svg
                        ? (
                          <div className="sidebar-nation-flag-wrap">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={n.flag_svg} alt={n.name} className="sidebar-nation-flag-img" loading="lazy" />
                          </div>
                        )
                        : <span>{n.flag}</span>
                      }
                      <span>{n.name}</span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="sidebar-card sidebar-give">
                <h4>Support the Work</h4>
                <p>Help us continue producing free resources for the global Church.</p>
                <a
                  href="https://www.zeffy.com/en-US/donation-form/lee-family-monthly-support"
                  target="_blank" rel="noopener noreferrer"
                  className="btn-give"
                  style={{ marginTop: '12px', width: '100%', justifyContent: 'center' }}
                >
                  Give
                </a>
              </div>
            </aside>

          </div>
        </div>
      </div>

    </div>
  )
}
