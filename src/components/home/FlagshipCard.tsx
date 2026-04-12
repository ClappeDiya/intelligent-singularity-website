import type { Product } from '@/types/cms';

export function FlagshipCard({ product, index }: { product: Product; index: number }) {
  return (
    <a
      href={product.outboundURL}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-[var(--color-ink)] p-10 pb-9 flex flex-col justify-between min-h-[340px] transition-colors hover:bg-[rgba(168,230,207,0.035)] no-underline text-[var(--color-cream)]"
    >
      <div className="flex justify-between items-start mb-7">
        <div className="relative w-[38px] h-[14px]" aria-hidden="true">
          <div className="absolute start-0 end-0 top-[10px] h-px bg-[var(--color-mint)]" style={{ opacity: 0.85 }} />
          <div className="absolute start-[9px] top-[5px] w-[7px] h-[7px] rounded-full bg-[var(--color-mint)]" />
        </div>
        <div className="text-[9px] text-[var(--color-mint)] uppercase tracking-[0.18em] px-2 py-1 border border-[var(--color-mint-faint)] rounded-sm" style={{ fontFamily: 'var(--font-mono)' }}>
          {product.productStatus === 'production' ? 'Production' : product.productStatus}
        </div>
      </div>
      <div className="flex-grow">
        <div className="text-[10px] text-[var(--color-mint-dim)] tracking-[0.2em] mb-[10px]" style={{ fontFamily: 'var(--font-mono)' }}>{String(index + 1).padStart(2, '0')}</div>
        <div className="text-[30px] font-normal leading-none tracking-[-0.02em] mb-[10px]" style={{ fontFamily: 'var(--font-serif)' }}>{product.name}</div>
        <div className="italic text-[14px] text-[var(--color-mint)] mb-[18px]" style={{ fontFamily: 'var(--font-serif)' }}>{product.tagline}</div>
        <div className="text-[13px] leading-[1.55] text-[var(--color-cream-dim)]">{product.shortDescription}</div>
        {product.publicName && (
          <div className="text-[10px] text-[var(--color-cream-faint)] mt-[10px] tracking-[0.05em]" style={{ fontFamily: 'var(--font-mono)' }}>
            — live as <strong className="text-[var(--color-mint)]">{product.publicName}</strong>
          </div>
        )}
      </div>
      <div className="flex justify-between items-end mt-5">
        <div className="text-[10px] text-[var(--color-cream-faint)] tracking-[0.15em] uppercase" style={{ fontFamily: 'var(--font-mono)' }}>
          {typeof product.category === 'object' ? product.category?.name : ''}
        </div>
        <div className="text-[18px] text-[var(--color-cream-faint)]" style={{ fontFamily: 'var(--font-mono)' }}>↗</div>
      </div>
    </a>
  );
}
