// Re-exports all article queries from the unified DB layer.
// Uses Neon DB when DATABASE_URL is set; falls back to static files otherwise.
export { getArticles, getArticleBySlug, getArticlesForNation, getArticlesBySection } from './db'
