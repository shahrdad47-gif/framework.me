export interface ScriptureItem {
  text: string
  ref: string
}

export type ArticleBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'subheading'; text: string }
  | { type: 'closing'; text: string }
  | { type: 'scripture-list'; items: ScriptureItem[] }

export interface Article {
  slug: string
  title: string
  author: string
  date: string
  nations: string[]
  summary: string
  pdf?: string
  body: ArticleBlock[]
}

export interface Nation {
  key: string
  name: string
  flag: string
  svg?: string
  flag_svg?: string
}

export interface Video {
  id: string
  title: string
  date?: string
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
}

export interface Contributor {
  name: string
  role: string
  bio: string
  photo?: string
}
