import type { Payload } from 'payload';

export const SECURITY_PAGE_SEED = {
  eyebrow: 'Security · Trust · Data',
  title: 'Security you can actually read.',
  lede:
    'No marketing diagrams. Just what we do to keep your data private, small, and in your hands — on this site and across every product we ship.',
  postureSummary: {
    eyebrow: 'Posture summary',
    heading: 'One origin. Encrypted on the wire. Zero third parties. Short retention. Named subprocessors.',
    body:
      'The five lines above are the whole posture in one breath. Everything below is the supporting evidence — what each line means, how it is enforced, and how to report a problem when something goes wrong.',
  },
  topStats: [
    { label: 'Trackers', value: '0', hint: 'On this site and every product page' },
    { label: 'Third-party calls', value: '0', hint: 'Enforced by CI on every commit' },
    { label: 'Server log retention', value: '14 days', hint: 'Then permanently deleted' },
  ],
  posture: [
    {
      title: 'Encryption on every wire',
      body:
        'All public pages and product traffic travel over TLS 1.3 with modern ciphers. Certificates are issued by Let’s Encrypt and rotated automatically. HTTP Strict Transport Security is set with a long max-age. Nothing you type ever crosses the open web in plain text. Internal service-to-service calls use mutual TLS where the network path could be observed.',
    },
    {
      title: 'Self-hosted, not scattered',
      body:
        'This site runs on one VPS in Edmonton, Alberta. No third-party CDN in the request path. No edge cache holding copies of your data in twenty regions. When a product needs lower latency in a far region, we run our own read replicas. Never a third-party CDN that logs your visit on the side.',
    },
    {
      title: 'Zero third-party calls',
      body:
        'No analytics, no pixels, no ad networks, no external fonts, no embedded video, no social-media widgets. Your browser only talks to our origin. This is enforced in continuous integration by a script called no-third-party.mjs that scans the built site and fails the release if any external host appears in the bundle. The promise is a unit test, not a marketing line.',
    },
    {
      title: 'Signed and verified builds',
      body:
        'Every container image we ship is built from a locked set of parts. The lockfile is in git. We review advisories before we bump any part. Releases are signed and checked on the host before they run. A build that fails any gate — bundle size, a11y, third party — cannot reach production.',
    },
    {
      title: 'Short retention windows',
      body:
        'Server logs are kept for fourteen days for debugging and then deleted. Contact-form emails are kept only as long as it takes to reply and file the conversation, then archived for up to twenty-four months for record-keeping, then deleted. Backups roll on a thirty-day cycle and are encrypted at rest.',
    },
    {
      title: 'Isolated product environments',
      body:
        'Each product runs with its own database, its own secrets, and its own rules. A break-in on one tool cannot spill to another. Some features link across products. Single sign-on. Support routing. Fraud signals. We move only the minimum needed between products. Each flow is on each product’s privacy page.',
    },
    {
      title: 'Admin behind an allow-list',
      body:
        'Access to the Payload CMS admin and to the underlying server is restricted at the proxy layer to a short list of internet addresses approved in writing. Multi-factor authentication is required for every administrator account. There is no shared "admin" credential — every action is attributable to a named person.',
    },
    {
      title: 'Secrets in a vault, never in code',
      body:
        'Database passwords, API keys, signing secrets, and certificates live in an encrypted secrets vault and are injected at runtime. Source-code scans block any commit that attempts to embed a credential. Rotated secrets propagate to running services within minutes.',
    },
  ],
  dataHandling: [
    {
      title: 'You send less, we store less',
      body: 'We only ask for the minimum a product needs to work. No pre-checked boxes. No "optional" fields that quietly become mandatory to get results. We do not buy or enrich personal data from third parties.',
    },
    {
      title: 'Your data is yours',
      body: 'Export from every product is a first-class feature, not an upsell. Delete, and your data is removed — not "soft-deleted forever" behind a switch you cannot see. Standard formats (CSV, JSON, ICS, PDF) on the way out. No proprietary lock-in.',
    },
    {
      title: 'No training on your content',
      body: 'AI features use only data you choose to submit. The data stays scoped to your account. Your private content is never used to train shared models. It is never blended into another customer’s data. It is never sent to a third-party AI that keeps your prompts.',
    },
    {
      title: 'Transparent incident response',
      body: 'If a security event ever touches your data, we tell you within seventy-two hours. In plain words. We say what happened, what we did, and what you can do next. We publish a public post-mortem once the work is done. We will never hide a breach behind a quiet policy update.',
    },
    {
      title: 'Right of access, on request',
      body: 'You can ask for a plain copy of every bit of personal data we hold. You can ask us to fix it. You can ask us to delete it. You can ask us to send a clean copy to another service. We respond within thirty days, free of charge. We can reply in any of the fourteen languages the site speaks.',
    },
    {
      title: 'A short list of subprocessors, named',
      body: 'A handful of vendors help us run the platform — for example our hosting partner, our email-relay partner, and any payment-rail processor a product uses at checkout. Each one is named on our trust page with the purpose it serves and the data it touches. We never add a new subprocessor in silence.',
    },
  ],
  compliance: [
    {
      title: 'PIPEDA (Canada)',
      body:
        'Our parent company is set up in Alberta. We follow the Personal Information Protection and Electronic Documents Act. We answer to the Office of the Privacy Commissioner of Canada. That is also where you can take a privacy concern, after writing to us first.',
    },
    {
      title: 'GDPR-equivalent rights, globally',
      body:
        'We extend the rights from the European GDPR to every user, on every continent. Equal treatment is part of the mission. Not a compliance checkbox tied to where you live.',
    },
    {
      title: 'WCAG 2.2 Level AA',
      body:
        'Accessibility is a security property — a site you cannot use is a site you cannot trust. Every page is built to WCAG 2.2 AA at minimum, with axe-core checks failing the build on any violation. Read the full statement on /legal/accessibility.',
    },
    {
      title: 'No FedRAMP, no SOC 2 — yet',
      body:
        'We are honest about what we do not have. We are too small today to maintain a SOC 2 Type II audit or a FedRAMP authorisation, and we will not claim them in marketing. When a product enters a market that requires one, we will earn it before that product is offered there.',
    },
  ],
  reportCta: {
    eyebrow: 'Report a vulnerability',
    heading: 'Found something? Please tell us first.',
    body:
      'Email security@intelligentsingularityinc.com with a description and steps to reproduce. We confirm reports within one business day. We triage within three. We credit researchers by name in the post-mortem when a fix ships, unless they ask to stay anonymous. We do not threaten or sue good-faith security researchers, full stop.',
    email: 'security@intelligentsingularityinc.com',
  },
};

export async function seedSecurityPage(payload: Payload, log: string[]): Promise<void> {
  await payload.updateGlobal({ slug: 'security-page', data: SECURITY_PAGE_SEED as any });
  log.push('security-page: updated');
}
