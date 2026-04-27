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

  return (
    <a
      href={product.outboundURL}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative overflow-hidden rounded-[30px] border flex flex-col justify-between transition-all no-underline ${
        featured ? 'md:col-span-2 min-h-[440px] p-8 md:p-12' : 'min-h-[340px] p-7 md:p-9'
      }`}
      style={{
        background: featured
          ? 'radial-gradient(1200px 500px at 90% -10%, rgba(16,185,129,0.16), transparent 60%), linear-gradient(180deg, rgba(10,13,11,1) 0%, rgba(17,21,18,1) 100%)'
          : 'rgba(255,255,255,0.95)',
        borderColor: featured ? 'rgba(16,185,129,0.2)' : 'rgba(167,243,208,0.4)',
        color: featured ? 'var(--color-cream)' : 'var(--color-paper-ink)',
        boxShadow: featured
          ? '0 28px 60px rgba(16,185,129,0.12)'
          : '0 4px 16px rgba(16,185,129,0.04)',
        transform: 'translateY(0)',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.transform = featured ? 'translateY(-4px)' : 'translateY(-3px)';
        (e.currentTarget as HTMLAnchorElement).style.boxShadow = featured
          ? '0 36px 72px rgba(16,185,129,0.18)'
          : '0 12px 32px rgba(16,185,129,0.1)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
        (e.currentTarget as HTMLAnchorElement).style.boxShadow = featured
          ? '0 28px 60px rgba(16,185,129,0.12)'
          : '0 4px 16px rgba(16,185,129,0.04)';
      }}
    >
      {featured ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{
            background:
              'repeating-linear-gradient(0deg, rgba(16,185,129,0.04) 0px, rgba(16,185,129,0.04) 1px, transparent 1px, transparent 56px),' +
              'repeating-linear-gradient(90deg, rgba(16,185,129,0.04) 0px, rgba(16,185,129,0.04) 1px, transparent 1px, transparent 56px)',
          }}
        />
      ) : null}
      <div className="relative flex justify-between items-start mb-7">
        <div
          className="text-[11px] uppercase tracking-[0.1em]"
          style={{
            fontFamily: 'var(--font-mono)',
            fontWeight: 600,
            color: featured ? 'var(--color-emerald)' : 'var(--color-emerald-ink)',
          }}
        >
          {String(index + 1).padStart(2, '0')} · Flagship
        </div>
        <div
          className="text-[11px] uppercase px-2.5 py-1 rounded-full tracking-[0.08em]"
          style={{
            fontFamily: 'var(--font-mono)',
            fontWeight: 600,
            color: featured ? 'var(--color-emerald)' : 'var(--color-emerald-ink)',
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
          style={{ color: featured ? 'var(--color-emerald)' : 'var(--color-emerald-ink)' }}
        >
          {product.tagline}
        </div>
        <div
          className={`${featured ? 'text-[16px] max-w-[52ch]' : 'text-[14.5px] max-w-[38ch]'} leading-[1.72]`}
          style={{ color: featured ? 'rgba(240,253,244,0.72)' : 'rgba(17,24,39,0.7)' }}
        >
          {product.shortDescription}
        </div>
        {product.publicName && (
          <div
            className="text-[13px] mt-4"
            style={{
              fontFamily: 'var(--font-mono)',
              color: featured ? 'rgba(240,253,244,0.5)' : 'rgba(17,24,39,0.56)',
            }}
          >
            Ships live as <strong style={{ color: featured ? 'var(--color-emerald)' : 'var(--color-emerald-ink)' }}>{product.publicName}</strong>
          </div>
        )}
      </div>
      <div className="relative flex justify-between items-end mt-7">
        <div
          className="text-[11px] uppercase tracking-[0.08em]"
          style={{
            fontFamily: 'var(--font-mono)',
            fontWeight: 500,
            color: featured ? 'rgba(240,253,244,0.45)' : 'rgba(17,24,39,0.5)',
          }}
        >
          {categoryName}
        </div>
        <div
          className="flex items-center gap-1.5 text-[12px] uppercase tracking-[0.08em]"
          style={{
            fontFamily: 'var(--font-mono)',
            fontWeight: 600,
            color: featured ? 'var(--color-emerald)' : 'var(--color-emerald-ink)',
          }}
        >
          <span>Visit</span>
          <span className="transition-transform group-hover:translate-x-1.5" aria-hidden="true">→</span>
        </div>
      </div>
    </a>
  );
}
