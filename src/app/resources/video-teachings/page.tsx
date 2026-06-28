import Link from 'next/link'
import BackButton from '@/components/ui/BackButton'
import VideoTeachings from '@/components/resources/VideoTeachings'
import { getVideoCategories } from '@/lib/db'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Video Teachings — Framework:ME' }

export default async function VideoTeachingsPage() {
  const categories = await getVideoCategories()

  return (
    <div className="res-sub-page">
      <div className="res-sub-hero">
        <div className="res-sub-hero-bg" />
        <div className="container res-sub-hero-inner">
          <BackButton fallbackHref="/resources" label={"All Resources"} className="res-sub-back" />
          <span className="res-sub-eyebrow">Framework:ME Resources</span>
          <h1>Video Teachings</h1>
          <p>Explore deep biblical teachings to strengthen your faith and understanding of God&apos;s purposes.</p>
        </div>
      </div>
      <div className="container res-sub-body">
        <VideoTeachings categories={categories} />
      </div>
    </div>
  )
}
