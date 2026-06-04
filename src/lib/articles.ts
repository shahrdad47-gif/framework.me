import type { Article } from '@/types'
import { articles } from '@/data/articles'

export function getArticleBySlug(slug: string): Article | null {
  return articles.find(a => a.slug === slug) ?? null
}

export function getArticlesForNation(nationKey: string): Article[] {
  return articles.filter(a => a.nations.includes(nationKey))
}
