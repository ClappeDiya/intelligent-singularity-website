import { getPayload } from 'payload';
import config from '@payload-config';
import { CATEGORIES_SEED } from '@/lib/seed/categories';
import { PRODUCTS_SEED } from '@/lib/seed/products';
import { COMMITMENTS_SEED } from '@/lib/seed/commitments';
import { ITU_DATA_SEED } from '@/lib/seed/itu-data';
import {
  HOMEPAGE_SEED,
  SITE_SETTINGS_SEED,
  MANIFESTO_SEED,
  ABOUT_SEED,
  GREEN_SEED,
  CONTACT_SEED,
} from '@/lib/seed/globals';
import { LEGAL_SEED } from '@/lib/seed/legal';
import { seedHelpPage } from '@/lib/seed/new-pages/help';
import { seedStatusPage } from '@/lib/seed/new-pages/status';
import { seedTrustPage } from '@/lib/seed/new-pages/trust';
import { seedRoadmap } from '@/lib/seed/new-pages/roadmap';
import { seedInsights } from '@/lib/seed/new-pages/insights';
import { seedChangelog } from '@/lib/seed/new-pages/changelog';

export async function POST(request: Request) {
  if (process.env.NODE_ENV === 'production') {
    const url = new URL(request.url);
    const secret = url.searchParams.get('secret');
    if (secret !== process.env.REVALIDATE_SECRET) {
      return Response.json({ error: 'Seed requires valid secret in production' }, { status: 403 });
    }
  }
  const url = new URL(request.url);
  const overwriteLegal = url.searchParams.get('overwriteLegal') === '1';

  const payload = await getPayload({ config });
  const log: string[] = [];

  log.push('Seeding categories...');
  const categoryMap = new Map<string, string>();
  for (const cat of CATEGORIES_SEED) {
    const existing = await payload.find({
      collection: 'product-categories',
      where: { slug: { equals: cat.slug } },
      limit: 1,
    });
    if (existing.docs.length > 0) {
      categoryMap.set(cat.slug, existing.docs[0].id as unknown as string);
      continue;
    }
    const created = await payload.create({ collection: 'product-categories', data: cat });
    categoryMap.set(cat.slug, created.id as unknown as string);
  }

  log.push('Seeding products...');
  for (const p of PRODUCTS_SEED) {
    const catId = categoryMap.get(p.categorySlug);
    if (!catId) throw new Error(`Missing category: ${p.categorySlug}`);
    const existing = await payload.find({
      collection: 'products',
      where: { slug: { equals: p.slug } },
      limit: 1,
    });
    if (existing.docs.length > 0) continue;
    await payload.create({
      collection: 'products',
      data: {
        name: p.name,
        slug: p.slug,
        publicName: p.publicName,
        category: catId as any,
        tagline: p.tagline,
        shortDescription: p.shortDescription,
        outboundURL: p.outboundURL,
        productStatus: p.productStatus,
        isFlagship: p.isFlagship,
        ordering: p.ordering,
      },
    });
  }

  log.push('Seeding commitments...');
  for (const c of COMMITMENTS_SEED) {
    const existing = await payload.find({
      collection: 'commitment-items',
      where: { number: { equals: c.number } },
      limit: 1,
    });
    if (existing.docs.length > 0) continue;
    await payload.create({ collection: 'commitment-items', data: c });
  }

  log.push(`Seeding legal pages (overwrite=${overwriteLegal})...`);
  for (const l of LEGAL_SEED) {
    const existing = await payload.find({
      collection: 'legal-pages',
      where: { slug: { equals: l.slug } },
      limit: 1,
    });
    if (existing.docs.length > 0) {
      if (!overwriteLegal) continue;
      const id = existing.docs[0].id;
      await payload.update({ collection: 'legal-pages', id, data: l as any });
      await payload.update({ collection: 'legal-pages', id, data: { _status: 'published' } as any });
    } else {
      const created = await payload.create({ collection: 'legal-pages', data: l as any });
      await payload.update({ collection: 'legal-pages', id: created.id, data: { _status: 'published' } as any });
    }
  }

  log.push('Seeding globals...');
  await payload.updateGlobal({ slug: 'site-settings', data: SITE_SETTINGS_SEED as any });
  await payload.updateGlobal({ slug: 'homepage-content', data: HOMEPAGE_SEED as any });
  await payload.updateGlobal({ slug: 'manifesto-page', data: MANIFESTO_SEED as any });
  await payload.updateGlobal({ slug: 'about-page', data: ABOUT_SEED as any });
  await payload.updateGlobal({ slug: 'green-page', data: GREEN_SEED as any });
  await payload.updateGlobal({ slug: 'contact-page', data: CONTACT_SEED as any });
  await payload.updateGlobal({ slug: 'itu-data', data: ITU_DATA_SEED as any });

  log.push('Seeding new pages...');
  try { await seedHelpPage(payload, log); } catch (e) { log.push(`help: ${(e as Error).message}`); }
  try { await seedStatusPage(payload, log); } catch (e) { log.push(`status: ${(e as Error).message}`); }
  try { await seedTrustPage(payload, log); } catch (e) { log.push(`trust: ${(e as Error).message}`); }
  try { await seedRoadmap(payload, log); } catch (e) { log.push(`roadmap: ${(e as Error).message}`); }
  try { await seedInsights(payload, log); } catch (e) { log.push(`insights: ${(e as Error).message}`); }
  try { await seedChangelog(payload, log); } catch (e) { log.push(`changelog: ${(e as Error).message}`); }

  log.push('Seed complete.');

  return Response.json({ ok: true, log });
}
