import type { Product } from '@/types/cms';
import { ProductRow } from './ProductRow';

type Category = {
  id: string;
  name: string;
  slug: string;
  ordering: number;
  description?: string;
};

type Props = { categories: Category[]; products: Product[] };

export function PortfolioGrid({ categories, products }: Props) {
  return (
    <div className="flex flex-col gap-20">
      {categories.map((cat, catIdx) => {
        const catProducts = products.filter(
          (p) =>
            (typeof p.category === 'object' ? p.category?.id : p.category) === cat.id,
        );
        if (catProducts.length === 0) return null;
        const index = String(catIdx + 1).padStart(2, '0');
        return (
          <section
            key={cat.id}
            aria-labelledby={`cat-${cat.slug}`}
            className="pt-8"
            style={{ borderTop: '1px solid var(--color-rule-light)' }}
          >
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
              <div className="flex-1">
                <div
                  className="text-[12.5px] uppercase text-[var(--color-mint)] mb-3"
                  style={{ fontFamily: 'var(--font-mono)', fontWeight: 500 }}
                >
                  {index} · Vertical
                </div>
                <h2
                  id={`cat-${cat.slug}`}
                  className="text-[var(--color-paper-ink)]"
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(30px, 3.4vw, 44px)',
                    lineHeight: 1.05,
                    letterSpacing: '-0.03em',
                    fontWeight: 600,
                  }}
                >
                  {cat.name}
                </h2>
                {'description' in cat && cat.description ? (
                  <p className="mt-3 text-[14.5px] leading-[1.75] text-[rgba(26,22,18,0.66)] max-w-[580px]">
                    {String(cat.description)}
                  </p>
                ) : null}
              </div>
              <div
                className="shrink-0 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full"
                style={{
                  border: '1px solid rgba(108,143,122,0.28)',
                  background: 'rgba(108,143,122,0.06)',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--color-mint)',
                  fontSize: '12.5px',
                  fontWeight: 500,
                  textTransform: 'uppercase',
                }}
              >
                <span>{String(catProducts.length).padStart(2, '0')}</span>
                <span aria-hidden="true" style={{ opacity: 0.5 }}>·</span>
                <span>{catProducts.length === 1 ? 'Product' : 'Products'}</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
              {catProducts.map((p) => (
                <ProductRow key={p.slug} product={p} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
