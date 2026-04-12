import { formatCarbon } from '@/lib/carbon';

type Props = { pageBytes: number; carbonGrams: number };

export function GreenStrip({ pageBytes, carbonGrams }: Props) {
  const kb = (pageBytes / 1024).toFixed(1);
  return (
    <div
      className="mt-12 p-9 rounded-sm grid grid-cols-2 md:grid-cols-4 gap-8 items-center"
      style={{
        border: '1px solid var(--color-mint-dim)',
        background: 'rgba(168,230,207,0.03)',
      }}
    >
      <div>
        <div className="text-[10px] text-[var(--color-mint)] tracking-[0.2em] uppercase mb-1" style={{ fontFamily: 'var(--font-mono)' }}>This page weighs</div>
        <div className="text-[22px] font-light" style={{ fontFamily: 'var(--font-serif)' }}>{kb} KB</div>
      </div>
      <div>
        <div className="text-[10px] text-[var(--color-mint)] tracking-[0.2em] uppercase mb-1" style={{ fontFamily: 'var(--font-mono)' }}>Your visit emitted</div>
        <div className="text-[22px] font-light" style={{ fontFamily: 'var(--font-serif)' }}>{formatCarbon(carbonGrams)}</div>
      </div>
      <div>
        <div className="text-[10px] text-[var(--color-mint)] tracking-[0.2em] uppercase mb-1" style={{ fontFamily: 'var(--font-mono)' }}>Our hosting</div>
        <div className="text-[22px] font-light" style={{ fontFamily: 'var(--font-serif)' }}>100% renewable</div>
      </div>
      <div>
        <div className="text-[10px] text-[var(--color-mint)] tracking-[0.2em] uppercase mb-1" style={{ fontFamily: 'var(--font-mono)' }}>Third-party calls</div>
        <div className="text-[22px] font-light" style={{ fontFamily: 'var(--font-serif)' }}>Zero</div>
      </div>
    </div>
  );
}
