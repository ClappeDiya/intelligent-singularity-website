import { Suspense } from 'react';
import { PageLoading } from '@/components/pages/shared/PageLoading';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { PortfolioGrid } from '@/components/pages/PortfolioGrid';
import { fetchAllProducts, fetchProductCategories } from '@/lib/payload';
import type { Product, ProductCategory } from '@/types/cms';
import { buildPageMetadata } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import { getBreadcrumbSchema, getPortfolioItemListSchema, getWebPageSchema } from '@/lib/schema';
import { PortfolioMosaic } from '@/components/illustrations/PortfolioMosaic';

type Stat = { label: string; value: string | number; hint?: string };

async function PortfolioContent({ locale }: { locale: string }) {
  const [products, categories] = await Promise.all([
    fetchAllProducts(locale),
    fetchProductCategories(locale),
  ]);
  const typedProducts = products as unknown as Product[];
  const typedCategories = categories as unknown as ProductCategory[];
  const t = await getTranslations('pages.portfolio');

  const total = typedProducts.length;
  const flagshipCount = typedProducts.filter((p) => p.isFlagship).length;
  const productionCount = typedProducts.filter((p) => p.productStatus === 'production').length;
  const stagingCount = typedProducts.filter((p) => p.productStatus === 'staging').length;
  const categoryCount = typedCategories.filter(
    (c) => typedProducts.filter((p) => (typeof p.category === 'object' ? p.category?.id : p.category) === c.id).length > 0,
  ).length;

  const stats: Stat[] = [
    { label: t('statToolsLabel'), value: total, hint: t('statToolsHint') },
    { label: t('statFlagshipsLabel'), value: flagshipCount, hint: t('statFlagshipsHint') },
    { label: t('statProductionLabel'), value: productionCount, hint: t('statProductionHint') },
    { label: t('statStagingLabel'), value: stagingCount, hint: t('statStagingHint') },
    { label: t('statCategoriesLabel'), value: categoryCount, hint: t('statCategoriesHint') },
    { label: t('statThirdPartyLabel'), value: t('statThirdPartyValue'), hint: t('statThirdPartyHint') },
  ];

  const webPageSchema = getWebPageSchema({
    locale,
    pathname: '/portfolio',
    name: 'Portfolio | Intelligent Singularity',
    description:
      'Explore the full ecosystem of 14 tools across business operations, health, finance, agriculture, media, and communications.',
    type: 'CollectionPage',
  });
  const itemListSchema = getPortfolioItemListSchema({
    locale,
    products: typedProducts,
  });
  const breadcrumbSchema = getBreadcrumbSchema({
    locale,
    crumbs: [
      { name: 'Home', pathname: '/' },
      { name: 'Portfolio', pathname: '/portfolio' },
    ],
  });

  return (
    <article className="page-shell-wide">
      <JsonLd id={`portfolio-schema-${locale}`} data={webPageSchema} />
      <JsonLd id={`portfolio-itemlist-schema-${locale}`} data={itemListSchema} />
      <JsonLd id={`portfolio-breadcrumb-schema-${locale}`} data={breadcrumbSchema} />
      <div className="page-label">{t('eyebrow')}</div>
      <h1 className="page-title max-w-none">
        {t('titleLine1', { count: total })}
        <br />
        {t('titleLine2')}
      </h1>
      <p className="page-lead">{t('lede')}</p>

      <figure
        className="mb-12 rounded-[24px] overflow-hidden p-6 md:p-10"
        style={{
          border: '1px solid rgba(16,185,129,0.18)',
          background:
            'radial-gradient(900px 340px at 50% -20%, rgba(16,185,129,0.1), transparent 70%), var(--color-paper-soft)',
        }}
      >
        <PortfolioMosaic />
      </figure>

      <section
        aria-label={t('ecosystemStatsAria')}
        className="mb-14 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4"
      >
        {stats.map((s) => (
          <div
            key={s.label}
            className="is-card rounded-[18px] p-5 md:p-5 flex flex-col gap-2"
          >
            <div
              className="label-mono"
            >
              {s.label}
            </div>
            <div
              className="font-semibold leading-none tracking-[-0.02em] gradient-text"
              style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(26px, 2.6vw, 38px)' }}
            >
              {s.value}
            </div>
            {s.hint ? (
              <div className="text-[11.5px] leading-[1.55]" style={{ color: 'rgba(17,24,39,0.78)' }}>{s.hint}</div>
            ) : null}
          </div>
        ))}
      </section>

      <PortfolioGrid categories={typedCategories} products={typedProducts} />
    </article>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({
    locale,
    pathname: '/portfolio',
    title: 'Portfolio | Intelligent Singularity',
    description:
      'Explore the full ecosystem of 14 tools across business operations, health, finance, agriculture, media, and communications.',
  });
}

export default async function PortfolioPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <Suspense fallback={<PageLoading />}>
      <PortfolioContent locale={locale} />
    </Suspense>
  );
}
