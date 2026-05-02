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
        eyebrow="ROADMAP · IN PUBLIC"
        title="What we are building."
        lede="In public. No vaporware. Every item is on the studio side — corporate-site work, shared infrastructure, and the cross-cutting commitments that touch every product. Each product in the Clap ecosystem keeps its own roadmap on its own domain. Items here link to code when they ship."
      />

      <div className="px-4 sm:px-6 md:px-8 lg:px-12 pb-20 max-w-[1360px] mx-auto">

        {/* Status columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {STATUSES.map((s) => {
            const col = byStatus[s.id];
            return (
              <section key={s.id} aria-labelledby={`col-${s.id}`}>
                <div
                  className="mb-4 flex items-center gap-2 pb-3"
                  style={{ borderBottom: '1px solid rgba(16,185,129,0.18)' }}
                >
                  <h2
                    id={`col-${s.id}`}
                    className="label-mono"
                  >
                    {s.label}
                  </h2>
                  {col.length > 0 && (
                    <span
                      aria-hidden="true"
                      className="label-mono"
                      style={{ color: 'rgba(17,24,39,0.65)' }}
                    >
                      · {col.length}
                    </span>
                  )}
                </div>

                {col.length === 0 ? (
                  <p
                    className="text-[13px] italic"
                    style={{ color: 'rgba(17,24,39,0.65)', fontFamily: 'var(--font-mono)' }}
                  >
                    (none)
                  </p>
                ) : (
                  <ul className="flex flex-col gap-3">
                    {col.map((item: any) => (
                      <li
                        key={item.slug}
                        className="is-card rounded-[16px] p-5 flex flex-col gap-3"
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
                            style={{ color: 'rgba(17,24,39,0.78)' }}
                          >
                            {item.summary}
                          </p>
                        )}
                        {item.whyItMatters && (
                          <p
                            className="text-[12.5px] italic leading-[1.55]"
                            style={{ color: 'rgba(17,24,39,0.72)', lineHeight: 1.6 }}
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
                                    color: 'var(--color-emerald-ink)',
                                    border: '1px solid rgba(16,185,129,0.22)',
                                    background: 'rgba(16,185,129,0.06)',
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
        style={{
            border: '1px solid rgba(16,185,129,0.18)',
            background: 'linear-gradient(135deg, rgba(16,185,129,0.06), rgba(20,184,166,0.04))',
          }}
        >
          <div className="flex-1">
            <div className="label-mono mb-2">Missing something?</div>
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
            <p className="text-[14.5px] leading-[1.7] max-w-[54ch]" style={{ color: 'rgba(17,24,39,0.78)' }}>
              If there is a feature, tool, or fix that would make a real difference to you,
              send us a note. We read every message and prioritise based on real need.
            </p>
          </div>
          <Link
            href="/contact?reason=roadmap"
            className="btn-primary"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            Send a note
            <span aria-hidden="true">→</span>
          </Link>
        </section>
      </div>
    </article>
  );
}
