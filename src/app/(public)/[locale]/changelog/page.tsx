// src/app/(public)/[locale]/changelog/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { fetchReleaseNotes } from '@/lib/payload';
import { buildPageMetadata } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import { getBreadcrumbSchema, getWebPageSchema } from '@/lib/schema';
import { PageHero } from '@/components/pages/shared/PageHero';
import { TimelineEntry } from '@/components/pages/shared/TimelineEntry';
import { EmptyState } from '@/components/pages/shared/EmptyState';
import { getBuildCommitSha } from '@/lib/git-info';

const REPO_URL = 'https://github.com/ClappeDiya/intelligent-singularity-website';

export async function generateMetadata({
  params,
}: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({
    locale,
    pathname: '/changelog',
    title: 'Changelog | Intelligent Singularity',
    description: 'Every visible change we have made, with the date and the commit behind it.',
  });
}

export default async function ChangelogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const releases = ((await fetchReleaseNotes(locale)) as any[]) ?? [];
  const buildSha = getBuildCommitSha();
  const shortBuildSha = buildSha ? buildSha.slice(0, 7) : 'local';

  return (
    <article className="page-shell-wide">
      <JsonLd
        id={`changelog-schema-${locale}`}
        data={getWebPageSchema({
          locale,
          pathname: '/changelog',
          name: 'Changelog',
          description: 'Public release notes.',
        })}
      />
      <JsonLd
        id={`changelog-breadcrumb-${locale}`}
        data={getBreadcrumbSchema({
          locale,
          crumbs: [
            { name: 'Home', pathname: '/' },
            { name: 'Changelog', pathname: '/changelog' },
          ],
        })}
      />
      <JsonLd
        id={`changelog-list-${locale}`}
        data={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          itemListElement: releases.map((r, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: `${r.version} — ${r.title}`,
            url: `/${locale}/changelog#${r.slug}`,
          })),
        }}
      />

      <PageHero
        eyebrow="CHANGELOG"
        title="What changed, in order."
        lede="Every visible change we have made to this site, with the release date and the commit behind it."
      />

      <p className="mb-8 text-[13px]" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-mint)' }}>
        Subscribe: <Link href={`/${locale}/changelog/feed.xml`}>/changelog/feed.xml</Link>
      </p>

      {releases.length === 0 ? (
        <EmptyState
          title="This is the first version."
          body={`No tags have been cut yet. You are reading build ${shortBuildSha}. The first release entry will appear here once v1.0 is tagged.`}
          href={REPO_URL}
          linkText="View the repository"
        />
      ) : (
        <ol className="flex flex-col gap-10 list-none p-0">
          {releases.map((r: any) => (
            <TimelineEntry
              key={r.slug}
              id={r.slug}
              title={`${r.version} — ${r.title}`}
              date={r.releaseDate}
              meta={
                <>
                  <Link href={`${REPO_URL}/releases/tag/${r.gitTag}`}>{r.gitTag}</Link>
                  {' · '}
                  <Link href={`${REPO_URL}/commit/${r.gitSha}`}>
                    <code style={{ fontFamily: 'var(--font-mono)' }}>{r.gitSha.slice(0, 7)}</code>
                  </Link>
                  {r.authors?.length ? (
                    <>
                      {' · '}
                      by {r.authors.map((a: any) => a.username ?? a).join(', ')}
                    </>
                  ) : null}
                </>
              }
            >
              {r.summary ? <p className="mb-3 text-[15px]">{r.summary}</p> : null}
              {r.changes?.length ? (
                <ul className="flex flex-col gap-1 text-[14.5px] leading-[1.6]">
                  {r.changes.map((c: any, i: number) => (
                    <li key={i}>
                      <span
                        className="inline-block mr-2 px-2 py-px rounded-full text-[11px] uppercase"
                        style={{ fontFamily: 'var(--font-mono)', background: 'rgba(168,230,207,0.14)', color: 'var(--color-mint)' }}
                      >
                        {c.type}
                      </span>
                      {c.entry}
                    </li>
                  ))}
                </ul>
              ) : null}
            </TimelineEntry>
          ))}
        </ol>
      )}
    </article>
  );
}
