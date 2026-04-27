import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { fetchHelpPage } from '@/lib/payload';
import { buildPageMetadata } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import { getWebPageSchema, getBreadcrumbSchema } from '@/lib/schema';
import { PageHero } from '@/components/pages/shared/PageHero';
import { SectionHeading } from '@/components/pages/shared/SectionHeading';
import { OutboundLink } from '@/components/pages/shared/OutboundLink';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({
    locale,
    pathname: '/help',
    title: 'Help | Intelligent Singularity',
    description:
      'Find help fast: browse categories, read popular answers, or reach a human in one click.',
  });
}

export default async function HelpPageRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const page = await fetchHelpPage(locale);

  const webPageSchema = getWebPageSchema({
    locale,
    pathname: '/help',
    name: 'Help | Intelligent Singularity',
    description: 'Help centre — browse categories, popular answers, and direct contact.',
  });
  const breadcrumbSchema = getBreadcrumbSchema({
    locale,
    crumbs: [
      { name: 'Home', pathname: '/' },
      { name: 'Help', pathname: '/help' },
    ],
  });

  const emergencyRow = (page as any).emergencyRow as { heading: string; body: string; href: string } | undefined;
  const routes = (page as any).routes ?? [];
  const popularQuestions = (page as any).popularQuestions ?? [];
  const contactFallback = (page as any).contactFallback as { heading: string; body: string; href: string } | undefined;

  return (
    <article className="page-shell-wide">
      <JsonLd id={`help-schema-${locale}`} data={webPageSchema} />
      <JsonLd id={`help-breadcrumb-schema-${locale}`} data={breadcrumbSchema} />

      <PageHero
        eyebrow={(page as any).eyebrow ?? 'HELP'}
        title={(page as any).title ?? 'We can usually help in one click.'}
        lede={(page as any).lede ?? 'Pick the row that sounds most like your question.'}
      />

      <div className="px-4 sm:px-6 md:px-8 lg:px-12 pb-20 max-w-[1360px] mx-auto">

        {/* Emergency row */}
        {emergencyRow && (
          <aside
            className="rounded-[20px] p-6 md:p-7 mb-10 flex flex-col sm:flex-row items-start sm:items-center gap-4"
            style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.18)' }}
          >
            <div className="flex-1">
              <h2
                className="mb-1"
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(18px, 1.6vw, 22px)',
                  fontWeight: 600,
                  letterSpacing: '-0.015em',
                  color: 'var(--color-paper-ink)',
                }}
              >
                {emergencyRow.heading}
              </h2>
              <p className="text-[14px] leading-[1.6]" style={{ color: 'rgba(20,20,19,0.76)' }}>
                {emergencyRow.body}
              </p>
            </div>
            <OutboundLink
              href={emergencyRow.href}
              className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[12.5px] uppercase"
              style={{
                fontFamily: 'var(--font-mono)',
                fontWeight: 500,
                background: 'linear-gradient(135deg,#059669,#0d9488)',
                color: '#fff',
              } as React.CSSProperties}
            >
              Check status
            </OutboundLink>
          </aside>
        )}

        {/* Help categories grid */}
        {routes.length > 0 && (
          <section aria-labelledby="categories-heading" className="mb-16">
            <SectionHeading id="categories-heading">Browse by topic</SectionHeading>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {routes.map((route: any) => (
                <div
                  key={route.id}
                  className="is-card rounded-[20px] p-6 md:p-7 flex flex-col gap-4"
                >
                  <h3
                    className="text-[var(--color-paper-ink)]"
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: 'clamp(17px, 1.6vw, 20px)',
                      fontWeight: 600,
                      letterSpacing: '-0.015em',
                      lineHeight: 1.25,
                    }}
                  >
                    {route.heading}
                  </h3>
                  {route.blurb && (
                    <p className="text-[13.5px] leading-[1.65]" style={{ color: 'rgba(20,20,19,0.72)' }}>
                      {route.blurb}
                    </p>
                  )}
                  {Array.isArray(route.links) && route.links.length > 0 && (
                    <ul className="mt-auto flex flex-col gap-1.5">
                      {route.links.map((link: any) => (
                        <li key={link.href}>
                          <OutboundLink
                            href={link.href}
                            className="text-[13px] underline underline-offset-2 transition-colors hover:text-[var(--color-emerald-ink)]"
                            style={{ color: 'var(--color-emerald-ink)' }}
                          >
                            {link.label}
                          </OutboundLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Popular questions accordion */}
        {popularQuestions.length > 0 && (
          <section aria-labelledby="faq-heading" className="mb-16">
            <SectionHeading id="faq-heading">Popular questions</SectionHeading>
            <dl className="flex flex-col gap-2">
              {popularQuestions.map((item: any, i: number) => (
                <details
                  key={i}
                  className="is-card rounded-[16px] group"
                >
                  <summary
                    className="px-6 py-4 cursor-pointer list-none flex items-center justify-between gap-4 text-[var(--color-paper-ink)]"
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: 'clamp(14px, 1.2vw, 16px)',
                      fontWeight: 500,
                    }}
                  >
                    <dt>{item.question}</dt>
                    <span
                      aria-hidden="true"
                      className="flex-shrink-0 text-[var(--color-emerald-ink)] text-[18px] transition-transform group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <dd
                    className="px-6 pb-5 text-[14px] leading-[1.7]"
                    style={{ color: 'rgba(17,24,39,0.7)' }}
                  >
                    {item.answer}
                  </dd>
                </details>
              ))}
            </dl>
          </section>
        )}

        {/* Contact fallback CTA */}
        {contactFallback && (
          <section
            className="rounded-[24px] p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center gap-6"
            style={{ background: 'var(--color-ink)', color: 'var(--color-cream)', border: '1px solid rgba(16,185,129,0.2)' }}
          >
            <div className="flex-1">
              <div
                className="text-[11px] uppercase tracking-[0.1em] text-[var(--color-emerald)] mb-3"
                style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}
              >
                Contact
              </div>
              <h2
                className="mb-2"
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(22px, 2.4vw, 30px)',
                  letterSpacing: '-0.025em',
                  fontWeight: 600,
                  lineHeight: 1.15,
                }}
              >
                {contactFallback.heading}
              </h2>
              <p className="text-[14.5px] leading-[1.7] text-[var(--color-cream-dim)] max-w-[54ch]">
                {contactFallback.body}
              </p>
            </div>
            <Link
              href={contactFallback.href}
              className="btn-primary"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              Contact us
              <span aria-hidden="true">→</span>
            </Link>
          </section>
        )}
      </div>
    </article>
  );
}
