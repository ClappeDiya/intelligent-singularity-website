import type { Product } from '@/types/cms';

const STATUS_DOT: Record<string, string> = {
  production: 'var(--color-mint)',
  staging: '#c7a261',
  'awaiting-approval': '#b56b61',
  infrastructure: '#7a8b9e',
};

const STATUS_LABEL: Record<string, string> = {
  production: 'Live',
  staging: 'Staging',
  'awaiting-approval': 'Awaiting',
  infrastructure: 'Infra',
};

export function ProductRow({ product }: { product: Product }) {
  const dotColor = STATUS_DOT[product.productStatus] ?? 'rgba(26,22,18,0.3)';
  const statusLabel = STATUS_LABEL[product.productStatus] ?? product.productStatus;
  const categoryName = typeof product.category === 'object' ? product.category?.name : '';

  return (
    <a
      href={product.outboundURL}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-[22px] p-6 md:p-7 transition-all no-underline text-[var(--color-paper-ink)] hover:-translate-y-0.5"
      style={{ background: 'var(--color-paper-soft)' }}
    >
      <div className="flex justify-between items-start gap-4 mb-3">
        <div className="flex items-center gap-2.5">
          <span
            className="inline-block w-2 h-2 rounded-full"
            style={{ background: dotColor }}
            aria-hidden="true"
          />
          <div
            className="text-[24px] md:text-[26px] leading-[1.05] tracking-[-0.028em]"
            style={{ fontFamily: 'var(--font-serif)', fontWeight: 600 }}
          >
            {product.name}
          </div>
        </div>
        <div
          className="text-[12px] uppercase text-[var(--color-mint-ink)] mt-2 shrink-0"
          style={{ fontFamily: 'var(--font-mono)', fontWeight: 500 }}
        >
          {statusLabel}
        </div>
      </div>
      {product.publicName ? (
        <div
          className="text-[12.5px] uppercase mb-3 -mt-1"
          style={{ fontFamily: 'var(--font-mono)', color: 'rgba(20,20,19,0.66)' }}
        >
          Public as <span className="text-[var(--color-mint-ink)]">{product.publicName}</span>
        </div>
      ) : null}
      {product.tagline ? (
        <div
          className="italic text-[16px] mb-3"
          style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-stone)' }}
        >
          {product.tagline}
        </div>
      ) : null}
      <div className="text-[14.5px] text-[rgba(20,20,19,0.76)] leading-[1.72] mb-5">
        {product.shortDescription}
      </div>
      <div
        className="flex justify-between items-end gap-3 pt-4"
        style={{ borderTop: '1px solid rgba(20,20,19,0.08)' }}
      >
        <div
          className="text-[12px] uppercase text-[rgba(20,20,19,0.62)]"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          {categoryName}
        </div>
        <div
          className="flex items-center gap-1.5 text-[12.5px] uppercase text-[var(--color-mint-ink)]"
          style={{ fontFamily: 'var(--font-mono)', fontWeight: 500 }}
        >
          <span>Visit</span>
          <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
        </div>
      </div>
    </a>
  );
}
