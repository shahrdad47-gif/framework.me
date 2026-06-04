'use client'
import { useState } from 'react'
import { videoCategories } from '@/data/videos'
import VideoCard from './VideoCard'
import EmptyState from '@/components/ui/EmptyState'

export default function VideoTeachings() {
  const [openId, setOpenId] = useState<string | null>(null)

  const toggle = (id: string) => setOpenId(prev => prev === id ? null : id)

  return (
    <div className="video-categories">
      {videoCategories.map(cat => {
        const isOpen = openId === cat.id
        return (
          <div key={cat.id} className="video-cat">
            <button
              className="video-cat-header"
              aria-expanded={isOpen}
              onClick={() => toggle(cat.id)}
            >
              <span className="vcat-icon">{cat.icon}</span>
              <span className="vcat-label">{cat.label}</span>
              <span className="vcat-chevron">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </span>
            </button>

            <div className={`video-cat-body${isOpen ? ' open' : ''}`}>
              <div className="video-grid">
                {cat.videos.length === 0 ? (
                  <div className="video-placeholder">
                    <span>📹</span>
                    <p>Add video IDs in <code>src/data/videos.ts</code> → <code>{cat.id}</code></p>
                  </div>
                ) : (
                  cat.videos.map(v => (
                    <VideoCard key={v.id} id={v.id} title={v.title} date={v.date} />
                  ))
                )}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
