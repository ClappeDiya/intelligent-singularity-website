import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { FlagshipCard } from './FlagshipCard';
import type { Product } from '@/types/cms';

type Props = {
  locale: string;
  title: string;
  lead: string;
  flagships: Product[];
  seeAllLine: string;
};

const STATUS_KEY: Record<string, 'production' | 'staging' | 'awaitingApproval' | 'infrastructure'> = {
  production: 'production',
  staging: 'staging',
  'awaiting-approval': 'awaitingApproval',
  infrastructure: 'infrastructure',
};

export async function FlagshipsSection({ locale, title, lead, flagships, seeAllLine }: Props) {
  const [featured, ...rest] = flagships;
  const tStatus = await getTranslations('status');
  const labelFor = (s: string) => {
    const k = STATUS_KEY[s];
    return k ? tStatus(k) : s;
  };

  return (
    <section
      id="flagships"
      className="px-4 sm:px-6 md:px-8 lg:px-12 py-2 md:py-4 lg:py-6"
      style={{ scrollMarginTop: '96px' }}
    >
      <div className="home-story-panel">
        <div className="home-story-header mb-14">
          <div className="home-story-kicker">The Studio · 14 tools</div>
          <h2 className="home-story-title">{title}</h2>
          <p className="home-story-lead editorial-muted">{lead}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 mb-12">
          {featured ? <FlagshipCard key={featured.slug} product={featured} index={0} featured statusLabel={labelFor(featured.productStatus)} /> : null}
          {rest.map((p, i) => (
            <FlagshipCard key={p.slug} product={p} index={i + 1} statusLabel={labelFor(p.productStatus)} />
          ))}
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6" style={{ borderTop: '1px solid rgba(16,185,129,0.12)' }}>
          <p className="text-[15px] max-w-[52ch] leading-[1.7]" style={{ color: 'var(--color-paper-ink-soft)' }}>
            {seeAllLine}
          </p>
          <Link
            href={`/${locale}/portfolio`}
            className="inline-flex items-center gap-2 px-5 py-[10px] rounded-full text-[11.5px] uppercase font-semibold transition-all hover:-translate-y-0.5"
            style={{
              fontFamily: 'var(--font-mono)',
              background: 'linear-gradient(135deg, #047857, #0f766e)',
              color: '#fff',
              boxShadow: '0 4px 14px rgba(16,185,129,0.25)',
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
