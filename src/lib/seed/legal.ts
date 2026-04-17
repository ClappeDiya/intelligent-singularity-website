type Para = { type: 'paragraph'; version: 1; direction: 'ltr'; format: ''; indent: 0; children: { type: 'text'; version: 1; text: string; format?: number }[] };
type Heading = { type: 'heading'; version: 1; direction: 'ltr'; format: ''; indent: 0; tag: 'h2' | 'h3'; children: { type: 'text'; version: 1; text: string }[] };
type List = { type: 'list'; version: 1; direction: 'ltr'; format: ''; indent: 0; listType: 'bullet' | 'number'; tag: 'ul' | 'ol'; start: 1; children: { type: 'listitem'; version: 1; direction: 'ltr'; format: ''; indent: 0; value: number; children: { type: 'text'; version: 1; text: string }[] }[] };

type Node = Para | Heading | List;

const p = (text: string): Para => ({
  type: 'paragraph',
  version: 1,
  direction: 'ltr',
  format: '',
  indent: 0,
  children: [{ type: 'text', version: 1, text }],
});

const h = (tag: 'h2' | 'h3', text: string): Heading => ({
  type: 'heading',
  version: 1,
  direction: 'ltr',
  format: '',
  indent: 0,
  tag,
  children: [{ type: 'text', version: 1, text }],
});

const ul = (items: string[]): List => ({
  type: 'list',
  version: 1,
  direction: 'ltr',
  format: '',
  indent: 0,
  listType: 'bullet',
  tag: 'ul',
  start: 1,
  children: items.map((text, i) => ({
    type: 'listitem',
    version: 1,
    direction: 'ltr',
    format: '',
    indent: 0,
    value: i + 1,
    children: [{ type: 'text', version: 1, text }],
  })),
});

function doc(children: Node[]) {
  return {
    root: {
      type: 'root',
      version: 1,
      direction: 'ltr',
      format: '',
      indent: 0,
      children,
    },
  };
}

const PRIVACY = doc([
  p(
    'Intelligent Singularity Inc. ("we", "our", "us") builds software for universal access. This policy explains what we collect, why, how we store it, and the choices you have.',
  ),
  h('h2', 'What we collect'),
  p(
    'This website sends no data to third parties. No analytics, advertising pixels, social embeds, external fonts, or content delivery networks are used. The only data we ever receive is what you explicitly type into a form and submit.',
  ),
  h('h3', 'Contact form'),
  p(
    'When you use the form at /contact we receive your name, email address, subject, message, and chosen routing label. We use this data only to reply to your inquiry. We do not add it to marketing lists, sell it, or disclose it to anyone outside the studio.',
  ),
  h('h3', 'Language preference'),
  p(
    'If you switch languages, we set a single first-party preference cookie named NEXT_LOCALE that stores the ISO code of your chosen language. It contains no personal information and expires after one year. You can delete it at any time from your browser settings with no effect on the rest of the site.',
  ),
  h('h3', 'Server logs'),
  p(
    'Our web server writes operational logs that may include anonymised request paths, HTTP status codes, and timestamps. Logs are retained for fourteen days for debugging and are never combined with personal data from the form.',
  ),
  h('h2', 'How we protect your data'),
  p(
    'Messages are delivered over TLS from our self-hosted mail server and are stored only within our operational inbox. Backups are encrypted at rest and rotated on a thirty-day cycle.',
  ),
  h('h2', 'Your rights'),
  p(
    'You may request a copy of any personal data we hold about you, ask us to correct it, or ask us to delete it. Write to legal@intelligentsingularityinc.com from the address you used when contacting us and we will confirm receipt within three business days.',
  ),
  h('h2', 'International transfers'),
  p(
    'Our servers are located in the European Union. If you contact us from elsewhere, your message is transferred there for the sole purpose of being read and replied to.',
  ),
  h('h2', 'Changes to this policy'),
  p(
    'If we materially change how we handle your data, we will update this page and adjust the "Last updated" date shown below.',
  ),
  h('h2', 'Contact'),
  p('Questions about this policy? Write to legal@intelligentsingularityinc.com.'),
]);

const TERMS = doc([
  p(
    'These terms govern your use of this website. By visiting, you agree to the terms below. Product-specific terms for individual applications in our portfolio are published on those products\' own domains.',
  ),
  h('h2', 'Use of the site'),
  p(
    'You may browse, read, and share content on this site for personal and commercial reference use. Please do not attempt to disrupt its operation, probe it for vulnerabilities without contacting us first, or scrape it for purposes that violate applicable law.',
  ),
  h('h2', 'Intellectual property'),
  p(
    'All text, visual design, and non-third-party code on this site are © Intelligent Singularity Inc. unless noted otherwise. Short quotations with attribution are welcome. If you would like to reproduce or translate a page in full, please contact us first.',
  ),
  h('h2', 'No warranty'),
  p(
    'This site is provided "as is". While we take reasonable care to ensure accuracy, we make no guarantees that the content will be error-free at all times. Where claims rely on external data, we link to the source so you can verify it.',
  ),
  h('h2', 'External links'),
  p(
    'We link to external sites — including our own products on their respective domains, reference sources like ITU, and partner organisations. We are not responsible for the content or policies of third-party sites.',
  ),
  h('h2', 'Governing law'),
  p(
    'These terms are governed by the laws of the Province of Alberta, Canada. Disputes will be resolved in the courts of Alberta.',
  ),
  h('h2', 'Changes'),
  p(
    'We may revise these terms occasionally. Continued use of the site after changes are published constitutes acceptance of the revised terms.',
  ),
]);

const ACCESSIBILITY = doc([
  p(
    'Intelligent Singularity aims to make this site usable by everyone, including people using assistive technology. We target WCAG 2.2 Level AA across all public pages and push toward AAA on text contrast wherever typography permits.',
  ),
  h('h2', 'What we commit to'),
  ul([
    'Semantic HTML for every page and component, with appropriate ARIA only when it clarifies intent.',
    'Keyboard support on every interactive element, visible focus outlines, and skip-to-content on every route.',
    'Colour contrast ratios of at least 7:1 for body text and 4.5:1 for small ancillary labels.',
    'Reduced motion respected automatically for all transitions and ambient animations.',
    'Form fields with associated labels, descriptive error states, and no placeholder-as-label patterns.',
    'Images limited to decorative use; meaningful illustrations ship with concise alternative text.',
  ]),
  h('h2', 'Automated and manual testing'),
  p(
    'Every pull request runs an axe-core accessibility scan in continuous integration. We also perform manual keyboard and screen-reader checks on major releases using NVDA, VoiceOver, and TalkBack.',
  ),
  h('h2', 'Known limitations'),
  p(
    'Some complex data visualisations on our product domains are still receiving accessible equivalents. This corporate site itself ships without any canvas or chart widgets and should be fully navigable.',
  ),
  h('h2', 'Report an issue'),
  p(
    'If you encounter a barrier on any page, write to accessibility@intelligentsingularityinc.com with the URL and a short description. We treat accessibility reports as bugs and respond within two business days.',
  ),
]);

const COOKIES = doc([
  p(
    'This site uses the absolute minimum set of cookies required to remember your language and keep the service running. No advertising, analytics, or tracking cookies are used.',
  ),
  h('h2', 'What we set'),
  h('h3', 'NEXT_LOCALE · First-party preference'),
  p(
    'Stores the ISO code of your selected language (for example "en", "ar", "zh-CN") so that future visits load in the language you picked. Contains no personal information. Expires after one year. SameSite=Lax.',
  ),
  h('h2', 'What we do not set'),
  ul([
    'No advertising cookies.',
    'No cross-site tracking cookies.',
    'No third-party analytics cookies.',
    'No social embed cookies.',
  ]),
  h('h2', 'How to clear'),
  p(
    'Every browser lets you delete cookies for a given domain from its privacy settings. Deleting NEXT_LOCALE has no effect on functionality beyond resetting the language to the site default on your next visit.',
  ),
  h('h2', 'Questions'),
  p('Write to legal@intelligentsingularityinc.com with any cookie questions.'),
]);

export const LEGAL_SEED = [
  { slug: 'privacy', title: 'Privacy Policy', body: PRIVACY, lastUpdated: '2026-04-17' },
  { slug: 'terms', title: 'Terms of Service', body: TERMS, lastUpdated: '2026-04-17' },
  { slug: 'accessibility', title: 'Accessibility Statement', body: ACCESSIBILITY, lastUpdated: '2026-04-17' },
  { slug: 'cookies', title: 'Cookie Policy', body: COOKIES, lastUpdated: '2026-04-17' },
];
