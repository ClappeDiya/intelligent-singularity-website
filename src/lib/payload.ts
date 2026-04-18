import { getPayload } from 'payload';
import config from '@payload-config';
import { unstable_cache } from 'next/cache';
import { CACHE_TAGS, localeTag } from './cache-tags';

export async function getPayloadInstance() {
  return getPayload({ config });
}

export const fetchHomepageContent = unstable_cache(
  async (locale: string) => {
    const payload = await getPayloadInstance();
    return payload.findGlobal({ slug: 'homepage-content', locale: locale as 'en' });
  },
  ['homepage'],
  { tags: [CACHE_TAGS.homepage], revalidate: 3600 }
);

export const fetchITUData = unstable_cache(
  async (locale: string) => {
    const payload = await getPayloadInstance();
    return payload.findGlobal({ slug: 'itu-data', locale: locale as 'en' });
  },
  ['itu'],
  { tags: [CACHE_TAGS.itu], revalidate: 604800 }
);

export const fetchFlagshipProducts = unstable_cache(
  async (locale: string) => {
    const payload = await getPayloadInstance();
    const res = await payload.find({
      collection: 'products',
      where: { isFlagship: { equals: true } },
      sort: 'ordering',
      limit: 10,
      locale: locale as 'en',
    });
    return res.docs;
  },
  ['flagships'],
  { tags: [CACHE_TAGS.products], revalidate: 3600 }
);

export const fetchAllProducts = unstable_cache(
  async (locale: string) => {
    const payload = await getPayloadInstance();
    const res = await payload.find({
      collection: 'products',
      sort: 'ordering',
      limit: 100,
      depth: 2,
      locale: locale as 'en',
    });
    return res.docs;
  },
  ['all-products'],
  { tags: [CACHE_TAGS.products], revalidate: 3600 }
);

export const fetchProductCategories = unstable_cache(
  async (locale: string) => {
    const payload = await getPayloadInstance();
    const res = await payload.find({
      collection: 'product-categories',
      sort: 'ordering',
      limit: 20,
      locale: locale as 'en',
    });
    return res.docs;
  },
  ['categories'],
  { tags: [CACHE_TAGS.productCategories], revalidate: 86400 }
);

export const fetchCommitments = unstable_cache(
  async (locale: string) => {
    const payload = await getPayloadInstance();
    const res = await payload.find({
      collection: 'commitment-items',
      sort: 'number',
      limit: 20,
      locale: locale as 'en',
    });
    return res.docs;
  },
  ['commitments'],
  { tags: [CACHE_TAGS.commitments], revalidate: 86400 }
);

export const fetchManifesto = unstable_cache(
  async (locale: string) => {
    const payload = await getPayloadInstance();
    return payload.findGlobal({ slug: 'manifesto-page', locale: locale as 'en' });
  },
  ['manifesto'],
  { tags: [CACHE_TAGS.manifesto], revalidate: 3600 }
);

export const fetchAbout = unstable_cache(
  async (locale: string) => {
    const payload = await getPayloadInstance();
    return payload.findGlobal({ slug: 'about-page', locale: locale as 'en' });
  },
  ['about'],
  { tags: [CACHE_TAGS.about], revalidate: 86400 }
);

export const fetchGreen = unstable_cache(
  async (locale: string) => {
    const payload = await getPayloadInstance();
    return payload.findGlobal({ slug: 'green-page', locale: locale as 'en' });
  },
  ['green'],
  { tags: [CACHE_TAGS.green], revalidate: 3600 }
);

export const fetchContactPage = unstable_cache(
  async (locale: string) => {
    const payload = await getPayloadInstance();
    return payload.findGlobal({ slug: 'contact-page', locale: locale as 'en' });
  },
  ['contact-page'],
  { tags: [CACHE_TAGS.contact], revalidate: 86400 }
);

export const fetchContactRoutes = unstable_cache(
  async () => {
    const payload = await getPayloadInstance();
    const res = await payload.find({ collection: 'contact-routes', limit: 10 });
    return res.docs;
  },
  ['contact-routes'],
  { tags: [CACHE_TAGS.contact], revalidate: 86400 }
);

export const fetchLegalPage = unstable_cache(
  async (slug: string) => {
    const payload = await getPayloadInstance();
    const res = await payload.find({
      collection: 'legal-pages',
      where: { slug: { equals: slug } },
      limit: 1,
    });
    return res.docs[0] ?? null;
  },
  ['legal'],
  { tags: [CACHE_TAGS.legal], revalidate: 604800 }
);

export const fetchSiteSettings = unstable_cache(
  async (locale: string) => {
    const payload = await getPayloadInstance();
    return payload.findGlobal({ slug: 'site-settings', locale: locale as 'en' });
  },
  ['site-settings'],
  { tags: [CACHE_TAGS.siteSettings], revalidate: 86400 }
);

export const fetchReleaseNotes = unstable_cache(
  async (locale: string) => {
    const payload = await getPayloadInstance();
    const res = await payload.find({
      collection: 'release-notes',
      where: { status: { equals: 'published' } },
      sort: '-releaseDate',
      limit: 200,
      locale: locale as 'en',
    });
    return res.docs;
  },
  ['release-notes'],
  { tags: [CACHE_TAGS.releaseNotes], revalidate: 3600 }
);

export const fetchRoadmapItems = unstable_cache(
  async (locale: string) => {
    const payload = await getPayloadInstance();
    const res = await payload.find({
      collection: 'roadmap-items',
      sort: 'ordering',
      limit: 200,
      locale: locale as 'en',
    });
    return res.docs;
  },
  ['roadmap-items'],
  { tags: [CACHE_TAGS.roadmapItems], revalidate: 3600 }
);

export const fetchJournalPosts = unstable_cache(
  async (locale: string, opts: { limit?: number; page?: number } = {}) => {
    const payload = await getPayloadInstance();
    const res = await payload.find({
      collection: 'journal-posts',
      where: { status: { equals: 'published' } },
      sort: '-publishedAt',
      limit: opts.limit ?? 12,
      page: opts.page ?? 1,
      locale: locale as 'en',
    });
    return res;
  },
  ['journal-posts'],
  { tags: [CACHE_TAGS.journalPosts], revalidate: 3600 }
);

export const fetchJournalPostBySlug = unstable_cache(
  async (slug: string, locale: string) => {
    const payload = await getPayloadInstance();
    const res = await payload.find({
      collection: 'journal-posts',
      where: { slug: { equals: slug }, status: { equals: 'published' } },
      limit: 1,
      locale: locale as 'en',
    });
    return res.docs[0] ?? null;
  },
  ['journal-post'],
  { tags: [CACHE_TAGS.journalPosts], revalidate: 3600 }
);

export const fetchStatusPage = unstable_cache(
  async (locale: string) => {
    const payload = await getPayloadInstance();
    return payload.findGlobal({ slug: 'status-page', locale: locale as 'en' });
  },
  ['status-page'],
  { tags: [CACHE_TAGS.statusPage], revalidate: 3600 }
);

export const fetchTrustPage = unstable_cache(
  async (locale: string) => {
    const payload = await getPayloadInstance();
    return payload.findGlobal({ slug: 'trust-page', locale: locale as 'en' });
  },
  ['trust-page'],
  { tags: [CACHE_TAGS.trustPage], revalidate: 3600 }
);

export const fetchHelpPage = unstable_cache(
  async (locale: string) => {
    const payload = await getPayloadInstance();
    return payload.findGlobal({ slug: 'help-page', locale: locale as 'en' });
  },
  ['help-page'],
  { tags: [CACHE_TAGS.helpPage], revalidate: 3600 }
);
