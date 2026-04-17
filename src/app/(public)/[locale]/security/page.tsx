import Link from 'next/link';
import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import { getBreadcrumbSchema, getWebPageSchema } from '@/lib/schema';

type Practice = { title: string; body: string };

const POSTURE: Practice[] = [
  {
    title: 'Encryption on every wire',
    body: 'All public pages and product traffic travel over TLS 1.3. Certificates are issued by Let\u2019s Encrypt and rotated automatically. Nothing you type ever crosses the open web in plain text.',
  },
  {
    title: 'Self-hosted, not scattered',
    body: 'This site runs on a single VPS in a controlled datacentre. There is no third-party CDN in the request path, no edge cache holding copies of your data in twenty regions.',
  },
  {
    title: 'Zero third-party calls',
    body: 'No analytics, no pixels, no ad networks, no external fonts. Your browser only talks to our origin. That is enforced in continuous integration — a pull request fails if it adds one.',
  },
  {
    title: 'Signed and verified builds',
    body: 'Every container image we ship is built from a locked set of dependencies. Production releases are signed and verified on the host before they run.',
  },
  {
    title: 'Short retention windows',
    body: 'Server logs are kept for fourteen days for debugging and then deleted. Contact-form emails are kept only as long as it takes to reply and file the conversation.',
  },
  {
    title: 'Isolated product environments',
    body: 'Each product in our portfolio runs with its own database, its own secrets, and its own access rules. A compromise in one tool cannot spill into another.',
  },
];

const DATA_HANDLING: Practice[] = [
  {
    title: 'You send less, we store less',
    body: 'We only ask for the minimum a product needs to work. No pre-checked boxes. No "optional" fields that quietly become mandatory to get results.',
  },
  {
    title: 'Your data is yours',
    body: 'Export from every product is a first-class feature, not an upsell. Delete, and your data is removed — not "soft-deleted forever" behind a switch you cannot see.',
  },
  {
    title: 'No training on your content',
    body: 'AI features across our portfolio use only data you explicitly submit. Your private content is never used to train shared models.',
  },
  {
    title: 'Transparent incident response',
    body: 'If we ever have a security incident that affects your data, we notify you directly and publish a post-mortem. We will never hide a breach behind a quiet policy update.',
  },
];

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

export default async function SecurityPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
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
      <div className="page-label">Security · Trust · Data</div>
      <h1 className="page-title">Security you can actually read.</h1>
      <p className="page-lead">
        No marketing diagrams. Just what we do to keep your data private, small,
        and in your hands — on this site and across every product we ship.
      </p>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 mb-14">
        {[
          { label: 'Trackers', value: '0', hint: 'On this site and every product page' },
          { label: 'Third-party calls', value: '0', hint: 'Enforced by CI on every commit' },
          { label: 'Server log retention', value: '14 days', hint: 'Then permanently deleted' },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-[22px] p-6 flex flex-col gap-2"
            style={{ background: 'var(--color-paper-soft)' }}
          >
            <div
              className="text-[12.5px] uppercase text-[var(--color-mint)]"
              style={{ fontFamily: 'var(--font-mono)', fontWeight: 500 }}
            >
              {s.label}
            </div>
            <div
              className="text-[var(--color-paper-ink)] leading-none"
              style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(30px, 3vw, 44px)', fontWeight: 600, letterSpacing: '-0.02em' }}
            >
              {s.value}
            </div>
            <div className="text-[13.5px] text-[rgba(20,20,19,0.66)] leading-[1.6]">{s.hint}</div>
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
          How we run the site and the platform
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {POSTURE.map((p) => (
            <div
              key={p.title}
              className="rounded-[20px] p-6 md:p-7"
              style={{ background: 'var(--color-paper-warm)' }}
            >
              <h3
                className="mb-2 text-[var(--color-paper-ink)]"
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(19px, 1.8vw, 22px)',
                  letterSpacing: '-0.02em',
                  fontWeight: 600,
                  lineHeight: 1.2,
                }}
              >
                {p.title}
              </h3>
              <p className="text-[14.5px] leading-[1.7]" style={{ color: 'rgba(20,20,19,0.76)' }}>
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
          How we handle your data
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {DATA_HANDLING.map((p) => (
            <div
              key={p.title}
              className="rounded-[20px] p-6 md:p-7"
              style={{ background: 'var(--color-paper-soft)' }}
            >
              <h3
                className="mb-2 text-[var(--color-paper-ink)]"
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(19px, 1.8vw, 22px)',
                  letterSpacing: '-0.02em',
                  fontWeight: 600,
                  lineHeight: 1.2,
                }}
              >
                {p.title}
              </h3>
              <p className="text-[14.5px] leading-[1.7]" style={{ color: 'rgba(20,20,19,0.76)' }}>
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section
        className="rounded-[24px] p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center gap-6"
        style={{ background: 'var(--color-paper-ink)', color: 'var(--color-cream)' }}
      >
        <div className="flex-1">
          <div
            className="text-[12.5px] uppercase text-[var(--color-mint)] mb-2"
            style={{ fontFamily: 'var(--font-mono)', fontWeight: 500 }}
          >
            Report a vulnerability
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
          <p className="text-[14.5px] leading-[1.7] text-[var(--color-cream-dim)] max-w-[54ch]">
            Email security@intelligentsingularityinc.com with a description and
            reproduction steps. We acknowledge reports within one business day
            and credit researchers in our post-mortem when a fix ships.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href="mailto:security@intelligentsingularityinc.com"
            className="inline-flex items-center gap-2 px-6 py-[11px] rounded-full bg-[var(--color-cream)] text-[var(--color-paper-ink)] text-[13px] uppercase"
            style={{ fontFamily: 'var(--font-mono)', fontWeight: 500 }}
          >
            security@…
            <span aria-hidden="true">→</span>
          </a>
          <Link
            href="/legal/privacy"
            className="inline-flex items-center gap-2 px-6 py-[11px] rounded-full border text-[13px] uppercase text-[var(--color-cream)]"
            style={{ fontFamily: 'var(--font-mono)', fontWeight: 500, borderColor: 'rgba(246,241,231,0.24)' }}
          >
            Read privacy policy
          </Link>
        </div>
      </section>
    </article>
  );
}
