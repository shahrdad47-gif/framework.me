import { notFound } from 'next/navigation'
import { shortsData } from '@/data/videos'
import { getShorts } from '@/lib/db'
import { translations } from '@/data/translations'
import ShortDetailView from '@/components/resources/ShortDetailView'

const LOCALE = 'hy'

export function generateStaticParams() {
  return shortsData.map(s => ({ id: s.id }))
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const shorts = await getShorts()
  const short = shorts.find(s => s.id === params.id)
  if (short) return { title: `${short.title} — Framework:ME` }
  return { title: 'Short — Framework:ME' }
}

export default async function ShortDetailPage({ params }: { params: { id: string } }) {
  const shorts = await getShorts()
  const index = shorts.findIndex(s => s.id === params.id)
  if (index === -1) return notFound()

  const t = translations[LOCALE]
  const sd = t.sections.shorts.detail

  const short = shorts[index]
  const prev = index > 0 ? shorts[index - 1] : null
  const next = index < shorts.length - 1 ? shorts[index + 1] : null
  const related = shorts.filter(s => s.id !== params.id).slice(0, 10)

  return (
    <ShortDetailView
      short={short}
      prev={prev}
      next={next}
      related={related}
      hrefBase={`/${LOCALE}`}
      dir={t.dir}
      t={{
        breadcrumbRoot: t.sections.shorts.title,
        allShorts: sd.allShorts,
        prev: t.sections.player.prev,
        next: t.sections.player.next,
        bibleTeaching: t.sections.player.bibleTeaching,
        oneMinuteShort: sd.oneMinuteShort,
        moreShorts: sd.moreShorts,
        defaultDesc: sd.defaultDesc,
        notesTitle: t.sections.player.notesTitle,
        notesSub: t.sections.player.notesSub,
        downloadPdf: t.sections.player.downloadPdf,
      }}
    />
  )
}
