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
  href: string;
};

type InsightPost = {
  slug: string;
  title: string;
  subtitle: string;
  publishedAt: string;
  status: 'published' | 'draft';
  tags: { tag: string }[];
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
    subtitle:
      'Who is still offline in 2026, which languages they speak, and why an English-only web leaves most of the world out of the room.',
    publishedAt: '2026-04-01T00:00:00.000Z',
    status: 'published',
    tags: [{ tag: 'Localisation' }, { tag: 'Access' }],
    sources: [
      {
        label: 'ITU Facts and Figures 2025',
        href: 'https://www.itu.int/itu-d/reports/statistics/facts-figures-2025/',
      },
      {
        label: 'W3C Internationalisation Activity',
        href: 'https://www.w3.org/International/',
      },
    ],
    body: {
      root: {
        type: 'root',
        version: 1,
        children: [
          para(
            'The International Telecommunication Union, a United Nations agency, counts roughly 2.2 billion people still offline in 2025. That is about one human being in four. Ninety-six out of every hundred of them live in low or middle income countries. The gap is not a rounding error. It is a generation of would-be doctors, shopkeepers, farmers, and students who cannot open a web browser today.'
          ),
          para(
            'The gap is not only about a missing cable. It is also about language. Most of the web speaks English first. A large share of sites speak only English. The languages carried by smaller communities are often left out at the design stage, even when the translation would cost almost nothing.'
          ),
          para(
            'We built this site in fourteen languages on day one. The set covers Arabic and Urdu as right-to-left scripts. It also covers Bengali, Hindi, Hausa, Swahili, Yoruba, Simplified Chinese, French, Spanish, Portuguese, Russian, Indonesian, and English. Each one is in the top twenty by speaker count. Each one is under-served by English-only tools.'
          ),
          para(
            'Shipping in one language is faster. It is also a quiet decision about who is allowed to be a customer. We chose the wider circle. Every new product in the family follows the same rule: fourteen languages on day one, or the product does not launch.'
          ),
          para(
            'If you read a page here and the translation reads awkwardly, please tell us. Real readers across the world are part of our editing team. That is how the language floor keeps rising.'
          ),
        ],
      },
    },
  },
  {
    slug: 'one-vps-zero-trackers',
    title: 'One VPS, zero trackers: what we run and why',
    subtitle: 'No CDN, no analytics SaaS, no third-party fonts. The whole site answers from one server we control.',
    publishedAt: '2026-04-10T00:00:00.000Z',
    status: 'published',
    tags: [{ tag: 'Transparency' }, { tag: 'Infrastructure' }],
    sources: [
      {
        label: 'Green Web Foundation — check a host',
        href: 'https://www.thegreenwebfoundation.org/tools/green-web-check/',
      },
      {
        label: 'Contabo VPS specs',
        href: 'https://contabo.com/en/vps/',
      },
    ],
    body: {
      root: {
        type: 'root',
        version: 1,
        children: [
          para(
            'The whole site runs on one virtual server that we rent and manage ourselves. There is no content delivery network in front of it. There is no analytics vendor. There are no outside font hosts. Every page you see is sent from a single machine in a single named datacentre, with nothing in the middle to read the traffic.'
          ),
          para(
            'That simplicity is not a shortcut. It is the whole product story. When a visitor asks what we do with their data, we can point at one log file that lives for fourteen days and then disappears. When a regulator asks where the information lives, the answer is a sentence, not a map.'
          ),
          para(
            'We used to carry a "one hundred percent renewable hosting" claim on the green page. We removed it. The server is in a part of Canada whose grid is still heavy on natural gas, and we had not yet confirmed the datacentre energy mix with an independent source. Until that confirmation lands, the honest sentence is that we run on a mixed grid and are watching for a cleaner option.'
          ),
          para(
            'Running one server is a constraint and a choice. It keeps the data flow simple, the cost low, the carbon cost measurable, and the privacy story short enough to read aloud in a meeting. If the site outgrows this setup, the next step is to add a second server that we also manage \u2014 not to hide behind an outside platform.'
          ),
        ],
      },
    },
  },
  {
    slug: 'grade-8-is-the-ceiling',
    title: 'Grade 8 is the ceiling: how we write for real people',
    subtitle: 'A CI gate rejects any prose above Flesch-Kincaid grade 10. The goal is grade 8. Legal pages included.',
    publishedAt: '2026-04-17T00:00:00.000Z',
    status: 'published',
    tags: [{ tag: 'Accessibility' }, { tag: 'Writing' }],
    sources: [
      {
        label: 'Plain Language Guidelines — plainlanguage.gov',
        href: 'https://www.plainlanguage.gov/guidelines/',
      },
      {
        label: 'Flesch-Kincaid readability formula',
        href: 'https://en.wikipedia.org/wiki/Flesch%E2%80%93Kincaid_readability_tests',
      },
    ],
    body: {
      root: {
        type: 'root',
        version: 1,
        children: [
          para(
            'Every string on this site that a human being will read has to pass a reading-level test before it can ship. The test uses the Flesch-Kincaid grade formula. The ceiling is grade ten. The goal is grade eight, which is roughly the reading level of a thirteen-year-old and also the ceiling used by most plain-language writing guides around the world.'
          ),
          para(
            'Short sentences. Common words. One idea at a time. Technical terms only when they are the honest name of the thing. Numbers written in full so there is no room to misread them.'
          ),
          para(
            'This matters most for legal pages. A privacy policy written at grade fourteen is not readable by the majority of adults, no matter where they went to school. Ours sits at grade seven. So do the terms of service, the accessibility statement, and the cookie notice. A person does not have to earn the right to understand what we do with their data.'
          ),
          para(
            'The test lives in a small script called readability.mjs inside our CI folder. It runs on every pull request. If any string scores above the ceiling, the build stops and we rewrite the line. There is no setting to switch this off for a release, because a deadline is never a good reason to write above our readers.'
          ),
          para(
            'If you hit a page that feels hard to read, that is a bug. Please tell us and we will fix it in the next release.'
          ),
        ],
      },
    },
  },
];

export async function seedInsights(payload: Payload, log: string[]): Promise<void> {
  // JournalPosts.author is a required relationship to users. Pick the first
  // admin user so the seed has something valid to point at.
  const users = await payload.find({ collection: 'users', limit: 1 });
  const authorId = users.docs[0]?.id;
  if (!authorId) {
    log.push('insights: skipped (no users exist to attribute posts to)');
    return;
  }

  let created = 0;
  let updated = 0;
  for (const post of INSIGHTS_SEED) {
    const existing = await payload.find({
      collection: 'journal-posts',
      where: { slug: { equals: post.slug } },
      limit: 1,
    });
    if (existing.docs.length === 0) {
      await payload.create({
        collection: 'journal-posts',
        data: { ...post, author: authorId } as any,
      });
      created += 1;
    } else {
      const existingId = existing.docs[0]!.id as any;
      await payload.update({
        collection: 'journal-posts',
        id: existingId,
        data: { subtitle: post.subtitle } as any,
      });
      updated += 1;
    }
  }
  log.push(`insights: ${created} created, ${updated} updated-subtitle`);
}
