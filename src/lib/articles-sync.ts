// Sync helpers for client components — always use static data, never DB
import type { Article } from '@/types'
import { articles } from '@/data/articles'

export function getArticlesForNationSync(nationKey: string): Article[] {
  return articles.filter(a => a.nations.includes(nationKey))
}
