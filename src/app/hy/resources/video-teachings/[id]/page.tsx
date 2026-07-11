import { notFound } from 'next/navigation'
import { videoCategories } from '@/data/videos'
import { getVideoById } from '@/lib/db'
import { translations } from '@/data/translations'
import VideoDetailView from '@/components/resources/VideoDetailView'

const LOCALE = 'hy'

export function generateStaticParams() {
  return videoCategories.flatMap(cat => cat.videos.map(v => ({ id: v.id })))
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const found = await getVideoById(params.id)
  if (found) return { title: `${found.video.title} — Framework:ME` }
  return { title: 'Video — Framework:ME' }
}

export default async function VideoDetailPage({ params }: { params: { id: string } }) {
  const found = await getVideoById(params.id)
  if (!found) return notFound()

  const t = translations[LOCALE]
  const s = t.sections.videoTeachings
  const { video, category: cat0 } = found
  const cat = {
    ...cat0,
    label: s.categories[cat0.id]?.label ?? cat0.label,
    description: s.categories[cat0.id]?.desc ?? cat0.description,
  }
  const index = cat0.videos.findIndex(v => v.id === params.id)
  const prev = index > 0 ? cat0.videos[index - 1] : null
  const next = index !== -1 && index < cat0.videos.length - 1 ? cat0.videos[index + 1] : null
  const related = cat0.videos.filter(v => v.id !== params.id)

  return (
    <VideoDetailView
      video={video}
      category={cat}
      prev={prev}
      next={next}
      related={related}
      hrefBase={`/${LOCALE}`}
      dir={t.dir}
      t={{
        breadcrumbRoot: s.title,
        allVideos: s.detail.allVideos,
        prev: t.sections.player.prev,
        next: t.sections.player.next,
        bibleTeaching: t.sections.player.bibleTeaching,
        moreFrom: s.detail.moreFrom,
        notesTitle: t.sections.player.notesTitle,
        notesSub: t.sections.player.notesSub,
        downloadPdf: t.sections.player.downloadPdf,
      }}
    />
  )
}
