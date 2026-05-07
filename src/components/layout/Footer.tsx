import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { MeridianMark } from '@/components/brand/MeridianMark';
import { LanguageWheel } from './LanguageWheel';

export async function Footer({ locale, studioBlurb }: { locale: string; studioBlurb: string }) {
  const lp = (path: string) => `/${locale}${path}`;
  const t = await getTranslations('footer');
  const tNav = await getTranslations('nav');
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
            <Link href={lp('/')} className="flex items-center gap-3 mb-6 focus-visible:outline-2 focus-visible:outline-[var(--color-emerald)] rounded-sm">
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
            </Link>
            <p className="text-[15px] leading-[1.85] text-[var(--color-cream-dim)] max-w-[440px]">
              {studioBlurb}
            </p>
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[12px] uppercase" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-emerald)', letterSpacing: '0.08em', fontWeight: 500 }}>
              <span>{t('zeroTrackers')}</span>
              <span aria-hidden="true" style={{ color: 'rgba(16,185,129,0.35)' }}>·</span>
              <span>{t('zeroThirdParty')}</span>
              <span aria-hidden="true" style={{ color: 'rgba(16,185,129,0.35)' }}>·</span>
              <span>{t('selfHostedChip')}</span>
            </div>
          </div>

          <FooterColumn title={t('studioLabel')}>
            <FooterLink href={lp('/manifesto')}>{tNav('manifesto')}</FooterLink>
            <FooterLink href={lp('/#flagships')}>{t('links.flagships')}</FooterLink>
            <FooterLink href={lp('/portfolio')}>{tNav('portfolio')}</FooterLink>
            <FooterLink href={lp('/about')}>{tNav('about')}</FooterLink>
            <FooterLink href={lp('/careers')}>{t('links.careers')}</FooterLink>
            <FooterLink href={lp('/press')}>{t('links.press')}</FooterLink>
            <FooterLink href={lp('/help')}>{t('helpLabel')}</FooterLink>
            <FooterLink href={lp('/contact')}>{tNav('contact')}</FooterLink>
          </FooterColumn>

          <FooterColumn title={t('transparencyLabel')}>
            <FooterLink href={lp('/changelog')}>{t('links.changelog')}</FooterLink>
            <FooterLink href={lp('/status')}>{t('links.status')}</FooterLink>
            <FooterLink href={lp('/roadmap')}>{t('links.roadmap')}</FooterLink>
            <FooterLink href={lp('/insights')}>{tNav('insights')}</FooterLink>
            <FooterLink href={lp('/security')}>{tNav('security')}</FooterLink>
            <FooterLink href={lp('/green')}>{t('links.greenPledge')}</FooterLink>
            <FooterLink href={lp('/pricing')}>{tNav('pricing')}</FooterLink>
            <FooterLink href={lp('/faq')}>{tNav('faq')}</FooterLink>
          </FooterColumn>

          <FooterColumn title={t('legalLabel')}>
            <FooterLink href={lp('/legal/privacy')}>{t('links.privacy')}</FooterLink>
            <FooterLink href={lp('/legal/terms')}>{t('links.terms')}</FooterLink>
            <FooterLink href={lp('/legal/accessibility')}>{t('links.accessibility')}</FooterLink>
            <FooterLink href={lp('/legal/cookies')}>{t('links.cookies')}</FooterLink>
            <FooterLink href={lp('/trust')}>{t('trustLabel')}</FooterLink>
            <p
              className="mt-4 text-[11.5px] leading-[1.7] text-[var(--color-cream-faint)] max-w-[220px]"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {t('legalEnglishOnly')}
            </p>
          </FooterColumn>

          <div>
            <div
              className="text-[12px] uppercase text-[var(--color-emerald)] mb-4 font-medium"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {t('languagesLabel')}
            </div>
            <p className="text-[13px] leading-[1.75] text-[var(--color-cream-dim)] mb-5 max-w-[300px]">
              {t('languagesBlurb')}
            </p>
            <LanguageWheel />
          </div>
        </div>

        <div className="pt-8 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div
            className="text-[11px] text-[var(--color-cream-faint)] leading-[1.7] max-w-[520px]"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            {t('alberta')}
          </div>
          <Link
            href={lp('/contact')}
            className="inline-flex items-center gap-2 px-5 py-[10px] rounded-full text-[11px] uppercase tracking-[0.12em] font-semibold text-white transition-all hover:opacity-90 hover:-translate-y-0.5"
            style={{
              fontFamily: 'var(--font-mono)',
              background: 'var(--color-emerald-ink)',
              boxShadow: '0 2px 10px rgba(16,185,129,0.28)',
            }}
          >
            {t('startConversation')}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <nav aria-label={title}>
      <div
        className="text-[12px] uppercase text-[var(--color-mint)] mb-4 font-medium"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        {title}
      </div>
      <div className="flex flex-col">{children}</div>
    </nav>
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
