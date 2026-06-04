'use client'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { nations } from '@/data/nations'
import { getArticlesForNation } from '@/lib/articles'

export default function ArticlesByNation() {
  const searchParams = useSearchParams()
  const [selected, setSelected] = useState(null)

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
        <button className="btn-back" onClick={() => { setSelected(null); window.history.replaceState(null, '', '/resources/articles') }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
          All Nations
        </button>

        <div className="nation-articles-header">
          <span className="nation-articles-flag">{selected.flag}</span>
          <h3>{selected.name}</h3>
        </div>

        {articleList.length === 0 ? (
          <div className="no-articles">
            <p>No articles yet for <strong>{selected.name}</strong>. Check back soon.</p>
          </div>
        ) : (
          <div className="articles-list">
            {articleList.map(a => (
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
              <span className="nation-flag">{nation.flag}</span>
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
