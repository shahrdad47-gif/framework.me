'use client'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import VideoTeachings from './VideoTeachings'
import ArticlesByNation from './ArticlesByNation'
import EmptyState from '@/components/ui/EmptyState'

const tabs = [
  { id: 'video-teachings', label: 'Video Teachings', icon: '▶' },
  { id: 'books',           label: 'Books',           icon: '📚' },
  { id: 'articles',        label: 'Articles by Nation', icon: '🌐' },
  { id: 'notes',           label: 'Notes',           icon: '📝' },
  { id: 'shorts',          label: '1 Min Shorts',    icon: '⚡' },
]

export default function ResourcesPage() {
  const searchParams = useSearchParams()
  const [active, setActive] = useState('video-teachings')

  useEffect(() => {
    const tab = searchParams.get('tab')
    if (tab && tabs.find(t => t.id === tab)) setActive(tab)
  }, [searchParams])

  return (
    <div className="resources-wrapper">
      <div className="res-sidebar">
        {tabs.map(t => (
          <button
            key={t.id}
            className={`res-tab${active === t.id ? ' active' : ''}`}
            onClick={() => setActive(t.id)}
          >
            <span className="res-tab-icon">{t.icon}</span>
            {t.label}
          </button>
        ))}
      </div>

      <div className="res-main">

        {active === 'video-teachings' && (
          <div>
            <div className="res-panel-header">
              <h3>Video Teachings</h3>
              <p>Browse teachings from the Framework:ME YouTube channel, organized by topic.</p>
            </div>
            <VideoTeachings />
          </div>
        )}

        {active === 'books' && (
          <div>
            <div className="res-panel-header">
              <h3>Books</h3>
              <p>Recommended reading for deeper study of God&apos;s plan for the nations.</p>
            </div>
            <EmptyState icon="📚" message="Book recommendations coming soon." />
          </div>
        )}

        {active === 'articles' && <ArticlesByNation />}

        {active === 'notes' && (
          <div>
            <div className="res-panel-header">
              <h3>Notes</h3>
              <p>Downloadable study notes and sermon outlines.</p>
            </div>
            <EmptyState icon="📝" message="Study notes coming soon." />
          </div>
        )}

        {active === 'shorts' && (
          <div>
            <div className="res-panel-header">
              <h3>1 Minute Shorts</h3>
              <p>Quick one-minute teachings from the Framework:ME channel.</p>
            </div>
            <EmptyState icon="⚡" message="Shorts coming soon." />
          </div>
        )}

      </div>
    </div>
  )
}
