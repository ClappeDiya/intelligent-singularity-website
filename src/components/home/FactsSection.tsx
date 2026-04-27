import type { ITUData } from '@/types/cms';

type FactCardProps = {
  number: string;
  caption: React.ReactNode;
  comparison?: React.ReactNode;
  accent?: boolean;
};

function FactCard({ number, caption, comparison, accent }: FactCardProps) {
  return (
    <div
      className={`is-card relative rounded-[24px] p-7 md:p-9 flex flex-col justify-between min-h-[280px] overflow-hidden${accent ? ' is-card-accent' : ''}`}
    >
      <div>
        <div
          className="font-semibold leading-none tracking-[-0.05em] mb-5"
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(52px, 6.4vw, 84px)',
            background: accent ? 'linear-gradient(135deg, #059669, #0d9488)' : 'var(--color-paper-ink)',
            WebkitBackgroundClip: accent ? 'text' : undefined,
            backgroundClip: accent ? 'text' : undefined,
            WebkitTextFillColor: accent ? 'transparent' : undefined,
            color: accent ? 'transparent' : 'var(--color-paper-ink)',
          }}
        >
          {number}
        </div>
        <div className="text-[15.5px] leading-[1.72] text-[rgba(17,24,39,0.72)] max-w-[34ch]">{caption}</div>
      </div>
      <div
        className="mt-6 flex items-center justify-between gap-4 pt-5"
        style={{ borderTop: '1px solid rgba(16,185,129,0.12)' }}
      >
        <div
          className="text-[11px] uppercase text-[var(--color-emerald-ink)] tracking-[0.08em]"
          style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}
        >
          ITU · 2025
        </div>
        {comparison ? (
          <div
            className="text-[11px] uppercase text-right text-[rgba(17,24,39,0.6)] tracking-[0.06em]"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            {comparison}
          </div>
        ) : null}
      </div>
    </div>
  );
}

type Props = {
  title: string;
  lead: string;
  itu: ITUData;
};

export function FactsSection({ title, lead, itu }: Props) {
  return (
    <section className="px-4 sm:px-6 md:px-8 lg:px-12 pt-6 pb-24 md:pt-10 md:pb-28 lg:pt-14 lg:pb-32">
      <div className="home-story-panel">
        <div className="home-story-header mb-14">
          <div className="home-story-kicker">The Gap · Measured</div>
          <h2 className="home-story-title">{title}</h2>
          <p className="home-story-lead editorial-muted">{lead}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-7">
          <FactCard
            accent
            number={`${(itu.offlineCount / 1e9).toFixed(2)}B`}
            caption={
              <>
                People who have never used the internet.{' '}
                <strong style={{ color: 'var(--color-emerald-ink)' }}>
                  {itu.offlineInLowMiddleIncomePercent}% live in low- and middle-income countries.
                </strong>
              </>
            }
            comparison="≈ 26% of humanity"
          />
          <FactCard
            number={`${itu.lowIncomePercent}%`}
            caption={
              <>
                Share of people online in low-income countries.{' '}
                <strong style={{ color: 'var(--color-emerald-ink)' }}>
                  {itu.highIncomePercent}% in high-income countries.
                </strong>
              </>
            }
            comparison={`${itu.highIncomePercent}% ↔ ${itu.lowIncomePercent}%`}
          />
          <FactCard
            number={`${itu.lowIncome5G}%`}
            caption={
              <>
                5G coverage in low-income countries. High-income countries sit at{' '}
                <strong style={{ color: 'var(--color-emerald-ink)' }}>{itu.highIncome5G}%</strong>. A
                twenty-fold gap.
              </>
            }
            comparison="21× disparity"
          />
          <FactCard
            number={`${itu.ruralPercent}%`}
            caption={
              <>
                Rural people online worldwide. Urban figure sits at{' '}
                <strong style={{ color: 'var(--color-emerald-ink)' }}>{itu.urbanPercent}%</strong>.
                The city–countryside gap is still enormous.
              </>
            }
            comparison={`${itu.urbanPercent}% ↔ ${itu.ruralPercent}%`}
          />
        </div>
        <div
          className="mt-12 pt-6 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 text-[13px] text-[rgba(17,24,39,0.6)]"
          style={{ borderTop: '1px solid rgba(16,185,129,0.12)', fontFamily: 'var(--font-mono)' }}
        >
          <span className="uppercase text-[var(--color-emerald-ink)] tracking-[0.08em]" style={{ fontWeight: 600 }}>Source</span>
          <span className="uppercase">{itu.sourceLabel}</span>
          <a
            href={itu.sourceUrl}
            className="sm:ms-auto underline underline-offset-4 hover:text-[var(--color-emerald-ink)] break-all"
          >
            {itu.sourceUrl}
          </a>
        </div>
      </div>
    </section>
  );
}
