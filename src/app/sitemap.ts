import type { MetadataRoute } from 'next';
import { LOCALES } from '@/i18n/config';
import { getSiteUrl } from '@/lib/seo';
import { fetchJournalPosts } from '@/lib/payload';

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
  '/roadmap',
  '/insights',
  '/trust',
  '/help',
] as const;
const LEGAL_SLUGS = ['privacy', 'terms', 'accessibility', 'cookies'] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  // Post entries are best-effort: during the Docker build the DB is a placeholder,
  // so fetchJournalPosts will fail. Fall back to an empty list. At runtime on a
  // live deploy the next sitemap revalidation picks up the real posts.
  let postSlugs: string[] = [];
  try {
    const insightsRes = (await fetchJournalPosts('en', { limit: 200, page: 1 })) as any;
    postSlugs = (insightsRes?.docs ?? []).map((p: any) => p.slug);
  } catch {
    postSlugs = [];
  }

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

    for (const slug of postSlugs) {
      entries.push({
        url: new URL(`/${locale}/insights/${slug}`, siteUrl).toString(),
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    }
  }

  return entries;
}
