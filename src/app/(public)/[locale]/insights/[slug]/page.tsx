// src/app/(public)/[locale]/insights/[slug]/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { fetchJournalPostBySlug } from '@/lib/payload';
import { buildPageMetadata } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import { getBreadcrumbSchema, getWebPageSchema } from '@/lib/schema';
import { RichTextBody } from '@/components/pages/insights/RichTextBody';

export async function generateMetadata({
  params,
}: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = (await fetchJournalPostBySlug(slug, locale)) as any;
  if (!post) return {};
  return buildPageMetadata({
    locale,
    pathname: `/insights/${slug}`,
    title: `${post.title} | Insights | Intelligent Singularity`,
    description: post.subtitle ?? '',
  });
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = (await fetchJournalPostBySlug(slug, locale)) as any;

  if (!post) notFound();

  const eyebrow = post.tags?.[0]?.tag?.toUpperCase() ?? 'INSIGHTS';
  const sources: Array<{ label: string; href: string }> = post.sources ?? [];

  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.subtitle ?? '',
    datePublished: post.publishedAt,
    author: post.author?.name
      ? { '@type': 'Person', name: post.author.name }
      : { '@type': 'Organization', name: 'Intelligent Singularity' },
    url: `/${locale}/insights/${slug}`,
  };

  return (
    <div className="page-shell">
      <JsonLd
        id={`post-schema-${slug}-${locale}`}
        data={getWebPageSchema({
          locale,
          pathname: `/insights/${slug}`,
          name: post.title,
          description: post.subtitle ?? '',
        })}
      />
      <JsonLd
        id={`post-breadcrumb-${slug}-${locale}`}
        data={getBreadcrumbSchema({
          locale,
          crumbs: [
            { name: 'Home', pathname: '/' },
            { name: 'Insights', pathname: '/insights' },
            { name: post.title, pathname: `/insights/${slug}` },
          ],
        })}
      />
      <JsonLd id={`post-blogposting-${slug}-${locale}`} data={blogPostingSchema} />

      <div className="px-4 sm:px-6 md:px-8 lg:px-12 pt-[96px] md:pt-[140px] pb-12 md:pb-16">
        <div className="max-w-[760px] mx-auto">
          <div
            className="label-mono mb-6"
          >
            {eyebrow}
          </div>
          <h1
            className="font-normal text-[clamp(2rem,5vw,3.5rem)] leading-[1.08] tracking-[-0.02em]"
            style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-paper-ink)', textWrap: 'balance' }}
          >
            {post.title}
          </h1>
          {post.subtitle ? (
            <p className="mt-4 text-[clamp(1rem,1.3vw,1.2rem)] leading-[1.7]" style={{ color: 'rgba(17,24,39,0.78)' }}>
              {post.subtitle}
            </p>
          ) : null}
          <div
            className="mt-6 flex flex-wrap gap-x-4 gap-y-1 text-[12px]"
            style={{ fontFamily: 'var(--font-mono)', color: 'rgba(17,24,39,0.72)' }}
          >
            {post.author?.name ? <span>{post.author.name}</span> : null}
            {post.publishedAt ? <span>{formatDate(post.publishedAt)}</span> : null}
            {post.readingTime ? <span>{post.readingTime} min read</span> : null}
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 md:px-8 lg:px-12 pb-16">
        <div className="max-w-[760px] mx-auto">
          <RichTextBody data={post.body} />

          {sources.length > 0 ? (
            <section className="mt-14 pt-8 border-t" style={{ borderColor: 'rgba(16,185,129,0.15)' }}>
              <h2
                className="label-mono mb-5"
              >
                Sources
              </h2>
              <ol className="flex flex-col gap-2 list-none p-0">
                {sources.map((s, i) => (
                  <li key={i} className="flex gap-3 text-[14px]">
                    <span
                      className="shrink-0 text-[11px] pt-[3px]"
                      style={{ fontFamily: 'var(--font-mono)', color: 'rgba(17,24,39,0.45)' }}
                    >
                      [{i + 1}]
                    </span>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer external"
                      className="underline underline-offset-2 transition-colors hover:text-[var(--color-emerald-ink)]"
                      style={{ color: 'rgba(17,24,39,0.78)' }}
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ol>
            </section>
          ) : null}

          <div className="mt-14">
            <Link
              href={`/${locale}/insights`}
              className="label-mono"
            >
              ← All insights
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
