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
  const [featured, ...rest] = flagships;

  return (
    <section id="flagships" className="px-4 sm:px-6 md:px-8 lg:px-12 py-2 md:py-4 lg:py-6">
      <div className="home-story-panel">
        <div className="home-story-header mb-14">
          <div className="home-story-kicker">The Studio · 14 tools</div>
          <h2 className="home-story-title">{title}</h2>
          <p className="home-story-lead editorial-muted">{lead}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 mb-12">
          {featured ? <FlagshipCard key={featured.slug} product={featured} index={0} featured /> : null}
          {rest.map((p, i) => (
            <FlagshipCard key={p.slug} product={p} index={i + 1} />
          ))}
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6" style={{ borderTop: '1px solid rgba(26,22,18,0.08)' }}>
          <p className="text-[15px] text-[rgba(26,22,18,0.68)] max-w-[52ch] leading-[1.7]">
            {seeAllLine}
          </p>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 px-6 py-[11px] rounded-full border text-[11.5px] uppercase tracking-[0.18em] font-semibold transition-colors hover:border-[var(--color-mint)] hover:text-[var(--color-mint)]"
            style={{
              fontFamily: 'var(--font-mono)',
              borderColor: 'rgba(26,22,18,0.14)',
              color: 'var(--color-paper-ink)',
            }}
          >
            See the full ecosystem
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
