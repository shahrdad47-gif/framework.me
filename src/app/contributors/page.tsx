import PageHeroSm from '@/components/ui/PageHeroSm'
import EmptyState from '@/components/ui/EmptyState'
import { contributors } from '@/data/contributors'

export const metadata = { title: 'Contributors — Framework:ME' }

export default function Contributors() {
  return (
    <>
      <PageHeroSm
        title="Authors & Contributors"
        subtitle="The voices and teachers behind Framework:ME."
      />
      <div className="founder-section">
        {contributors.length === 0 ? (
          <EmptyState icon="🤝" message="Contributor profiles coming soon." />
        ) : (
          <div className="founder-list">
            {contributors.map((c, i) => {
              const paragraphs = c.bio.split('\n\n')
              const initials = c.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
              return (
                <div key={i} className="founder-card">
                  {/* Photo panel */}
                  <div className="founder-photo-panel">
                    {c.photo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={c.photo} alt={c.name} className="founder-photo" />
                    ) : (
                      <div className="founder-photo-placeholder">{initials}</div>
                    )}
                    <div className="founder-photo-overlay" />
                  </div>

                  {/* Content panel */}
                  <div className="founder-content">
                    <p className="founder-eyebrow">Framework:ME</p>
                    <h2 className="founder-name">{c.name}</h2>
                    <span className="founder-role">{c.role}</span>
                    <div className="founder-divider" />
                    <div className="founder-bio">
                      {paragraphs.map((p, j) => (
                        <p key={j}>{p}</p>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </>
  )
}
