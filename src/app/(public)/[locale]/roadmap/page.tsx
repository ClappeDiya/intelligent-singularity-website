import Link from 'next/link';
import type { Metadata } from 'next';
import { fetchRoadmapItems } from '@/lib/payload';
import { buildPageMetadata } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import { getWebPageSchema, getBreadcrumbSchema } from '@/lib/schema';
import { PageHero } from '@/components/pages/shared/PageHero';
import { OutboundLink } from '@/components/pages/shared/OutboundLink';

type RoadmapStatus = 'in-progress' | 'planned' | 'shipped' | 'paused';

const STATUSES: { id: RoadmapStatus; label: string }[] = [
  { id: 'in-progress', label: 'In progress' },
  { id: 'planned',     label: 'Planned'     },
  { id: 'shipped',     label: 'Shipped'     },
  { id: 'paused',      label: 'Paused'      },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({
    locale,
    pathname: '/roadmap',
    title: 'Roadmap | Intelligent Singularity',
    description:
      'What we are building, what is planned, what shipped, and what is paused — in public.',
  });
}

export default async function RoadmapPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const items = await fetchRoadmapItems(locale);

  const webPageSchema = getWebPageSchema({
    locale,
    pathname: '/roadmap',
    name: 'Roadmap | Intelligent Singularity',
    description: 'Public roadmap showing in-progress, planned, shipped, and paused work.',
  });
  const breadcrumbSchema = getBreadcrumbSchema({
    locale,
    crumbs: [
      { name: 'Home', pathname: '/' },
      { name: 'Roadmap', pathname: '/roadmap' },
    ],
  });

  // Partition items into buckets by status
  const byStatus = STATUSES.reduce<Record<RoadmapStatus, typeof items>>((acc, s) => {
    acc[s.id] = (items as any[]).filter((item) => item.status === s.id);
    return acc;
  }, { 'in-progress': [], planned: [], shipped: [], paused: [] });

  return (
    <article className="page-shell-wide">
      <JsonLd id={`roadmap-schema-${locale}`} data={webPageSchema} />
      <JsonLd id={`roadmap-breadcrumb-schema-${locale}`} data={breadcrumbSchema} />

      <PageHero
        eyebrow="ROADMAP"
        title="What we are building."
        lede="In public. No vaporware. Every item links to code when it ships."
      />

      <div className="px-4 sm:px-6 md:px-8 lg:px-12 pb-20 max-w-[1360px] mx-auto">

        {/* Status columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {STATUSES.map((s) => {
            const col = byStatus[s.id];
            return (
              <section key={s.id} aria-labelledby={`col-${s.id}`}>
                <div
                  className="mb-4 flex items-center gap-2 pb-3"
                  style={{ borderBottom: '1px solid rgba(168,230,207,0.2)' }}
                >
                  <h2
                    id={`col-${s.id}`}
                    className="text-[11px] uppercase tracking-[0.22em]"
                    style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-mint)' }}
                  >
                    {s.label}
                  </h2>
                  {col.length > 0 && (
                    <span
                      aria-hidden="true"
                      className="text-[11px] opacity-60"
                      style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-mint)' }}
                    >
                      · {col.length}
                    </span>
                  )}
                </div>

                {col.length === 0 ? (
                  <p
                    className="text-[13px] italic"
                    style={{ color: 'rgba(246,241,231,0.35)', fontFamily: 'var(--font-mono)' }}
                  >
                    (none)
                  </p>
                ) : (
                  <ul className="flex flex-col gap-3">
                    {col.map((item: any) => (
                      <li
                        key={item.slug}
                        className="rounded-[16px] p-4 flex flex-col gap-2"
                        style={{ background: 'var(--color-paper-soft)' }}
                      >
                        <h3
                          className="text-[var(--color-paper-ink)] leading-[1.3]"
                          style={{
                            fontFamily: 'var(--font-serif)',
                            fontSize: 'clamp(15px, 1.2vw, 17px)',
                            fontWeight: 600,
                            letterSpacing: '-0.01em',
                          }}
                        >
                          {item.title}
                        </h3>
                        {item.summary && (
                          <p
                            className="text-[13px] leading-[1.6]"
                            style={{ color: 'rgba(20,20,19,0.68)' }}
                          >
                            {item.summary}
                          </p>
                        )}
                        {item.whyItMatters && (
                          <p
                            className="text-[12.5px] italic leading-[1.55]"
                            style={{ color: 'rgba(20,20,19,0.55)' }}
                          >
                            {item.whyItMatters}
                          </p>
                        )}
                        {Array.isArray(item.gitRefs) && item.gitRefs.length > 0 && (
                          <ul className="flex flex-wrap gap-1.5 mt-1">
                            {item.gitRefs.map((ref: any, i: number) => (
                              <li key={i}>
                                <OutboundLink
                                  href={ref.ref}
                                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] uppercase tracking-[0.12em]"
                                  style={{
                                    fontFamily: 'var(--font-mono)',
                                    color: 'var(--color-mint)',
                                    border: '1px solid rgba(168,230,207,0.3)',
                                  } as React.CSSProperties}
                                >
                                  {ref.label ?? 'ref'}
                                </OutboundLink>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            );
          })}
        </div>

        {/* Trailing CTA */}
        <section
          className="rounded-[24px] p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center gap-6"
          style={{ background: 'var(--color-paper-ink)', color: 'var(--color-cream)' }}
        >
          <div className="flex-1">
            <div
              className="text-[12.5px] uppercase text-[var(--color-mint)] mb-2"
              style={{ fontFamily: 'var(--font-mono)', fontWeight: 500 }}
            >
              Missing something?
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
              Tell us what you need.
            </h2>
            <p className="text-[14.5px] leading-[1.7] text-[var(--color-cream-dim)] max-w-[54ch]">
              If there is a feature, tool, or fix that would make a real difference to you,
              send us a note. We read every message and prioritise based on real need.
            </p>
          </div>
          <Link
            href="/contact?reason=roadmap"
            className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-[11px] rounded-full bg-[var(--color-cream)] text-[var(--color-paper-ink)] text-[13px] uppercase"
            style={{ fontFamily: 'var(--font-mono)', fontWeight: 500 }}
          >
            Send a note
            <span aria-hidden="true">→</span>
          </Link>
        </section>
      </div>
    </article>
  );
}
