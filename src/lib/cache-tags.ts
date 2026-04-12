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
} as const;

export type CacheTag = (typeof CACHE_TAGS)[keyof typeof CACHE_TAGS];

export function localeTag(tag: CacheTag, locale: string): string {
  return `${tag}:${locale}`;
}

export function slugTag(tag: CacheTag, slug: string): string {
  return `${tag}:${slug}`;
}
