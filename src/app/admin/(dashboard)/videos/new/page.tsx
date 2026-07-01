import { getVideoCategoriesAdmin } from '@/lib/admin-videos-db'
import VideoForm from '@/components/admin/VideoForm'

export const dynamic = 'force-dynamic'

export default async function NewVideoPage() {
  const categories = await getVideoCategoriesAdmin()

  return (
    <div className="admin-article-form-page">
      <h1>New Video</h1>
      <VideoForm mode="create" categories={categories} />
    </div>
  )
}
