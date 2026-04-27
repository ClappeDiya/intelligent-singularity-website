import 'dotenv/config';
import { getPayload } from 'payload';
import config from '@payload-config';
import { CATEGORIES_SEED } from './categories';
import { PRODUCTS_SEED } from './products';
import { COMMITMENTS_SEED } from './commitments';
import { ITU_DATA_SEED } from './itu-data';
import {
  HOMEPAGE_SEED,
  SITE_SETTINGS_SEED,
  MANIFESTO_SEED,
  ABOUT_SEED,
  GREEN_SEED,
  CONTACT_SEED,
} from './globals';
import { LEGAL_SEED } from './legal';

async function main() {
  const payload = await getPayload({ config });

  console.log('Seeding categories...');
  const categoryMap = new Map<string, string>();
  for (const cat of CATEGORIES_SEED) {
    const existing = await payload.find({
      collection: 'product-categories',
      where: { slug: { equals: cat.slug } },
      limit: 1,
    });
    if (existing.docs.length > 0) {
      categoryMap.set(cat.slug, String(existing.docs[0].id));
      continue;
    }
    const created = await payload.create({ collection: 'product-categories', data: cat });
    categoryMap.set(cat.slug, String(created.id));
  }

  console.log('Seeding products...');
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

  console.log('Seeding commitments...');
  for (const c of COMMITMENTS_SEED) {
    const existing = await payload.find({
      collection: 'commitment-items',
      where: { number: { equals: c.number } },
      limit: 1,
    });
    if (existing.docs.length > 0) continue;
    await payload.create({ collection: 'commitment-items', data: c });
  }

  console.log('Seeding legal pages...');
  for (const l of LEGAL_SEED) {
    const existing = await payload.find({
      collection: 'legal-pages',
      where: { slug: { equals: l.slug } },
      limit: 1,
    });
    if (existing.docs.length > 0) continue;
    await payload.create({ collection: 'legal-pages', data: l as any });
  }

  console.log('Seeding globals...');
  await payload.updateGlobal({ slug: 'site-settings', data: SITE_SETTINGS_SEED } as any);
  await payload.updateGlobal({ slug: 'homepage-content', data: HOMEPAGE_SEED } as any);
  await payload.updateGlobal({ slug: 'manifesto-page', data: MANIFESTO_SEED } as any);
  await payload.updateGlobal({ slug: 'about-page', data: ABOUT_SEED } as any);
  await payload.updateGlobal({ slug: 'green-page', data: GREEN_SEED } as any);
  await payload.updateGlobal({ slug: 'contact-page', data: CONTACT_SEED } as any);
  await payload.updateGlobal({ slug: 'itu-data', data: ITU_DATA_SEED } as any);

  console.log('Seed complete.');
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
