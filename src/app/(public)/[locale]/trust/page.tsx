import Link from 'next/link';
import type { Metadata } from 'next';
import { fetchTrustPage } from '@/lib/payload';
import { buildPageMetadata } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import { getWebPageSchema, getBreadcrumbSchema } from '@/lib/schema';
import { PageHero } from '@/components/pages/shared/PageHero';
import { SectionHeading } from '@/components/pages/shared/SectionHeading';
import { ProofChip } from '@/components/pages/shared/ProofChip';
import { EmptyState } from '@/components/pages/shared/EmptyState';
import { OutboundLink } from '@/components/pages/shared/OutboundLink';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({
    locale,
    pathname: '/trust',
    title: 'Trust | Intelligent Singularity',
    description:
      'Pillars of trust, third-party subprocessors, certifications, and how to report an incident.',
  });
}

export default async function TrustPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const page = await fetchTrustPage(locale);

  const webPageSchema = getWebPageSchema({
    locale,
    pathname: '/trust',
    name: 'Trust | Intelligent Singularity',
    description: 'Pillars of trust, subprocessors, certifications, and incident reporting.',
  });
  const breadcrumbSchema = getBreadcrumbSchema({
    locale,
    crumbs: [
      { name: 'Home', pathname: '/' },
      { name: 'Trust', pathname: '/trust' },
    ],
  });

  const pillars = (page as any).pillars ?? [];
  const certifications = (page as any).certifications ?? [];
  const subprocessors = (page as any).subprocessors ?? [];
  const lastReviewedAt = (page as any).lastReviewedAt as string | undefined;

  const reviewDate = lastReviewedAt
    ? new Intl.DateTimeFormat('en', { dateStyle: 'long' }).format(new Date(lastReviewedAt))
    : null;

  return (
    <article className="page-shell-wide">
      <JsonLd id={`trust-schema-${locale}`} data={webPageSchema} />
      <JsonLd id={`trust-breadcrumb-schema-${locale}`} data={breadcrumbSchema} />

      <PageHero
        eyebrow={(page as any).eyebrow ?? 'TRUST'}
        title={(page as any).title ?? 'Where to find the proof.'}
        lede={(page as any).lede ?? 'Every claim links to evidence.'}
      />

      <div className="px-4 sm:px-6 md:px-8 lg:px-12 pb-20 max-w-[1360px] mx-auto">

        <figure
          className="mb-14 rounded-[24px] overflow-hidden"
          style={{
            border: '1px solid rgba(16,185,129,0.18)',
            background:
              'radial-gradient(800px 300px at 50% -20%, rgba(16,185,129,0.08), transparent 70%), var(--color-paper-soft)',
          }}
        >
          <img
            src="/illustrations/trust-pillars.svg"
            alt=""
            loading="lazy"
            decoding="async"
            className="block w-full h-auto"
            width={960}
            height={380}
          />
        </figure>

        {/* Pillars grid */}
        {pillars.length > 0 && (
          <section aria-labelledby="pillars-heading" className="mb-16">
            <SectionHeading id="pillars-heading">Trust pillars</SectionHeading>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {pillars.map((p: any) => (
                <div
                  key={p.id}
                  className="is-card rounded-[20px] p-6 md:p-7 flex flex-col gap-4"
                >
                  <h3
                    className=""
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
                    {p.heading}
                  </h3>
                  {p.blurb && (
                    <p className="text-[14.5px] leading-[1.75]" style={{ color: 'rgba(17,24,39,0.8)' }}>
                      {p.blurb}
                    </p>
                  )}
                  {Array.isArray(p.proof) && p.proof.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {p.proof.map((chip: any) => (
                        <ProofChip key={chip.label} label={chip.label} value={chip.value} />
                      ))}
                    </div>
                  )}
                  {p.href && (
                    <div className="mt-auto">
                      <OutboundLink
                        href={p.href}
                        className="text-[12.5px] uppercase tracking-[0.14em]"
                      >
                        Learn more
                      </OutboundLink>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Subprocessors table */}
        {subprocessors.length > 0 && (
          <section aria-labelledby="subprocessors-heading" className="mb-16">
            <SectionHeading id="subprocessors-heading">Subprocessors</SectionHeading>
            <p className="text-[14.5px] leading-[1.75] mb-6 max-w-[72ch]" style={{ color: 'rgba(17,24,39,0.78)' }}>
              Every third party that may touch your data, what they access, and where they operate.
            </p>
            <div className="overflow-x-auto rounded-[16px]" style={{ border: '1px solid rgba(16,185,129,0.15)' }}>
              <table className="w-full text-[13.5px]" style={{ borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(16,185,129,0.12)', background: 'rgba(16,185,129,0.03)' }}>
                    {['Name', 'Purpose', 'Data accessed', 'Location'].map((col) => (
                      <th
                        key={col}
                        className="text-left px-4 py-3"
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '11px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.16em',
                          color: 'var(--color-emerald-ink)',
                          fontWeight: 500,
                        }}
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {subprocessors.map((sp: any) => (
                    <tr
                      key={sp.name}
                      style={{ borderBottom: '1px solid rgba(16,185,129,0.08)' }}
                    >
                      <td className="px-4 py-3" style={{ color: 'var(--color-paper-ink)' }}>
                        {sp.href ? (
                          <OutboundLink href={sp.href} className="underline underline-offset-2">
                            {sp.name}
                          </OutboundLink>
                        ) : (
                          sp.name
                        )}
                      </td>
                      <td className="px-4 py-3" style={{ color: 'rgba(17,24,39,0.78)' }}>{sp.purpose}</td>
                      <td className="px-4 py-3" style={{ color: 'rgba(17,24,39,0.78)' }}>{sp.dataAccessed}</td>
                      <td className="px-4 py-3" style={{ color: 'rgba(17,24,39,0.78)' }}>{sp.location}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Certifications */}
        <section aria-labelledby="certifications-heading" className="mb-16">
          <SectionHeading id="certifications-heading">Certifications</SectionHeading>
          {certifications.length === 0 ? (
            <EmptyState
              title="None yet"
              body="We are a small studio. Formal certifications are expensive and slow. When we earn one it will appear here with a link to the issuer."
            />
          ) : (
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {certifications.map((cert: any) => (
                <li
                  key={cert.name}
                  className="is-card rounded-[16px] p-5"
                >
                  <div className="font-semibold" style={{ color: 'var(--color-paper-ink)', fontFamily: 'var(--font-serif)' }}>{cert.name}</div>
                  {cert.issuer && (
                    <div className="text-[13px] mt-2 label-mono opacity-70">{cert.issuer}</div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Report incident CTA */}
        <section
          className="rounded-[24px] p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center gap-6 mb-10"
          style={{ background: 'var(--color-ink)', color: 'var(--color-cream)', border: '1px solid rgba(16,185,129,0.2)' }}
        >
          <div className="flex-1">
            <div
              className="text-[11px] uppercase tracking-[0.1em] text-[var(--color-emerald)] mb-3"
              style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}
            >
              Incident reporting
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
              Found something? Please tell us first.
            </h3>
            <p className="text-[14.5px] leading-[1.7] text-[var(--color-cream-dim)] max-w-[60ch]">
              Coordinated disclosure is the path we take seriously. Email
              security@intelligentsingularityinc.com with a description and
              reproduction steps. We acknowledge reports within one business
              day, triage within three, and ship a fix on a timeline we agree
              with you. Researchers are credited by name in our post-mortem
              when a fix ships — unless you prefer to remain anonymous. We
              do not threaten or sue good-faith security researchers, full stop.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="mailto:security@intelligentsingularityinc.com"
              className="inline-flex items-center gap-2 px-6 py-[11px] rounded-full text-[12px] uppercase font-semibold"
              style={{ fontFamily: 'var(--font-mono)', background: 'linear-gradient(135deg,#059669,#0d9488)', color: '#fff', boxShadow: '0 4px 14px rgba(16,185,129,0.28)' }}
            >
              Report incident
              <span aria-hidden="true">→</span>
            </a>
            <Link
              href="/legal/privacy"
              className="inline-flex items-center gap-2 px-6 py-[11px] rounded-full border text-[12px] uppercase font-semibold text-[var(--color-cream)] transition-colors hover:border-[var(--color-emerald)] hover:text-[var(--color-emerald)]"
              style={{ fontFamily: 'var(--font-mono)', borderColor: 'rgba(16,185,129,0.3)' }}
            >
              Privacy policy
            </Link>
          </div>
        </section>

        {/* Last reviewed */}
        {reviewDate && (
          <p className="text-[12.5px]" style={{ fontFamily: 'var(--font-mono)', color: 'rgba(17,24,39,0.72)' }}>
            Last reviewed: <time dateTime={lastReviewedAt}>{reviewDate}</time>
          </p>
        )}
      </div>
    </article>
  );
}
