interface Props {
  title: string
  subtitle?: string
}

export default function PageHeroSm({ title, subtitle }: Props) {
  return (
    <div className="page-hero-sm">
      <div className="container">
        <h2>{title}</h2>
        {subtitle && <p>{subtitle}</p>}
      </div>
    </div>
  )
}
