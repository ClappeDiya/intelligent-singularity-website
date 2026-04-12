export const HOMEPAGE_SEED = {
  heroLabel: 'People still offline, worldwide',
  heroTagline: 'We exist until this number is zero.',
  heroCtaPrimary: 'Read the manifesto \u2192',
  heroCtaSecondary: 'Meet the studio',
  factsTitle: 'The digital divide isn\u2019t abstract. It is measurable, and it is cruel.',
  factsLead: 'The United Nations\u2019 International Telecommunication Union publishes connectivity data every year. Here is what the 2025 report says about the world right now.',
  flagshipsTitle: 'A studio for universal access. Five flagships and counting.',
  flagshipsLead: 'Built under one mission, on one shared stack, by one small AI-augmented team. These are the five tools every person can pick up today \u2014 work, earn, eat, move. Eighteen more ship beside them.',
  commitmentsTitle: 'A child in Oslo and a child in rural Malawi use the same software.',
  commitmentsLead: 'These are not aspirations. They are engineering constraints. Every product ships against this list or it does not ship.',
  seeAllPortfolioLine: 'Plus 18 more tools \u2014 healthcare, finance, creative work, agriculture, communications, and infrastructure.',
};

export const SITE_SETTINGS_SEED = {
  companyName: 'Intelligent Singularity',
  studioBlurb: 'A studio building software for universal access. Incorporated in Alberta, Canada. Merging human knowledge with artificial intelligence to deliver tools for every person and every business \u2014 online or offline.',
  footerSources: 'Data: ITU Facts and Figures 2025 \u00b7 Report authority: International Telecommunication Union (UN)',
  topBarStatusText: '14 languages',
};

export const MANIFESTO_SEED = {
  title: 'Our Manifesto',
  lead: 'Every business deserves great software. Every person deserves great tools. Not as a reward for reaching 500 employees \u2014 as a basic right.',
  body: {
    root: {
      type: 'root',
      children: [
        { type: 'paragraph', version: 1, direction: 'ltr', format: '', indent: 0, children: [
          { type: 'text', version: 1, text: 'For decades, enterprise-grade software has been locked behind six-figure price tags, six-month implementations, and six-layer consulting engagements \u2014 affordable only to Fortune 500s. Intelligent Singularity rejects this. Great software is not a luxury good. It is a basic right for every business and every person doing honest work anywhere in the world.' },
        ] },
      ],
      direction: 'ltr', format: '', indent: 0, version: 1,
    },
  },
  sources: [
    { label: 'ITU Facts and Figures 2025', url: 'https://www.itu.int/itu-d/reports/statistics/facts-figures-2025/' },
    { label: 'ITU 2025 press release', url: 'https://www.itu.int/en/mediacentre/Pages/PR-2025-11-17-Facts-and-Figures.aspx' },
  ],
};

export const ABOUT_SEED = {
  title: 'About Intelligent Singularity',
  lead: 'A small, AI-augmented remote team building software for universal access, incorporated in Alberta in 2024.',
  founderStory: {
    root: { type: 'root', children: [{ type: 'paragraph', version: 1, direction: 'ltr', format: '', indent: 0, children: [{ type: 'text', version: 1, text: 'Dr. Md Diya founded Intelligent Singularity Inc. in 2024 after 34 years of global medical practice across multiple continents. The mission: close the software access gap for every person, every business, every region \u2014 online or offline.' }] }], direction: 'ltr', format: '', indent: 0, version: 1 },
  },
  incorporationContext: 'Incorporated 2024 in Alberta, Canada. A studio, not a venture-backed startup. Self-funded, bootstrapped, AI-augmented operations from day one.',
  leanOpsPhilosophy: {
    root: { type: 'root', children: [{ type: 'paragraph', version: 1, direction: 'ltr', format: '', indent: 0, children: [{ type: 'text', version: 1, text: 'One small team. One shared stack. One shared infrastructure layer. Twenty-three tools shipping under one mission. The savings from lean operations fund real democratization, not executive salaries.' }] }], direction: 'ltr', format: '', indent: 0, version: 1 },
  },
};

export const GREEN_SEED = {
  title: 'Our Green Pledge',
  lead: 'This website is the smallest example of what we build. Measured live, below.',
  environmentalStance: {
    root: { type: 'root', children: [{ type: 'paragraph', version: 1, direction: 'ltr', format: '', indent: 0, children: [{ type: 'text', version: 1, text: 'Every page on this site weighs less than 50 KB on first paint. Every visit is measured in grams of CO\u2082 and shown to you, honestly, in the top status bar. We host on renewable energy. We use zero third-party trackers. We are radically transparent about what we emit, because the next generation is watching.' }] }], direction: 'ltr', format: '', indent: 0, version: 1 },
  },
  hostingStory: {
    root: { type: 'root', children: [{ type: 'paragraph', version: 1, direction: 'ltr', format: '', indent: 0, children: [{ type: 'text', version: 1, text: 'Hosted on a single Contabo Cloud VPS in US Central. No CDN. No third parties. One origin, hardened with CrowdSec, Traefik, and Let\u2019s Encrypt.' }] }], direction: 'ltr', format: '', indent: 0, version: 1 },
  },
  futureGenerationPledge: {
    root: { type: 'root', children: [{ type: 'paragraph', version: 1, direction: 'ltr', format: '', indent: 0, children: [{ type: 'text', version: 1, text: 'Everything we build must serve the generations that follow. That is the constraint we hold ourselves to, forever.' }] }], direction: 'ltr', format: '', indent: 0, version: 1 },
  },
  hostingGreenRatio: 0.8,
};

export const CONTACT_SEED = {
  title: 'Get in touch',
  lead: 'Questions, partnership ideas, press inquiries, or legal matters \u2014 we read every message.',
  privacyNote: 'We store no contact-form data in our database. Your message is delivered by email only.',
  successMessage: 'Message sent. Thank you.',
  errorMessage: 'Something went wrong. Please try again.',
};
