'use client'
import { useState } from 'react'
import Link from 'next/link'
import { videoSeriesData } from '@/data/series'
import type { VideoSeries } from '@/types'

function SeriesCard({ series }: { series: VideoSeries }) {
  const [expanded, setExpanded] = useState(false)
  const thumb = `https://img.youtube.com/vi/${series.episodes[0].id}/hqdefault.jpg`

  return (
    <div className={`ser-card${expanded ? ' ser-card--open' : ''}`}>
      <div className="ser-card-main">
        <div className="ser-thumb">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={thumb} alt={series.title} loading="lazy" />
          <div className="ser-thumb-overlay">
            <span className="ser-ep-badge">{series.episodes.length} Episodes</span>
          </div>
        </div>
        <div className="ser-info">
          <span className="ser-topic-chip">{series.topic}</span>
          <h3 className="ser-title">{series.title}</h3>
          <p className="ser-desc">{series.description}</p>
          {series.speaker && (
            <p className="ser-speaker">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{display:'inline',marginRight:'5px',verticalAlign:'middle'}}>
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
              </svg>
              {series.speaker}
            </p>
          )}
          <button
            className="ser-watch-btn"
            onClick={() => setExpanded(v => !v)}
          >
            {expanded ? 'Close Series' : 'Watch Series'}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              style={{ transition: 'transform 0.2s', transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}>
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </button>
        </div>
      </div>

      {expanded && (
        <div className="ser-episodes">
          <h4 className="ser-episodes-label">All Episodes</h4>
          <div className="ser-ep-list">
            {series.episodes.map((ep, i) => (
              <Link key={ep.id} href={`/resources/video-teachings/${ep.id}`} className="ser-ep-row">
                <span className="ser-ep-num">EP {i + 1}</span>
                <div className="ser-ep-thumb">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`https://img.youtube.com/vi/${ep.id}/mqdefault.jpg`} alt={ep.title} loading="lazy" />
                  <div className="ser-ep-play">
                    <svg viewBox="0 0 24 24" width="18" height="18"><path d="M8 5v14l11-7z" fill="white"/></svg>
                  </div>
                </div>
                <div className="ser-ep-info">
                  <p className="ser-ep-title">{ep.title}</p>
                  {ep.date && <p className="ser-ep-date">{ep.date}</p>}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default function SeriesTeachings() {
  return (
    <div className="ser-page">
      <div className="ser-intro">
        <p>Go in depth on various topics by watching an entire series for a comprehensive understanding.</p>
      </div>
      <div className="ser-grid">
        {videoSeriesData.map(series => (
          <SeriesCard key={series.id} series={series} />
        ))}
      </div>
    </div>
  )
}
