import { getPayload } from 'payload';
import config from '@payload-config';
import { textToParagraph } from '@/lib/seed/translations/lexical-helper';
import type { LocaleTranslation } from '@/lib/seed/translations/types';

import { TRANSLATION as zhCN } from '@/lib/seed/translations/zh-CN';
import { TRANSLATION as es } from '@/lib/seed/translations/es';
import { TRANSLATION as hi } from '@/lib/seed/translations/hi';
import { TRANSLATION as ar } from '@/lib/seed/translations/ar';
import { TRANSLATION as fr } from '@/lib/seed/translations/fr';
import { TRANSLATION as pt } from '@/lib/seed/translations/pt';
import { TRANSLATION as bn } from '@/lib/seed/translations/bn';
import { TRANSLATION as ru } from '@/lib/seed/translations/ru';
import { TRANSLATION as ur } from '@/lib/seed/translations/ur';
import { TRANSLATION as id } from '@/lib/seed/translations/id';
import { TRANSLATION as sw } from '@/lib/seed/translations/sw';
import { TRANSLATION as yo } from '@/lib/seed/translations/yo';
import { TRANSLATION as ha } from '@/lib/seed/translations/ha';

const RTL_LOCALES = new Set(['ar', 'ur']);

const TRANSLATIONS: Record<string, LocaleTranslation> = {
  'zh-CN': zhCN, es, hi, ar, fr, pt, bn, ru, ur, id, sw, yo, ha,
};

async function safeUpdate(label: string, fn: () => Promise<void>, log: string[]) {
  try {
    await fn();
    log.push(`  ${label} done`);
  } catch (e: any) {
    const detail = JSON.stringify(e?.data?.errors ?? e?.message ?? 'unknown');
    log.push(`  ${label} FAILED: ${detail}`);
  }
}

export async function POST(request: Request) {
  if (process.env.NODE_ENV === 'production') {
    const url = new URL(request.url);
    const secret = url.searchParams.get('secret');
    if (secret !== process.env.REVALIDATE_SECRET) {
      return Response.json({ error: 'Seed requires valid secret in production' }, { status: 403 });
    }
  }

  const { locale: rawLocale } = (await request.json()) as { locale?: string };
  if (!rawLocale || !TRANSLATIONS[rawLocale]) {
    return Response.json({ error: 'Invalid locale' }, { status: 400 });
  }
  // Payload's generated types narrow `locale` to a literal union. The runtime
  // guard above proves the value is one of the supported locales, so cast.
  const locale = rawLocale as keyof typeof TRANSLATIONS;

  const payload = await getPayload({ config });
  const t = TRANSLATIONS[locale];
  const dir = RTL_LOCALES.has(locale) ? 'rtl' : 'ltr';
  const log: string[] = [`Seeding translations for ${locale}...`];

  await safeUpdate('homepage-content', () => payload.updateGlobal({
    slug: 'homepage-content',
    locale,
    data: {
      heroLabel: t.homepage.heroLabel,
      heroTagline: t.homepage.heroTagline,
      heroCtaPrimary: t.homepage.heroCtaPrimary,
      heroCtaSecondary: t.homepage.heroCtaSecondary,
      factsTitle: t.homepage.factsTitle,
      factsLead: t.homepage.factsLead,
      flagshipsTitle: t.homepage.flagshipsTitle,
      flagshipsLead: t.homepage.flagshipsLead,
      commitmentsTitle: t.homepage.commitmentsTitle,
      commitmentsLead: t.homepage.commitmentsLead,
      seeAllPortfolioLine: t.homepage.seeAllPortfolioLine,
    },
  } as any).then(() => {}), log);

  await safeUpdate('site-settings', () => payload.updateGlobal({
    slug: 'site-settings',
    locale,
    data: {
      studioBlurb: t.siteSettings.studioBlurb,
      footerSources: t.siteSettings.footerSources,
      topBarStatusText: t.siteSettings.topBarStatusText,
    },
  } as any).then(() => {}), log);

  await safeUpdate('manifesto-page', async () => {
    const db = payload.db?.pool;
    if (db) {
      const body = JSON.stringify(textToParagraph(t.manifesto.bodyText, dir));
      await db.query(
        `INSERT INTO manifesto_page_locales (title, lead, body, _locale, _parent_id)
         VALUES ($1, $2, $3::jsonb, $4, 1)
         ON CONFLICT (_locale, _parent_id) DO UPDATE SET title=$1, lead=$2, body=$3::jsonb`,
        [t.manifesto.title, t.manifesto.lead, body, locale]
      );
    }
  }, log);

  await safeUpdate('about-page', () => payload.updateGlobal({
    slug: 'about-page',
    locale,
    data: {
      title: t.about.title,
      lead: t.about.lead,
      founderStory: textToParagraph(t.about.founderStoryText, dir),
      incorporationContext: t.about.incorporationContext,
      leanOpsPhilosophy: textToParagraph(t.about.leanOpsPhilosophyText, dir),
    },
  } as any).then(() => {}), log);

  await safeUpdate('green-page', () => payload.updateGlobal({
    slug: 'green-page',
    locale,
    data: {
      title: t.green.title,
      lead: t.green.lead,
      environmentalStance: textToParagraph(t.green.environmentalStanceText, dir),
      hostingStory: textToParagraph(t.green.hostingStoryText, dir),
      futureGenerationPledge: textToParagraph(t.green.futureGenerationPledgeText, dir),
    },
  } as any).then(() => {}), log);

  await safeUpdate('contact-page', () => payload.updateGlobal({
    slug: 'contact-page',
    locale,
    data: {
      title: t.contact.title,
      lead: t.contact.lead,
      privacyNote: t.contact.privacyNote,
      successMessage: t.contact.successMessage,
      errorMessage: t.contact.errorMessage,
    },
  } as any).then(() => {}), log);

  for (const c of t.commitments) {
    const idx = t.commitments.indexOf(c);
    await safeUpdate(`commitment-${idx + 1}`, async () => {
      const existing = await payload.find({
        collection: 'commitment-items',
        where: { number: { equals: idx + 1 } },
        limit: 1,
      });
      if (existing.docs.length > 0) {
        await payload.update({
          collection: 'commitment-items',
          id: existing.docs[0].id,
          locale,
          data: { title: c.title, body: c.body },
        } as any);
      }
    }, log);
  }

  for (const p of t.products) {
    await safeUpdate(`product-${p.slug}`, async () => {
      const existing = await payload.find({
        collection: 'products',
        where: { slug: { equals: p.slug } },
        limit: 1,
      });
      if (existing.docs.length > 0) {
        await payload.update({
          collection: 'products',
          id: existing.docs[0].id,
          locale,
          data: { tagline: p.tagline, shortDescription: p.shortDescription },
        } as any);
      }
    }, log);
  }

  for (const cat of t.categories) {
    await safeUpdate(`category-${cat.slug}`, async () => {
      const existing = await payload.find({
        collection: 'product-categories',
        where: { slug: { equals: cat.slug } },
        limit: 1,
      });
      if (existing.docs.length > 0) {
        await payload.update({
          collection: 'product-categories',
          id: existing.docs[0].id,
          locale,
          data: { name: cat.name, description: cat.description },
        } as any);
      }
    }, log);
  }

  const failures = log.filter(l => l.includes('FAILED'));
  log.push(`Seed complete for ${locale}. ${failures.length} failures.`);
  return Response.json({ ok: failures.length === 0, locale, log });
}
