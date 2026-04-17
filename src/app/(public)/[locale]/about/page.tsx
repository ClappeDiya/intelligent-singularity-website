import { Suspense } from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { fetchAbout } from '@/lib/payload';
import { LexicalRenderer } from '@/components/richtext/LexicalRenderer';
import { buildPageMetadata } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import { getBreadcrumbSchema, getWebPageSchema } from '@/lib/schema';

type MetaRow = { label: string; value: string };

const META: MetaRow[] = [
  { label: 'Founded', value: '2024 · Alberta, Canada' },
  { label: 'Operating model', value: 'Small, remote, AI-augmented' },
  { label: 'Capital', value: 'Bootstrapped · Self-funded' },
  { label: 'Portfolio', value: '14 tools, 5 shipping live' },
  { label: 'Languages', value: '14 live · more in seed' },
  { label: 'Footprint', value: 'Sub-50 KB pages · zero trackers' },
];

async function AboutContent({ locale }: { locale: string }) {
  const about = await fetchAbout(locale);
  const webPageSchema = getWebPageSchema({
    locale,
    pathname: '/about',
    name: 'About | Intelligent Singularity',
    description:
      'Meet the team and mission behind Intelligent Singularity: building software for universal access with lean AI-augmented operations.',
    type: 'AboutPage',
  });
  const breadcrumbSchema = getBreadcrumbSchema({
    locale,
    crumbs: [
      { name: 'Home', pathname: '/' },
      { name: 'About', pathname: '/about' },
    ],
  });
  return (
    <article className="page-shell-wide">
      <JsonLd id={`about-schema-${locale}`} data={webPageSchema} />
      <JsonLd id={`about-breadcrumb-schema-${locale}`} data={breadcrumbSchema} />
      <div className="page-label">About · The studio</div>
      <h1 className="page-title">{about.title}</h1>
      <p className="page-lead">{about.lead}</p>
      <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_.9fr] gap-12 lg:gap-20">
        <div>
          <LexicalRenderer content={about.founderStory} className="editorial-richtext mb-10" />
          <p
            className="text-[15px] leading-[1.9] mb-10 max-w-[60ch]"
            style={{ color: 'rgba(26,22,18,0.68)' }}
          >
            {about.incorporationContext}
          </p>
          <LexicalRenderer content={about.leanOpsPhilosophy} className="editorial-richtext" />
        </div>
        <aside className="lg:sticky lg:top-28 self-start">
          <div
            className="rounded-[24px] border p-7"
            style={{
              borderColor: 'rgba(26,22,18,0.1)',
              background: 'rgba(255,255,255,0.65)',
            }}
          >
            <div
              className="text-[10.5px] uppercase tracking-[0.24em] text-[var(--color-mint)] mb-5"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              At a glance
            </div>
            <dl className="flex flex-col gap-5">
              {META.map((m) => (
                <div key={m.label}>
                  <dt
                    className="text-[10px] uppercase tracking-[0.22em] mb-1.5"
                    style={{ fontFamily: 'var(--font-mono)', color: 'rgba(26,22,18,0.5)' }}
                  >
                    {m.label}
                  </dt>
                  <dd className="text-[15px] leading-[1.5] text-[var(--color-paper-ink)]">{m.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div
            className="mt-6 rounded-[24px] border p-7"
            style={{
              borderColor: 'rgba(108,143,122,0.22)',
              background:
                'linear-gradient(180deg, rgba(108,143,122,0.08) 0%, rgba(108,143,122,0.02) 100%)',
            }}
          >
            <div
              className="text-[10.5px] uppercase tracking-[0.24em] text-[var(--color-mint)] mb-3"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              Talk to the studio
            </div>
            <p className="text-[14.5px] leading-[1.72] text-[rgba(26,22,18,0.72)] mb-5">
              Partnerships, press, or a product question — messages reach the founder directly,
              typically within two business days.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.2em] font-semibold text-[var(--color-paper-ink)] border-b pb-0.5"
              style={{ fontFamily: 'var(--font-mono)', borderColor: 'var(--color-paper-ink)' }}
            >
              Contact · Open form
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </aside>
      </div>
    </article>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({
    locale,
    pathname: '/about',
    title: 'About | Intelligent Singularity',
    description:
      'Meet the team and mission behind Intelligent Singularity: building software for universal access with lean AI-augmented operations.',
  });
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <Suspense fallback={<div className="px-4 sm:px-6 md:px-8 lg:px-12 py-16 md:py-20 lg:py-[120px]">Loading...</div>}>
      <AboutContent locale={locale} />
    </Suspense>
  );
}
