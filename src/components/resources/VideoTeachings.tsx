'use client'
import { videoCategories } from '@/data/videos'
import VideoCard from './VideoCard'

export default function VideoTeachings() {
  return (
    <div className="vt-platform">
      {videoCategories.map(cat => (
        <section key={cat.id} className="vt-section">
          <div className="vt-section-header">
            <span className="vt-section-icon">{cat.icon}</span>
            <h2 className="vt-section-title">{cat.label}</h2>
            <span className="vt-section-count">
              {cat.videos.length} video{cat.videos.length !== 1 ? 's' : ''}
            </span>
          </div>
          <div className="vt-grid">
            {cat.videos.map(v => (
              <VideoCard
                key={v.id}
                id={v.id}
                title={v.title}
                date={v.date}
                categoryLabel={cat.label}
                categoryIcon={cat.icon}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
