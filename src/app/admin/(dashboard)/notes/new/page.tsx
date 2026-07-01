import NoteForm from '@/components/admin/NoteForm'

export default function NewNotePage() {
  return (
    <div className="admin-article-form-page">
      <h1>New Note</h1>
      <NoteForm mode="create" />
    </div>
  )
}
