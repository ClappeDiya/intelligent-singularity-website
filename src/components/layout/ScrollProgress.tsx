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
      className="fixed left-0 right-0 top-[42px] h-px z-[49] pointer-events-none"
    >
      <div
        className="h-px"
        style={{
          width: `${pct}%`,
          background: 'var(--color-mint)',
          boxShadow: '0 0 8px var(--color-mint-glow)',
          transition: 'width 0.1s',
        }}
      />
    </div>
  );
}
