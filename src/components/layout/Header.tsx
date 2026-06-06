'use client'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { getArticlesForNation } from '@/lib/articles'

const navLinks = [
  { href: '/',                   label: 'About' },
  { href: '/resources/articles', label: 'Articles' },
  { href: '/nations',            label: 'Nations & Prophecy' },
  { href: '/end-times',          label: 'End Times' },
  { href: '/geopolitics',        label: 'Geopolitics' },
  { href: '/resources',          label: 'Resources' },
  { href: '/contributors',       label: 'Authors' },
]

const countries = [
  { name: 'Iran',         svg: 'FME_Iran_map.svg',    key: 'iran' },
  { name: 'Lebanon',      svg: 'FME_Lebanon_map.svg',  key: 'lebanon' },
  { name: 'Syria',        svg: 'FME_Syria_map.svg',    key: 'syria' },
  { name: 'Armenia',      svg: 'FME_Armenia_map.svg',  key: 'armenia' },
  { name: 'Jordan',       svg: 'FME_Jordan_map.svg',   key: 'jordan' },
  { name: 'Saudi Arabia', svg: 'FME_KSA_map.svg',      key: 'saudi-arabia' },
  { name: 'Egypt',        svg: 'FME_Egypt_map.svg',    key: 'egypt' },
]

export default function Header() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="site-header" id="siteHeader">

      {/* ── Tier 1: Bronze logo + Give/Contact ── */}
      <div className="hdr-top">
        <div className="hdr-container">
          <Link href="/" className="hdr-logo" onClick={() => setMenuOpen(false)}>
            <span className="hdr-logo-name">Framework<em>:ME</em></span>
            <span className="hdr-logo-sub">Understanding the Alignment of Nations in the Last Days</span>
          </Link>
          <div className="hdr-top-actions">
            <a href="mailto:frameworkmenaca@gmail.com" className="hdr-top-link">Contact Us</a>
          </div>
        </div>
      </div>

      {/* ── Tier 2: White nav links ── */}
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
            <div className="hdr-mobile-countries">
              {countries.map(c => (
                <Link
                  key={c.key}
                  href={`/resources/articles?nation=${c.key}`}
                  className="hdr-mobile-country"
                  onClick={() => setMenuOpen(false)}
                >
                  <Image src={`/img/${c.svg}`} alt={c.name} width={20} height={20} />
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
                    <Image src={`/img/${c.svg}`} alt={c.name} width={20} height={20} className="hdr-country-map" />
                    <span className="hdr-country-name">{c.name}</span>
                  </Link>
                ) : (
                  <span className="hdr-country hdr-country-disabled">
                    <Image src={`/img/${c.svg}`} alt={c.name} width={20} height={20} className="hdr-country-map" />
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
