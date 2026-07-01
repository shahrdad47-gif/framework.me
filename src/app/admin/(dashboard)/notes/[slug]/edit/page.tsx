import { notFound } from 'next/navigation'
import { getNoteWithMetaAdmin } from '@/lib/admin-notes-db'
import NoteForm from '@/components/admin/NoteForm'

interface PageProps {
  params: { slug: string }
}

export default async function EditNotePage({ params }: PageProps) {
  const note = await getNoteWithMetaAdmin(params.slug)
  if (!note) notFound()

  return (
    <div className="admin-article-form-page">
      <h1>Edit Note</h1>
      <NoteForm mode="edit" initial={note} />
    </div>
  )
}
