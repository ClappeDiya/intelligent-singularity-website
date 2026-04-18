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
          ? 'radial-gradient(1200px 500px at 90% -10%, rgba(108,143,122,0.18), transparent 60%), linear-gradient(180deg, rgba(18,23,20,1) 0%, rgba(10,13,11,1) 100%)'
          : 'var(--color-paper-warm)',
        borderColor: featured ? 'rgba(246,241,231,0.12)' : 'transparent',
        color: featured ? 'var(--color-cream)' : 'var(--color-paper-ink)',
        boxShadow: featured ? '0 28px 60px rgba(0,0,0,0.34)' : 'none',
      }}
    >
      {featured ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            background:
              'repeating-linear-gradient(0deg, rgba(246,241,231,0.03) 0px, rgba(246,241,231,0.03) 1px, transparent 1px, transparent 56px),' +
              'repeating-linear-gradient(90deg, rgba(246,241,231,0.03) 0px, rgba(246,241,231,0.03) 1px, transparent 1px, transparent 56px)',
          }}
        />
      ) : null}
      <div className="relative flex justify-between items-start mb-7">
        <div
          className="text-[12.5px] uppercase"
          style={{
            fontFamily: 'var(--font-mono)',
            fontWeight: 500,
            color: featured ? 'var(--color-mint)' : 'rgba(20,20,19,0.72)',
          }}
        >
          {String(index + 1).padStart(2, '0')} · Flagship
        </div>
        <div
          className="text-[12px] uppercase px-2.5 py-1 rounded-full"
          style={{
            fontFamily: 'var(--font-mono)',
            fontWeight: 500,
            color: featured ? 'var(--color-mint)' : 'var(--color-mint-ink)',
            border: featured ? '1px solid rgba(108,143,122,0.4)' : '1px solid rgba(108,143,122,0.32)',
            background: featured ? 'rgba(108,143,122,0.08)' : 'rgba(108,143,122,0.06)',
          }}
        >
          {statusLabel}
        </div>
      </div>
      <div className="relative flex-grow">
        <div
          className={`${featured ? 'text-[48px] md:text-[64px]' : 'text-[34px] md:text-[38px]'} font-semibold leading-[0.98] tracking-[-0.05em] mb-3`}
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          {product.name}
        </div>
        <div
          className={`${featured ? 'text-[18px]' : 'text-[15px]'} mb-4 font-medium`}
          style={{ color: featured ? 'var(--color-mint)' : 'var(--color-mint-ink)' }}
        >
          {product.tagline}
        </div>
        <div
          className={`${featured ? 'text-[16px] max-w-[52ch]' : 'text-[14.5px] max-w-[38ch]'} leading-[1.72]`}
          style={{ color: featured ? 'var(--color-cream-dim)' : 'rgba(20,20,19,0.74)' }}
        >
          {product.shortDescription}
        </div>
        {product.publicName && (
          <div
            className="text-[13px] mt-4"
            style={{
              fontFamily: 'var(--font-mono)',
              color: featured ? 'var(--color-cream-faint)' : 'rgba(20,20,19,0.64)',
            }}
          >
            Ships live as <strong style={{ color: featured ? 'var(--color-mint)' : 'var(--color-mint-ink)' }}>{product.publicName}</strong>
          </div>
        )}
      </div>
      <div className="relative flex justify-between items-end mt-7">
        <div
          className="text-[12px] uppercase"
          style={{
            fontFamily: 'var(--font-mono)',
            fontWeight: 500,
            color: featured ? 'var(--color-cream-faint)' : 'rgba(20,20,19,0.64)',
          }}
        >
          {categoryName}
        </div>
        <div
          className="flex items-center gap-1.5 text-[13px] uppercase"
          style={{
            fontFamily: 'var(--font-mono)',
            fontWeight: 500,
            color: featured ? 'var(--color-mint)' : 'var(--color-mint-ink)',
          }}
        >
          <span>Visit</span>
          <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
        </div>
      </div>
    </a>
  );
}
