import type { Product } from '@/types/cms';

const STATUS_COPY: Record<string, string> = {
  production: 'Live · Production',
  staging: 'Staging · Invite only',
  'awaiting-approval': 'Awaiting approval',
  infrastructure: 'Infrastructure',
};

export function FlagshipCard({
  product,
  index,
  featured = false,
}: {
  product: Product;
  index: number;
  featured?: boolean;
}) {
  const categoryName = typeof product.category === 'object' ? product.category?.name : '';
  const statusLabel = STATUS_COPY[product.productStatus] ?? product.productStatus;
  const accentColor = featured ? 'var(--color-emerald)' : 'var(--color-emerald-ink)';

  return (
    <a
      href={product.outboundURL}
      target="_blank"
      rel="noopener noreferrer"
      className={`flagship-card group ${featured ? 'flagship-card--featured' : ''}`}
    >
      {featured ? <div aria-hidden="true" className="flagship-card__grid" /> : null}
      <div className="relative flex justify-between items-start mb-7">
        <div
          className="text-[11px] uppercase tracking-[0.1em]"
          style={{
            fontFamily: 'var(--font-mono)',
            fontWeight: 600,
            color: accentColor,
          }}
        >
          {String(index + 1).padStart(2, '0')} · Flagship
        </div>
        <div
          className="text-[11px] uppercase px-2.5 py-1 rounded-full tracking-[0.08em]"
          style={{
            fontFamily: 'var(--font-mono)',
            fontWeight: 600,
            color: accentColor,
            border: featured ? '1px solid rgba(16,185,129,0.3)' : '1px solid rgba(16,185,129,0.25)',
            background: featured ? 'rgba(16,185,129,0.08)' : 'rgba(16,185,129,0.06)',
          }}
        >
          {statusLabel}
        </div>
      </div>
      <div className="relative flex-grow">
        <div
          className={`${featured ? 'text-[48px] md:text-[64px]' : 'text-[34px] md:text-[38px]'} font-semibold leading-[0.98] tracking-[-0.05em] mb-3 text-wrap-balance`}
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          {product.name}
        </div>
        <div
          className={`${featured ? 'text-[18px]' : 'text-[15px]'} mb-4 font-semibold`}
          style={{ color: accentColor }}
        >
          {product.tagline}
        </div>
        <div
          className={`${featured ? 'text-[16px] max-w-[52ch]' : 'text-[14.5px] max-w-[38ch]'} leading-[1.72]`}
          style={{ color: featured ? 'rgba(240,253,244,0.72)' : 'rgba(17,24,39,0.8)' }}
        >
          {product.shortDescription}
        </div>
        {product.publicName && (
          <div
            className="text-[13px] mt-4"
            style={{
              fontFamily: 'var(--font-mono)',
              color: featured ? 'rgba(240,253,244,0.7)' : 'rgba(17,24,39,0.8)',
            }}
          >
            Ships live as <strong style={{ color: accentColor }}>{product.publicName}</strong>
          </div>
        )}
      </div>
      <div className="relative flex justify-between items-end mt-7">
        <div
          className="text-[11px] uppercase tracking-[0.08em]"
          style={{
            fontFamily: 'var(--font-mono)',
            fontWeight: 500,
            color: featured ? 'rgba(240,253,244,0.65)' : 'rgba(17,24,39,0.72)',
          }}
        >
          {categoryName}
        </div>
        <div
          className="flex items-center gap-1.5 text-[12px] uppercase tracking-[0.08em]"
          style={{
            fontFamily: 'var(--font-mono)',
            fontWeight: 600,
            color: accentColor,
          }}
        >
          <span>Visit</span>
          <span className="transition-transform group-hover:translate-x-1.5" aria-hidden="true">→</span>
        </div>
      </div>
    </a>
  );
}
