'use client'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState, useRef, useEffect } from 'react'
import { getArticlesForNation } from '@/lib/articles'
import { translations, type Locale } from '@/data/translations'

const navLinksEN = [
  { href: '/',                   label: 'About' },
  { href: '/resources/articles', label: 'Articles' },
  { href: '/nations',            label: 'Nations & Prophecy' },
  { href: '/end-times',          label: 'End Times' },
  { href: '/geopolitics',        label: 'Geopolitics' },
  { href: '/resources',          label: 'Resources' },
  { href: '/contributors',       label: 'Authors' },
]

const localeMap: Record<string, Locale> = { '/fa': 'fa', '/hy': 'hy', '/pt': 'pt', '/ar': 'ar' }

const languages = [
  { code: 'EN', label: 'English',   native: 'English',   href: '/',    active: true  },
  { code: 'FA', label: 'Farsi',     native: 'فارسی',     href: '/fa',  active: false },
  { code: 'HY', label: 'Armenian',  native: 'Հայerén',   href: '/hy',  active: false },
  { code: 'PT', label: 'Portuguese',native: 'Português', href: '/pt',  active: false },
  { code: 'AR', label: 'Arabic',    native: 'العربية',   href: '/ar',  active: false },
]

const countries: { name: string; svg: string | null; key: string }[] = [
  { name: 'Iran',         svg: 'FME_Iran_map.svg',    key: 'iran' },
  { name: 'Lebanon',      svg: 'FME_Lebanon_map.svg',  key: 'lebanon' },
  { name: 'Syria',        svg: 'FME_Syria_map.svg',    key: 'syria' },
  { name: 'Islam',        svg: null,                    key: 'islam' },
  { name: 'Armenia',      svg: 'FME_Armenia_map.svg',  key: 'armenia' },
  { name: 'Jordan',       svg: 'FME_Jordan_map.svg',   key: 'jordan' },
  { name: 'Saudi Arabia', svg: 'FME_KSA_map.svg',      key: 'saudi-arabia' },
  { name: 'Egypt',        svg: 'FME_Egypt_map.svg',    key: 'egypt' },
]

function GlobeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  )
}

export default function Header() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen]   = useState(false)
  const [langOpen, setLangOpen]   = useState(false)
  const langRef = useRef<HTMLDivElement>(null)

  // Close lang dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const currentLang = languages.find(l => l.href === pathname) ?? languages[0]

  // Detect locale from pathname to translate nav
  const localeKey = Object.keys(localeMap).find(k => pathname === k || pathname.startsWith(k + '/'))
  const activeLocale = localeKey ? localeMap[localeKey] : null
  const navT = activeLocale ? translations[activeLocale].nav : null

  const navLinks = navT && activeLocale
    ? [
        { href: `/${activeLocale}`,                          label: navT.about },
        { href: `/${activeLocale}/articles`,                 label: navT.articles },
        { href: `/${activeLocale}/nations`,                  label: navT.nations },
        { href: `/${activeLocale}/end-times`,                label: navT.endTimes },
        { href: `/${activeLocale}/geopolitics`,              label: navT.geopolitics },
        { href: `/${activeLocale}/resources`,                label: navT.resources },
        { href: `/${activeLocale}/contributors`,             label: navT.authors },
      ]
    : navLinksEN

  const donateLabel = navT ? navT.donate : 'Donate'
  const contactLabel = navT ? navT.contactUs : 'Contact Us'

  return (
    <header className="site-header" id="siteHeader">

      {/* ── Tier 1: Bronze logo + actions ── */}
      <div className="hdr-top">
        <div className="hdr-container">
          <Link href="/" className="hdr-logo" onClick={() => setMenuOpen(false)}>
            <span className="hdr-logo-name">Framework<em>:ME</em></span>
            <span className="hdr-logo-sub">Understanding the Alignment of Nations in the Last Days</span>
          </Link>
          <div className="hdr-top-actions">
            <a href="mailto:frameworkmenaca@gmail.com" className="hdr-top-link">{contactLabel}</a>
            <a
              href="https://www.zeffy.com/en-US/donation-form/lee-family-monthly-support"
              target="_blank"
              rel="noopener noreferrer"
              className="hdr-donate-btn"
            >
              ♥ {donateLabel}
            </a>
          </div>
        </div>
      </div>

      {/* ── Tier 2: White nav links + language switcher ── */}
      <div className="hdr-nav">
        <div className="hdr-container">
          <nav className={`hdr-links${menuOpen ? ' open' : ''}`}>
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`hdr-link${pathname === href ? ' active' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Language switcher */}
          <div className="hdr-lang-wrap" ref={langRef}>
            <button
              className="hdr-lang-btn"
              onClick={() => setLangOpen(o => !o)}
              aria-label="Select language"
              aria-expanded={langOpen}
            >
              <GlobeIcon />
              <span>{currentLang.code}</span>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </button>
            {langOpen && (
              <div className="hdr-lang-dropdown">
                {languages.map(lang => (
                  <Link
                    key={lang.code}
                    href={lang.href}
                    className={`hdr-lang-item${currentLang.code === lang.code ? ' active' : ''}`}
                    onClick={() => setLangOpen(false)}
                    dir={lang.code === 'FA' || lang.code === 'AR' ? 'rtl' : 'ltr'}
                  >
                    <span className="hdr-lang-code">{lang.code}</span>
                    <span className="hdr-lang-native">{lang.native}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <button
            className="hdr-hamburger"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span></span><span></span><span></span>
          </button>
        </div>

        {/* Mobile drawer */}
        {menuOpen && (
          <div className="hdr-mobile-drawer">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`hdr-mobile-link${pathname === href ? ' active' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
            {/* Mobile language options */}
            <div className="hdr-mobile-langs">
              {languages.map(lang => (
                <Link
                  key={lang.code}
                  href={lang.href}
                  className={`hdr-mobile-lang${currentLang.code === lang.code ? ' active' : ''}`}
                  onClick={() => setMenuOpen(false)}
                  dir={lang.code === 'FA' || lang.code === 'AR' ? 'rtl' : 'ltr'}
                >
                  <span className="hdr-lang-code">{lang.code}</span>
                  <span className="hdr-lang-native">{lang.native}</span>
                </Link>
              ))}
            </div>
            <div className="hdr-mobile-countries">
              {countries.map(c => (
                <Link
                  key={c.key}
                  href={`/resources/articles?nation=${c.key}`}
                  className="hdr-mobile-country"
                  onClick={() => setMenuOpen(false)}
                >
                  {c.svg
                    ? <Image src={`/img/${c.svg}`} alt={c.name} width={20} height={20} />
                    : <span className="hdr-country-symbol">☪️</span>
                  }
                  <span>{c.name}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── Tier 3: Red country bar ── */}
      <div className="hdr-countries">
        <div className="hdr-container">
          {countries.map((c, i) => {
            const hasArticles = getArticlesForNation(c.key).length > 0
            return (
              <span key={c.key} className="hdr-country-wrap">
                {i > 0 && <span className="hdr-country-sep" />}
                {hasArticles ? (
                  <Link href={`/resources/articles?nation=${c.key}`} className="hdr-country">
                    {c.svg
                      ? <Image src={`/img/${c.svg}`} alt={c.name} width={20} height={20} className="hdr-country-map" />
                      : <span className="hdr-country-symbol">☪️</span>
                    }
                    <span className="hdr-country-name">{c.name}</span>
                  </Link>
                ) : (
                  <span className="hdr-country hdr-country-disabled">
                    {c.svg
                      ? <Image src={`/img/${c.svg}`} alt={c.name} width={20} height={20} className="hdr-country-map" />
                      : <span className="hdr-country-symbol">☪️</span>
                    }
                    <span className="hdr-country-name">{c.name}</span>
                  </span>
                )}
              </span>
            )
          })}
        </div>
      </div>

    </header>
  )
}
