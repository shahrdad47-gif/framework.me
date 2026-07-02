import { notFound } from 'next/navigation'
import { getShortAdmin } from '@/lib/admin-shorts-db'
import ShortForm from '@/components/admin/ShortForm'

interface PageProps {
  params: { id: string }
}

export default async function EditShortPage({ params }: PageProps) {
  const short = await getShortAdmin(params.id)
  if (!short) notFound()

  return (
    <div className="admin-article-form-page">
      <h1>Edit Short</h1>
      <ShortForm mode="edit" initial={short} />
    </div>
  )
}
