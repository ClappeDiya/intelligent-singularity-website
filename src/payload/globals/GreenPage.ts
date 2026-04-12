import type { GlobalConfig } from 'payload';

export const GreenPage: GlobalConfig = {
  slug: 'green-page',
  versions: { drafts: true },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    { name: 'lead', type: 'textarea', required: true, localized: true },
    { name: 'environmentalStance', type: 'richText', required: true, localized: true },
    { name: 'hostingStory', type: 'richText', required: true, localized: true },
    { name: 'futureGenerationPledge', type: 'richText', required: true, localized: true },
    { name: 'hostingGreenRatio', type: 'number', required: true, defaultValue: 0.8, admin: {
      description: 'Used for carbon calculation. Update when Contabo DC mix is verified.',
    } },
  ],
};
