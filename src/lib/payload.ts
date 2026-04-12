import { getPayload } from 'payload';
import config from '@payload-config';
import { cacheLife, cacheTag } from 'next/cache';
import { CACHE_TAGS, localeTag } from './cache-tags';

export async function getPayloadInstance() {
  return getPayload({ config });
}

export async function fetchHomepageContent(locale: string) {
  'use cache';
  cacheLife('hours');
  cacheTag(CACHE_TAGS.homepage, localeTag(CACHE_TAGS.homepage, locale));

  const payload = await getPayloadInstance();
  return payload.findGlobal({ slug: 'homepage-content', locale: locale as 'en' });
}

export async function fetchITUData(locale: string) {
  'use cache';
  cacheLife('weeks');
  cacheTag(CACHE_TAGS.itu, localeTag(CACHE_TAGS.itu, locale));

  const payload = await getPayloadInstance();
  return payload.findGlobal({ slug: 'itu-data', locale: locale as 'en' });
}

export async function fetchFlagshipProducts(locale: string) {
  'use cache';
  cacheLife('hours');
  cacheTag(CACHE_TAGS.products, localeTag(CACHE_TAGS.products, locale));

  const payload = await getPayloadInstance();
  const res = await payload.find({
    collection: 'products',
    where: { isFlagship: { equals: true } },
    sort: 'ordering',
    limit: 10,
    locale: locale as 'en',
  });
  return res.docs;
}

export async function fetchAllProducts(locale: string) {
  'use cache';
  cacheLife('hours');
  cacheTag(CACHE_TAGS.products, localeTag(CACHE_TAGS.products, locale));

  const payload = await getPayloadInstance();
  const res = await payload.find({
    collection: 'products',
    sort: 'ordering',
    limit: 100,
    depth: 2,
    locale: locale as 'en',
  });
  return res.docs;
}

export async function fetchProductCategories(locale: string) {
  'use cache';
  cacheLife('days');
  cacheTag(CACHE_TAGS.productCategories, localeTag(CACHE_TAGS.productCategories, locale));

  const payload = await getPayloadInstance();
  const res = await payload.find({
    collection: 'product-categories',
    sort: 'ordering',
    limit: 20,
    locale: locale as 'en',
  });
  return res.docs;
}

export async function fetchCommitments(locale: string) {
  'use cache';
  cacheLife('days');
  cacheTag(CACHE_TAGS.commitments, localeTag(CACHE_TAGS.commitments, locale));

  const payload = await getPayloadInstance();
  const res = await payload.find({
    collection: 'commitment-items',
    sort: 'number',
    limit: 20,
    locale: locale as 'en',
  });
  return res.docs;
}

export async function fetchManifesto(locale: string) {
  'use cache';
  cacheLife('hours');
  cacheTag(CACHE_TAGS.manifesto, localeTag(CACHE_TAGS.manifesto, locale));

  const payload = await getPayloadInstance();
  return payload.findGlobal({ slug: 'manifesto-page', locale: locale as 'en' });
}

export async function fetchAbout(locale: string) {
  'use cache';
  cacheLife('days');
  cacheTag(CACHE_TAGS.about, localeTag(CACHE_TAGS.about, locale));

  const payload = await getPayloadInstance();
  return payload.findGlobal({ slug: 'about-page', locale: locale as 'en' });
}

export async function fetchGreen(locale: string) {
  'use cache';
  cacheLife('hours');
  cacheTag(CACHE_TAGS.green, localeTag(CACHE_TAGS.green, locale));

  const payload = await getPayloadInstance();
  return payload.findGlobal({ slug: 'green-page', locale: locale as 'en' });
}

export async function fetchContactPage(locale: string) {
  'use cache';
  cacheLife('days');
  cacheTag(CACHE_TAGS.contact, localeTag(CACHE_TAGS.contact, locale));

  const payload = await getPayloadInstance();
  return payload.findGlobal({ slug: 'contact-page', locale: locale as 'en' });
}

export async function fetchContactRoutes() {
  'use cache';
  cacheLife('days');
  cacheTag(CACHE_TAGS.contact);

  const payload = await getPayloadInstance();
  const res = await payload.find({ collection: 'contact-routes', limit: 10 });
  return res.docs;
}

export async function fetchLegalPage(slug: string) {
  'use cache';
  cacheLife('weeks');
  cacheTag(CACHE_TAGS.legal, `${CACHE_TAGS.legal}:${slug}`);

  const payload = await getPayloadInstance();
  const res = await payload.find({
    collection: 'legal-pages',
    where: { slug: { equals: slug } },
    limit: 1,
  });
  return res.docs[0] ?? null;
}

export async function fetchSiteSettings(locale: string) {
  'use cache';
  cacheLife('days');
  cacheTag(CACHE_TAGS.siteSettings, localeTag(CACHE_TAGS.siteSettings, locale));

  const payload = await getPayloadInstance();
  return payload.findGlobal({ slug: 'site-settings', locale: locale as 'en' });
}
