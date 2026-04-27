import type { Payload } from 'payload';

export const PRESS_PAGE_SEED = {
  eyebrow: 'Press · Media room',
  title: 'Write something true about us.',
  lede:
    'Everything here is approved to publish. Please credit us. Need more? Email press@intelligentsingularityinc.com. A human replies within one work day.',
  factSheet: [
    { label: 'Legal entity', value: 'Intelligent Singularity Inc.' },
    { label: 'Founded', value: '2024 · Alberta, Canada' },
    { label: 'Founder', value: 'Dr. Md Diya, MD' },
    { label: 'Founder background', value: '34 years of cross-continental medical practice' },
    { label: 'Structure', value: 'Parent company of the Clap ecosystem' },
    { label: 'Team', value: 'Small, remote, AI-augmented' },
    { label: 'Funding', value: 'Bootstrapped · self-funded · not for sale' },
    { label: 'Portfolio', value: 'A growing family of platforms across 7 categories' },
    { label: 'Languages', value: '14 shipping locales · over 4 billion first-language speakers' },
    { label: 'Stack', value: 'One shared platform across every product' },
    { label: 'Website footprint', value: 'Under 50 KB per page · zero third-party calls' },
    { label: 'Hosting', value: 'Single VPS in Edmonton, Alberta · no third-party CDN' },
  ],
  quotes: [
    {
      text: 'Great software is not a luxury good. It is a basic right for every business and every person doing honest work anywhere in the world.',
      who: 'Dr. Md Diya',
      role: 'Founder, Intelligent Singularity',
    },
    {
      text: 'A child in Oslo and a child in rural Malawi should reach for the same software. That is not an aspiration. It is the constraint every product ships against.',
      who: 'Intelligent Singularity',
      role: 'Studio Manifesto · 2026',
    },
    {
      text: 'Two-point-two billion people are still offline today. Ninety-six percent of them live in low- and middle-income countries. We do not measure success by how much we sell to the most-served customer; we measure it by whether the least-served person on Earth can use the same product, in their language, on their device, on the connection they actually have.',
      who: 'Dr. Md Diya',
      role: 'Founder, Intelligent Singularity',
    },
    {
      text: 'The savings from running a small AI-augmented team do not pay for bigger offices or louder launches. They pay for the free tier that lets a one-person business run real operations without a credit card.',
      who: 'Intelligent Singularity',
      role: 'About page · 2026',
    },
  ],
  boilerplate:
    'Intelligent Singularity Inc. is a parent company and software studio. It was set up in Alberta, Canada in 2024. It is the parent of the Clap ecosystem. The Clap ecosystem is a growing family of platforms. It covers business, health, finance, work, agriculture, creative media, and shared infrastructure. The team is small, fully remote, and AI-augmented. Every product is built for universal access. The same flagship product serves customers in both developed and developing markets. The company is bootstrapped and not for sale.',
  storyAnglesYes: [
    {
      title: 'Universal access in practice',
      body: 'How a single product is built to serve a Fortune 500 buyer and a one-person market stall on the same engine, without "lite" versions for emerging markets. Concrete examples, real workflows, screen recordings on request.',
    },
    {
      title: 'AI-augmented small teams',
      body: 'How a parent company with more than a dozen platforms ships at scale on a small remote team, and what the AI-agent fabric actually does (vs. the marketing version). Honest numbers, not vanity metrics.',
    },
    {
      title: 'The economics of a free tier',
      body: 'Why our free tier is structurally engineered, not a sales funnel. How regional pricing works in practice. What we charge enterprise customers and why the dollar amount is published, not negotiated.',
    },
    {
      title: 'Healthcare software for every clinic',
      body: 'ClapMed is an agentic Electronic Medical Record. We can explain what "agentic" means in plain words. We can show how the same engine serves a private clinic in Zürich and a rural health post. We can talk about the regulatory path. We can tell you what is live today.',
    },
    {
      title: 'Building for the offline 2.2 billion',
      body: 'The ITU 2025 numbers. What they mean for how we design products. How a 50 KB-per-page corporate site links to a wider universal-access practice across the portfolio.',
    },
  ],
  storyAnglesNo: [
    {
      title: 'Hype features without working software',
      body: 'We will not pre-announce features that are not in production. If a capability is on the roadmap, we will say so honestly and link to the public roadmap entry — but we will not pretend something ships when it does not.',
    },
    {
      title: '"Disruptor versus incumbent" framing',
      body: 'We do not name competitors in marketing or press, and we will not be quoted criticising other companies. The interesting story is what we are building, not who we are supposedly beating.',
    },
    {
      title: 'Hot-takes on regulation, politics, or current events',
      body: 'We are a software company. We will speak in detail about access, accessibility, privacy, and the digital divide. We do not provide quotes on unrelated political or cultural news cycles.',
    },
  ],
  brandGuidance: {
    brandName:
      'Write Intelligent Singularity on first use. Then write the studio. The legal name is Intelligent Singularity Inc. Based in Alberta, Canada.',
    founderReference:
      'Dr. Md Diya on first reference, Diya thereafter. Pronouns: he/him. Photos and a short bio are available on request.',
  },
  contactCta: {
    eyebrow: 'Direct contact',
    heading: 'Need a quote, background, or founder interview?',
    body: 'Email press@intelligentsingularityinc.com with your deadline. A human reads every note. We reply in one work day.',
    email: 'press@intelligentsingularityinc.com',
  },
};

export async function seedPressPage(payload: Payload, log: string[]): Promise<void> {
  await payload.updateGlobal({ slug: 'press-page', data: PRESS_PAGE_SEED as any });
  log.push('press-page: updated');
}
