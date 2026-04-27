export const CACHE_TAGS = {
  homepage: 'homepage',
  manifesto: 'manifesto',
  products: 'products',
  productCategories: 'product-categories',
  commitments: 'commitments',
  about: 'about',
  green: 'green',
  contact: 'contact',
  itu: 'itu',
  legal: 'legal',
  siteSettings: 'site-settings',
  releaseNotes: 'release-notes',
  roadmapItems: 'roadmap-items',
  journalPosts: 'journal-posts',
  statusPage: 'status-page',
  trustPage: 'trust-page',
  helpPage: 'help-page',
  careersPage: 'careers-page',
  pressPage: 'press-page',
  securityPage: 'security-page',
  pricingPage: 'pricing-page',
  faqPage: 'faq-page',
} as const;

export type CacheTag = (typeof CACHE_TAGS)[keyof typeof CACHE_TAGS];

export function localeTag(tag: CacheTag, locale: string): string {
  return `${tag}:${locale}`;
}

export function slugTag(tag: CacheTag, slug: string): string {
  return `${tag}:${slug}`;
}
