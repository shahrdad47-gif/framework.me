import { notFound } from 'next/navigation'
import { getVideoAdmin, getVideoCategoriesAdmin } from '@/lib/admin-videos-db'
import VideoForm from '@/components/admin/VideoForm'

interface PageProps {
  params: { id: string }
}

export default async function EditVideoPage({ params }: PageProps) {
  const [video, categories] = await Promise.all([
    getVideoAdmin(params.id),
    getVideoCategoriesAdmin(),
  ])
  if (!video) notFound()

  return (
    <div className="admin-article-form-page">
      <h1>Edit Video</h1>
      <VideoForm mode="edit" categories={categories} initial={video} />
    </div>
  )
}
