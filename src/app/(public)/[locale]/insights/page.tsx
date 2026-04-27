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
      style={{ fontFamily: 'var(--font-mono)', background: 'rgba(16,185,129,0.1)', color: 'var(--color-emerald-ink)' }}
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
      className="block rounded-2xl p-8 md:p-10 border transition-all hover:border-[rgba(16,185,129,0.35)] hover:shadow-[0_8px_32px_rgba(16,185,129,0.08)]"
      style={{ borderColor: 'rgba(16,185,129,0.15)', background: 'rgba(255,255,255,0.95)' }}
    >
      <div className="flex gap-3 items-center mb-5 flex-wrap">
        {firstTag ? <TagChip label={firstTag} /> : null}
        <span
          className="text-[12px]"
          style={{ fontFamily: 'var(--font-mono)', color: 'rgba(17,24,39,0.52)' }}
        >
          {formatDate(post.publishedAt)}
        </span>
        {post.readingTime ? (
          <span
            className="text-[12px]"
            style={{ fontFamily: 'var(--font-mono)', color: 'rgba(17,24,39,0.52)' }}
          >
            {post.readingTime} min read
          </span>
        ) : null}
      </div>
      <h2
        className="text-[clamp(1.6rem,3.5vw,2.5rem)] leading-[1.1] tracking-[-0.02em] mb-3"
        style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-paper-ink)', textWrap: 'balance' }}
      >
        {post.title}
      </h2>
      {post.subtitle ? (
        <p className="text-[16px] leading-[1.65] max-w-[64ch]" style={{ color: 'rgba(17,24,39,0.68)' }}>{post.subtitle}</p>
      ) : null}
      <div
        className="mt-6 text-[12px] uppercase tracking-[0.18em]"
        style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-emerald-ink)' }}
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
      className="block rounded-xl p-6 border transition-all hover:border-[rgba(16,185,129,0.3)] hover:shadow-[0_4px_16px_rgba(16,185,129,0.07)]"
      style={{ borderColor: 'rgba(16,185,129,0.12)', background: 'rgba(255,255,255,0.92)' }}
    >
      {firstTag ? (
        <div className="mb-3">
          <TagChip label={firstTag} />
        </div>
      ) : null}
      <h3
        className="text-[18px] leading-[1.25] tracking-[-0.01em] mb-2"
        style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-paper-ink)', textWrap: 'balance' }}
      >
        {post.title}
      </h3>
      {post.subtitle ? (
        <p className="text-[14px] leading-[1.6]" style={{ color: 'rgba(17,24,39,0.66)' }}>{post.subtitle}</p>
      ) : null}
      <div
        className="mt-4 flex gap-3 text-[11px]"
        style={{ fontFamily: 'var(--font-mono)', color: 'rgba(17,24,39,0.5)' }}
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
        eyebrow="INSIGHTS · FIELD NOTES FROM THE STUDIO"
        title="Thinking in public."
        lede="Field notes on universal access, AI-augmented engineering, the offline 2.2 billion, and the long arc of artificial intelligence — written to be understood, not to impress. We write slowly. Every claim links to a source. No clickbait, no thought-leadership fog."
      />

      <p className="mb-10 text-[13px]" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-emerald-ink)' }}>
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
                  className="text-[13px] uppercase tracking-[0.14em] transition-opacity hover:opacity-70"
                  style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-emerald-ink)' }}
                >
                  ← Newer
                </Link>
              ) : null}
              <span
                className="text-[13px]"
                style={{ fontFamily: 'var(--font-mono)', color: 'rgba(17,24,39,0.52)' }}
              >
                {currentPage} / {totalPages}
              </span>
              {currentPage < totalPages ? (
                <Link
                  href={`/${locale}/insights?page=${currentPage + 1}`}
                  className="text-[13px] uppercase tracking-[0.14em] transition-opacity hover:opacity-70"
                  style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-emerald-ink)' }}
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
