import Link from 'next/link';
import { Suspense } from 'react';
import type { Metadata } from 'next';
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
  return buildPageMetadata({
    locale,
    pathname: '/careers',
    title: 'Careers | Intelligent Singularity',
    description:
      'How the studio hires: small, remote, AI-augmented team shipping universal-access software. Current openings and the permanent invitation to introduce yourself.',
  });
}

async function CareersContent({ locale }: { locale: string }) {
  const cmsPage = (await fetchCareersPage(locale).catch(() => null)) as any;
  const page: any = cmsPage ?? CAREERS_PAGE_SEED;

  const webPageSchema = getWebPageSchema({
    locale,
    pathname: '/careers',
    name: 'Careers | Intelligent Singularity',
    description: 'How the studio hires and what it is like to work at Intelligent Singularity.',
  });
  const breadcrumbSchema = getBreadcrumbSchema({
    locale,
    crumbs: [
      { name: 'Home', pathname: '/' },
      { name: 'Careers', pathname: '/careers' },
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
          How we actually work
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
              <p className="text-[14.5px] leading-[1.75]" style={{ color: 'rgba(17,24,39,0.8)' }}>
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
          What you would actually work on
        </h2>
        <p className="text-[15px] leading-[1.7] mb-6 max-w-[60ch]" style={{ color: 'rgba(17,24,39,0.8)' }}>
          Intelligent Singularity is the parent company of a growing family of platforms. New hires rarely work on a single product for an entire year — most cycle across two or three, depending on what is shipping and what needs the most senior attention that quarter.
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
              <p className="text-[14px] leading-[1.6]" style={{ color: 'rgba(17,24,39,0.72)' }}>
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
          How we hire, end to end
        </h2>
        <p className="text-[15px] leading-[1.7] mb-6 max-w-[60ch]" style={{ color: 'rgba(17,24,39,0.8)' }}>
          Four steps. Maximum two weeks from first email to written offer if both sides move quickly. No surprise stages, no unpaid take-homes, no &ldquo;culture fit&rdquo; rejections without a written reason.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {(page.process ?? []).map((p: any) => (
            <div key={p.stage} className="is-card rounded-[20px] p-6 md:p-7">
              <div className="label-mono mb-2" style={{ color: 'var(--color-emerald-ink)' }}>
                {p.stage}
              </div>
              <p className="text-[14.5px] leading-[1.7]" style={{ color: 'rgba(17,24,39,0.72)' }}>
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
            <div className="label-mono mb-2">{page.openings?.heading ?? 'Open roles'}</div>
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
            Updated {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </div>
        </div>
        <p className="text-[15.5px] leading-[1.75] max-w-[60ch]" style={{ color: 'rgba(17,24,39,0.8)' }}>
          {page.openings?.note}
        </p>
      </section>

      <section
        className="rounded-[24px] p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center gap-8"
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
          <p className="text-[14.5px] leading-[1.75] max-w-[52ch]" style={{ color: 'rgba(17,24,39,0.78)' }}>
            {page.introduceYourself?.body}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href={`mailto:${page.introduceYourself?.email}`}
            className="btn-primary"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            careers@…
            <span aria-hidden="true">→</span>
          </a>
          <Link href="/contact" className="btn-outline" style={{ fontFamily: 'var(--font-mono)' }}>
            Contact form
          </Link>
        </div>
      </section>
    </article>
  );
}

export default async function CareersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <Suspense fallback={<div className="px-4 sm:px-6 md:px-8 lg:px-12 py-16 md:py-20 lg:py-[120px]">Loading...</div>}>
      <CareersContent locale={locale} />
    </Suspense>
  );
}
