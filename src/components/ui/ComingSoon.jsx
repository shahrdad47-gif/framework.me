export default function ComingSoon({ icon, title, description }) {
  return (
    <div className="coming-soon-page">
      <div className="cs-inner">
        <div className="cs-ornament">✦</div>
        <p className="cs-eyebrow">Coming Soon</p>
        <h2>{title}</h2>
        <p>{description}</p>
        <div className="cs-divider"></div>
        <a href="mailto:frameworkmenaca@gmail.com" className="btn-give">Get Notified</a>
      </div>
    </div>
  )
}
