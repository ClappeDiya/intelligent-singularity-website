import Link from 'next/link';
import { FlagshipCard } from './FlagshipCard';
import type { Product } from '@/types/cms';

type Props = {
  title: string;
  lead: string;
  flagships: Product[];
  seeAllLine: string;
};

export function FlagshipsSection({ title, lead, flagships, seeAllLine }: Props) {
  return (
    <section id="flagships" className="px-12 py-[120px] relative" style={{ borderTop: '1px solid var(--color-rule)' }}>
      <div className="absolute top-10 end-12 text-[10px] text-[var(--color-mint)] tracking-[0.2em]" style={{ fontFamily: 'var(--font-mono)' }}>02 / STUDIO</div>
      <div className="text-[11px] uppercase tracking-[0.22em] text-[var(--color-mint)] mb-5" style={{ fontFamily: 'var(--font-mono)' }}>— The Studio</div>
      <h2 className="font-light leading-[1.05] tracking-[-0.025em] mb-12 max-w-[1200px]" style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(36px, 5vw, 72px)' }}>
        {title}
      </h2>
      <p className="italic text-[19px] leading-[1.55] text-[var(--color-cream-soft)] max-w-[760px] mb-[72px]" style={{ fontFamily: 'var(--font-serif)' }}>{lead}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-px mb-10" style={{ background: 'var(--color-rule)', border: '1px solid var(--color-rule)' }}>
        {flagships.map((p, i) => <FlagshipCard key={p.slug} product={p} index={i} />)}
      </div>
      <Link
        href="/portfolio"
        className="inline-flex items-baseline gap-2 italic text-[16px] text-[var(--color-cream-soft)] no-underline py-[10px]"
        style={{ fontFamily: 'var(--font-serif)', borderBottom: '1px solid var(--color-mint-faint)' }}
      >
        {seeAllLine}
        <span className="text-[var(--color-mint)] not-italic" style={{ fontFamily: 'var(--font-mono)' }}>See the full ecosystem →</span>
      </Link>
    </section>
  );
}
