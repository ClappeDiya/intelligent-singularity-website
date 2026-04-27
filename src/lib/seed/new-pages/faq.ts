import type { Payload } from 'payload';

export const FAQ_PAGE_SEED = {
  eyebrow: 'FAQ · Plain answers',
  title: 'Questions, answered plainly.',
  lede:
    'What people actually ask us — about the studio, the products, and the privacy trade-offs of using our tools.',
  sections: [
    {
      title: 'The studio',
      items: [
        {
          q: 'What is Intelligent Singularity?',
          a: 'Intelligent Singularity Inc. is the parent company of the Clap ecosystem. We are a small, AI-augmented, fully remote studio. We are based in Alberta, Canada. We build software for universal access. The same flagship product serves a Fortune 500 buyer in New York and a one-person market stall in Lagos. One shared stack. One mission.',
        },
        {
          q: 'Are you a venture-backed startup?',
          a: 'No. We are self-funded and bootstrapped. That means we answer to users, not to investors chasing quick exits. We take longer to ship, and we plan to be around in twenty years. The company is not for sale.',
        },
        {
          q: 'Who is behind this?',
          a: 'Dr. Md Diya founded the studio in 2024 after thirty-four years of cross-continental medical practice. A small, remote, AI-augmented team ships each product under one shared stack and one shared accessibility budget.',
        },
        {
          q: 'How do you make money if your apps are affordable?',
          a: 'Products have a free-forever tier that runs a real business. Paid tiers add scale, never features. Pricing is adjusted for purchasing power so a plan that costs twenty dollars in Toronto costs less in Lagos. Developed-world and enterprise customers pay full market price; emerging-market and solo customers pay a price that respects their currency. The math works because we run lean and let the AI-agent fabric carry leverage.',
        },
        {
          q: 'Why "parent company" — is this a holding structure?',
          a: 'It is a parent company in the plain sense. One legal entity owns the family of platforms. The list: Clappe, ClapBill, ClapMed, ClapDiet, ClapPay, Clapwork, Apogee, Audiflo, Nestbitt, DailyWorship, Gclap, FileManager, plus shared infrastructure. Each product runs on its own site. Each has its own terms and prices. The legal owner is Intelligent Singularity Inc.',
        },
        {
          q: 'How big is the team?',
          a: 'Small enough that a new hire learns every face in week one, large enough to keep more than a dozen platforms shipping. The exact headcount is in the press fact sheet on /press. We deliberately do not advertise a size race; the AI-agent fabric is part of the team in a real sense.',
        },
      ],
    },
    {
      title: 'The products',
      items: [
        {
          q: 'Are these products real or still ideas?',
          a: 'Every product on the portfolio page has an honest status label. "Live" means you can sign up today. "Staging" means it runs but is invite-only while we harden it. "Awaiting approval" is ready but waiting on a regulator. "Infrastructure" is code we share publicly that other products rely on. We do not pre-announce things that do not exist yet.',
        },
        {
          q: 'Why are some products listed as staging?',
          a: 'Most of our tools are still being hardened before public launch. We would rather ship late than break trust on day one — especially in healthcare, payments, and trading where a regression is a real-world incident, not an inconvenience. If you want early access, write to us from the contact page and we will tell you honestly whether the staging build can support you yet.',
        },
        {
          q: 'Why do products link out to other domains?',
          a: 'Each product is its own service with its own terms, pricing, sign-up, and privacy notice. Sending you directly to the product domain is faster, and it makes the boundaries clear: clappe.com is governed by Clappe’s terms, clappay.com by ClapPay’s, and so on. The corporate site at intelligentsingularityinc.com is the front door, not a billing system.',
        },
        {
          q: 'Can I use your products offline?',
          a: 'Yes. Every product is designed to work on slow and intermittent networks. We target a five-year-old phone on two-bar 2G as a baseline, not as a nice-to-have. Pages weigh under fifty kilobytes on first paint, gzipped. Critical workflows (writing an invoice, recording a patient note, capturing a job) work without a connection and sync when one returns.',
        },
        {
          q: 'Do products share an account?',
          a: 'Optionally. A single Clap account can sign in to any product that opts in, but each product still keeps its own data, its own subscription, and its own consent flow. You can use one product without the others, switch to another, or delete one without affecting the rest.',
        },
        {
          q: 'Do you build custom features for individual customers?',
          a: 'Rarely, and only when the feature is a fair fit for the wider user base. We will not build a private fork of a product for one customer; that path leads to a maintenance graveyard. We will, however, prioritise a roadmap item if a credible partner sponsors it and the result lands as a public feature for everyone.',
        },
      ],
    },
    {
      title: 'Pricing and money',
      items: [
        {
          q: 'Why is your pricing different in different countries?',
          a: 'Because a flat global price would silently exclude most of the planet. We use published purchasing-power indices from the World Bank to set fair regional prices. The customer in Frankfurt pays full market rate. The customer in Lagos pays a rate that respects naira. The features and product quality are identical.',
        },
        {
          q: 'Is the free tier really free, or is it a trial?',
          a: 'Really free. Free-forever, no countdown, no advertising, no feature crippling, no data-export tax. If a one-person business in Lagos can run their real operations on the free tier, the free tier is doing its job.',
        },
        {
          q: 'Will you do an enterprise quote?',
          a: 'No quotes. Every price is published in every currency we serve. If your procurement team needs an MSA, a DPA, or invoiced billing, those are paperwork — not pricing. The dollar number on the published page is the dollar number on the invoice, multiplied by the seats you bought.',
        },
      ],
    },
    {
      title: 'Privacy and data',
      items: [
        {
          q: 'Do you track me on this website?',
          a: 'No. This site has zero analytics, zero pixels, zero tracking cookies, zero advertising networks, and zero content from third parties. The only data we see is what you type into the contact form and hit send on. A continuous-integration script called no-third-party.mjs blocks the release if any external host appears in the bundle.',
        },
        {
          q: 'Where is my data stored?',
          a: 'When you contact us, your message is sent by email to a self-hosted inbox in Alberta, Canada. We do not store it in a database on this site. Product-specific data (when you sign up for one of our tools) is described in that product’s own privacy policy on its own domain.',
        },
        {
          q: 'Can I delete data you hold about me?',
          a: 'Yes. Email legal@intelligentsingularityinc.com from the address you used. We confirm receipt in three business days. We finish the deletion within thirty days. The same right applies to every product, under PIPEDA and GDPR-equivalent rules.',
        },
        {
          q: 'Do you train AI models on my content?',
          a: 'No. AI features across our portfolio use only data you explicitly submit, scoped to your own account. Your private content is never blended into a shared training set, never used to improve a public model, and never sent to a third-party AI provider that retains your prompts.',
        },
      ],
    },
    {
      title: 'Languages and accessibility',
      items: [
        {
          q: 'How many languages does the site support?',
          a: 'Fourteen on day one. The list: English, Simplified Chinese, Spanish, Hindi, Arabic, French, Portuguese, Bengali, Russian, Urdu, Indonesian, Swahili, Yorùbá, and Hausa. Each one ships with a font that covers its full script. No fallback letters mid-word. Right-to-left languages render in proper RTL layout. Not mirrored Latin.',
        },
        {
          q: 'How accessible is the site?',
          a: 'We target WCAG 2.2 Level AA on every public page. An axe-core check fails the build on any violation. Body text meets at least 7:1 contrast. Small labels meet at least 4.5:1. Every interactive element works from the keyboard. We honour reduced-motion settings. The full statement lives at /legal/accessibility.',
        },
        {
          q: 'Will you add my language?',
          a: 'If your language is widely spoken and not yet on the list, write to us. Adding a new locale is a real piece of work — fonts, translations, RTL/LTR layout, cultural review — but it is the kind of work we want to do.',
        },
      ],
    },
    {
      title: 'Partnerships and press',
      items: [
        {
          q: 'How do I partner with the studio?',
          a: 'We work with NGOs, governments, and companies. The shared goal is universal-access software for people who cannot usually afford it. Send a short note from the contact page. Route it to Partnerships. You will hear back within two business days.',
        },
        {
          q: 'Where can I find a press kit?',
          a: 'Visit /press for the fact sheet, the approved quotes, the brand guidance, the founder reference, and the press boilerplate. Need a logo file, a high-res founder portrait, or a custom statement? Email press@intelligentsingularityinc.com with your deadline.',
        },
        {
          q: 'Do you speak at conferences?',
          a: 'Sometimes. We talk about universal access, AI-augmented teams, healthcare software, and lean software economics. Write to press@intelligentsingularityinc.com with the event details and the audience size. We tell you honestly whether we can show up.',
        },
        {
          q: 'Do you take donations or grants?',
          a: 'We do not ask users for donations. We do welcome grants. Grants must come from foundations or banks. The grant must be tied to access software in markets where full prices do not yet work. Email partners@intelligentsingularityinc.com.',
        },
      ],
    },
    {
      title: 'Hiring',
      items: [
        {
          q: 'Are you hiring?',
          a: 'Sometimes. The /careers page lists current open roles. When nothing is listed, we are not hiring at that moment, full stop. We do not run an evergreen "send us your CV" funnel that goes nowhere — but a thoughtful introduction always gets a real reply.',
        },
        {
          q: 'Is the team really fully remote?',
          a: 'Yes. We are remote because it is the right model for the work, not because it is trendy. Time zones are respected. Most decisions live in writing so they survive the people who made them.',
        },
        {
          q: 'Do you publish salary bands?',
          a: 'Yes, on every open role. We do not negotiate against people who guess the band; we publish it and pay it. Equity is not on the table because the company is not for sale.',
        },
      ],
    },
  ],
  stillStuckCta: {
    eyebrow: 'Still have a question?',
    heading: 'A human reads every message.',
    body: 'We usually reply within two business days. Send a note through the form. Or write to hello@intelligentsingularityinc.com.',
    email: 'hello@intelligentsingularityinc.com',
  },
};

export async function seedFaqPage(payload: Payload, log: string[]): Promise<void> {
  await payload.updateGlobal({ slug: 'faq-page', data: FAQ_PAGE_SEED as any });
  log.push('faq-page: updated');
}
