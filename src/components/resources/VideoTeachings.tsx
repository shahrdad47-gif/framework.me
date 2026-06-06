'use client'
import { useState } from 'react'
import { videoCategories } from '@/data/videos'
import type { Video } from '@/types'

export default function VideoTeachings() {
  const firstCat = videoCategories[0]
  const [activeCatId, setActiveCatId] = useState(firstCat?.id ?? '')
  const [activeVideo, setActiveVideo] = useState<Video | null>(firstCat?.videos[0] ?? null)
  const [isPlaying, setIsPlaying] = useState(false)

  const activeCat = videoCategories.find(c => c.id === activeCatId) ?? firstCat

  const handleCatChange = (catId: string) => {
    const cat = videoCategories.find(c => c.id === catId)
    setActiveCatId(catId)
    setActiveVideo(cat?.videos[0] ?? null)
    setIsPlaying(false)
  }

  const handleVideoSelect = (video: Video) => {
    setActiveVideo(video)
    setIsPlaying(true)
  }

  return (
    <div className="yt-platform">

      {/* ── Category tabs ── */}
      <div className="yt-tabs">
        {videoCategories.map(cat => (
          <button
            key={cat.id}
            className={`yt-tab${activeCatId === cat.id ? ' active' : ''}`}
            onClick={() => handleCatChange(cat.id)}
          >
            <span>{cat.icon}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* ── Main layout: player + sidebar ── */}
      <div className="yt-layout">

        {/* Main player */}
        <div className="yt-main">
          <div className="yt-player" onClick={!isPlaying ? () => setIsPlaying(true) : undefined}>
            {isPlaying && activeVideo ? (
              <iframe
                src={`https://www.youtube.com/embed/${activeVideo.id}?autoplay=1&rel=0`}
                title={activeVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : activeVideo ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://img.youtube.com/vi/${activeVideo.id}/hqdefault.jpg`}
                  alt={activeVideo.title}
                />
                <div className="yt-big-play">
                  <svg viewBox="0 0 68 48" xmlns="http://www.w3.org/2000/svg">
                    <path d="M66.5 7.7c-.8-2.9-2.9-5-5.8-5.8C55.5 0 34 0 34 0S12.5 0 7.3 1.9c-2.9.8-5 2.9-5.8 5.8C-.1 13-.1 24-.1 24s0 11 1.9 16.3c.8 2.9 2.9 5 5.8 5.8C12.5 48 34 48 34 48s21.5 0 26.7-1.9c2.9-.8 5-2.9 5.8-5.8C68.5 35 68.5 24 68.5 24s0-11-2-16.3z" fill="#f00"/>
                    <path d="M27 34l18-10-18-10v20z" fill="#fff"/>
                  </svg>
                </div>
              </>
            ) : null}
          </div>

          {activeVideo && (
            <div className="yt-video-info">
              <h2 className="yt-video-title">{activeVideo.title}</h2>
              <p className="yt-video-meta">Framework:ME{activeVideo.date ? ` · ${activeVideo.date}` : ''}</p>
            </div>
          )}
        </div>

        {/* Playlist sidebar */}
        <div className="yt-sidebar">
          <p className="yt-sidebar-label">
            {activeCat?.icon} {activeCat?.label} &nbsp;·&nbsp; {activeCat?.videos.length} video{activeCat?.videos.length !== 1 ? 's' : ''}
          </p>
          <div className="yt-playlist">
            {activeCat?.videos.map(v => (
              <button
                key={v.id}
                className={`yt-playlist-item${v.id === activeVideo?.id ? ' active' : ''}`}
                onClick={() => handleVideoSelect(v)}
              >
                <div className="yt-pl-thumb">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`https://img.youtube.com/vi/${v.id}/mqdefault.jpg`} alt={v.title} loading="lazy" />
                  {v.id === activeVideo?.id && isPlaying && (
                    <div className="yt-pl-playing">▶</div>
                  )}
                </div>
                <div className="yt-pl-info">
                  <span className="yt-pl-title">{v.title}</span>
                  {v.date && <span className="yt-pl-date">{v.date}</span>}
                </div>
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
