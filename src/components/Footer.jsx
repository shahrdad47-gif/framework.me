import Link from 'next/link'

const navLinks = [
  { href: '/',             label: 'About' },
  { href: '/resources',    label: 'Resources' },
  { href: '/contributors', label: 'Contributors' },
  { href: '/geopolitics',  label: 'Geopolitics' },
  { href: '/ministries',   label: 'Ministries' },
]

const resourceLinks = [
  { href: '/resources/video-teachings', label: 'Video Teachings' },
  { href: '/resources/books',           label: 'Books' },
  { href: '/resources/articles',        label: 'Articles by Nation' },
  { href: '/resources/notes',           label: 'Notes' },
  { href: '/resources/shorts',          label: '1 Min Shorts' },
]

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="container footer-grid">

          <div className="footer-brand">
            <div className="footer-logo">Framework<em>:ME</em></div>
            <p>A free teaching and resource library preparing the global Church for the return of Christ.</p>
            <div className="footer-social">
              <a href="https://www.youtube.com/@frameworkme" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          <div className="footer-nav">
            <h4>Navigate</h4>
            <ul>
              {navLinks.map(({ href, label }) => (
                <li key={href}><Link href={href}>{label}</Link></li>
              ))}
            </ul>
          </div>

          <div className="footer-resources">
            <h4>Resources</h4>
            <ul>
              {resourceLinks.map(({ href, label }) => (
                <li key={href}><Link href={href}>{label}</Link></li>
              ))}
            </ul>
          </div>

          <div className="footer-connect">
            <h4>Connect</h4>
            <ul>
              <li><a href="mailto:frameworkmenaca@gmail.com">frameworkmenaca@gmail.com</a></li>
            </ul>
            <a
              href="https://www.zeffy.com/en-US/donation-form/lee-family-monthly-support"
              target="_blank" rel="noopener noreferrer"
              className="btn-give footer-give"
            >
              Support Our Work
            </a>
          </div>

        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <p>© 2024 Framework:ME. All rights reserved. &nbsp;·&nbsp; Free to share for the Kingdom.</p>
        </div>
      </div>
    </footer>
  )
}
