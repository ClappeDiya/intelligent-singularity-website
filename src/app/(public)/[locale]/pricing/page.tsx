import Link from 'next/link';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { buildPageMetadata } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import { getBreadcrumbSchema, getWebPageSchema } from '@/lib/schema';
import { fetchPricingPage } from '@/lib/payload';
import { PRICING_PAGE_SEED } from '@/lib/seed/new-pages/pricing';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.pricing' });
  return buildPageMetadata({
    locale,
    pathname: '/pricing',
    title: t('metaTitle'),
    description: t('metaDescription'),
  });
}

async function PricingContent({ locale }: { locale: string }) {
  const t = await getTranslations('pages.pricing');
  const tCommon = await getTranslations('common');
  const cmsPage = (await fetchPricingPage(locale).catch(() => null)) as any;
  const page: any = cmsPage ?? PRICING_PAGE_SEED;

  const webPageSchema = getWebPageSchema({
    locale,
    pathname: '/pricing',
    name: t('schemaName'),
    description: t('schemaDescription'),
  });
  const breadcrumbSchema = getBreadcrumbSchema({
    locale,
    crumbs: [
      { name: tCommon('breadcrumbHome'), pathname: '/' },
      { name: t('breadcrumbCurrent'), pathname: '/pricing' },
    ],
  });

  return (
    <article className="page-shell-wide">
      <JsonLd id={`pricing-schema-${locale}`} data={webPageSchema} />
      <JsonLd id={`pricing-breadcrumb-schema-${locale}`} data={breadcrumbSchema} />
      <div className="page-label">{page.eyebrow}</div>
      <h1 className="page-title">{page.title}</h1>
      <p className="page-lead">{page.lede}</p>

      <section
        className="mb-14 rounded-[24px] p-8 md:p-10"
        style={{
          background: 'linear-gradient(135deg, rgba(16,185,129,0.06), rgba(20,184,166,0.06))',
          border: '1px solid rgba(16,185,129,0.15)',
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr] gap-8 md:gap-12 items-center">
          <div>
            <div className="label-mono mb-3">{page.whyThisExists?.eyebrow}</div>
            <h2
              className="mb-4 text-[var(--color-paper-ink)]"
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(26px, 3vw, 40px)',
                letterSpacing: '-0.03em',
                lineHeight: 1.05,
                fontWeight: 600,
              }}
            >
              {page.whyThisExists?.heading}
            </h2>
            <p className="text-[15.5px] leading-[1.75]" style={{ color: 'var(--color-paper-ink-soft)' }}>
              {page.whyThisExists?.body}
            </p>
          </div>
          <div className="flex flex-col gap-4 text-[14.5px] leading-[1.7]" style={{ color: 'var(--color-paper-ink-soft)' }}>
            <p>
              <strong style={{ color: 'var(--color-emerald-ink)' }}>{t('tierFree')}</strong>{' '}
              {page.whyThisExists?.freeTierLine?.replace(/^Free tier — /i, '')}
            </p>
            <p>
              <strong style={{ color: 'var(--color-emerald-ink)' }}>{t('tierPaid')}</strong>{' '}
              {page.whyThisExists?.paidTierLine?.replace(/^Paid tier — /i, '')}
            </p>
            <p>
              <strong style={{ color: 'var(--color-emerald-ink)' }}>{t('tierEnterprise')}</strong>{' '}
              {page.whyThisExists?.enterpriseLine?.replace(/^Enterprise — /i, '')}
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="rules-heading" className="mb-14">
        <h2
          id="rules-heading"
          className="mb-6 text-[var(--color-paper-ink)]"
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(26px, 3vw, 38px)',
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            fontWeight: 600,
          }}
        >
          {t('sixRulesHeading')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {(page.principles ?? []).map((p: any) => (
            <div key={p.label} className="is-card rounded-[20px] p-6 md:p-7 flex gap-5">
              <span
                className="inline-flex items-center justify-center w-10 h-10 shrink-0 rounded-full text-[12px] font-semibold"
                style={{
                  fontFamily: 'var(--font-mono)',
                  background: 'linear-gradient(135deg, rgba(16,185,129,0.12), rgba(20,184,166,0.12))',
                  color: 'var(--color-emerald-ink)',
                  border: '1px solid rgba(16,185,129,0.2)',
                }}
              >
                {p.label}
              </span>
              <div>
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
                <p className="text-[14.5px] leading-[1.72]" style={{ color: 'var(--color-paper-ink-muted)' }}>
                  {p.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="anti-patterns-heading" className="mb-14">
        <h2
          id="anti-patterns-heading"
          className="mb-3 text-[var(--color-paper-ink)]"
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(26px, 3vw, 38px)',
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            fontWeight: 600,
          }}
        >
          {t('antiPatternsHeading')}
        </h2>
        <p className="text-[15px] leading-[1.7] mb-6 max-w-[60ch]" style={{ color: 'var(--color-paper-ink-muted)' }}>
          {t('antiPatternsBody')}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {(page.antiPatterns ?? []).map((a: any) => (
            <div
              key={a.title}
              className="is-card rounded-[20px] p-6 md:p-7"
              style={{ borderLeft: '3px solid rgba(220,38,38,0.35)' }}
            >
              <h3
                className="mb-2"
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(18px, 1.8vw, 22px)',
                  letterSpacing: '-0.02em',
                  fontWeight: 600,
                  lineHeight: 1.2,
                  color: 'var(--color-paper-ink)',
                  textWrap: 'balance',
                }}
              >
                {a.title}
              </h3>
              <p className="text-[14.5px] leading-[1.72]" style={{ color: 'var(--color-paper-ink-muted)' }}>
                {a.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="example-heading" className="mb-14">
        <h2
          id="example-heading"
          className="mb-3 text-[var(--color-paper-ink)]"
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(26px, 3vw, 38px)',
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            fontWeight: 600,
          }}
        >
          {t('workedExampleHeading')}
        </h2>
        <p className="text-[15px] leading-[1.7] mb-6 max-w-[60ch]" style={{ color: 'var(--color-paper-ink-muted)' }}>
          {t('workedExampleBody')}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {(page.workedExample ?? []).map((row: any) => (
            <div key={row.who} className="is-card rounded-[20px] p-6 md:p-7">
              <div className="label-mono mb-2">{row.tier}</div>
              <h3
                className="mb-2"
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(17px, 1.6vw, 20px)',
                  letterSpacing: '-0.02em',
                  fontWeight: 600,
                  lineHeight: 1.25,
                  color: 'var(--color-paper-ink)',
                  textWrap: 'balance',
                }}
              >
                {row.who}
              </h3>
              <p className="text-[14px] leading-[1.7] mb-3" style={{ color: 'var(--color-paper-ink-soft)' }}>
                {row.what}
              </p>
              <p className="text-[13px] leading-[1.6]" style={{ color: 'var(--color-paper-ink-soft)', fontStyle: 'italic' }}>
                {row.note}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section
        className="rounded-[24px] p-8 md:p-10 flex flex-col md:flex-row items-stretch md:items-center gap-6"
        style={{
          border: '1px solid rgba(16,185,129,0.18)',
          background: 'linear-gradient(135deg, rgba(16,185,129,0.06), rgba(20,184,166,0.04))',
        }}
      >
        <div className="flex-1">
          <div className="label-mono mb-2">{page.seePricesCta?.eyebrow}</div>
          <h3
            className="mb-2 text-[var(--color-paper-ink)]"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(22px, 2.4vw, 30px)',
              letterSpacing: '-0.025em',
              fontWeight: 600,
              lineHeight: 1.15,
            }}
          >
            {page.seePricesCta?.heading}
          </h3>
          <p className="text-[14.5px] leading-[1.7]" style={{ color: 'var(--color-paper-ink-muted)' }}>
            {page.seePricesCta?.body}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link href={`/${locale}/portfolio`} className="btn-primary" style={{ fontFamily: 'var(--font-mono)' }}>
            {t('viewThePortfolio')}
            <span aria-hidden="true">→</span>
          </Link>
          <Link href={`/${locale}/contact`} className="btn-outline" style={{ fontFamily: 'var(--font-mono)' }}>
            {t('talkAboutPricing')}
          </Link>
        </div>
      </section>
    </article>
  );
}

export default async function PricingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <PricingContent locale={locale} />;
}
