'use client'
import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import { videoCategories as staticCategories } from '@/data/videos'
import type { Video, VideoCategory } from '@/types'

/* ── Tab SVG icons ── */
const HousePrayerIcon = () => (
  <svg width="18" height="18" viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="4,22 22,6 40,22"/>
    <path d="M8 22v18h28V22"/>
    <line x1="22" y1="13" x2="22" y2="21"/>
    <line x1="18" y1="17" x2="26" y2="17"/>
    <rect x="17" y="30" width="10" height="10"/>
  </svg>
)

const EndTimesIcon = () => (
  <svg width="18" height="18" viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 4h24M10 40h24"/>
    <path d="M13 4c0 10 18 14 18 18S13 30 13 40"/>
    <path d="M31 4c0 10-18 14-18 18s18 10 18 18"/>
    <line x1="10" y1="22" x2="34" y2="22"/>
  </svg>
)

const IsraelIcon = () => (
  <svg width="18" height="18" viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="22,4 34,24 10,24"/>
    <polygon points="22,40 10,20 34,20"/>
  </svg>
)

const BrideIcon = () => (
  <svg width="18" height="18" viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 8 C22 8 12 14 12 22 a10 10 0 0 0 20 0 C32 14 22 8 22 8z"/>
    <path d="M15 38 l7-6 7 6"/>
    <line x1="22" y1="32" x2="22" y2="44"/>
    <line x1="16" y1="4" x2="28" y2="4"/>
    <line x1="22" y1="2" x2="22" y2="8"/>
  </svg>
)

const MissionsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="22" cy="10" r="4"/>
    <path d="M14 30v-6a8 8 0 0 1 16 0v6"/>
    <circle cx="8" cy="14" r="3"/>
    <path d="M2 30v-4a6 6 0 0 1 9.5-4.9"/>
    <circle cx="36" cy="14" r="3"/>
    <path d="M42 30v-4a6 6 0 0 0-9.5-4.9"/>
    <path d="M4 42h36"/>
  </svg>
)

const CrossIcon = () => (
  <svg width="18" height="18" viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="4" x2="22" y2="40"/>
    <line x1="8" y1="14" x2="36" y2="14"/>
  </svg>
)

const BookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 6h14a4 4 0 0 1 4 4v28a4 4 0 0 0-4-4H6z"/>
    <path d="M38 6H24a4 4 0 0 0-4 4v28a4 4 0 0 1 4-4h14z"/>
    <line x1="10" y1="16" x2="20" y2="16"/>
    <line x1="10" y1="22" x2="20" y2="22"/>
    <line x1="10" y1="28" x2="20" y2="28"/>
    <line x1="24" y1="16" x2="34" y2="16"/>
    <line x1="24" y1="22" x2="34" y2="22"/>
    <line x1="24" y1="28" x2="34" y2="28"/>
  </svg>
)

const FlameIcon = () => (
  <svg width="18" height="18" viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4c4 8-6 10-6 18a10 10 0 0 0 20 0c0-4-3-6-3-6 0 4-2 6-4 6 2-8-7-10-7-18z"/>
  </svg>
)

const tabIcons: Record<string, () => React.ReactElement> = {
  'house-of-prayer':     HousePrayerIcon,
  'end-times':           EndTimesIcon,
  'israel':              IsraelIcon,
  'bride-of-christ':     BrideIcon,
  'missions-middle-east': MissionsIcon,
  'christian-living':    CrossIcon,
  'theology':            BookIcon,
  'forerunner-message':  FlameIcon,
}

function VideoCard({ id, title, date, category, speaker, localePrefix = '' }: {
  id: string; title: string; date?: string; category: string; speaker?: string; localePrefix?: string
}) {
  return (
    <Link href={`${localePrefix}/resources/video-teachings/${id}`} className="ytv-card">
      <div className="ytv-thumb">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`} alt={title} loading="lazy" />
        <div className="ytv-thumb-overlay">
          <div className="ytv-play-btn">
            <svg viewBox="0 0 24 24" width="22" height="22">
              <path d="M8 5v14l11-7z" fill="white"/>
            </svg>
          </div>
        </div>
      </div>
      <div className="ytv-body">
        <p className="ytv-series">Framework:ME · {category}</p>
        <h3 className="ytv-title">{title}</h3>
        {speaker && <p className="ytv-speaker">{speaker}</p>}
        {date && <p className="ytv-date">{date}</p>}
      </div>
    </Link>
  )
}

interface SearchResult {
  video: Video
  category: VideoCategory
}

interface Props {
  categories?: VideoCategory[]
  categoryNames?: Record<string, { label: string; desc: string }>
  dir?: 'ltr' | 'rtl'
  videoLabel?: string
  videosLabel?: string
  searchPlaceholder?: string
  searchHints?: string[]
  localePrefix?: string
}

const DEFAULT_HINTS = ['Israel', 'End Times', 'Theology', 'Prayer']

export default function VideoTeachings({ categories: categoriesProp, categoryNames, dir, videoLabel = 'video', videosLabel = 'videos', searchPlaceholder, searchHints, localePrefix = '' }: Props) {
  const videoCategories = categoriesProp ?? staticCategories
  const [activeId, setActiveId] = useState(videoCategories[0]?.id ?? '')
  const [query, setQuery] = useState('')

  const active = videoCategories.find(c => c.id === activeId) ?? videoCategories[0]!
  const getLabel = (cat: typeof active) => categoryNames?.[cat.id]?.label ?? cat.label
  const getDesc  = (cat: typeof active) => categoryNames?.[cat.id]?.desc  ?? cat.description

  const searchResults = useMemo<SearchResult[] | null>(() => {
    const q = query.trim().toLowerCase()
    if (!q) return null
    const results: SearchResult[] = []
    for (const cat of videoCategories) {
      for (const video of cat.videos) {
        const catLabel = categoryNames?.[cat.id]?.label ?? cat.label
        if (
          video.title.toLowerCase().includes(q) ||
          catLabel.toLowerCase().includes(q) ||
          (video.speaker && video.speaker.toLowerCase().includes(q))
        ) {
          results.push({ video, category: cat })
        }
      }
    }
    return results
  }, [query, categoryNames])

  return (
    <div className="ytv-page">

      {/* ── Search bar ── */}
      <div className="ytv-search-wrap">
        <div className="ytv-search-box">
          <svg className="ytv-search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            className="ytv-search-input"
            type="text"
            placeholder={searchPlaceholder ?? 'Search by keyword, topic, or speaker…'}
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          {query && (
            <button className="ytv-search-clear" onClick={() => setQuery('')} aria-label="Clear search">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          )}
        </div>
        {!searchResults && (
          <div className="ytv-search-hints">
            <span>Try:</span>
            {(searchHints ?? DEFAULT_HINTS).map(hint => (
              <button key={hint} className="ytv-hint-chip" onClick={() => setQuery(hint)}>{hint}</button>
            ))}
          </div>
        )}
      </div>

      {searchResults ? (
        /* ── Search results ── */
        <div className="ytv-search-results">
          <div className="ytv-search-meta">
            {searchResults.length > 0
              ? <span><strong>{searchResults.length}</strong> result{searchResults.length !== 1 ? 's' : ''} for &ldquo;{query}&rdquo;</span>
              : <span>No results for &ldquo;{query}&rdquo;</span>
            }
          </div>
          {searchResults.length > 0 ? (
            <div className="ytv-grid" dir={dir}>
              {searchResults.map(({ video, category }) => (
                <VideoCard
                  key={video.id}
                  id={video.id}
                  title={video.title}
                  date={video.date}
                  speaker={video.speaker}
                  category={categoryNames?.[category.id]?.label ?? category.label}
                  localePrefix={localePrefix}
                />
              ))}
            </div>
          ) : (
            <div className="ytv-no-results">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <p>Try a different keyword, topic, or speaker name.</p>
            </div>
          )}
        </div>
      ) : (
        <>
          {/* ── Tab bar ── */}
          <div className="ytv-tabs" dir={dir}>
            {videoCategories.map(cat => {
              const Icon = tabIcons[cat.id]
              return (
                <button
                  key={cat.id}
                  className={`ytv-tab${activeId === cat.id ? ' active' : ''}`}
                  onClick={() => setActiveId(cat.id)}
                >
                  {Icon && <span className="ytv-tab-icon"><Icon /></span>}
                  <span className="ytv-tab-label">{getLabel(cat)}</span>
                </button>
              )
            })}
          </div>

          {/* ── Active section header ── */}
          <div className="ytv-active-head" dir={dir}>
            <div className="ytv-active-head-top">
              <h2 className="ytv-active-title">{getLabel(active)}</h2>
              <span className="ytv-active-count">{active.videos.length} {active.videos.length === 1 ? videoLabel : videosLabel}</span>
            </div>
            {getDesc(active) && <p className="ytv-active-desc">{getDesc(active)}</p>}
          </div>

          {/* ── Video grid ── */}
          <div className="ytv-grid" dir={dir}>
            {active.videos.map(v => (
              <VideoCard
                key={v.id}
                id={v.id}
                title={v.title}
                date={v.date}
                speaker={v.speaker}
                category={getLabel(active)}
                localePrefix={localePrefix}
              />
            ))}
          </div>
        </>
      )}

    </div>
  )
}
