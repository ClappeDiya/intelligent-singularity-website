import type { CommitmentItem } from '@/types/cms';

type Props = { title: string; lead: string; items: CommitmentItem[] };

export function CommitmentsSection({ title, lead, items }: Props) {
  return (
    <section className="px-4 sm:px-6 md:px-8 lg:px-12 py-16 md:py-20 lg:py-[120px] relative" style={{ borderTop: '1px solid var(--color-rule)' }}>
      <div className="absolute top-10 end-12 text-[10px] text-[var(--color-mint)] tracking-[0.2em]" style={{ fontFamily: 'var(--font-mono)' }}>03 / PLEDGE</div>
      <div className="text-[11px] uppercase tracking-[0.22em] text-[var(--color-mint)] mb-5" style={{ fontFamily: 'var(--font-mono)' }}>— Our Nine Commitments</div>
      <h2 className="font-light leading-[1.05] tracking-[-0.025em] mb-12 max-w-[1200px]" style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(36px, 5vw, 72px)' }}>
        {title}
      </h2>
      <p className="italic text-[19px] leading-[1.55] text-[var(--color-cream-soft)] max-w-[760px] mb-[72px]" style={{ fontFamily: 'var(--font-serif)' }}>{lead}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-9 gap-x-12">
        {items.map((c) => (
          <div key={c.number} className="pt-5" style={{ borderTop: '1px solid var(--color-mint-dim)' }}>
            <div className="text-[11px] text-[var(--color-mint)] tracking-[0.15em] mb-[10px]" style={{ fontFamily: 'var(--font-mono)' }}>{String(c.number).padStart(2, '0')}</div>
            <div className="text-[20px] leading-[1.25] mb-[10px]" style={{ fontFamily: 'var(--font-serif)' }}>{c.title}</div>
            <div className="text-[13px] leading-[1.6] text-[var(--color-cream-dim)]">{c.body}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
