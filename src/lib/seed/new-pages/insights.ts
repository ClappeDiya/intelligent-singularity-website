import type { Payload } from 'payload';

type LexicalText = {
  type: 'text';
  text: string;
  version: number;
};

type LexicalParagraph = {
  type: 'paragraph';
  version: number;
  children: LexicalText[];
};

type LexicalRoot = {
  root: {
    type: 'root';
    version: number;
    children: LexicalParagraph[];
  };
};

type Source = {
  label: string;
  url: string;
};

type InsightPost = {
  slug: string;
  title: string;
  publishedAt: string;
  status: 'published' | 'draft';
  tags: string[];
  sources: Source[];
  body: LexicalRoot;
};

function para(text: string): LexicalParagraph {
  return {
    type: 'paragraph',
    version: 1,
    children: [{ type: 'text', text, version: 1 }],
  };
}

export const INSIGHTS_SEED: InsightPost[] = [
  {
    slug: 'the-2-2-billion-gap',
    title: 'The 2.2 billion gap: who the web still does not reach',
    publishedAt: '2026-04-01T00:00:00.000Z',
    status: 'published',
    tags: ['Localisation', 'Access'],
    sources: [
      {
        label: 'ITU Facts and Figures 2023',
        url: 'https://www.itu.int/en/ITU-D/Statistics/Pages/facts/default.aspx',
      },
      {
        label: 'W3C Internationalisation Activity',
        url: 'https://www.w3.org/International/',
      },
    ],
    body: {
      root: {
        type: 'root',
        version: 1,
        children: [
          para(
            'The ITU puts the number of people still offline at roughly 2.6 billion. A large share of those who are online use devices and apps built in English only.'
          ),
          para(
            'We built this site in fourteen languages from day one. The set includes Arabic, Urdu, Bengali, Hindi, Hausa, Swahili, and Yoruba. All are in the top twenty by speaker count. All are under-served by English-only tools.'
          ),
          para(
            'Shipping in one language is faster. It is also a choice about who you want to serve. We chose the wider set.'
          ),
        ],
      },
    },
  },
  {
    slug: 'one-vps-zero-trackers',
    title: 'One VPS, zero trackers: what we run and why',
    publishedAt: '2026-04-10T00:00:00.000Z',
    status: 'published',
    tags: ['Transparency', 'Infrastructure'],
    sources: [
      {
        label: 'Green Web Foundation — check a host',
        url: 'https://www.thegreenwebfoundation.org/tools/green-web-check/',
      },
      {
        label: 'Contabo VPS specs',
        url: 'https://contabo.com/en/vps/',
      },
    ],
    body: {
      root: {
        type: 'root',
        version: 1,
        children: [
          para(
            'The whole site runs on one VPS. There is no CDN vendor, no analytics SaaS, no third-party font host. Every request goes to our server and comes back from it.'
          ),
          para(
            'We removed the "100% renewable hosting" claim from the site. The server is in Alberta, Canada. We have not yet confirmed the data centre energy mix with the Green Web Foundation API. We will update the green page once we have a verified result.'
          ),
          para(
            'Running one server is a constraint and a choice. It keeps the data flow simple, the cost low, and the privacy story easy to explain.'
          ),
        ],
      },
    },
  },
  {
    slug: 'grade-8-is-the-ceiling',
    title: 'Grade 8 is the ceiling: how we write for real people',
    publishedAt: '2026-04-17T00:00:00.000Z',
    status: 'published',
    tags: ['Accessibility', 'Writing'],
    sources: [
      {
        label: 'Plain Language Guidelines — plainlanguage.gov',
        url: 'https://www.plainlanguage.gov/guidelines/',
      },
      {
        label: 'Flesch-Kincaid readability formula',
        url: 'https://en.wikipedia.org/wiki/Flesch%E2%80%93Kincaid_readability_tests',
      },
    ],
    body: {
      root: {
        type: 'root',
        version: 1,
        children: [
          para(
            'Every string on this site that a human reads must pass a Flesch-Kincaid grade-10 ceiling. Our CI gate rejects prose that scores above it.'
          ),
          para(
            'The goal is grade 8. Short sentences. Common words. No jargon left in for the sake of sounding clever.'
          ),
          para(
            'This matters most for legal pages. A privacy policy written at grade 14 is not readable by most adults. Ours sits at grade 7.'
          ),
          para(
            'The gate is a mjs script in scripts/ci-checks. It runs on every build. If a string fails, the build stops.'
          ),
        ],
      },
    },
  },
];

export async function seedInsights(payload: Payload, log: string[]): Promise<void> {
  let created = 0;
  for (const post of INSIGHTS_SEED) {
    const existing = await payload.find({
      collection: 'journal-posts',
      where: { slug: { equals: post.slug } },
      limit: 1,
    });
    if (existing.docs.length === 0) {
      await payload.create({ collection: 'journal-posts', data: post as any });
      created += 1;
    }
  }
  log.push(`insights: seeded ${created} launch post(s)`);
}
