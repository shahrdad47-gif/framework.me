import sanitizeHtml from 'sanitize-html'

/**
 * Allowlist for the admin Quill editor's article body output: headings,
 * paragraphs, lists, blockquotes and inline marks/links. No scripts, styles,
 * or attributes beyond a safe link href — applied before every DB write so
 * the public site can render it with dangerouslySetInnerHTML.
 */
export function sanitizeArticleBody(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: ['p', 'br', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'strong', 'em', 'u', 's', 'a', 'blockquote', 'ol', 'ul', 'li'],
    allowedAttributes: { a: ['href', 'target', 'rel'] },
    allowedSchemes: ['http', 'https', 'mailto'],
    transformTags: {
      a: sanitizeHtml.simpleTransform('a', { target: '_blank', rel: 'noopener noreferrer' }),
    },
  }).trim()
}
