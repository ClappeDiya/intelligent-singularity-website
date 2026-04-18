import { spawnSync } from 'node:child_process';
import type { Payload } from 'payload';

export type RawTag = { sha: string; tag: string; date: string };

const TAG_LINE = /^([0-9a-f]{7,40})\s+tag:\s+(v[0-9][^\s]*)\s+([0-9T:\-+.Z]+)$/;

export function parseGitTagLines(lines: string[]): RawTag[] {
  const out: RawTag[] = [];
  for (const raw of lines) {
    const m = raw.trim().match(TAG_LINE);
    if (!m) continue;
    out.push({ sha: m[1], tag: m[2], date: m[3] });
  }
  return out;
}

export function readGitTags(cwd = process.cwd()): RawTag[] {
  const result = spawnSync(
    'git',
    ['log', '--tags', '--simplify-by-decoration', '--pretty=%h tag: %S %aI'],
    { cwd, encoding: 'utf8', shell: false }
  );
  if (result.status !== 0) return [];
  return parseGitTagLines(result.stdout.split('\n'));
}

export function toReleaseNote(tag: RawTag) {
  const version = tag.tag.replace(/^v/, '');
  return {
    slug: tag.tag,
    version,
    releaseDate: tag.date,
    gitTag: tag.tag,
    gitSha: tag.sha,
    title: `Release ${version}`,
    summary: '',
    changes: [] as Array<{ type: 'added' | 'changed' | 'fixed' | 'removed' | 'security'; entry: string }>,
    authors: [] as Array<{ username: string }>,
    status: 'draft' as const,
    ordering: 0,
  };
}

export const CHANGELOG_SEED = [
  {
    slug: 'entry-2026-04-17',
    version: 'pre-1.0',
    releaseDate: '2026-04-17T00:00:00.000Z',
    gitTag: 'pre-v1.0',
    gitSha: '0e73599',
    title: 'Refreshed navigation, trust pages, honest hosting claims',
    summary:
      'We rebuilt the top nav and added FAQ, Security, Pricing, Press, Careers, and Changelog pages. We also dropped the "100% renewable" claim. The site now says we run one VPS on the Alberta grid.',
    changes: [
      { type: 'changed', entry: 'Site' },
      { type: 'changed', entry: 'Transparency' },
    ],
    authors: [{ username: 'md' }],
    status: 'published',
    ordering: 10,
  },
  {
    slug: 'entry-2026-04-15',
    version: 'pre-1.0',
    releaseDate: '2026-04-15T00:00:00.000Z',
    gitTag: 'pre-v1.0',
    gitSha: '0e73599',
    title: 'Pruned experimental tools from the public portfolio',
    summary:
      'Removed nine tools that were still experimental and not ready for public use. The portfolio now shows fourteen products, each with an honest status label.',
    changes: [{ type: 'changed', entry: 'Portfolio' }],
    authors: [{ username: 'md' }],
    status: 'published',
    ordering: 20,
  },
  {
    slug: 'entry-2026-04-12',
    version: 'pre-1.0',
    releaseDate: '2026-04-12T00:00:00.000Z',
    gitTag: 'pre-v1.0',
    gitSha: 'aee1bf6',
    title: 'Published the full legal set',
    summary:
      'We turned the Privacy Policy, Terms, Accessibility, and Cookie pages from stubs into real docs. Each one now has headings, lists, and a direct contact address.',
    changes: [
      { type: 'changed', entry: 'Legal' },
      { type: 'changed', entry: 'Privacy' },
    ],
    authors: [{ username: 'md' }],
    status: 'published',
    ordering: 30,
  },
  {
    slug: 'entry-2026-04-01',
    version: 'pre-1.0',
    releaseDate: '2026-04-01T00:00:00.000Z',
    gitTag: 'pre-v1.0',
    gitSha: '14180d3',
    title: 'Fourteen-language localisation went live',
    summary:
      'All public pages now load in fourteen languages. The set includes Arabic, Urdu, Bengali, Hindi, Hausa, Swahili, and Yoruba. Use the language wheel at the foot of any page to switch.',
    changes: [{ type: 'changed', entry: 'Localisation' }],
    authors: [{ username: 'md' }],
    status: 'published',
    ordering: 40,
  },
  {
    slug: 'entry-2026-03-20',
    version: 'pre-1.0',
    releaseDate: '2026-03-20T00:00:00.000Z',
    gitTag: 'pre-v1.0',
    gitSha: '2ddc49b',
    title: 'Per-route bundle budget enforced in CI',
    summary:
      'Each route now has a fifty-kilobyte gzip cap. CI checks this on every pull request. If a PR breaks the cap, the build fails. No bypass, no exceptions.',
    changes: [
      { type: 'changed', entry: 'Performance' },
      { type: 'changed', entry: 'Green' },
    ],
    authors: [{ username: 'md' }],
    status: 'published',
    ordering: 50,
  },
] as const;

export async function seedChangelog(payload: Payload, log: string[]): Promise<void> {
  let created = 0;
  for (const entry of CHANGELOG_SEED) {
    const existing = await payload.find({
      collection: 'release-notes',
      where: { slug: { equals: entry.slug } },
      limit: 1,
    });
    if (existing.docs.length === 0) {
      await payload.create({ collection: 'release-notes', data: entry as any });
      created += 1;
    }
  }
  log.push(`changelog: seeded ${created} hand-written entry/entries`);

  const tags = readGitTags();
  let tagCreated = 0;
  for (const t of tags) {
    const existing = await payload.find({
      collection: 'release-notes',
      where: { slug: { equals: t.tag } },
      limit: 1,
    });
    if (existing.docs.length > 0) continue;
    await payload.create({ collection: 'release-notes', data: toReleaseNote(t) });
    tagCreated += 1;
  }
  if (tagCreated > 0) log.push(`changelog: seeded ${tagCreated} git-tag draft release(s)`);
}
