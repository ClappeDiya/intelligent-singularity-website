import type { Product } from '@/types/cms';

export function ProductRow({ product }: { product: Product }) {
  return (
    <a
      href={product.outboundURL}
      target="_blank"
      rel="noopener noreferrer"
      className="flex justify-between items-start py-5 px-0 border-b border-[var(--color-rule)] transition-colors hover:bg-[rgba(168,230,207,0.035)] hover:pl-3 no-underline text-[var(--color-cream)]"
    >
      <div className="flex-1 pr-4">
        <div className="font-[var(--font-serif)] text-[20px] mb-1">
          <span className={`inline-block w-[6px] h-[6px] rounded-full mr-2 ${product.productStatus === 'production' ? 'bg-[var(--color-mint)]' : 'bg-[#e8b85c]'}`} aria-hidden="true" />
          {product.name}
          {product.publicName ? <span className="text-[var(--color-cream-faint)] text-[14px] ml-2">&mdash; {product.publicName}</span> : null}
        </div>
        <div className="text-[12px] text-[var(--color-cream-dim)] leading-[1.5]">{product.shortDescription}</div>
      </div>
      <div className="font-[var(--font-mono)] text-[10px] text-[var(--color-cream-faint)] uppercase tracking-[0.15em] mr-4 mt-1">
        {product.productStatus.replace('-', ' ')}
      </div>
      <div className="font-[var(--font-mono)] text-[14px] text-[var(--color-cream-faint)]">&nearr;</div>
    </a>
  );
}
