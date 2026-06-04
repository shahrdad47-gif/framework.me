import { articles } from '@/data/articles'

export function getArticleBySlug(slug) {
  return articles.find(a => a.slug === slug) ?? null
}

export function getArticlesForNation(nationKey) {
  return articles.filter(a => a.nations.includes(nationKey))
}
