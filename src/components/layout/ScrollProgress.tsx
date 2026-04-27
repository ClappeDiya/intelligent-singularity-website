'use client';

import { useEffect, useState } from 'react';

export function ScrollProgress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    function onScroll() {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max <= 0) return setPct(0);
      setPct((window.scrollY / max) * 100);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed start-0 end-0 top-[63px] h-[2px] z-[49] pointer-events-none"
      style={{ background: 'rgba(16,185,129,0.08)' }}
    >
      <div
        className="h-[2px]"
        style={{
          width: `${pct}%`,
          background: 'linear-gradient(90deg, var(--color-emerald-ink), var(--color-teal))',
          boxShadow: '0 0 8px var(--color-emerald-glow)',
          transition: 'width 120ms ease-out',
        }}
      />
    </div>
  );
}
