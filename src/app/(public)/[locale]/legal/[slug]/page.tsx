import { Suspense } from 'react';
import type { Metadata } from 'next';
import { fetchLegalPage } from '@/lib/payload';
import { notFound } from 'next/navigation';
import { LexicalRenderer } from '@/components/richtext/LexicalRenderer';
import { buildPageMetadata } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import { getBreadcrumbSchema, getWebPageSchema } from '@/lib/schema';

async function LegalContent({ locale, slug }: { locale: string; slug: string }) {
  const page = await fetchLegalPage(slug);
  if (!page) notFound();
  const webPageSchema = getWebPageSchema({
    locale,
    pathname: `/legal/${slug}`,
    name: `${page.title} | Intelligent Singularity`,
    description: `${page.title} policy and legal information for Intelligent Singularity.`,
  });
  const breadcrumbSchema = getBreadcrumbSchema({
    locale,
    crumbs: [
      { name: 'Home', pathname: '/' },
      { name: page.title, pathname: `/legal/${slug}` },
    ],
  });
  return (
    <article className="page-shell">
      <JsonLd id={`legal-schema-${slug}-${locale}`} data={webPageSchema} />
      <JsonLd id={`legal-breadcrumb-schema-${slug}-${locale}`} data={breadcrumbSchema} />
      <div className="page-label">Legal</div>
      <h1 className="page-title">{page.title}</h1>
      <LexicalRenderer content={page.body} className="editorial-richtext" />
      <div className="mt-12 font-[var(--font-mono)] text-[11px] text-[rgba(26,22,18,0.5)]">
        Last updated: {page.lastUpdated}
      </div>
    </article>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const page = await fetchLegalPage(slug);
  const title = page?.title ? `${page.title} | Intelligent Singularity` : 'Legal | Intelligent Singularity';
  const description = page?.title
    ? `${page.title} policy and legal information for Intelligent Singularity.`
    : 'Legal information and policies for Intelligent Singularity.';

  return buildPageMetadata({
    locale,
    pathname: `/legal/${slug}`,
    title,
    description,
  });
}

export default async function LegalSlugPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  return (
    <Suspense fallback={<div className="px-4 sm:px-6 md:px-8 lg:px-12 py-16 md:py-20 lg:py-[120px]">Loading...</div>}>
      <LegalContent locale={locale} slug={slug} />
    </Suspense>
  );
}
