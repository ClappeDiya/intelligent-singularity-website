import type { Payload } from 'payload';

export const TRUST_PAGE_SEED = {
  eyebrow: 'TRUST',
  title: 'Where to find the proof.',
  lede:
    'Every claim we make about security, privacy, sustainability, and access links to the evidence. You should never have to take our word for it.',
  pillars: [
    {
      key: 'security',
      heading: 'Security',
      blurb: 'How we keep the site and your data safe, in plain terms you can check.',
      href: '/security',
      proof: [
        { label: 'Third-party calls at runtime', value: '0' },
        { label: 'Enforced by', value: 'scripts/no-third-party.mjs at build time' },
      ],
    },
    {
      key: 'privacy',
      heading: 'Privacy',
      blurb: 'What we collect, what we do not collect, and how to delete what you have shared.',
      href: '/legal/privacy',
      proof: [
        { label: 'Tracking cookies', value: '0' },
        { label: 'Server-log retention', value: '14 days' },
      ],
    },
    {
      key: 'sustainability',
      heading: 'Sustainability',
      blurb: 'How small a site can be — measured, not guessed.',
      href: '/green',
      proof: [{ label: 'First-paint budget per route', value: '50 KB gzip' }],
    },
    {
      key: 'accessibility',
      heading: 'Accessibility',
      blurb: 'What WCAG 2.2 AA means here, and how we check ourselves on every build.',
      href: '/legal/accessibility',
      proof: [
        { label: 'axe-core violations', value: '0' },
        { label: 'Locales shipped on day one', value: '14' },
      ],
    },
  ],
  certifications: [],
  subprocessors: [
    {
      name: "Let's Encrypt",
      purpose: 'TLS certificate issuance',
      dataAccessed: 'None. Proof of domain ownership only.',
      location: 'United States',
      href: 'https://letsencrypt.org',
    },
    {
      name: 'Mailcow (self-hosted)',
      purpose: 'SMTP for the contact form',
      dataAccessed: 'Contact-form messages while we are replying.',
      location: 'Our VPS in Germany',
      href: 'https://mailcow.email',
    },
    {
      name: 'Contabo',
      purpose: 'Virtual server and storage',
      dataAccessed: 'Encrypted volumes only.',
      location: 'US Central',
      href: 'https://contabo.com',
    },
    {
      name: 'Dokploy',
      purpose: 'Self-hosted deploy orchestrator',
      dataAccessed: 'Runs inside our VPS. No outside access.',
      location: 'Our VPS',
      href: 'https://dokploy.com',
    },
  ],
  dataResidency: {
    root: {
      type: 'root', version: 1, direction: 'ltr', format: '', indent: 0,
      children: [
        {
          type: 'paragraph', version: 1, direction: 'ltr', format: '', indent: 0,
          children: [{
            type: 'text', version: 1, mode: 'normal', detail: 0, format: 0, style: '',
            text: 'This site lives on one virtual server in a named Contabo datacentre. There is no CDN. If you can reach the site, you are talking directly to that one machine.',
          }],
        },
      ],
    },
  },
  reportIncident: {
    root: {
      type: 'root', version: 1, direction: 'ltr', format: '', indent: 0,
      children: [
        {
          type: 'paragraph', version: 1, direction: 'ltr', format: '', indent: 0,
          children: [{
            type: 'text', version: 1, mode: 'normal', detail: 0, format: 0, style: '',
            text: 'Found a bug? Write to the security team. We reply within one business day. We credit the reporter when a fix ships.',
          }],
        },
      ],
    },
  },
  lastReviewedAt: new Date().toISOString(),
};

export async function seedTrustPage(payload: Payload, log: string[]): Promise<void> {
  await payload.updateGlobal({ slug: 'trust-page', data: TRUST_PAGE_SEED as any });
  log.push('trust-page: updated');
}
