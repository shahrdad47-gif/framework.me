export interface Article {
  slug: string
  title: string
  author: string
  date: string
  nations: string[]
  sections?: string[]   // e.g. ['geopolitics', 'end-times']
  summary: string
  pdf?: string
  // Rich-text HTML from the admin Quill editor — rendered with
  // dangerouslySetInnerHTML, safe because src/lib/sanitize.ts strips it to
  // an allowlist before it's ever stored.
  body: string
}

export interface Nation {
  key: string
  name: string
  flag: string
  svg?: string
}

export interface Video {
  id: string
  title: string
  date?: string
  speaker?: string
  // Rich-text HTML from the admin Quill editor, same allowlist/sanitization
  // as Article.body — rendered with dangerouslySetInnerHTML on the video
  // detail page.
  description?: string
}

export interface VideoSeries {
  id: string
  title: string
  description: string
  speaker?: string
  topic: string
  episodes: Video[]
}

export interface VideoCategory {
  id: string
  label: string
  icon: string
  description?: string
  videos: Video[]
}

export interface Short {
  id: string
  title: string
}

export interface Book {
  title: string
  author: string
  description: string
  link?: string
  coverUrl?: string
}

export interface Contributor {
  name: string
  role: string
  bio: string
  photo?: string
}

export interface Note {
  slug: string
  title: string
  description: string
  pdf: string
  date: string
}
