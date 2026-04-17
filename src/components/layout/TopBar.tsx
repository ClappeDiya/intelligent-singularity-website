'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { MeridianMark } from '@/components/brand/MeridianMark';

type Props = {
  locale: string;
};

const NAV_LINKS = [
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/manifesto', label: 'Manifesto' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/security', label: 'Security' },
  { href: '/faq', label: 'FAQ' },
  { href: '/about', label: 'About' },
];

export function TopBar({ locale }: Props) {
  const pathname = usePathname();
  const isHomepage = pathname === `/${locale}` || pathname === `/${locale}/`;
  const [menuOpen, setMenuOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    if (menuOpen) setMenuOpen(false);
  }

  useEffect(() => {
    if (menuOpen) {
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [menuOpen]);

  const barBg = isHomepage ? 'rgba(10, 13, 11, 0.88)' : 'rgba(250, 249, 245, 0.92)';
  const barBorder = isHomepage ? '1px solid rgba(246,241,231,0.08)' : '1px solid rgba(20,20,19,0.08)';
  const linkColor = isHomepage ? 'var(--color-cream)' : '#141413';
  const linkHover = 'var(--color-mint)';
  const brandColor = isHomepage ? 'var(--color-cream)' : '#141413';
  const ctaBg = isHomepage ? 'var(--color-cream)' : '#141413';
  const ctaText = isHomepage ? '#141413' : 'var(--color-cream)';
  const chipBorder = isHomepage ? 'rgba(246,241,231,0.18)' : 'rgba(20,20,19,0.14)';
  const chipText = isHomepage ? 'rgba(246,241,231,0.76)' : 'rgba(20,20,19,0.64)';

  return (
    <>
      <header
        className="sticky top-0 start-0 end-0 h-[64px] flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-12 z-50"
        style={{
          background: barBg,
          borderBottom: barBorder,
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
        }}
      >
        <div className="flex items-center gap-3 md:gap-8">
          <Link
            href="/"
            className="flex items-center gap-2.5 focus-visible:outline-2 focus-visible:outline-[var(--color-mint)] rounded-sm"
            style={{
              fontFamily: 'var(--font-serif)',
              color: brandColor,
              letterSpacing: '-0.015em',
              fontSize: '17px',
              fontWeight: 600,
            }}
          >
            <MeridianMark size={22} />
            <span>Intelligent Singularity</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 lg:gap-7" aria-label="Primary">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="transition-colors focus-visible:outline-2 focus-visible:outline-[var(--color-mint)] rounded-sm"
                style={{
                  color: linkColor,
                  fontSize: '14.5px',
                  fontWeight: 500,
                  letterSpacing: '-0.005em',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = linkHover;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = linkColor;
                }}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2 md:gap-3">
          <span
            className="hidden lg:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              letterSpacing: '0.08em',
              color: chipText,
              border: `1px solid ${chipBorder}`,
            }}
          >
            <span style={{ color: 'var(--color-mint)' }}>●</span>
            {locale.toUpperCase()} · 14 languages
          </span>
          <Link
            href="/contact"
            className="hidden md:inline-flex items-center gap-1.5 px-4 py-[9px] rounded-full transition-transform hover:-translate-y-0.5"
            style={{
              background: ctaBg,
              color: ctaText,
              fontSize: '14px',
              fontWeight: 500,
              letterSpacing: '-0.005em',
              boxShadow: isHomepage ? '0 8px 20px rgba(0,0,0,0.24)' : '0 4px 14px rgba(20,20,19,0.18)',
            }}
          >
            Contact
            <span aria-hidden="true" className="opacity-80">→</span>
          </Link>
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 -me-1 rounded-full"
            style={{
              color: brandColor,
              border: `1px solid ${chipBorder}`,
            }}
          >
            <span aria-hidden="true" className="relative block w-4 h-4">
              <span
                className="absolute left-0 right-0 h-[1.5px]"
                style={{
                  background: 'currentColor',
                  top: menuOpen ? '50%' : '25%',
                  transform: menuOpen ? 'translateY(-50%) rotate(45deg)' : 'none',
                  transition: 'top 150ms, transform 150ms',
                }}
              />
              <span
                className="absolute left-0 right-0 h-[1.5px]"
                style={{
                  background: 'currentColor',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  opacity: menuOpen ? 0 : 1,
                  transition: 'opacity 100ms',
                }}
              />
              <span
                className="absolute left-0 right-0 h-[1.5px]"
                style={{
                  background: 'currentColor',
                  top: menuOpen ? '50%' : '75%',
                  transform: menuOpen ? 'translateY(-50%) rotate(-45deg)' : 'none',
                  transition: 'top 150ms, transform 150ms',
                }}
              />
            </span>
          </button>
        </div>
      </header>

      {menuOpen ? (
        <div
          id="is-mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="md:hidden fixed inset-0 z-40 flex flex-col"
          style={{
            top: '64px',
            background: isHomepage ? 'rgba(10, 13, 11, 0.98)' : 'rgba(250, 249, 245, 0.98)',
            color: brandColor,
            backdropFilter: 'blur(18px)',
          }}
        >
          <nav className="flex flex-col gap-1 px-5 pt-6 pb-6" aria-label="Primary mobile">
            {[...NAV_LINKS, { href: '/contact', label: 'Contact' }].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="py-3 text-[28px] tracking-[-0.02em]"
                style={{
                  fontFamily: 'var(--font-serif)',
                  color: brandColor,
                  fontWeight: 600,
                  borderBottom: `1px solid ${isHomepage ? 'rgba(246,241,231,0.08)' : 'rgba(20,20,19,0.08)'}`,
                }}
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div
            className="mt-auto px-5 pb-8 pt-6 flex flex-col gap-3"
            style={{ borderTop: `1px solid ${isHomepage ? 'rgba(246,241,231,0.08)' : 'rgba(20,20,19,0.08)'}` }}
          >
            <div
              className="text-[10px] uppercase tracking-[0.22em]"
              style={{ color: 'var(--color-mint)', fontFamily: 'var(--font-mono)' }}
            >
              Currently viewing · {locale.toUpperCase()}
            </div>
            <p
              className="text-[14px] leading-[1.7]"
              style={{ color: isHomepage ? 'rgba(246,241,231,0.72)' : 'rgba(20,20,19,0.72)' }}
            >
              Fourteen languages. Switch from the language wheel at the bottom of any page.
            </p>
            <div
              className="flex gap-4 mt-1 text-[11px]"
              style={{ color: 'var(--color-mint)', fontFamily: 'var(--font-mono)' }}
            >
              <span>0 trackers</span>
              <span>0 third-party calls</span>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
