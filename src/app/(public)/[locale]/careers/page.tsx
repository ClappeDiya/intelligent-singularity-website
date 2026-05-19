import Link from 'next/link';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { buildPageMetadata } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import { getBreadcrumbSchema, getWebPageSchema } from '@/lib/schema';
import { fetchCareersPage } from '@/lib/payload';
import { CAREERS_PAGE_SEED } from '@/lib/seed/new-pages/careers';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.careers' });
  return buildPageMetadata({
    locale,
    pathname: '/careers',
    title: t('metaTitle'),
    description: t('metaDescription'),
  });
}

async function CareersContent({ locale }: { locale: string }) {
  const cmsPage = (await fetchCareersPage(locale).catch(() => null)) as any;
  const page: any = cmsPage ?? CAREERS_PAGE_SEED;
  const t = await getTranslations('pages.careers');
  const tCommon = await getTranslations('common');

  const webPageSchema = getWebPageSchema({
    locale,
    pathname: '/careers',
    name: t('schemaName'),
    description: t('schemaDescription'),
  });
  const breadcrumbSchema = getBreadcrumbSchema({
    locale,
    crumbs: [
      { name: tCommon('breadcrumbHome'), pathname: '/' },
      { name: t('breadcrumbCurrent'), pathname: '/careers' },
    ],
  });

  return (
    <article className="page-shell-wide">
      <JsonLd id={`careers-schema-${locale}`} data={webPageSchema} />
      <JsonLd id={`careers-breadcrumb-schema-${locale}`} data={breadcrumbSchema} />
      <div className="page-label">{page.eyebrow}</div>
      <h1 className="page-title">{page.title}</h1>
      <p className="page-lead">{page.lede}</p>

      <figure
        className="mb-14 rounded-[24px] overflow-hidden"
        style={{
          border: '1px solid rgba(16,185,129,0.18)',
          background:
            'radial-gradient(800px 280px at 50% -20%, rgba(16,185,129,0.08), transparent 70%), var(--color-paper-soft)',
        }}
      >
        {/* Decorative SVG: native <img> is leaner than next/image runtime against the 50 KB budget. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/illustrations/careers-horizon.svg"
          alt=""
          loading="lazy"
          decoding="async"
          className="block w-full h-auto"
          width={960}
          height={360}
        />
      </figure>

      <section aria-labelledby="how-heading" className="mb-20">
        <h2
          id="how-heading"
          className="mb-6 text-[var(--color-paper-ink)]"
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(26px, 3vw, 38px)',
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            fontWeight: 600,
          }}
        >
          {t('howWeWorkHeading')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {(page.howWeWork ?? []).map((v: any) => (
            <div key={v.title} className="is-card rounded-[20px] p-7 md:p-8">
              <h3
                className="mb-3"
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
                {v.title}
              </h3>
              <p className="text-[14.5px] leading-[1.75]" style={{ color: 'var(--color-paper-ink-muted)' }}>
                {v.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="family-heading" className="mb-20">
        <h2
          id="family-heading"
          className="mb-3 text-[var(--color-paper-ink)]"
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(26px, 3vw, 38px)',
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            fontWeight: 600,
          }}
        >
          {t('whatYouWouldWorkOnHeading')}
        </h2>
        <p className="text-[15px] leading-[1.7] mb-6 max-w-[60ch]" style={{ color: 'var(--color-paper-ink-muted)' }}>
          {t('whatYouWouldWorkOnLede')}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
          {(page.productFamily ?? []).map((p: any) => (
            <div key={p.name} className="is-card rounded-[16px] p-5 flex flex-col gap-1">
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: 'var(--color-emerald-ink)',
                  fontWeight: 600,
                }}
              >
                {p.name}
              </div>
              <p className="text-[14px] leading-[1.6]" style={{ color: 'var(--color-paper-ink-soft)' }}>
                {p.line}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="process-heading" className="mb-20">
        <h2
          id="process-heading"
          className="mb-3 text-[var(--color-paper-ink)]"
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(26px, 3vw, 38px)',
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            fontWeight: 600,
          }}
        >
          {t('howWeHireHeading')}
        </h2>
        <p className="text-[15px] leading-[1.7] mb-6 max-w-[60ch]" style={{ color: 'var(--color-paper-ink-muted)' }}>
          {t('howWeHireLede')}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {(page.process ?? []).map((p: any) => (
            <div key={p.stage} className="is-card rounded-[20px] p-6 md:p-7">
              <div className="label-mono mb-2" style={{ color: 'var(--color-emerald-ink)' }}>
                {p.stage}
              </div>
              <p className="text-[14.5px] leading-[1.7]" style={{ color: 'var(--color-paper-ink-soft)' }}>
                {p.what}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section
        aria-labelledby="openings-heading"
        className="mb-20 rounded-[24px] p-8 md:p-12"
        style={{
          border: '1px solid rgba(16,185,129,0.15)',
          background: 'linear-gradient(180deg, rgba(240,253,244,0.9) 0%, rgba(255,255,255,0.95) 100%)',
        }}
      >
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
          <div>
            <div className="label-mono mb-2">{page.openings?.heading ?? t('openRolesFallback')}</div>
            <h2
              id="openings-heading"
              className="text-[var(--color-paper-ink)]"
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(26px, 3vw, 36px)',
                letterSpacing: '-0.03em',
                lineHeight: 1.08,
                fontWeight: 600,
              }}
            >
              {page.openings?.currentlyHiringText}
            </h2>
          </div>
          <div className="label-mono opacity-60">
            {t('updatedPrefix')} {new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date())}
          </div>
        </div>
        <p className="text-[15.5px] leading-[1.75] max-w-[60ch]" style={{ color: 'var(--color-paper-ink-muted)' }}>
          {page.openings?.note}
        </p>
      </section>

      <section
        className="rounded-[24px] p-8 md:p-12 flex flex-col md:flex-row items-stretch md:items-center gap-8"
        style={{
          border: '1px solid rgba(16,185,129,0.18)',
          background: 'linear-gradient(135deg, rgba(16,185,129,0.06), rgba(20,184,166,0.04))',
        }}
      >
        <div className="flex-1">
          <div className="label-mono mb-3">{page.introduceYourself?.eyebrow}</div>
          <h3
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
            {page.introduceYourself?.heading}
          </h3>
          <p className="text-[14.5px] leading-[1.75] max-w-[52ch]" style={{ color: 'var(--color-paper-ink-muted)' }}>
            {page.introduceYourself?.body}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          {page.introduceYourself?.email ? (
            <a
              href={`mailto:${page.introduceYourself.email}`}
              aria-label={tCommon('emailLinkAriaLabel', { email: page.introduceYourself.email })}
              className="btn-primary"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              careers@…
              <span aria-hidden="true">→</span>
            </a>
          ) : null}
          <Link href={`/${locale}/contact`} className="btn-outline" style={{ fontFamily: 'var(--font-mono)' }}>
            {t('contactFormCta')}
          </Link>
        </div>
      </section>
    </article>
  );
}

export default async function CareersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <CareersContent locale={locale} />;
}
