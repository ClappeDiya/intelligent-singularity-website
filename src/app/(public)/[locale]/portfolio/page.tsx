import { Suspense } from 'react';
import type { Metadata } from 'next';
import { PortfolioGrid } from '@/components/pages/PortfolioGrid';
import { fetchAllProducts, fetchProductCategories } from '@/lib/payload';
import type { Product, ProductCategory } from '@/types/cms';
import { buildPageMetadata } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import { getBreadcrumbSchema, getPortfolioItemListSchema, getWebPageSchema } from '@/lib/schema';

type Stat = { label: string; value: string | number; hint?: string };

async function PortfolioContent({ locale }: { locale: string }) {
  const [products, categories] = await Promise.all([
    fetchAllProducts(locale),
    fetchProductCategories(locale),
  ]);
  const typedProducts = products as unknown as Product[];
  const typedCategories = categories as unknown as ProductCategory[];

  const total = typedProducts.length;
  const flagshipCount = typedProducts.filter((p) => p.isFlagship).length;
  const productionCount = typedProducts.filter((p) => p.productStatus === 'production').length;
  const stagingCount = typedProducts.filter((p) => p.productStatus === 'staging').length;
  const categoryCount = typedCategories.filter(
    (c) => typedProducts.filter((p) => (typeof p.category === 'object' ? p.category?.id : p.category) === c.id).length > 0,
  ).length;

  const stats: Stat[] = [
    { label: 'Tools', value: total, hint: 'Across business, health, finance, agri, media, infra' },
    { label: 'Flagships', value: flagshipCount, hint: 'On the home page, curated for first use' },
    { label: 'Live · production', value: productionCount, hint: 'Shipping to real end users today' },
    { label: 'In staging', value: stagingCount, hint: 'Invite-only, hardening before launch' },
    { label: 'Verticals', value: categoryCount, hint: 'One shared stack, many domains' },
    { label: 'Third-party calls', value: 'Zero', hint: 'Across the entire portfolio' },
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
      <div className="page-label">Portfolio · Full ecosystem</div>
      <h1 className="page-title max-w-none">
        {total} tools.
        <br />
        One mission.
      </h1>
      <p className="page-lead">
        One shared stack. Honest status labels — production, staging, awaiting approval, infrastructure.
        Every product links out to its own domain.
      </p>

      <section
        aria-label="Ecosystem statistics"
        className="mb-14 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4"
      >
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-[18px] p-5 md:p-5 flex flex-col gap-2"
            style={{
              border: '1px solid rgba(26,22,18,0.08)',
              background: 'rgba(255,255,255,0.7)',
            }}
          >
            <div
              className="text-[10px] uppercase tracking-[0.22em] text-[var(--color-mint)]"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {s.label}
            </div>
            <div
              className="font-semibold text-[var(--color-paper-ink)] leading-none tracking-[-0.02em]"
              style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(26px, 2.6vw, 38px)' }}
            >
              {s.value}
            </div>
            {s.hint ? (
              <div className="text-[11.5px] text-[rgba(26,22,18,0.6)] leading-[1.55]">{s.hint}</div>
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
    <Suspense fallback={<div className="px-4 sm:px-6 md:px-8 lg:px-12 py-16 md:py-20 lg:py-[120px]">Loading...</div>}>
      <PortfolioContent locale={locale} />
    </Suspense>
  );
}
