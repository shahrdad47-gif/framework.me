'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import type { Video, VideoCategory } from '@/types'

interface Props {
  video: Video
  cat: VideoCategory
  related: Video[]
}

export default function VideoDetailTabs({ video, cat, related }: Props) {
  const [active, setActive] = useState<'overview' | 'more'>('overview')

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'more',     label: `More Videos${related.length ? ` (${related.length})` : ''}` },
  ] as const

  return (
    <div className="vdt-wrap">

      {/* ── Tab bar ── */}
      <div className="vdt-tabs">
        <div className="vdt-tabs-inner">
          {tabs.map(t => (
            <button
              key={t.id}
              className={`vdt-tab${active === t.id ? ' active' : ''}`}
              onClick={() => setActive(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Overview ── */}
      {active === 'overview' && (
        <div className="vdt-body">
          <div className="vdt-body-inner">
            <div className="vdt-tag-row">
              <span className="vdt-tag vdt-tag-cat">{cat.label}</span>
              <span className="vdt-tag">Bible Teaching</span>
              {video.date && <span className="vdt-tag">{video.date}</span>}
            </div>
            {cat.description && (
              <p className="vdt-cat-desc">{cat.description}</p>
            )}
          </div>
        </div>
      )}

      {/* ── More Videos ── */}
      {active === 'more' && (
        <div className="vdt-body">
          <div className="vdt-body-inner">
            {related.length === 0 ? (
              <p className="vdt-empty">No other videos in this category yet.</p>
            ) : (
              <>
                <h2 className="vdt-more-title">More from {cat.label}</h2>
                <div className="vdt-more-grid">
                  {related.map(v => (
                    <Link key={v.id} href={`/resources/video-teachings/${v.id}`} className="vd-more-card">
                      <div className="vd-more-thumb">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={`https://img.youtube.com/vi/${v.id}/hqdefault.jpg`} alt={v.title} loading="lazy" />
                        <div className="vd-more-play">
                          <svg viewBox="0 0 24 24" width="32" height="32">
                            <path d="M8 5v14l11-7z" fill="white"/>
                          </svg>
                        </div>
                      </div>
                      <div className="vd-more-info">
                        <p className="vd-more-cat">{cat.label}</p>
                        <p className="vd-more-name">{v.title}</p>
                        {v.date && <p className="vd-more-date">{v.date}</p>}
                      </div>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}

    </div>
  )
}
