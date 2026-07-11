'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { translations, type Locale } from '@/data/translations'

const localeMap: Record<string, Locale> = { '/fa': 'fa', '/hy': 'hy', '/pt': 'pt', '/ar': 'ar' }

const defaultNav = [
  { href: '/',                   label: 'About' },
  { href: '/resources/articles', label: 'Articles' },
  { href: '/nations',            label: 'Nations & Prophecy' },
  { href: '/end-times',          label: 'End Times' },
  { href: '/geopolitics',        label: 'Geopolitics' },
  { href: '/resources',          label: 'Resources' },
  { href: '/contributors',       label: 'Authors' },
]

const defaultResources = [
  { href: '/resources/video-teachings', label: 'Video Teachings' },
  { href: '/resources/books',           label: 'Books' },
  { href: '/resources/articles',        label: 'Articles by Nation' },
  { href: '/resources/notes',           label: 'Notes' },
  { href: '/resources/shorts',          label: '1 Min Shorts' },
]

export default function Footer() {
  const pathname = usePathname()

  const localeKey = Object.keys(localeMap).find(k => pathname === k || pathname.startsWith(k + '/'))
  const locale = localeKey ? localeMap[localeKey] : null
  const t = locale ? translations[locale] : null
  const isRtl = t?.dir === 'rtl'

  const brand = t?.footer.brand ?? 'A free teaching and resource library preparing the global Church for the return of Christ.'
  const navigateLabel = t?.footer.navigate ?? 'Navigate'
  const resourcesLabel = t?.footer.resources ?? 'Resources'
  const connectLabel = t?.footer.connect ?? 'Connect'
  const supportLabel = t?.footer.support ?? 'Support Our Work'
  const copyright = t?.footer.copyright ?? '© 2024 Framework:ME. All rights reserved. · Free to share for the Kingdom.'

  const base = locale ? `/${locale}` : ''

  const navLinks = t ? [
    { href: `${base}`,                    label: t.nav.about },
    { href: `${base}/articles`,           label: t.nav.articles },
    { href: `${base}/nations`,            label: t.nav.nations },
    { href: `${base}/end-times`,          label: t.nav.endTimes },
    { href: `${base}/geopolitics`,        label: t.nav.geopolitics },
    { href: `${base}/resources`,          label: t.nav.resources },
    { href: `${base}/contributors`,       label: t.nav.authors },
  ] : defaultNav

  const resourceLinks = t && locale ? [
    { href: `/${locale}/resources/video-teachings`, label: t.footer.videoTeachings },
    { href: `/${locale}/resources/books`,           label: t.footer.books },
    { href: `/${locale}/articles`,                  label: t.footer.articlesByNation },
    { href: `/${locale}/resources/notes`,           label: t.footer.notes },
    { href: `/${locale}/resources/shorts`,          label: t.footer.shorts },
  ] : defaultResources

  return (
    <footer className="site-footer" dir={isRtl ? 'rtl' : undefined}>
      <div className="footer-top">
        <div className="container footer-grid">

          <div className="footer-brand">
            <div className="footer-logo">Framework<em>:ME</em></div>
            <p>{brand}</p>
            <div className="footer-social">
              <a href="https://www.youtube.com/@frameworkme-earth" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          <div className="footer-nav">
            <h4>{navigateLabel}</h4>
            <ul>
              {navLinks.map(({ href, label }) => (
                <li key={href}><Link href={href}>{label}</Link></li>
              ))}
            </ul>
          </div>

          <div className="footer-resources">
            <h4>{resourcesLabel}</h4>
            <ul>
              {resourceLinks.map(({ href, label }) => (
                <li key={href}><Link href={href}>{label}</Link></li>
              ))}
            </ul>
          </div>

          <div className="footer-connect">
            <h4>{connectLabel}</h4>
            <ul>
              <li><a href="mailto:frameworkmenaca@gmail.com">frameworkmenaca@gmail.com</a></li>
            </ul>
            <a
              href="https://www.zeffy.com/en-US/donation-form/lee-family-monthly-support"
              target="_blank" rel="noopener noreferrer"
              className="btn-give footer-give"
            >
              {supportLabel}
            </a>
          </div>

        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <p>{copyright}</p>
        </div>
      </div>
    </footer>
  )
}
