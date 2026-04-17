import type { MetadataRoute } from 'next';
import { LOCALES } from '@/i18n/config';
import { getSiteUrl } from '@/lib/seo';

const ROUTES = [
  '/',
  '/manifesto',
  '/portfolio',
  '/about',
  '/green',
  '/contact',
  '/faq',
  '/pricing',
  '/security',
  '/press',
  '/careers',
  '/changelog',
  '/status',
] as const;
const LEGAL_SLUGS = ['privacy', 'terms', 'accessibility', 'cookies'] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of LOCALES) {
    for (const route of ROUTES) {
      entries.push({
        url: new URL(`/${locale}${route === '/' ? '' : route}`, siteUrl).toString(),
        lastModified: now,
        changeFrequency: route === '/' ? 'weekly' : 'monthly',
        priority: route === '/' ? 1 : 0.7,
      });
    }

    for (const slug of LEGAL_SLUGS) {
      entries.push({
        url: new URL(`/${locale}/legal/${slug}`, siteUrl).toString(),
        lastModified: now,
        changeFrequency: 'yearly',
        priority: 0.4,
      });
    }
  }

  return entries;
}
