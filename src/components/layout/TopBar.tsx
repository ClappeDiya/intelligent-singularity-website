import Link from 'next/link';
import { MeridianMark } from '@/components/brand/MeridianMark';

type Props = {
  sizeBytes: number;
  carbonGrams: number;
  locale: string;
};

export function TopBar({ sizeBytes, carbonGrams, locale }: Props) {
  const kb = Math.round(sizeBytes / 1024);
  return (
    <header
      className="fixed top-0 start-0 end-0 h-[42px] flex items-center justify-between px-4 sm:px-6 z-50 text-[11px] text-[var(--color-cream-dim)]"
      style={{
        fontFamily: 'var(--font-mono)',
        background: 'rgba(15, 23, 18, 0.92)',
        borderBottom: '1px solid var(--color-rule)',
        backdropFilter: 'blur(12px)',
      }}
    >
      <div className="flex items-center gap-[18px]">
        <Link href="/" className="flex items-center gap-2 text-[var(--color-cream)] text-[13px]" style={{ fontFamily: 'var(--font-serif)' }}>
          <MeridianMark size={16} />
          <span className="hidden md:inline">Intelligent Singularity</span>
          <span className="md:hidden">IS</span>
        </Link>
        <nav className="hidden md:flex gap-[22px]" aria-label="Primary">
          <Link href="/manifesto" className="hover:text-[var(--color-mint)] transition-colors">Manifesto</Link>
          <Link href="/#flagships" className="hover:text-[var(--color-mint)] transition-colors">Studio</Link>
          <Link href="/about" className="hover:text-[var(--color-mint)] transition-colors">About</Link>
          <Link href="/green" className="hover:text-[var(--color-mint)] transition-colors">Green</Link>
          <Link href="/contact" className="hover:text-[var(--color-mint)] transition-colors">Contact</Link>
        </nav>
      </div>
      <div className="flex items-center gap-[14px]">
        <span className="hidden lg:inline text-[var(--color-mint)]">{kb} KB</span>
        <span className="hidden lg:inline text-[var(--color-mint)]">{carbonGrams.toFixed(2)} g CO₂</span>
        <span className="hidden lg:inline text-[var(--color-mint)]">100% renewable</span>
        <span className="text-[var(--color-mint)]">{locale.toUpperCase()} · 14 languages</span>
      </div>
    </header>
  );
}
