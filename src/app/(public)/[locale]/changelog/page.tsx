import Link from 'next/link';
import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import { getBreadcrumbSchema, getWebPageSchema } from '@/lib/schema';

type Entry = {
  date: string;
  scope: string;
  title: string;
  summary: string;
  tags: string[];
};

const ENTRIES: Entry[] = [
  {
    date: '2026-04-17',
    scope: 'This site',
    title: 'Refreshed navigation, trust pages, honest hosting claims',
    summary:
      'Redesigned the top navigation, added FAQ, Security, Pricing, Press, Careers, and Changelog pages, and removed the "100% renewable hosting" line — replaced with the honest note that we run a single VPS on the Alberta grid.',
    tags: ['Site', 'Transparency'],
  },
  {
    date: '2026-04-15',
    scope: 'Portfolio',
    title: 'Pruned experimental tools from the public portfolio',
    summary:
      'Removed nine tools that were still experimental and not ready for public use. The portfolio now shows fourteen products, each with an honest status label.',
    tags: ['Portfolio'],
  },
  {
    date: '2026-04-12',
    scope: 'This site',
    title: 'Published the full legal set',
    summary:
      'Expanded the Privacy Policy, Terms, Accessibility, and Cookie statements from one-line stubs into full policies with headings, lists, and direct contact addresses.',
    tags: ['Legal', 'Privacy'],
  },
  {
    date: '2026-04-01',
    scope: 'Platform',
    title: 'Fourteen-language localisation went live',
    summary:
      'Every public page now ships in fourteen languages, including Arabic, Nastaliq Urdu, Bengali, Hindi, Hausa, Swahili, and Yoruba. Switch from the language wheel at the bottom of any page.',
    tags: ['Localisation'],
  },
  {
    date: '2026-03-20',
    scope: 'Platform',
    title: 'Per-route bundle budget enforced in CI',
    summary:
      'Every route now has a fifty-kilobyte gzip budget enforced in continuous integration. Pull requests that breach it fail — no workaround, no exceptions.',
    tags: ['Performance', 'Green'],
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
    pathname: '/changelog',
    title: 'Changelog | Intelligent Singularity',
    description:
      'What we shipped, in plain English. Site updates, portfolio changes, platform milestones — dated, titled, and kept honest.',
  });
}

export default async function ChangelogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const webPageSchema = getWebPageSchema({
    locale,
    pathname: '/changelog',
    name: 'Changelog | Intelligent Singularity',
    description:
      'Dated entries describing what changed on the site and across the product portfolio.',
  });
  const breadcrumbSchema = getBreadcrumbSchema({
    locale,
    crumbs: [
      { name: 'Home', pathname: '/' },
      { name: 'Changelog', pathname: '/changelog' },
    ],
  });

  return (
    <article className="page-shell-wide">
      <JsonLd id={`changelog-schema-${locale}`} data={webPageSchema} />
      <JsonLd id={`changelog-breadcrumb-schema-${locale}`} data={breadcrumbSchema} />
      <div className="page-label">Changelog · What shipped</div>
      <h1 className="page-title">What we shipped, plainly.</h1>
      <p className="page-lead">
        Dated entries, written by the people who did the work. No marketing
        speak. If something shipped that you can see, it lives here.
      </p>

      <ol className="flex flex-col gap-10 md:gap-12">
        {ENTRIES.map((e, i) => (
          <li
            key={i}
            className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-4 md:gap-10 pb-10 md:pb-12"
            style={{ borderBottom: i < ENTRIES.length - 1 ? '1px solid rgba(20,20,19,0.1)' : 'none' }}
          >
            <aside className="flex flex-col gap-2">
              <time
                dateTime={e.date}
                className="text-[14px] uppercase text-[var(--color-paper-ink)]"
                style={{ fontFamily: 'var(--font-mono)', fontWeight: 500 }}
              >
                {new Date(e.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: '2-digit',
                })}
              </time>
              <div
                className="text-[12px] uppercase text-[var(--color-mint)]"
                style={{ fontFamily: 'var(--font-mono)', fontWeight: 500 }}
              >
                {e.scope}
              </div>
            </aside>
            <div>
              <h2
                className="mb-3 text-[var(--color-paper-ink)]"
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(22px, 2.6vw, 30px)',
                  letterSpacing: '-0.025em',
                  lineHeight: 1.15,
                  fontWeight: 600,
                }}
              >
                {e.title}
              </h2>
              <p
                className="text-[15.5px] leading-[1.75] max-w-[62ch] mb-4"
                style={{ color: 'rgba(20,20,19,0.78)' }}
              >
                {e.summary}
              </p>
              <div className="flex flex-wrap gap-2">
                {e.tags.map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center px-2.5 py-1 rounded-full text-[11.5px] uppercase"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 500,
                      background: 'var(--color-paper-warm)',
                      color: 'var(--color-paper-ink)',
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ol>

      <section
        className="mt-14 rounded-[24px] p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center gap-6"
        style={{ background: 'var(--color-paper-soft)' }}
      >
        <div className="flex-1">
          <div
            className="text-[12.5px] uppercase text-[var(--color-mint)] mb-2"
            style={{ fontFamily: 'var(--font-mono)', fontWeight: 500 }}
          >
            Follow along
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
            Want the next update in your inbox?
          </h3>
          <p className="text-[14.5px] leading-[1.7]" style={{ color: 'rgba(20,20,19,0.72)' }}>
            Send us a note and we will email you when the next entry lands.
            No marketing sequences, just a plain-text update when something ships.
          </p>
        </div>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-6 py-[11px] rounded-full bg-[var(--color-paper-ink)] text-[var(--color-cream)] text-[13px] uppercase"
          style={{ fontFamily: 'var(--font-mono)', fontWeight: 500 }}
        >
          Get the next update
          <span aria-hidden="true">→</span>
        </Link>
      </section>
    </article>
  );
}
