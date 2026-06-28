import PageHeroSm from '@/components/ui/PageHeroSm'
import EmptyState from '@/components/ui/EmptyState'
import { contributors } from '@/data/contributors'
import { contributorTranslations } from '@/data/contributor-translations'
import type { LangT } from '@/data/translations'

interface Props { t: LangT; locale: string }

export default function LangContributorsPage({ t, locale }: Props) {
  return (
    <>
      <PageHeroSm
        title={t.sections.authors.title}
        subtitle="The voices and teachers behind Framework:ME."
      />
      <div className="founder-section">
        {contributors.length === 0 ? (
          <EmptyState icon="🤝" message={t.sections.authors.comingSoon} />
        ) : (
          <div className="founder-list">
            {contributors.map((c, i) => {
              const tx = contributorTranslations[c.name]?.[locale]
              const bio  = tx?.bio  ?? c.bio
              const role = tx?.role ?? c.role
              const paragraphs = bio.split('\n\n')
              const initials = c.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
              return (
                <div key={i} className="founder-card">
                  <div className="founder-photo-panel">
                    {c.photo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={c.photo} alt={c.name} className="founder-photo" />
                    ) : (
                      <div className="founder-photo-placeholder">{initials}</div>
                    )}
                    <div className="founder-photo-overlay" />
                  </div>
                  <div className="founder-content">
                    <p className="founder-eyebrow">Framework:ME</p>
                    <h2 className="founder-name">{c.name}</h2>
                    <span className="founder-role">{role}</span>
                    <div className="founder-divider" />
                    <div className="founder-bio">
                      {paragraphs.map((p, j) => <p key={j}>{p}</p>)}
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
