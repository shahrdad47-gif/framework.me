import { notFound } from 'next/navigation'
import { videoCategories } from '@/data/videos'
import { getVideoById } from '@/lib/db'
import VideoDetailView from '@/components/resources/VideoDetailView'

const t = {
  breadcrumbRoot: 'Video Teachings',
  allVideos: 'All Videos',
  prev: 'Prev',
  next: 'Next',
  bibleTeaching: 'Bible Teaching',
  moreFrom: 'More from',
  notesTitle: 'Notes',
  notesSub: 'Follow along with this teaching',
  downloadPdf: 'Download PDF',
}

export function generateStaticParams() {
  return videoCategories.flatMap(cat =>
    cat.videos.map(v => ({ id: v.id }))
  )
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const found = await getVideoById(params.id)
  if (found) return { title: `${found.video.title} — Framework:ME` }
  return { title: 'Video — Framework:ME' }
}

export default async function VideoDetailPage({ params }: { params: { id: string } }) {
  const found = await getVideoById(params.id)
  if (!found) return notFound()

  const { video, category: cat } = found
  const index = cat.videos.findIndex(v => v.id === params.id)
  const prev = index > 0 ? cat.videos[index - 1] : null
  const next = index !== -1 && index < cat.videos.length - 1 ? cat.videos[index + 1] : null
  const related = cat.videos.filter(v => v.id !== params.id)

  return <VideoDetailView video={video} category={cat} prev={prev} next={next} related={related} t={t} />
}
