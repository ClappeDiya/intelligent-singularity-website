import Link from 'next/link';
import { Suspense } from 'react';
import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import { getBreadcrumbSchema, getWebPageSchema } from '@/lib/schema';
import { fetchPressPage } from '@/lib/payload';
import { PRESS_PAGE_SEED } from '@/lib/seed/new-pages/press';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({
    locale,
    pathname: '/press',
    title: 'Press & Media | Intelligent Singularity',
    description:
      'Press kit, fact sheet, approved quotes, and direct contact for journalists and researchers covering Intelligent Singularity.',
  });
}

async function PressContent({ locale }: { locale: string }) {
  const cmsPage = (await fetchPressPage(locale).catch(() => null)) as any;
  const page: any = cmsPage ?? PRESS_PAGE_SEED;

  const webPageSchema = getWebPageSchema({
    locale,
    pathname: '/press',
    name: 'Press & Media | Intelligent Singularity',
    description:
      'Press kit, fact sheet, approved quotes, and direct contact for journalists and researchers covering Intelligent Singularity.',
  });
  const breadcrumbSchema = getBreadcrumbSchema({
    locale,
    crumbs: [
      { name: 'Home', pathname: '/' },
      { name: 'Press', pathname: '/press' },
    ],
  });

  return (
    <article className="page-shell-wide">
      <JsonLd id={`press-schema-${locale}`} data={webPageSchema} />
      <JsonLd id={`press-breadcrumb-schema-${locale}`} data={breadcrumbSchema} />
      <div className="page-label">{page.eyebrow}</div>
      <h1 className="page-title">{page.title}</h1>
      <p className="page-lead">{page.lede}</p>

      <section aria-labelledby="fact-heading" className="mb-20">
        <h2
          id="fact-heading"
          className="mb-6 text-[var(--color-paper-ink)]"
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(26px, 3vw, 38px)',
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            fontWeight: 600,
          }}
        >
          Fact sheet
        </h2>
        <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {(page.factSheet ?? []).map((f: any) => (
            <div key={f.label} className="is-card rounded-[18px] p-5 flex flex-col gap-2">
              <dt className="label-mono">{f.label}</dt>
              <dd
                className="text-[16px] leading-[1.35]"
                style={{ fontFamily: 'var(--font-serif)', fontWeight: 600, letterSpacing: '-0.01em', color: 'var(--color-paper-ink)' }}
              >
                {f.value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="quotes-heading" className="mb-20">
        <h2
          id="quotes-heading"
          className="mb-6 text-[var(--color-paper-ink)]"
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(26px, 3vw, 38px)',
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            fontWeight: 600,
          }}
        >
          Approved quotes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {(page.quotes ?? []).map((q: any, i: number) => (
            <figure key={i} className="is-card rounded-[24px] p-8 md:p-10 flex flex-col justify-between gap-6">
              <blockquote
                className="text-[var(--color-paper-ink)]"
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(19px, 2vw, 24px)',
                  lineHeight: 1.35,
                  letterSpacing: '-0.02em',
                  fontWeight: 500,
                }}
              >
                &ldquo;{q.text}&rdquo;
              </blockquote>
              <figcaption>
                <div className="text-[14px]" style={{ fontFamily: 'var(--font-serif)', fontWeight: 600, color: 'var(--color-paper-ink)' }}>
                  {q.who}
                </div>
                <div className="label-mono mt-1 opacity-70">{q.role}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section aria-labelledby="kit-heading" className="mb-20 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
        <h2 id="kit-heading" className="sr-only">Brand assets</h2>
        <div className="is-card rounded-[22px] p-7 md:p-8 flex flex-col gap-4">
          <div className="label-mono">Brand name</div>
          <p className="text-[15px] leading-[1.75]" style={{ color: 'rgba(17,24,39,0.72)' }}>
            {page.brandGuidance?.brandName}
          </p>
        </div>
        <div className="is-card rounded-[22px] p-7 md:p-8 flex flex-col gap-4">
          <div className="label-mono">Founder reference</div>
          <p className="text-[15px] leading-[1.75]" style={{ color: 'rgba(17,24,39,0.72)' }}>
            {page.brandGuidance?.founderReference}
          </p>
        </div>
      </section>

      <section aria-labelledby="boilerplate-heading" className="mb-20">
        <h2
          id="boilerplate-heading"
          className="mb-3 text-[var(--color-paper-ink)]"
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(26px, 3vw, 38px)',
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            fontWeight: 600,
          }}
        >
          Press boilerplate
        </h2>
        <p className="text-[15px] leading-[1.7] mb-6 max-w-[60ch]" style={{ color: 'rgba(17,24,39,0.7)' }}>
          One paragraph, drop-in for press releases. Approved for verbatim use.
        </p>
        <div
          className="rounded-[20px] p-7 md:p-8"
          style={{ border: '1px dashed rgba(16,185,129,0.35)', background: 'rgba(16,185,129,0.04)' }}
        >
          <p className="text-[15.5px] leading-[1.8]" style={{ color: 'var(--color-paper-ink)', fontFamily: 'var(--font-serif)' }}>
            {page.boilerplate}
          </p>
        </div>
      </section>

      <section aria-labelledby="angles-yes-heading" className="mb-14">
        <h2
          id="angles-yes-heading"
          className="mb-3 text-[var(--color-paper-ink)]"
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(26px, 3vw, 38px)',
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            fontWeight: 600,
          }}
        >
          Story angles we welcome
        </h2>
        <p className="text-[15px] leading-[1.7] mb-6 max-w-[60ch]" style={{ color: 'rgba(17,24,39,0.7)' }}>
          If your story sits inside one of these angles, we will move quickly to make a founder, an engineer, or a product lead available — usually within a working day.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {(page.storyAnglesYes ?? []).map((a: any) => (
            <div key={a.title} className="is-card rounded-[20px] p-6 md:p-7" style={{ borderLeft: '3px solid var(--color-emerald)' }}>
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
                {a.title}
              </h3>
              <p className="text-[14.5px] leading-[1.7]" style={{ color: 'rgba(17,24,39,0.7)' }}>
                {a.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="angles-no-heading" className="mb-20">
        <h2
          id="angles-no-heading"
          className="mb-3 text-[var(--color-paper-ink)]"
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(26px, 3vw, 38px)',
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            fontWeight: 600,
          }}
        >
          Story angles we usually decline
        </h2>
        <p className="text-[15px] leading-[1.7] mb-6 max-w-[60ch]" style={{ color: 'rgba(17,24,39,0.7)' }}>
          Honesty up front saves everyone time. We will not provide quotes for the angles below. We will, however, point you to a journalist or analyst whose work fits the story better.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {(page.storyAnglesNo ?? []).map((a: any) => (
            <div key={a.title} className="is-card rounded-[20px] p-6 md:p-7" style={{ borderLeft: '3px solid rgba(220,38,38,0.4)' }}>
              <h3
                className="mb-2"
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(17px, 1.6vw, 20px)',
                  letterSpacing: '-0.02em',
                  fontWeight: 600,
                  lineHeight: 1.2,
                  color: 'var(--color-paper-ink)',
                  textWrap: 'balance',
                }}
              >
                {a.title}
              </h3>
              <p className="text-[14px] leading-[1.7]" style={{ color: 'rgba(17,24,39,0.68)' }}>
                {a.body}
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
            className="text-[11px] uppercase tracking-[0.1em] text-[var(--color-emerald)] mb-3"
            style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}
          >
            {page.contactCta?.eyebrow}
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
            {page.contactCta?.heading}
          </h3>
          <p className="text-[14.5px] leading-[1.7] text-[var(--color-cream-dim)] max-w-[54ch]">
            {page.contactCta?.body}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href={`mailto:${page.contactCta?.email}`}
            className="inline-flex items-center gap-2 px-6 py-[11px] rounded-full text-[12px] uppercase font-semibold"
            style={{ fontFamily: 'var(--font-mono)', background: 'linear-gradient(135deg,#059669,#0d9488)', color: '#fff', boxShadow: '0 4px 14px rgba(16,185,129,0.28)' }}
          >
            press@…
            <span aria-hidden="true">→</span>
          </a>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-[11px] rounded-full border text-[12px] uppercase font-semibold text-[var(--color-cream)] transition-colors hover:border-[var(--color-emerald)] hover:text-[var(--color-emerald)]"
            style={{ fontFamily: 'var(--font-mono)', borderColor: 'rgba(16,185,129,0.3)' }}
          >
            Contact form
          </Link>
        </div>
      </section>
    </article>
  );
}

export default async function PressPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <Suspense fallback={<div className="px-4 sm:px-6 md:px-8 lg:px-12 py-16 md:py-20 lg:py-[120px]">Loading...</div>}>
      <PressContent locale={locale} />
    </Suspense>
  );
}
