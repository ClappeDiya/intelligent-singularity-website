import Link from 'next/link';
import { MeridianMark } from '@/components/brand/MeridianMark';
import { LanguageWheel } from './LanguageWheel';

export function Footer({ locale: _locale, studioBlurb }: { locale: string; studioBlurb: string }) {
  return (
    <footer
      className="px-4 sm:px-6 md:px-8 lg:px-12 pt-24 md:pt-28 pb-10 md:pb-12 bg-[var(--color-ink)] text-[var(--color-cream)]"
      style={{ borderTop: '1px solid rgba(13,148,136,0.18)' }}
    >
      <div className="max-w-[1360px] mx-auto">
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.5fr_.85fr_.95fr_.85fr_1.1fr] gap-10 md:gap-12 lg:gap-14 pb-14"
          style={{ borderBottom: '1px solid rgba(13,148,136,0.14)' }}
        >
          <div>
            <div className="flex items-center gap-3 mb-6">
              <MeridianMark size={40} />
              <span
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '22px',
                  letterSpacing: '-0.01em',
                }}
              >
                Intelligent Singularity
              </span>
            </div>
            <p className="text-[15px] leading-[1.85] text-[var(--color-cream-dim)] max-w-[440px]">
              {studioBlurb}
            </p>
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[12px] uppercase" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-emerald)', letterSpacing: '0.08em', fontWeight: 500 }}>
              <span>0 trackers</span>
              <span aria-hidden="true" style={{ color: 'rgba(16,185,129,0.35)' }}>·</span>
              <span>0 third-party calls</span>
              <span aria-hidden="true" style={{ color: 'rgba(16,185,129,0.35)' }}>·</span>
              <span>Self-hosted on a single VPS</span>
            </div>
          </div>

          <FooterColumn title="Studio">
            <FooterLink href="/manifesto">Manifesto</FooterLink>
            <FooterLink href="/#flagships">Flagships</FooterLink>
            <FooterLink href="/portfolio">Portfolio</FooterLink>
            <FooterLink href="/about">About</FooterLink>
            <FooterLink href="/careers">Careers</FooterLink>
            <FooterLink href="/press">Press</FooterLink>
            <FooterLink href="/help">Help</FooterLink>
            <FooterLink href="/contact">Contact</FooterLink>
          </FooterColumn>

          <FooterColumn title="Transparency">
            <FooterLink href="/changelog">Changelog</FooterLink>
            <FooterLink href="/status">Status</FooterLink>
            <FooterLink href="/roadmap">Roadmap</FooterLink>
            <FooterLink href="/insights">Insights</FooterLink>
            <FooterLink href="/security">Security</FooterLink>
            <FooterLink href="/green">Green pledge</FooterLink>
            <FooterLink href="/pricing">Pricing</FooterLink>
            <FooterLink href="/faq">FAQ</FooterLink>
          </FooterColumn>

          <FooterColumn title="Legal">
            <FooterLink href="/legal/privacy">Privacy</FooterLink>
            <FooterLink href="/legal/terms">Terms</FooterLink>
            <FooterLink href="/legal/accessibility">Accessibility</FooterLink>
            <FooterLink href="/legal/cookies">Cookies</FooterLink>
            <FooterLink href="/trust">Trust</FooterLink>
            <p
              className="mt-4 text-[11.5px] leading-[1.7] text-[var(--color-cream-faint)] max-w-[220px]"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              Legal pages are maintained in English only.
            </p>
          </FooterColumn>

          <div>
            <div
              className="text-[12px] uppercase text-[var(--color-emerald)] mb-4 font-medium"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              14 Languages
            </div>
            <p className="text-[13px] leading-[1.75] text-[var(--color-cream-dim)] mb-5 max-w-[300px]">
              Every public page ships in fourteen languages, including Arabic, Nastaliq Urdu,
              Bengali, Hindi, Hausa, Swahili, and Yoruba.
            </p>
            <LanguageWheel />
          </div>
        </div>

        <div className="pt-8 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div
            className="text-[11px] text-[var(--color-cream-faint)] leading-[1.7]"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            <div>&copy; 2026 Intelligent Singularity Inc. · Alberta, Canada</div>
            <div className="mt-1">Self-hosted on a single VPS · No CDN · No tracker</div>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-5 py-[10px] rounded-full text-[11px] uppercase tracking-[0.12em] font-semibold text-white transition-all hover:opacity-90 hover:-translate-y-0.5"
            style={{
              fontFamily: 'var(--font-mono)',
              background: 'var(--color-emerald)',
              boxShadow: '0 2px 10px rgba(16,185,129,0.28)',
            }}
          >
            Start a conversation
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div
        className="text-[12px] uppercase text-[var(--color-mint)] mb-4 font-medium"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        {title}
      </div>
      <div className="flex flex-col">{children}</div>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      className="py-[7px] text-[14px] text-[var(--color-cream-soft)] hover:text-[var(--color-emerald)] transition-colors"
      href={href}
    >
      {children}
    </Link>
  );
}
