import Link from 'next/link'

export default function Hero() {
  return (
    <div className="hero">
      <div className="hero-bg"></div>
      <div className="hero-content">
        <p className="hero-eyebrow">Welcome to Framework:ME</p>
        <h1 className="hero-title">Discover God&apos;s Plan for<br /><em>the Restoration of Isaac and Ishmael</em></h1>
        <p className="hero-sub">
          A free teaching and resource library focused on understanding God&apos;s plan<br />
          for the nations — centered on Israel, Ishmael and the Middle East
        </p>
        <div className="hero-divider"></div>
        <div className="hero-actions">
          <Link href="/resources" className="btn-give">Explore Resources</Link>
          <a
            href="https://www.youtube.com/@frameworkme-earth"
            target="_blank" rel="noopener noreferrer"
            className="btn-ghost-light"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            YouTube Channel
          </a>
        </div>
      </div>
      <div className="hero-scroll-hint">
        <span>Scroll</span>
        <div className="scroll-line"></div>
      </div>
    </div>
  )
}
