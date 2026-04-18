// src/app/(public)/[locale]/insights/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { fetchJournalPosts } from '@/lib/payload';
import { buildPageMetadata } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import { getBreadcrumbSchema, getWebPageSchema } from '@/lib/schema';
import { PageHero } from '@/components/pages/shared/PageHero';
import { EmptyState } from '@/components/pages/shared/EmptyState';

export async function generateMetadata({
  params,
}: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({
    locale,
    pathname: '/insights',
    title: 'Insights | Intelligent Singularity',
    description: 'Thinking in public: access, alignment, and the long arc of AI.',
  });
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function TagChip({ label }: { label: string }) {
  return (
    <span
      className="inline-block px-2 py-px rounded-full text-[11px] uppercase tracking-[0.14em]"
      style={{ fontFamily: 'var(--font-mono)', background: 'rgba(168,230,207,0.14)', color: 'var(--color-mint)' }}
    >
      {label}
    </span>
  );
}

function FeatureCard({ post, locale }: { post: any; locale: string }) {
  const firstTag = post.tags?.[0]?.tag;
  return (
    <Link
      href={`/${locale}/insights/${post.slug}`}
      className="block rounded-2xl p-8 md:p-10 border transition-colors hover:border-[rgba(246,241,231,0.3)]"
      style={{ borderColor: 'rgba(246,241,231,0.14)', background: 'rgba(246,241,231,0.03)' }}
    >
      <div className="flex gap-3 items-center mb-5 flex-wrap">
        {firstTag ? <TagChip label={firstTag} /> : null}
        <span
          className="text-[12px]"
          style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-cream-dim)' }}
        >
          {formatDate(post.publishedAt)}
        </span>
        {post.readingTime ? (
          <span
            className="text-[12px]"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-cream-dim)' }}
          >
            {post.readingTime} min read
          </span>
        ) : null}
      </div>
      <h2
        className="text-[clamp(1.6rem,3.5vw,2.5rem)] leading-[1.1] tracking-[-0.02em] text-[var(--color-cream)] mb-3"
        style={{ fontFamily: 'var(--font-serif)' }}
      >
        {post.title}
      </h2>
      {post.subtitle ? (
        <p className="text-[16px] leading-[1.65] text-[var(--color-cream-dim)] max-w-[64ch]">{post.subtitle}</p>
      ) : null}
      <div
        className="mt-6 text-[12px] uppercase tracking-[0.18em]"
        style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-mint)' }}
      >
        Read →
      </div>
    </Link>
  );
}

function PostCard({ post, locale }: { post: any; locale: string }) {
  const firstTag = post.tags?.[0]?.tag;
  return (
    <Link
      href={`/${locale}/insights/${post.slug}`}
      className="block rounded-xl p-6 border transition-colors hover:border-[rgba(246,241,231,0.3)]"
      style={{ borderColor: 'rgba(246,241,231,0.10)', background: 'rgba(246,241,231,0.02)' }}
    >
      {firstTag ? (
        <div className="mb-3">
          <TagChip label={firstTag} />
        </div>
      ) : null}
      <h3
        className="text-[18px] leading-[1.25] tracking-[-0.01em] text-[var(--color-cream)] mb-2"
        style={{ fontFamily: 'var(--font-serif)' }}
      >
        {post.title}
      </h3>
      {post.subtitle ? (
        <p className="text-[14px] leading-[1.6] text-[var(--color-cream-dim)]">{post.subtitle}</p>
      ) : null}
      <div
        className="mt-4 flex gap-3 text-[11px]"
        style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-cream-dim)' }}
      >
        <span>{formatDate(post.publishedAt)}</span>
        {post.readingTime ? <span>{post.readingTime} min</span> : null}
      </div>
    </Link>
  );
}

export default async function InsightsIndex({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string>>;
}) {
  const { locale } = await params;
  const sp = await searchParams;
  const page = Math.max(1, parseInt(sp.page ?? '1', 10));

  const result = (await fetchJournalPosts(locale, { limit: 13, page })) as any;
  const docs: any[] = result.docs ?? [];
  const totalPages: number = result.totalPages ?? 1;
  const currentPage: number = result.page ?? page;

  const [feature, ...rest] = docs;

  return (
    <article className="page-shell-wide">
      <JsonLd
        id={`insights-schema-${locale}`}
        data={getWebPageSchema({
          locale,
          pathname: '/insights',
          name: 'Insights',
          description: 'Thinking in public: access, alignment, and the long arc of AI.',
        })}
      />
      <JsonLd
        id={`insights-breadcrumb-${locale}`}
        data={getBreadcrumbSchema({
          locale,
          crumbs: [
            { name: 'Home', pathname: '/' },
            { name: 'Insights', pathname: '/insights' },
          ],
        })}
      />

      <PageHero
        eyebrow="INSIGHTS"
        title="Thinking in public."
        lede="Access, alignment, and the long arc of artificial intelligence — written to be understood, not to impress."
      />

      <p className="mb-8 text-[13px]" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-mint)' }}>
        Subscribe:{' '}
        <Link href={`/${locale}/insights/feed.xml`}>/insights/feed.xml</Link>
      </p>

      {docs.length === 0 ? (
        <EmptyState
          title="Nothing published yet."
          body="The first insight will appear here once it is ready. We write slowly and carefully."
        />
      ) : (
        <>
          {feature ? (
            <div className="mb-10">
              <FeatureCard post={feature} locale={locale} />
            </div>
          ) : null}

          {rest.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-12">
              {rest.map((post: any) => (
                <PostCard key={post.slug} post={post} locale={locale} />
              ))}
            </div>
          ) : null}

          {totalPages > 1 ? (
            <nav className="flex gap-4 items-center justify-center" aria-label="Pagination">
              {currentPage > 1 ? (
                <Link
                  href={`/${locale}/insights?page=${currentPage - 1}`}
                  className="text-[13px] uppercase tracking-[0.14em]"
                  style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-mint)' }}
                >
                  ← Newer
                </Link>
              ) : null}
              <span
                className="text-[13px]"
                style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-cream-dim)' }}
              >
                {currentPage} / {totalPages}
              </span>
              {currentPage < totalPages ? (
                <Link
                  href={`/${locale}/insights?page=${currentPage + 1}`}
                  className="text-[13px] uppercase tracking-[0.14em]"
                  style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-mint)' }}
                >
                  Older →
                </Link>
              ) : null}
            </nav>
          ) : null}
        </>
      )}
    </article>
  );
}
