'use client'
import { useState } from 'react'
import { videoCategories } from '@/data/videos'
import VideoCard from './VideoCard'

export default function VideoTeachings() {
  const [activeCatId, setActiveCatId] = useState<string>('all')

  const displayed = activeCatId === 'all'
    ? videoCategories.flatMap(cat => cat.videos.map(v => ({ ...v, cat })))
    : videoCategories
        .filter(cat => cat.id === activeCatId)
        .flatMap(cat => cat.videos.map(v => ({ ...v, cat })))

  return (
    <div className="vt-platform">

      {/* ── Filter tabs ── */}
      <div className="vt-tabs">
        <button
          className={`vt-tab${activeCatId === 'all' ? ' active' : ''}`}
          onClick={() => setActiveCatId('all')}
        >
          All Videos
        </button>
        {videoCategories.map(cat => (
          <button
            key={cat.id}
            className={`vt-tab${activeCatId === cat.id ? ' active' : ''}`}
            onClick={() => setActiveCatId(cat.id)}
          >
            {cat.icon} {cat.label}
          </button>
        ))}
      </div>

      {/* ── Card grid ── */}
      <div className="vt-grid">
        {displayed.map(v => (
          <VideoCard
            key={`${v.cat.id}-${v.id}`}
            id={v.id}
            title={v.title}
            date={v.date}
            categoryLabel={v.cat.label}
            categoryIcon={v.cat.icon}
          />
        ))}
      </div>

    </div>
  )
}
