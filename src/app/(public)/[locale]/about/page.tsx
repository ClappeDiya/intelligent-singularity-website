import { Suspense } from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { fetchAbout } from '@/lib/payload';
import { LexicalRenderer } from '@/components/richtext/LexicalRenderer';
import { buildPageMetadata } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import { getBreadcrumbSchema, getWebPageSchema } from '@/lib/schema';
import { EcosystemTree } from '@/components/illustrations/EcosystemTree';

type MetaRow = { label: string; value: string };

const META: MetaRow[] = [
  { label: 'Legal entity', value: 'Intelligent Singularity Inc.' },
  { label: 'Founded', value: '2024 · Alberta, Canada' },
  { label: 'Founder', value: 'Dr. Md Diya, MD' },
  { label: 'Structure', value: 'Parent of the Clap ecosystem' },
  { label: 'Operating model', value: 'Small, remote, AI-augmented' },
  { label: 'Capital', value: 'Bootstrapped · self-funded · not for sale' },
  { label: 'Portfolio', value: 'A growing family of platforms' },
  { label: 'Languages', value: '14 shipping locales' },
  { label: 'Footprint', value: '≤ 50 KB per page · zero trackers' },
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
      <h1 className="page-title">{about.title || 'About Intelligent Singularity'}</h1>
      <p className="page-lead">{about.lead}</p>
      <figure
        className="mb-14 rounded-[24px] overflow-hidden"
        style={{
          border: '1px solid rgba(16,185,129,0.18)',
          background:
            'radial-gradient(900px 340px at 50% -20%, rgba(16,185,129,0.1), transparent 70%), var(--color-paper-soft)',
        }}
      >
        <img
          src="/illustrations/about-studio.svg"
          alt=""
          loading="lazy"
          decoding="async"
          className="block w-full h-auto"
          width={960}
          height={480}
        />
      </figure>
      <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_.9fr] gap-12 lg:gap-20">
        <div>
          <LexicalRenderer content={about.founderStory} className="editorial-richtext mb-10" />
          <p
            className="text-[15px] leading-[1.9] mb-10 max-w-[60ch]"
            style={{ color: 'rgba(17,24,39,0.72)' }}
          >
            {about.incorporationContext}
          </p>
          <LexicalRenderer content={about.leanOpsPhilosophy} className="editorial-richtext" />
          <section
            aria-labelledby="ecosystem-heading"
            className="mt-12 mb-4 rounded-[24px] p-6 md:p-8"
            style={{
              border: '1px solid rgba(16,185,129,0.18)',
              background:
                'radial-gradient(900px 280px at 90% -20%, rgba(16,185,129,0.08), transparent 70%), rgba(255,255,255,0.95)',
            }}
          >
            <div className="label-mono mb-2">The ecosystem at a glance</div>
            <h2
              id="ecosystem-heading"
              className="mb-4"
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
              One parent company, seven product categories.
            </h2>
            <EcosystemTree />
          </section>
        </div>
        <div className="lg:sticky lg:top-28 self-start">
          <div
            className="is-card rounded-[24px] p-7"
          >
            <div className="label-mono mb-5">At a glance</div>
            <dl className="flex flex-col gap-5">
              {META.map((m) => (
                <div key={m.label} className="transition-colors hover:bg-[rgba(16,185,129,0.03)] -mx-2 px-2 py-1 rounded-lg">
                  <dt
                    className="text-[10px] uppercase tracking-[0.1em] mb-1.5"
                    style={{ fontFamily: 'var(--font-mono)', color: 'rgba(17,24,39,0.72)' }}
                  >
                    {m.label}
                  </dt>
                  <dd className="text-[15px] leading-[1.5]" style={{ color: 'var(--color-paper-ink)' }}>{m.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div
            className="mt-6 rounded-[24px] p-7"
            style={{
              border: '1px solid rgba(16,185,129,0.2)',
              background: 'linear-gradient(180deg, rgba(16,185,129,0.08) 0%, rgba(16,185,129,0.02) 100%)',
            }}
          >
            <div className="label-mono mb-3">Talk to the studio</div>
            <p className="text-[14.5px] leading-[1.72] mb-5" style={{ color: 'rgba(17,24,39,0.78)' }}>
              Partnerships, press, or a product question — messages reach the founder directly,
              typically within two business days.
            </p>
            <Link
              href="/contact"
              className="btn-primary text-[11px]"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              Contact · Open form
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
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
