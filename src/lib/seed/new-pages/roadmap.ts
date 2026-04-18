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
    title: 'Self-hosted analytics via Plausible',
    summary:
      'Deploy Plausible on our own VPS. Proxy events through the app so no third-party script runs in the browser.',
    whyItMatters:
      'We can track page views without sending data to outside services. Visitors stay private. The no-tracker CI gate stays green.',
    status: 'planned',
    category: 'infra',
    gitRefs: [],
    ordering: 10,
  },
  {
    slug: 'uptime-kuma',
    title: 'Uptime monitoring with Uptime Kuma',
    summary:
      'Run Uptime Kuma on Dokploy. Add a monitor for each public endpoint. Set up SMTP alerts for downtime.',
    whyItMatters:
      'We find out when a page goes down before a user does. Alerts go to our own mail server, not a paid SaaS.',
    status: 'planned',
    category: 'infra',
    gitRefs: [],
    ordering: 20,
  },
  {
    slug: 'glitchtip-telemetry',
    title: 'Error tracking with GlitchTip',
    summary:
      'Deploy GlitchTip on the VPS and wire the Next.js app to it via the Sentry-compatible SDK.',
    whyItMatters:
      'Runtime errors get captured and grouped. We fix bugs faster. No data leaves our own servers.',
    status: 'planned',
    category: 'infra',
    gitRefs: [],
    ordering: 30,
  },
  {
    slug: 'encrypted-backups',
    title: 'Daily encrypted Postgres backups',
    summary:
      'Run a nightly pg_dump, encrypt it with age, and copy it to the Audiflo secondary server. A cron job fires at 3 am.',
    whyItMatters:
      'If the main server fails, we can restore from the prior night. One script, one cron entry, zero third-party storage.',
    status: 'planned',
    category: 'infra',
    gitRefs: [],
    ordering: 40,
  },
  {
    slug: 'green-hosting-badge',
    title: 'Verify and publish green hosting status',
    summary:
      'Query the Green Web Foundation API for the Contabo data centre. Update the green page once the result is confirmed.',
    whyItMatters:
      'We only claim green hosting if we can prove it. The API check makes the claim honest and repeatable.',
    status: 'planned',
    category: 'green',
    gitRefs: [],
    ordering: 50,
  },
  {
    slug: 'launch-v1',
    title: 'Run the launch checklist and tag v1.0.0',
    summary:
      'Walk through docs/runbooks/launch-checklist.md, do a final deploy, run a smoke test, then tag v1.0.0 and announce.',
    whyItMatters:
      'A public v1.0.0 tag marks the point where the site is stable enough for real users. The checklist keeps us honest.',
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
