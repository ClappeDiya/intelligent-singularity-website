import React from 'react';

type State = 'operational' | 'degraded' | 'down' | 'unknown';

const COLOURS: Record<State, { dot: string; text: string; border: string }> = {
  operational: { dot: 'var(--color-mint)', text: 'var(--color-cream)', border: 'rgba(168,230,207,0.4)' },
  degraded:    { dot: '#E8C07D',           text: 'var(--color-cream)', border: 'rgba(232,192,125,0.4)' },
  down:        { dot: '#D98F7B',           text: 'var(--color-cream)', border: 'rgba(217,143,123,0.4)' },
  unknown:     { dot: 'rgba(246,241,231,0.3)', text: 'var(--color-cream-dim)', border: 'rgba(246,241,231,0.16)' },
};

export function StatusPill({ state, children }: { state: State; children: React.ReactNode }) {
  const c = COLOURS[state];
  return (
    <span
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-[12px] uppercase tracking-[0.14em]"
      style={{ fontFamily: 'var(--font-mono)', color: c.text, borderColor: c.border }}
    >
      <span
        aria-hidden="true"
        className="inline-block w-[8px] h-[8px] rounded-full"
        style={{ background: c.dot }}
      />
      {children}
    </span>
  );
}
