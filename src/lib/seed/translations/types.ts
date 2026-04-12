export type LocaleTranslation = {
  homepage: {
    heroLabel: string;
    heroTagline: string;
    heroCtaPrimary: string;
    heroCtaSecondary: string;
    factsTitle: string;
    factsLead: string;
    flagshipsTitle: string;
    flagshipsLead: string;
    commitmentsTitle: string;
    commitmentsLead: string;
    seeAllPortfolioLine: string;
  };
  siteSettings: {
    studioBlurb: string;
    footerSources: string;
    topBarStatusText: string;
  };
  manifesto: {
    title: string;
    lead: string;
    bodyText: string;
  };
  about: {
    title: string;
    lead: string;
    founderStoryText: string;
    incorporationContext: string;
    leanOpsPhilosophyText: string;
  };
  green: {
    title: string;
    lead: string;
    environmentalStanceText: string;
    hostingStoryText: string;
    futureGenerationPledgeText: string;
  };
  contact: {
    title: string;
    lead: string;
    privacyNote: string;
    successMessage: string;
    errorMessage: string;
  };
  commitments: Array<{ title: string; body: string }>;
  products: Array<{ slug: string; tagline: string; shortDescription: string }>;
  categories: Array<{ slug: string; name: string; description: string }>;
};
