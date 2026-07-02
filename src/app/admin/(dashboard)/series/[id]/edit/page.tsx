import { notFound } from 'next/navigation'
import { getSeriesOneAdmin } from '@/lib/admin-series-db'
import SeriesForm from '@/components/admin/SeriesForm'

interface PageProps {
  params: { id: string }
}

export default async function EditSeriesPage({ params }: PageProps) {
  const series = await getSeriesOneAdmin(params.id)
  if (!series) notFound()

  return (
    <div className="admin-article-form-page">
      <h1>Edit Series</h1>
      <SeriesForm mode="edit" initial={series} />
    </div>
  )
}
