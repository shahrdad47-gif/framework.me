'use client'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import type { Nation } from '@/types'
import { nations } from '@/data/nations'
import { getArticlesForNationSync as getArticlesForNation } from '@/lib/articles-sync'
import { articleTranslations } from '@/data/article-translations'

interface Props {
  locale?: string
  labels?: { allNations?: string; readArticle?: string }
}

export default function ArticlesByNation({ locale, labels }: Props) {
  const searchParams = useSearchParams()
  const [selected, setSelected] = useState<Nation | null>(null)

  const basePath    = locale ? `/${locale}/articles`          : '/resources/articles'
  const articleHref = (slug: string) => locale ? `/${locale}/articles/${slug}` : `/articles/${slug}`

  const allNationsLabel  = labels?.allNations  ?? 'All Nations'
  const readArticleLabel = labels?.readArticle ?? 'Read Article →'

  useEffect(() => {
    const key = searchParams.get('nation')
    if (key) {
      const nation = nations.find(n => n.key === key)
      if (nation) setSelected(nation)
    }
  }, [searchParams])

  if (selected) {
    const articleList = getArticlesForNation(selected.key)

    return (
      <div>
        <button className="btn-back" onClick={() => { setSelected(null); window.history.replaceState(null, '', basePath) }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
          {allNationsLabel}
        </button>

        <div className="nation-articles-header">
          {selected.svg
            ? <div className="nation-map-wrap" style={{ width: 64, height: 64 }}>
                <Image src={`/img/${selected.svg}`} alt={selected.name} width={52} height={52} className="nation-map-img" />
              </div>
            : <span className="nation-articles-flag">{selected.flag}</span>
          }
          <h3>{selected.name}</h3>
        </div>

        {articleList.length === 0 ? (
          <div className="no-articles">
            <p>No articles yet for <strong>{selected.name}</strong>. Check back soon.</p>
          </div>
        ) : (
          <div className="articles-list">
            {articleList.map(a => {
              const tx = locale ? articleTranslations[a.slug]?.[locale] : undefined
              return (
                <div key={a.slug} className="article-card-wrap">
                  <Link href={articleHref(a.slug)} className="article-card-link">
                    <div className="article-card">
                      <div className="article-card-meta">
                        <span className="article-card-author">{a.author}</span>
                        <span className="article-card-dot">·</span>
                        <span className="article-card-date">{a.date}</span>
                      </div>
                      <h4>{tx?.title ?? a.title}</h4>
                      <p>{tx?.summary ?? a.summary}</p>
                      <div className="article-card-actions">
                        <span className="article-read-more">{readArticleLabel}</span>
                        {a.pdf && (
                          <a
                            href={a.pdf}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="article-pdf-chip"
                            onClick={e => e.stopPropagation()}
                          >
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
              )
            })}
          </div>
        )}
      </div>
    )
  }

  return (
    <div>
      <div className="res-panel-header">
        <h3>Articles by Nation</h3>
        <p>Select a nation to read articles and commentary.</p>
      </div>
      <div className="nations-grid">
        {nations.map(nation => {
          const count = getArticlesForNation(nation.key).length
          return (
            <button
              key={nation.key}
              className="nation-card"
              onClick={() => setSelected(nation)}
            >
              {nation.svg
                ? <div className="nation-map-wrap">
                    <Image src={`/img/${nation.svg}`} alt={nation.name} width={44} height={44} className="nation-map-img" />
                  </div>
                : <span className="nation-flag">{nation.flag}</span>
              }
              <span className="nation-name">{nation.name}</span>
              {count > 0 && (
                <span className="nation-count">{count}</span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
