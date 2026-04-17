import Link from 'next/link';
import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import { getBreadcrumbSchema, getWebPageSchema } from '@/lib/schema';

type Value = { title: string; body: string };

const HOW_WE_WORK: Value[] = [
  {
    title: 'Small team, shared stack',
    body: 'One codebase, one deployment model, one shared platform. You will not spend your first month learning fifteen tools and five meetings per day.',
  },
  {
    title: 'AI-augmented, not AI-replaced',
    body: 'We lean hard on AI for leverage, but humans write every line that ships. Craft matters. Code review matters. Ownership matters.',
  },
  {
    title: 'Remote, honestly',
    body: 'We are remote because it is the right model for the work, not because it is trendy. Meetings are short and few. Writing is a craft we take seriously.',
  },
  {
    title: 'Made for the long game',
    body: 'The studio is bootstrapped and not for sale. We plan to be shipping in twenty years. That means sustainable pace and real weekends.',
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
    pathname: '/careers',
    title: 'Careers | Intelligent Singularity',
    description:
      'How the studio hires: small, remote, AI-augmented team shipping universal-access software. Current openings and the permanent invitation to introduce yourself.',
  });
}

export default async function CareersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const webPageSchema = getWebPageSchema({
    locale,
    pathname: '/careers',
    name: 'Careers | Intelligent Singularity',
    description:
      'How the studio hires and what it is like to work at Intelligent Singularity.',
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
      <div className="page-label">Careers · Join the studio</div>
      <h1 className="page-title">A small team, with a long horizon.</h1>
      <p className="page-lead">
        We hire slowly and carefully. When a role is open, it is posted here.
        If nothing is open, the best introductions still get a reply.
      </p>

      <section aria-labelledby="how-heading" className="mb-14">
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
          {HOW_WE_WORK.map((v) => (
            <div
              key={v.title}
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
                {v.title}
              </h3>
              <p className="text-[14.5px] leading-[1.72]" style={{ color: 'rgba(20,20,19,0.76)' }}>
                {v.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section
        aria-labelledby="openings-heading"
        className="mb-14 rounded-[24px] p-8 md:p-10"
        style={{ background: 'var(--color-paper-soft)' }}
      >
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
          <div>
            <div
              className="text-[12.5px] uppercase text-[var(--color-mint)] mb-2"
              style={{ fontFamily: 'var(--font-mono)', fontWeight: 500 }}
            >
              Open roles
            </div>
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
              Currently hiring for&hellip; nothing.
            </h2>
          </div>
          <div
            className="text-[12.5px] uppercase text-[rgba(20,20,19,0.56)]"
            style={{ fontFamily: 'var(--font-mono)', fontWeight: 500 }}
          >
            Updated {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </div>
        </div>
        <p
          className="text-[15.5px] leading-[1.75] max-w-[60ch]"
          style={{ color: 'rgba(20,20,19,0.74)' }}
        >
          There are no open roles at this moment. This line is not decoration — we
          keep it honest. When something opens, it is a real role with a real
          scope, salary range, and a named hiring manager.
        </p>
      </section>

      <section
        className="rounded-[24px] p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center gap-6"
        style={{ background: 'var(--color-paper-warm)' }}
      >
        <div className="flex-1">
          <div
            className="text-[12.5px] uppercase text-[var(--color-mint)] mb-2"
            style={{ fontFamily: 'var(--font-mono)', fontWeight: 500 }}
          >
            Introduce yourself anyway
          </div>
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
            The best hires we ever made wrote us before there was a role.
          </h3>
          <p className="text-[14.5px] leading-[1.7]" style={{ color: 'rgba(20,20,19,0.72)' }}>
            Tell us what you have shipped and what you want to build next. Two
            paragraphs beats a polished CV. A real reply comes from a human,
            typically within two business days.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href="mailto:careers@intelligentsingularityinc.com"
            className="inline-flex items-center gap-2 px-6 py-[11px] rounded-full bg-[var(--color-paper-ink)] text-[var(--color-cream)] text-[13px] uppercase"
            style={{ fontFamily: 'var(--font-mono)', fontWeight: 500 }}
          >
            careers@…
            <span aria-hidden="true">→</span>
          </a>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-[11px] rounded-full border text-[13px] uppercase text-[var(--color-paper-ink)]"
            style={{ fontFamily: 'var(--font-mono)', fontWeight: 500, borderColor: 'rgba(20,20,19,0.18)' }}
          >
            Contact form
          </Link>
        </div>
      </section>
    </article>
  );
}
