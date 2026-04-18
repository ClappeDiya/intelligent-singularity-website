// src/app/(public)/[locale]/changelog/feed.xml/route.ts
import { fetchReleaseNotes } from '@/lib/payload';

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://intelligentsingularityinc.com';

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ locale: string }> }
) {
  const { locale } = await params;
  const releases = ((await fetchReleaseNotes(locale)) as any[]) ?? [];
  const feedUrl = `${SITE}/${locale}/changelog/feed.xml`;
  const updated = releases[0]?.releaseDate ?? new Date().toISOString();

  const entries = releases
    .map((r: any) => {
      const url = `${SITE}/${locale}/changelog#${r.slug}`;
      return `<entry>
  <id>${esc(url)}</id>
  <title>${esc(`${r.version} — ${r.title}`)}</title>
  <link href="${esc(url)}"/>
  <updated>${esc(new Date(r.releaseDate).toISOString())}</updated>
  <summary>${esc(r.summary ?? '')}</summary>
</entry>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom" xml:lang="${locale}">
  <id>${feedUrl}</id>
  <title>Intelligent Singularity — Changelog</title>
  <link rel="self" href="${feedUrl}"/>
  <updated>${new Date(updated).toISOString()}</updated>
  ${entries}
</feed>`;

  return new Response(xml, {
    status: 200,
    headers: { 'content-type': 'application/atom+xml; charset=utf-8', 'cache-control': 'public, max-age=300' },
  });
}
