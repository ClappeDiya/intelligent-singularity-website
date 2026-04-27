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
    title: 'Fresh top navigation, full trust pages, and an honest hosting story',
    summary:
      'We rebuilt the top navigation bar so the full picture of the studio is reachable from any page. We added six new sections: Frequently Asked Questions, Security, Pricing, Press, Careers, and a public Changelog. We also dropped the old "one hundred percent renewable" claim from the green page, because we could not back it up yet with a third-party verification. The site now says plainly that we run one virtual server on the Alberta grid and are watching for a cleaner option.',
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
    title: 'Portfolio trimmed to the tools that are ready for real users',
    summary:
      'We took nine tools off the public portfolio for now. They are still in test mode. The page now lists fourteen products. Each one shows a clear label. You can see where it sits at a glance: in production, in staging, or still in the studio.',
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
    title: 'The full legal set is now a proper set of documents',
    summary:
      'The Privacy, Terms, Accessibility, and Cookies pages went from short stubs to full plain-English documents. Each page now has clear headings and short lists. Each page is graded for an eighth-grade reader. Each page lists its own contact email. Each page tells you what rights you have and how to use them.',
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
    title: 'The site now speaks fourteen languages from the first click',
    summary:
      'Every public page loads in any of fourteen languages on the day it ships. The set is wide on purpose and includes Arabic and Urdu as right-to-left scripts, along with Bengali, Hindi, Hausa, Swahili, Yoruba, Simplified Chinese, French, Spanish, Portuguese, Russian, Indonesian, and English. Use the language wheel at the foot of any page to switch. Your choice is remembered for the next visit.',
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
    title: 'Every page now has a fifty-kilobyte first-paint ceiling',
    summary:
      'Every route in the site is capped at fifty kilobytes of gzipped code on first paint. The build pipeline checks the number on every pull request. If a change breaks the ceiling, the build stops. There is no setting to switch it off, because a small page is the easiest climate promise we can keep.',
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
