import type { Payload } from 'payload';

export type RoadmapItem = {
  slug: string;
  title: string;
  summary: string;
  whyItMatters: string;
  status: 'planned' | 'in-progress' | 'shipped' | 'paused' | 'cancelled';
  category: 'website' | 'products' | 'infra' | 'accessibility' | 'green';
  gitRefs: string[];
  ordering: number;
};

export const ROADMAP_SEED: RoadmapItem[] = [
  {
    slug: 'plausible-analytics',
    title: 'Self-hosted page counts, without third parties',
    summary:
      'Run an open-source page-counter on our own server. Send page views to it through a proxy we control. No outside script ever runs in your browser.',
    whyItMatters:
      'We want to know which pages help people the most, but we do not want your visit to feed an outside company. Running the tool ourselves keeps the question and the answer inside our walls. The zero-tracker rule in our build pipeline stays green while we learn from the numbers.',
    status: 'planned',
    category: 'infra',
    gitRefs: [],
    ordering: 10,
  },
  {
    slug: 'uptime-kuma',
    title: 'Live uptime monitor with our own alerts',
    summary:
      'Run a small open-source uptime monitor on our deployment host. Add a check for every public page and every API route. Send alerts through our own mail server.',
    whyItMatters:
      'We would rather hear from a monitor than from a visitor when something goes down. Running the monitor ourselves keeps the alerts private, keeps the cost near zero, and shows the same data you see on our public status page.',
    status: 'planned',
    category: 'infra',
    gitRefs: [],
    ordering: 20,
  },
  {
    slug: 'glitchtip-telemetry',
    title: 'Self-hosted error reporting',
    summary:
      'Set up an open-source error tracker on our own server. Wire the site to it with a small drop-in library.',
    whyItMatters:
      'Runtime errors get caught, grouped, and explained without waiting for a user to tell us. Bugs get fixed sooner. Nothing leaves our own machines, which keeps the privacy story the same as before.',
    status: 'planned',
    category: 'infra',
    gitRefs: [],
    ordering: 30,
  },
  {
    slug: 'encrypted-backups',
    title: 'Daily encrypted backups of every database',
    summary:
      'Run a nightly dump of our PostgreSQL databases, encrypt the file, and copy it to a second server we run ourselves. One script, one scheduled task, zero outside storage.',
    whyItMatters:
      'If a disk fails or a mistake lands on production, we can restore from the previous night. Encryption means the backup cannot be read if the second server is ever stolen. The pipeline is simple enough to fit on one page.',
    status: 'planned',
    category: 'infra',
    gitRefs: [],
    ordering: 40,
  },
  {
    slug: 'green-hosting-badge',
    title: 'Publish a verified green-hosting result',
    summary:
      'Ask a known outside green-hosting registry to check the energy mix at our data centre. Publish the result on the green page. Link back to the registry so anyone can verify it.',
    whyItMatters:
      'We will only claim green hosting when a neutral outside source can vouch for it. A published badge keeps us honest, replaceable, and easy to audit.',
    status: 'planned',
    category: 'green',
    gitRefs: [],
    ordering: 50,
  },
  {
    slug: 'launch-v1',
    title: 'Walk the launch checklist and tag version 1.0.0',
    summary:
      'Walk the launch checklist in our repo. Run a final deploy. Smoke-test every route in every language. Tag the release. Announce it.',
    whyItMatters:
      'A published version 1.0.0 tag marks the point where the site is stable enough for real users to depend on. The checklist is the difference between a shipped product and a hopeful one.',
    status: 'planned',
    category: 'website',
    gitRefs: [],
    ordering: 60,
  },
];

export async function seedRoadmap(payload: Payload, log: string[]): Promise<void> {
  let created = 0;
  for (const item of ROADMAP_SEED) {
    const existing = await payload.find({
      collection: 'roadmap-items',
      where: { slug: { equals: item.slug } },
      limit: 1,
    });
    if (existing.docs.length === 0) {
      await payload.create({ collection: 'roadmap-items', data: item as any });
      created += 1;
    }
  }
  log.push(`roadmap: seeded ${created} item(s)`);
}
