// src/app/(public)/[locale]/insights/feed.xml/route.ts
import { fetchJournalPosts } from '@/lib/payload';

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://intelligentsingularityinc.com';

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ locale: string }> }
) {
  const { locale } = await params;
  const res = (await fetchJournalPosts(locale, { limit: 50, page: 1 })) as any;
  const posts = res.docs ?? [];
  const feedUrl = `${SITE}/${locale}/insights/feed.xml`;
  const updated = posts[0]?.publishedAt ?? new Date().toISOString();

  const entries = posts
    .map((p: any) => {
      const url = `${SITE}/${locale}/insights/${p.slug}`;
      return `<entry>
  <id>${esc(url)}</id>
  <title>${esc(p.title)}</title>
  <link href="${esc(url)}"/>
  <updated>${esc(new Date(p.publishedAt).toISOString())}</updated>
  <summary>${esc(p.subtitle ?? '')}</summary>
</entry>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom" xml:lang="${locale}">
  <id>${feedUrl}</id>
  <title>Intelligent Singularity — Insights</title>
  <link rel="self" href="${feedUrl}"/>
  <updated>${new Date(updated).toISOString()}</updated>
  ${entries}
</feed>`;

  return new Response(xml, {
    status: 200,
    headers: { 'content-type': 'application/atom+xml; charset=utf-8', 'cache-control': 'public, max-age=300' },
  });
}
