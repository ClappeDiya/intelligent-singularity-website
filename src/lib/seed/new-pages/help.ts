import type { Payload } from 'payload';

export const HELP_PAGE_SEED = {
  eyebrow: 'HELP',
  title: 'Start here. We will help you find what you need.',
  lede:
    'Pick a topic from the list below. If none of the cards match what you are looking for, scroll to the bottom and use the contact form \u2014 a real person on our small team will read it and write you back within one working day.',
  routes: [
    {
      key: 'about-the-studio',
      heading: 'About the studio',
      blurb:
        'Who we are, what we build, the rules we ship under, and how to read our full portfolio of products in one place.',
      links: [
        { label: 'Read the manifesto', href: '/manifesto' },
        { label: 'Meet the studio', href: '/about' },
        { label: 'See every product', href: '/portfolio' },
      ],
    },
    {
      key: 'pricing-and-billing',
      heading: 'Pricing and billing',
      blurb:
        'How our pricing works, where to find plan details, and the fair-pricing rule that keeps the same features in every tier.',
      links: [
        { label: 'Pricing philosophy', href: '/pricing' },
        { label: 'Frequently asked questions', href: '/faq' },
        { label: 'Talk to us about a plan', href: '/contact?topic=pricing' },
      ],
    },
    {
      key: 'security-and-trust',
      heading: 'Security and trust',
      blurb:
        'Our security setup in plain words. The full list of services we use. One email to report a weakness.',
      links: [
        { label: 'How we protect the site', href: '/security' },
        { label: 'Every service we use', href: '/trust' },
        { label: 'Report a weakness', href: '/contact?topic=security' },
      ],
    },
    {
      key: 'how-this-is-built',
      heading: 'How this is built',
      blurb:
        'The tech choices behind the site. Our accessibility pledge. The full story of our green pledge.',
      links: [
        { label: 'One server, zero trackers', href: '/insights/one-vps-zero-trackers' },
        { label: 'Accessibility statement', href: '/legal/accessibility' },
        { label: 'Green and sustainability', href: '/green' },
      ],
    },
    {
      key: 'something-is-broken',
      heading: 'Something looks broken',
      blurb:
        'Live service status, the fastest way to tell us about a bug, and the full log of recent releases so you can see what just changed.',
      links: [
        { label: 'Check live status', href: '/status' },
        { label: 'Report a bug', href: '/contact?topic=bug' },
        { label: 'Read the changelog', href: '/changelog' },
      ],
    },
    {
      key: 'anything-else',
      heading: 'Anything else',
      blurb:
        'A direct line to the team. Use this for general questions. Use it for press, careers, or anything that does not fit a box above.',
      links: [
        { label: 'Send us a note', href: '/contact' },
        { label: 'Work with us', href: '/careers' },
        { label: 'Press and media', href: '/press' },
      ],
    },
  ],
  popularQuestions: [
    {
      question: 'Do you store my data on someone else\u2019s servers?',
      answer:
        'No. The website and the information behind it live on one virtual server that we run ourselves. We do not send your data to any outside analytics or tracking service, ever.',
    },
    {
      question: 'How do I delete my account or my data?',
      answer:
        'Write to privacy@intelligentsingularityinc.com with the words "delete my data" in the subject line. We confirm receipt within one working day and finish the deletion within thirty days, unless a short legal hold says otherwise.',
    },
    {
      question: 'Is this website available in my language?',
      answer:
        'We ship in fourteen languages on the day a page goes live, including right-to-left languages. Use the language picker in the site header to switch. Your choice is remembered for your next visit.',
    },
    {
      question: 'How fast will someone reply to my message?',
      answer:
        'One working day is our target. Security reports are answered the same day whenever possible. If you do not hear back, please check your spam folder first and then resend.',
    },
    {
      question: 'Can I quote a page on your site in a school or work project?',
      answer:
        'Yes, and thank you. Short quotations with a credit and a link back are welcome without asking. For a full page or a translation project, please write to us first so we can help.',
    },
    {
      question: 'Where is the company based?',
      answer:
        'We are incorporated in Alberta, Canada. The team is fully remote and works across time zones. Our servers run in Edmonton, Alberta.',
    },
    {
      question: 'Are you a charity or a for-profit company?',
      answer:
        'We are a for-profit company. We pay our team. We pay our hosting bill. We earn money from the paid tiers of our products. The free tier is real and runs forever.',
    },
    {
      question: 'How do I report a security problem?',
      answer:
        'Email security@intelligentsingularityinc.com with steps to reproduce. We answer within one working day. We credit you by name in the post-mortem when a fix ships. If you would rather stay anonymous, just say so.',
    },
    {
      question: 'How do I report an accessibility issue?',
      answer:
        'Email accessibility@intelligentsingularityinc.com with the page URL and a short note. We treat these as bugs, not feedback, and aim to ship a fix in the next release.',
    },
    {
      question: 'Can I partner with you?',
      answer:
        'Yes. We work with NGOs, with governments, and with companies that share our mission. Email partners@intelligentsingularityinc.com with a short brief and a deadline.',
    },
  ],
  emergencyRow: {
    heading: 'Do you need help right now?',
    body:
      'If the site will not open or you cannot sign in, please check the live status page first. It refreshes every minute and usually shows the issue before your inbox does.',
    href: '/status',
  },
  contactFallback: {
    heading: 'Still stuck? Write to us directly.',
    body:
      'Send a short message and a real person on our small team will answer within one working day. We reply in English by default and can reply in any of the fourteen languages this site already speaks.',
    href: '/contact',
  },
};

export async function seedHelpPage(payload: Payload, log: string[]): Promise<void> {
  await payload.updateGlobal({ slug: 'help-page', data: HELP_PAGE_SEED as any });
  log.push('help-page: updated');
}
