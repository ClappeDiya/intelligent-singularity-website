import type { ITUData } from '@/types/cms';

type FactCardProps = { number: string; caption: React.ReactNode };

function FactCard({ number, caption }: FactCardProps) {
  return (
    <div className="bg-[var(--color-ink)] p-10 flex flex-col justify-between min-h-[220px]">
      <div>
        <div className="font-extralight text-[var(--color-mint)] leading-none tracking-[-0.025em] mb-[18px]" style={{ fontFamily: 'var(--font-serif)', fontSize: 72 }}>
          {number}
        </div>
        <div className="text-[14px] leading-[1.5] text-[var(--color-cream-soft)] max-w-[260px]">{caption}</div>
      </div>
      <div className="text-[10px] text-[var(--color-cream-faint)] mt-[14px] uppercase tracking-[0.15em]" style={{ fontFamily: 'var(--font-mono)' }}>ITU 2025</div>
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
    <section className="px-12 py-[120px] relative" style={{ borderTop: '1px solid var(--color-rule)' }}>
      <div className="absolute top-10 end-12 text-[10px] text-[var(--color-mint)] tracking-[0.2em]" style={{ fontFamily: 'var(--font-mono)' }}>01 / FACTS</div>
      <div className="text-[11px] uppercase tracking-[0.22em] text-[var(--color-mint)] mb-5" style={{ fontFamily: 'var(--font-mono)' }}>— The Gap</div>
      <h2 className="font-light leading-[1.05] tracking-[-0.025em] mb-12 max-w-[1200px]" style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(36px, 5vw, 72px)' }}>
        {title}
      </h2>
      <p className="italic text-[19px] leading-[1.55] text-[var(--color-cream-soft)] max-w-[760px] mb-[72px]" style={{ fontFamily: 'var(--font-serif)' }}>{lead}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: 'var(--color-rule)', border: '1px solid var(--color-rule)' }}>
        <FactCard number={`${(itu.offlineCount / 1e9).toFixed(1)} B`} caption={<>People who have never used the internet. <strong style={{ color: 'var(--color-cream)' }}>{itu.offlineInLowMiddleIncomePercent}% live in low- and middle-income countries.</strong></>} />
        <FactCard number={`${itu.lowIncomePercent} %`} caption={<>Share of people in low-income countries who use the internet. Compare with <strong style={{ color: 'var(--color-cream)' }}>{itu.highIncomePercent}% in high-income countries.</strong></>} />
        <FactCard number={`${itu.lowIncome5G} %`} caption={<>5G coverage in low-income countries. The figure in high-income countries is <strong style={{ color: 'var(--color-cream)' }}>{itu.highIncome5G}%.</strong> A twenty-fold gap.</>} />
        <FactCard number={`${itu.ruralPercent} %`} caption={<>Rural people online worldwide. Urban figure: <strong style={{ color: 'var(--color-cream)' }}>{itu.urbanPercent}%.</strong> The city–countryside gap is still enormous.</>} />
      </div>
    </section>
  );
}
