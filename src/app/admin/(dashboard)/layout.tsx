import type { ReactNode } from 'react'
import Link from 'next/link'
import AdminNav from '@/components/admin/AdminNav'
import AdminLogoutButton from '@/components/admin/AdminLogoutButton'

export const metadata = {
  title: 'Admin — Framework:ME',
}

export default function AdminDashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <Link href="/admin/articles" className="admin-sidebar-brand">
          Framework<em>:ME</em>
          <span className="admin-sidebar-brand-sub">Admin</span>
        </Link>
        <AdminNav />
        <div className="admin-sidebar-footer">
          <AdminLogoutButton />
        </div>
      </aside>
      <div className="admin-main">
        <div className="admin-content">{children}</div>
      </div>
    </div>
  )
}
