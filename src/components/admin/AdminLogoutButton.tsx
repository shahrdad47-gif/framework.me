'use client'
import { useRouter } from 'next/navigation'

export default function AdminLogoutButton() {
  const router = useRouter()

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <button className="admin-btn admin-btn-ghost" onClick={handleLogout}>
      Log out
    </button>
  )
}
