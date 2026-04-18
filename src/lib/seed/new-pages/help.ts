import type { Payload } from 'payload';

export const HELP_PAGE_SEED = {
  eyebrow: 'HELP',
  title: 'Find what you need.',
  lede:
    'Pick a topic below or search the page. If none of these answer your question, the contact form at the bottom goes to a real person.',
  routes: [
    {
      key: 'about-the-studio',
      heading: 'About the studio',
      blurb: 'Who we are, what we build, and the rules we ship under.',
      links: [
        { label: 'Manifesto', href: '/manifesto' },
        { label: 'About the studio', href: '/about' },
        { label: 'Our portfolio', href: '/portfolio' },
      ],
    },
    {
      key: 'pricing-and-billing',
      heading: 'Pricing and billing',
      blurb: 'Plans, pricing rules, refunds. Each product publishes its own prices.',
      links: [
        { label: 'Pricing philosophy', href: '/pricing' },
        { label: 'Frequently asked questions', href: '/faq' },
        { label: 'Talk about pricing', href: '/contact?topic=pricing' },
      ],
    },
    {
      key: 'security-and-trust',
      heading: 'Security and trust',
      blurb: 'Our posture, how to report a vulnerability, and every third party we use.',
      links: [
        { label: 'Our security posture', href: '/security' },
        { label: 'Trust and subprocessors', href: '/trust' },
        { label: 'Report a vulnerability', href: '/contact?topic=security' },
      ],
    },
    {
      key: 'how-this-is-built',
      heading: 'How this is built',
      blurb: 'Technology choices, accessibility statement, and green details.',
      links: [
        { label: 'One VPS, zero trackers', href: '/insights/one-vps-zero-trackers' },
        { label: 'Accessibility statement', href: '/legal/accessibility' },
        { label: 'Green and sustainability', href: '/green' },
      ],
    },
    {
      key: 'something-is-broken',
      heading: 'Something is broken',
      blurb: 'Live service status and the fastest way to report a bug we should look at.',
      links: [
        { label: 'Check live status', href: '/status' },
        { label: 'Report a bug', href: '/contact?topic=bug' },
        { label: 'Changelog', href: '/changelog' },
      ],
    },
    {
      key: 'anything-else',
      heading: 'Anything else',
      blurb: 'A direct line to us — contact form, media, careers, and press enquiries.',
      links: [
        { label: 'Contact us', href: '/contact' },
        { label: 'Careers', href: '/careers' },
        { label: 'Media and press', href: '/press' },
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
