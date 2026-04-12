import { Suspense } from 'react';
import { PortfolioGrid } from '@/components/pages/PortfolioGrid';
import { fetchAllProducts, fetchProductCategories } from '@/lib/payload';
import type { Product, ProductCategory } from '@/types/cms';

async function PortfolioContent({ locale }: { locale: string }) {
  const [products, categories] = await Promise.all([
    fetchAllProducts(locale),
    fetchProductCategories(locale),
  ]);

  return (
    <article className="px-4 sm:px-6 md:px-8 lg:px-12 py-16 md:py-20 lg:py-[120px]">
      <div className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.22em] text-[var(--color-mint)] mb-5">&mdash; The full ecosystem</div>
      <h1 className="font-[var(--font-serif)] font-light leading-[1.05] tracking-[-0.025em] mb-12" style={{ fontSize: 'clamp(36px, 5vw, 72px)' }}>
        Twenty-three tools. One mission.
      </h1>
      <p className="font-[var(--font-serif)] italic text-[19px] leading-[1.55] text-[var(--color-cream-soft)] max-w-[760px] mb-[72px]">
        The full portfolio, with honest status labels &mdash; production, staging, awaiting approval, infrastructure. Every product links to its own domain.
      </p>
      <PortfolioGrid categories={categories as unknown as ProductCategory[]} products={products as unknown as Product[]} />
    </article>
  );
}

export default async function PortfolioPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <Suspense fallback={<div className="px-4 sm:px-6 md:px-8 lg:px-12 py-16 md:py-20 lg:py-[120px]">Loading...</div>}>
      <PortfolioContent locale={locale} />
    </Suspense>
  );
}
