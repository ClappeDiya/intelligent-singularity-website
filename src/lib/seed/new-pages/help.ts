import type { Payload } from 'payload';

export const HELP_PAGE_SEED = {
  eyebrow: 'HELP',
  title: 'Find what you need.',
  lede:
    'Pick a topic below or search the page. If none of these answer your question, the contact form at the bottom goes to a real person.',
  routes: [
    {
      key: 'use-product',
      heading: 'Using the product',
      blurb: 'Guides, API docs, and examples for everyday use.',
      links: [
        { label: 'Getting started', href: '/docs/getting-started' },
        { label: 'API reference', href: '/docs/api' },
        { label: 'Examples', href: '/docs/examples' },
      ],
    },
    {
      key: 'billing',
      heading: 'Billing',
      blurb: 'Plans, pricing, refunds, and how to change your subscription.',
      links: [
        { label: 'Plans and pricing', href: '/pricing' },
        { label: 'Change or cancel plan', href: '/account/billing' },
        { label: 'Request a refund', href: '/contact?topic=refund' },
      ],
    },
    {
      key: 'security',
      heading: 'Security',
      blurb: 'Our posture, how to report a vulnerability, and trust pages.',
      links: [
        { label: 'Our security posture', href: '/security' },
        { label: 'Report a vulnerability', href: '/contact?topic=security' },
        { label: 'Trust and subprocessors', href: '/trust' },
      ],
    },
    {
      key: 'how-built',
      heading: 'How this is built',
      blurb: 'Technology choices, accessibility statement, and green details.',
      links: [
        { label: 'Technology choices', href: '/insights/one-vps-zero-trackers' },
        { label: 'Accessibility statement', href: '/legal/accessibility' },
        { label: 'Green and sustainability', href: '/green' },
      ],
    },
    {
      key: 'broken',
      heading: 'Something is broken',
      blurb: 'Current service status and how to report a bug that you hit.',
      links: [
        { label: 'Check service status', href: '/status' },
        { label: 'Report a bug', href: '/contact?topic=bug' },
      ],
    },
    {
      key: 'anything-else',
      heading: 'Anything else',
      blurb: 'A direct line to us — contact form, media, and press.',
      links: [
        { label: 'Contact us', href: '/contact' },
        { label: 'Media and press', href: '/contact?topic=press' },
      ],
    },
  ],
  popularQuestions: [
    {
      question: 'Do you store my data on third-party servers?',
      answer:
        'No. The site and its data live on one VPS we control. We do not send your data to any analytics or tracking service.',
    },
    {
      question: 'How do I delete my account?',
      answer:
        'Email us at privacy@intelligentsingularityinc.com with "delete my account" in the subject. We act within two business days.',
    },
    {
      question: 'Is the site available in my language?',
      answer:
        'We ship fourteen locales from day one. Use the language picker in the site header to switch.',
    },
  ],
  emergencyRow: {
    heading: 'Need help right now?',
    body: 'If the site is down or you cannot log in, check the status page first. It updates every minute.',
    href: '/status',
  },
  contactFallback: {
    heading: 'Still stuck?',
    body: 'Send us a message and we will reply within one business day.',
    href: '/contact',
  },
};

export async function seedHelpPage(payload: Payload, log: string[]): Promise<void> {
  await payload.updateGlobal({ slug: 'help-page', data: HELP_PAGE_SEED as any });
  log.push('help-page: updated');
}
