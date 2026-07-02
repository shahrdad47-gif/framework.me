import SeriesForm from '@/components/admin/SeriesForm'

export default function NewSeriesPage() {
  return (
    <div className="admin-article-form-page">
      <h1>New Series</h1>
      <SeriesForm mode="create" />
    </div>
  )
}
