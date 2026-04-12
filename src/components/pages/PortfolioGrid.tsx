import type { Product } from '@/types/cms';
import { ProductRow } from './ProductRow';

type Category = { id: string; name: string; slug: string; ordering: number };

type Props = { categories: Category[]; products: Product[] };

export function PortfolioGrid({ categories, products }: Props) {
  return (
    <div className="flex flex-col gap-14">
      {categories.map((cat) => {
        const catProducts = products.filter(
          (p) =>
            (typeof p.category === 'object' ? p.category?.id : p.category) ===
            cat.id
        );
        if (catProducts.length === 0) return null;
        return (
          <section key={cat.id} className="pt-7" style={{ borderTop: '1px solid var(--color-rule)' }}>
            <div className="flex items-baseline justify-between mb-4">
              <div className="font-[var(--font-serif)] text-[22px]">{cat.name}</div>
              <div className="font-[var(--font-mono)] text-[11px] text-[var(--color-mint)] tracking-[0.15em]">
                {String(catProducts.length).padStart(2, '0')} PRODUCTS
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2">
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
