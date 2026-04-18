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
      className="relative rounded-[24px] p-7 md:p-9 flex flex-col justify-between min-h-[280px] overflow-hidden"
      style={{
        background: accent ? 'var(--color-paper-warm)' : 'var(--color-paper-soft)',
      }}
    >
      <div>
        <div
          className="font-semibold text-[var(--color-paper-ink)] leading-none tracking-[-0.05em] mb-5"
          style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(52px, 6.4vw, 84px)' }}
        >
          {number}
        </div>
        <div className="text-[15.5px] leading-[1.72] text-[rgba(20,20,19,0.76)] max-w-[34ch]">{caption}</div>
      </div>
      <div
        className="mt-6 flex items-center justify-between gap-4 pt-5"
        style={{ borderTop: '1px solid rgba(20,20,19,0.1)' }}
      >
        <div
          className="text-[12.5px] uppercase text-[var(--color-paper-ink)]"
          style={{ fontFamily: 'var(--font-mono)', fontWeight: 500 }}
        >
          ITU · 2025
        </div>
        {comparison ? (
          <div
            className="text-[12.5px] uppercase text-right text-[rgba(20,20,19,0.68)]"
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
                <strong style={{ color: 'var(--color-paper-ink)' }}>
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
                <strong style={{ color: 'var(--color-paper-ink)' }}>
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
                <strong style={{ color: 'var(--color-paper-ink)' }}>{itu.highIncome5G}%</strong>. A
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
                <strong style={{ color: 'var(--color-paper-ink)' }}>{itu.urbanPercent}%</strong>.
                The city–countryside gap is still enormous.
              </>
            }
            comparison={`${itu.urbanPercent}% ↔ ${itu.ruralPercent}%`}
          />
        </div>
        <div
          className="mt-12 pt-6 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 text-[13px] text-[rgba(20,20,19,0.7)]"
          style={{ borderTop: '1px solid rgba(20,20,19,0.1)', fontFamily: 'var(--font-mono)' }}
        >
          <span className="uppercase text-[var(--color-mint-ink)]" style={{ fontWeight: 500 }}>Source</span>
          <span className="uppercase">{itu.sourceLabel}</span>
          <a
            href={itu.sourceUrl}
            className="sm:ms-auto underline underline-offset-4 hover:text-[var(--color-mint-ink)] break-all"
          >
            {itu.sourceUrl}
          </a>
        </div>
      </div>
    </section>
  );
}
