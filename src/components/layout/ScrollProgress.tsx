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
      style={{ background: 'rgba(108,143,122,0.08)' }}
    >
      <div
        className="h-[2px]"
        style={{
          width: `${pct}%`,
          background: 'linear-gradient(90deg, rgba(108,143,122,0.6), var(--color-mint))',
          boxShadow: '0 0 8px var(--color-mint-glow)',
          transition: 'width 120ms ease-out',
        }}
      />
    </div>
  );
}
