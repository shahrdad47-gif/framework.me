'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { ReactElement } from 'react'

const ICON_PROPS = {
  width: 18,
  height: 18,
  viewBox: '0 0 24 24',
  fill: 'none' as const,
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

const NAV_ITEMS: { href: string; label: string; icon: ReactElement }[] = [
  {
    href: '/admin/articles',
    label: 'Articles',
    icon: <svg {...ICON_PROPS}><path d="M4 4h13a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H4z" /><path d="M4 4v17" /><line x1="9" y1="9" x2="15" y2="9" /><line x1="9" y1="13" x2="15" y2="13" /></svg>,
  },
  {
    href: '/admin/videos',
    label: 'Videos',
    icon: <svg {...ICON_PROPS}><rect x="2" y="5" width="20" height="14" rx="2.5" /><path d="M10 9.5v5l4.5-2.5z" fill="currentColor" stroke="none" /></svg>,
  },
  {
    href: '/admin/shorts',
    label: 'Shorts',
    icon: <svg {...ICON_PROPS}><rect x="7" y="2" width="10" height="20" rx="2.5" /><path d="M10.5 9v6l4-3z" fill="currentColor" stroke="none" /></svg>,
  },
  {
    href: '/admin/series',
    label: 'Series',
    icon: <svg {...ICON_PROPS}><rect x="4" y="4" width="12" height="12" rx="1.5" /><path d="M9 8h11v11a1 1 0 0 1-1 1H9z" /></svg>,
  },
  {
    href: '/admin/notes',
    label: 'Notes',
    icon: <svg {...ICON_PROPS}><path d="M4 3h13l3 3v15H4z" /><path d="M17 3v3h3" /><line x1="8" y1="11" x2="16" y2="11" /><line x1="8" y1="15" x2="16" y2="15" /></svg>,
  },
  {
    href: '/admin/books',
    label: 'Books',
    icon: <svg {...ICON_PROPS}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>,
  },
]

export default function AdminNav() {
  const pathname = usePathname()

  return (
    <nav className="admin-sidebar-nav">
      {NAV_ITEMS.map(item => {
        const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`admin-nav-link${active ? ' active' : ''}`}
            aria-current={active ? 'page' : undefined}
          >
            <span className="admin-nav-icon">{item.icon}</span>
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}
