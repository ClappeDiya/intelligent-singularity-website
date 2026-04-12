import Link from 'next/link';
import { MeridianMark } from '@/components/brand/MeridianMark';

const LANGUAGES = [
  { code: 'en', label: 'EN' },
  { code: 'zh-CN', label: '中' },
  { code: 'es', label: 'ES' },
  { code: 'hi', label: 'हि' },
  { code: 'ar', label: 'ع' },
  { code: 'fr', label: 'FR' },
  { code: 'pt', label: 'PT' },
  { code: 'bn', label: 'বা' },
  { code: 'ru', label: 'RU' },
  { code: 'ur', label: 'ار' },
  { code: 'id', label: 'ID' },
  { code: 'sw', label: 'SW' },
  { code: 'yo', label: 'YO' },
  { code: 'ha', label: 'HA' },
];

export function Footer({ locale, studioBlurb }: { locale: string; studioBlurb: string }) {
  return (
    <footer
      className="px-12 pt-20 pb-10"
      style={{ borderTop: '1px solid var(--color-rule)' }}
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-14 max-w-[1400px] mx-auto">
        <div>
          <div className="flex items-center gap-3 mb-5">
            <MeridianMark size={56} />
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: '22px' }}>Intelligent Singularity</span>
          </div>
          <p className="text-[13px] leading-[1.6] text-[var(--color-cream-dim)] max-w-[320px]">
            {studioBlurb}
          </p>
        </div>
        <div>
          <h4 className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-mint)] mb-4" style={{ fontFamily: 'var(--font-mono)' }}>Studio</h4>
          <Link className="block py-1 text-[13px] text-[var(--color-cream-soft)] hover:text-[var(--color-mint)]" href="/manifesto">Manifesto</Link>
          <Link className="block py-1 text-[13px] text-[var(--color-cream-soft)] hover:text-[var(--color-mint)]" href="/#flagships">Flagships</Link>
          <Link className="block py-1 text-[13px] text-[var(--color-cream-soft)] hover:text-[var(--color-mint)]" href="/portfolio">Full ecosystem</Link>
          <Link className="block py-1 text-[13px] text-[var(--color-cream-soft)] hover:text-[var(--color-mint)]" href="/about">About</Link>
          <Link className="block py-1 text-[13px] text-[var(--color-cream-soft)] hover:text-[var(--color-mint)]" href="/green">Green</Link>
          <Link className="block py-1 text-[13px] text-[var(--color-cream-soft)] hover:text-[var(--color-mint)]" href="/contact">Contact</Link>
        </div>
        <div>
          <h4 className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-mint)] mb-4" style={{ fontFamily: 'var(--font-mono)' }}>Legal</h4>
          <Link className="block py-1 text-[13px] text-[var(--color-cream-soft)] hover:text-[var(--color-mint)]" href="/legal/privacy">Privacy</Link>
          <Link className="block py-1 text-[13px] text-[var(--color-cream-soft)] hover:text-[var(--color-mint)]" href="/legal/terms">Terms</Link>
          <Link className="block py-1 text-[13px] text-[var(--color-cream-soft)] hover:text-[var(--color-mint)]" href="/legal/accessibility">Accessibility</Link>
          <Link className="block py-1 text-[13px] text-[var(--color-cream-soft)] hover:text-[var(--color-mint)]" href="/legal/cookies">Cookies</Link>
          <p className="mt-2 text-[11px] text-[var(--color-cream-faint)]">Legal in English only.</p>
        </div>
        <div>
          <h4 className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-mint)] mb-4" style={{ fontFamily: 'var(--font-mono)' }}>14 Languages</h4>
          <div className="flex flex-wrap gap-2">
            {LANGUAGES.map((lang) => (
              <Link
                key={lang.code}
                href={`/${lang.code}`}
                aria-label={`Switch language to ${lang.code}`}
                className={`w-[34px] h-[34px] rounded-full border flex items-center justify-center text-[10px] transition ${
                  lang.code === locale
                    ? 'bg-[var(--color-mint)] text-[var(--color-ink)] border-[var(--color-mint)]'
                    : 'border-[var(--color-rule)] text-[var(--color-cream-dim)] hover:border-[var(--color-mint)] hover:text-[var(--color-mint)]'
                }`}
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {lang.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div
        className="pt-7 flex justify-between items-center text-[11px] text-[var(--color-cream-faint)] flex-wrap gap-4 max-w-[1400px] mx-auto"
        style={{ borderTop: '1px solid var(--color-rule)', fontFamily: 'var(--font-mono)' }}
      >
        <div>&copy; 2026 Intelligent Singularity Inc. &middot; Alberta, Canada &middot; Self-hosted on 100% renewable energy</div>
        <div className="flex gap-5 text-[var(--color-mint)]">
          <span>0 trackers</span>
          <span>0 third-party calls</span>
        </div>
      </div>
    </footer>
  );
}
