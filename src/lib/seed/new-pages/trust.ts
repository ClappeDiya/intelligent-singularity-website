import type { Payload } from 'payload';

export const TRUST_PAGE_SEED = {
  eyebrow: 'TRUST',
  title: 'Every promise, with the receipt attached.',
  lede:
    'Trust is earned one proof at a time. This page links every claim we make about security, privacy, sustainability, and accessibility to the evidence behind it. You should never have to take our word for anything — you should be able to check it in under a minute.',
  pillars: [
    {
      key: 'security',
      heading: 'Security',
      blurb:
        'How we keep the website, your messages, and the data behind it safe — explained in plain language and backed by numbers you can verify.',
      href: '/security',
      proof: [
        { label: 'Outside calls the site makes at runtime', value: '0' },
        { label: 'Rule that enforces the zero', value: 'scripts/no-third-party.mjs, blocks the build' },
        { label: 'Time to first response on a security report', value: 'under one business day' },
        { label: 'Minimum cipher suite', value: 'TLS 1.3, modern ciphers only' },
      ],
    },
    {
      key: 'privacy',
      heading: 'Privacy',
      blurb:
        'What we collect, what we choose not to collect, how long we keep it, and the one-email path to ask for a copy or a deletion.',
      href: '/legal/privacy',
      proof: [
        { label: 'Tracking cookies set', value: '0' },
        { label: 'Advertising pixels loaded', value: '0' },
        { label: 'Server-log retention', value: '14 days, then deleted' },
        { label: 'Personal-data request turnaround', value: '30 days or fewer' },
      ],
    },
    {
      key: 'sustainability',
      heading: 'Sustainability',
      blurb:
        'A web page small enough to load on a five-year-old phone over 2G. We measure it every build, not only when it suits us.',
      href: '/green',
      proof: [
        { label: 'First-paint budget per route', value: '50 KB, gzip' },
        { label: 'External fonts loaded', value: '0 — every font is self-hosted' },
        { label: 'External images loaded', value: '0' },
        { label: 'Renewable-energy commitment', value: 'match 100% of grid power at the hosting partner' },
      ],
    },
    {
      key: 'accessibility',
      heading: 'Accessibility',
      blurb:
        'What WCAG 2.2 AA means in practice, how we test against it on every build, and what we already ship for users in fourteen languages.',
      href: '/legal/accessibility',
      proof: [
        { label: 'Automated axe-core violations', value: '0' },
        { label: 'Languages shipped on day one', value: '14' },
        { label: 'Minimum body-text contrast ratio', value: '7 : 1' },
        { label: 'External accessibility audits per year', value: '2' },
      ],
    },
  ],
  certifications: [],
  subprocessors: [
    {
      name: "Let's Encrypt",
      purpose:
        'Issues the TLS certificate that lets your browser confirm it is talking to our real server.',
      dataAccessed:
        'None. The service only checks that we control the domain name — it never sees any visitor data.',
      location: 'United States',
      href: 'https://letsencrypt.org',
    },
    {
      name: 'Mailcow (self-hosted)',
      purpose:
        'Delivers email between our contact form and our reply inbox, on a mail server we run ourselves.',
      dataAccessed:
        'The message you send, only while we are reading and answering it.',
      location: 'Our own server in Edmonton, Alberta, Canada',
      href: 'https://mailcow.email',
    },
    {
      name: 'Contabo',
      purpose:
        'Rents us the physical server and encrypted storage where the website lives.',
      dataAccessed:
        'Encrypted disk volumes only. The hosting team does not read site content.',
      location: 'Edmonton, Alberta, Canada (data centre region)',
      href: 'https://contabo.com',
    },
    {
      name: 'Dokploy',
      purpose:
        'Releases new versions of the website onto our own server, in our own network.',
      dataAccessed:
        'Runs inside our VPS. It never sends data outside the machine it runs on.',
      location: 'Our own server',
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
            text: 'This website lives on one virtual server in a named data centre in Edmonton, Alberta, Canada. There is no content delivery network in front of it. When the page loads in your browser, your browser is speaking directly to our machine. Nothing sits in the middle to copy, cache, or read your traffic.',
          }],
        },
        {
          type: 'paragraph', version: 1, direction: 'ltr', format: '', indent: 0,
          children: [{
            type: 'text', version: 1, mode: 'normal', detail: 0, format: 0, style: '',
            text: 'Our encrypted backups roll on a thirty-day cycle. They never leave the datacentre region. They are protected at rest with a key that only two people on our team can unlock.',
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
            text: 'Found a weakness, a bug, or something that simply looks wrong? Write to security@intelligentsingularityinc.com. We answer within one business day, work with you on the fix, and credit the reporter by name in the public advisory once the issue is patched — unless you ask us not to.',
          }],
        },
        {
          type: 'paragraph', version: 1, direction: 'ltr', format: '', indent: 0,
          children: [{
            type: 'text', version: 1, mode: 'normal', detail: 0, format: 0, style: '',
            text: 'We never sue researchers who follow the responsible-disclosure terms on /security.',
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
