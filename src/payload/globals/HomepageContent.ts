import type { GlobalConfig } from 'payload';

export const HomepageContent: GlobalConfig = {
  slug: 'homepage-content',
  fields: [
    { name: 'heroLabel', type: 'text', required: true, localized: true },
    { name: 'heroTagline', type: 'text', required: true, localized: true },
    { name: 'heroCtaPrimary', type: 'text', required: true, localized: true },
    { name: 'heroCtaSecondary', type: 'text', required: true, localized: true },
    { name: 'factsTitle', type: 'text', required: true, localized: true },
    { name: 'factsLead', type: 'textarea', required: true, localized: true },
    { name: 'flagshipsTitle', type: 'text', required: true, localized: true },
    { name: 'flagshipsLead', type: 'textarea', required: true, localized: true },
    { name: 'commitmentsTitle', type: 'text', required: true, localized: true },
    { name: 'commitmentsLead', type: 'textarea', required: true, localized: true },
    { name: 'seeAllPortfolioLine', type: 'text', required: true, localized: true },
  ],
};
