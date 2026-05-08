import Link from 'next/link';
import { Suspense } from 'react';
import { PageLoading } from '@/components/pages/shared/PageLoading';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { buildPageMetadata } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import { getBreadcrumbSchema, getWebPageSchema } from '@/lib/schema';
import { SecurityShield } from '@/components/illustrations/SecurityShield';
import { fetchSecurityPage } from '@/lib/payload';
import { SECURITY_PAGE_SEED } from '@/lib/seed/new-pages/security';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({
    locale,
    pathname: '/security',
    title: 'Security & Trust | Intelligent Singularity',
    description:
      'How we secure this site and every product in our portfolio: TLS, zero third-party calls, short retention, encrypted backups, and honest incident response.',
  });
}

async function SecurityContent({ locale }: { locale: string }) {
  const cmsPage = (await fetchSecurityPage(locale).catch(() => null)) as any;
  const page: any = cmsPage ?? SECURITY_PAGE_SEED;
  const t = await getTranslations('pages.security');

  const webPageSchema = getWebPageSchema({
    locale,
    pathname: '/security',
    name: 'Security & Trust | Intelligent Singularity',
    description:
      'Security and data-handling practices across Intelligent Singularity: encryption, self-hosting, zero third-party calls, and short retention.',
  });
  const breadcrumbSchema = getBreadcrumbSchema({
    locale,
    crumbs: [
      { name: 'Home', pathname: '/' },
      { name: 'Security', pathname: '/security' },
    ],
  });

  return (
    <article className="page-shell-wide">
      <JsonLd id={`security-schema-${locale}`} data={webPageSchema} />
      <JsonLd id={`security-breadcrumb-schema-${locale}`} data={breadcrumbSchema} />
      <div className="page-label">{page.eyebrow}</div>
      <h1 className="page-title">{page.title}</h1>
      <p className="page-lead">{page.lede}</p>

      <div
        className="mb-12 rounded-[24px] p-8 md:p-10 flex flex-col md:flex-row items-center gap-8 md:gap-10"
        style={{
          border: '1px solid rgba(16,185,129,0.18)',
          background:
            'radial-gradient(700px 280px at 80% -20%, rgba(16,185,129,0.08), transparent 70%), rgba(255,255,255,0.95)',
        }}
      >
        <div className="shrink-0">
          <SecurityShield size={180} />
        </div>
        <div className="flex-1">
          <div className="label-mono mb-2">{page.postureSummary?.eyebrow}</div>
          <h2
            className="mb-3"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(22px, 2.4vw, 30px)',
              letterSpacing: '-0.025em',
              fontWeight: 600,
              lineHeight: 1.15,
              color: 'var(--color-paper-ink)',
              textWrap: 'balance',
            }}
          >
            {page.postureSummary?.heading}
          </h2>
          <p className="text-[14.5px] leading-[1.7] max-w-[60ch]" style={{ color: 'var(--color-paper-ink-muted)' }}>
            {page.postureSummary?.body}
          </p>
        </div>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 mb-14">
        {(page.topStats ?? []).map((s: any) => (
          <div key={s.label} className="is-card rounded-[22px] p-6 flex flex-col gap-2">
            <div className="label-mono">{s.label}</div>
            <div
              className="gradient-text leading-none"
              style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(30px, 3vw, 44px)', fontWeight: 600, letterSpacing: '-0.02em' }}
            >
              {s.value}
            </div>
            <div className="text-[13.5px] leading-[1.6]" style={{ color: 'var(--color-paper-ink-muted)' }}>{s.hint}</div>
          </div>
        ))}
      </section>

      <section aria-labelledby="posture-heading" className="mb-14">
        <h2
          id="posture-heading"
          className="mb-6 text-[var(--color-paper-ink)]"
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(28px, 3.2vw, 42px)',
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            fontWeight: 600,
          }}
        >
          {t('postureHeading')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {(page.posture ?? []).map((p: any) => (
            <div key={p.title} className="is-card rounded-[20px] p-6 md:p-7">
              <h3
                className="mb-2"
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(19px, 1.8vw, 22px)',
                  letterSpacing: '-0.02em',
                  fontWeight: 600,
                  lineHeight: 1.2,
                  color: 'var(--color-paper-ink)',
                  textWrap: 'balance',
                }}
              >
                {p.title}
              </h3>
              <p className="text-[14.5px] leading-[1.7]" style={{ color: 'var(--color-paper-ink-muted)' }}>
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="data-heading" className="mb-14">
        <h2
          id="data-heading"
          className="mb-6 text-[var(--color-paper-ink)]"
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(28px, 3.2vw, 42px)',
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            fontWeight: 600,
          }}
        >
          {t('dataHeading')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {(page.dataHandling ?? []).map((p: any) => (
            <div key={p.title} className="is-card rounded-[20px] p-6 md:p-7">
              <h3
                className="mb-2"
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(19px, 1.8vw, 22px)',
                  letterSpacing: '-0.02em',
                  fontWeight: 600,
                  lineHeight: 1.2,
                  color: 'var(--color-paper-ink)',
                  textWrap: 'balance',
                }}
              >
                {p.title}
              </h3>
              <p className="text-[14.5px] leading-[1.7]" style={{ color: 'var(--color-paper-ink-muted)' }}>
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="compliance-heading" className="mb-14">
        <h2
          id="compliance-heading"
          className="mb-3 text-[var(--color-paper-ink)]"
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(28px, 3.2vw, 42px)',
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            fontWeight: 600,
          }}
        >
          {t('complianceHeading')}
        </h2>
        <p className="text-[15px] leading-[1.7] mb-6 max-w-[60ch]" style={{ color: 'var(--color-paper-ink-muted)' }}>
          {t('complianceLede')}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {(page.compliance ?? []).map((c: any) => (
            <div key={c.title} className="is-card rounded-[20px] p-6 md:p-7">
              <h3
                className="mb-2"
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(19px, 1.8vw, 22px)',
                  letterSpacing: '-0.02em',
                  fontWeight: 600,
                  lineHeight: 1.2,
                  color: 'var(--color-paper-ink)',
                  textWrap: 'balance',
                }}
              >
                {c.title}
              </h3>
              <p className="text-[14.5px] leading-[1.7]" style={{ color: 'var(--color-paper-ink-muted)' }}>
                {c.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section
        className="rounded-[24px] p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center gap-6"
        style={{ background: 'var(--color-ink)', color: 'var(--color-cream)', border: '1px solid rgba(16,185,129,0.2)' }}
      >
        <div className="flex-1">
          <div
            className="text-[11px] uppercase tracking-[0.1em] text-[var(--color-emerald)] mb-2"
            style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}
          >
            {page.reportCta?.eyebrow}
          </div>
          <h3
            className="mb-2"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(22px, 2.4vw, 30px)',
              letterSpacing: '-0.025em',
              fontWeight: 600,
              lineHeight: 1.15,
            }}
          >
            {page.reportCta?.heading}
          </h3>
          <p className="text-[14.5px] leading-[1.7] text-[var(--color-cream-dim)] max-w-[60ch]">
            {page.reportCta?.body}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href={`mailto:${page.reportCta?.email}`}
            aria-label={`Email ${page.reportCta?.email}`}
            className="inline-flex items-center gap-2 px-6 py-[11px] rounded-full text-[12px] uppercase font-semibold"
            style={{ fontFamily: 'var(--font-mono)', background: 'linear-gradient(135deg, #059669, #0d9488)', color: '#fff', boxShadow: '0 4px 14px rgba(16,185,129,0.28)' }}
          >
            security@…
            <span aria-hidden="true">→</span>
          </a>
          <Link
            href={`/${locale}/legal/privacy`}
            className="inline-flex items-center gap-2 px-6 py-[11px] rounded-full border text-[12px] uppercase font-semibold text-[var(--color-cream)] transition-colors hover:border-[var(--color-emerald)] hover:text-[var(--color-emerald)]"
            style={{ fontFamily: 'var(--font-mono)', borderColor: 'rgba(16,185,129,0.3)' }}
          >
            {t('privacyPolicyLink')}
          </Link>
        </div>
      </section>
    </article>
  );
}

export default async function SecurityPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <Suspense fallback={<PageLoading />}>
      <SecurityContent locale={locale} />
    </Suspense>
  );
}
