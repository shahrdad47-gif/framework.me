import PageHeroSm from '@/components/ui/PageHeroSm'
import EmptyState from '@/components/ui/EmptyState'
import { contributors } from '@/data/contributors'

export const metadata = { title: 'Contributors — Framework:ME' }

export default function Contributors() {
  return (
    <>
      <PageHeroSm
        title="Contributors"
        subtitle="The voices and teachers behind Framework:ME."
      />
      <div className="container" style={{ padding: '48px 32px 80px' }}>
        {contributors.length === 0 ? (
          <EmptyState icon="🤝" message="Contributor profiles coming soon." />
        ) : (
          <div className="contributors-grid">
            {contributors.map((c, i) => {
              const initials = c.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
              return (
                <div key={i} className="contributor-card">
                  {c.photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={c.photo} alt={c.name} className="contributor-avatar" />
                  ) : (
                    <div className="contributor-avatar-placeholder">{initials}</div>
                  )}
                  <h3>{c.name}</h3>
                  <span className="role">{c.role}</span>
                  <p>{c.bio}</p>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </>
  )
}
