import type { ReactNode } from 'react'
import Link from 'next/link'
import AdminLogoutButton from '@/components/admin/AdminLogoutButton'

export const metadata = {
  title: 'Admin — Framework:ME',
}

export default function AdminDashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="admin-shell">
      <div className="admin-topbar">
        <div className="container admin-topbar-inner">
          <Link href="/admin/articles" className="admin-brand">Framework:ME Admin</Link>
          <nav className="admin-nav">
            <Link href="/admin/articles">Articles</Link>
            <Link href="/admin/videos">Videos</Link>
            <Link href="/admin/shorts">Shorts</Link>
            <Link href="/admin/series">Series</Link>
            <Link href="/admin/notes">Notes</Link>
          </nav>
          <AdminLogoutButton />
        </div>
      </div>
      <div className="container admin-content">{children}</div>
    </div>
  )
}
