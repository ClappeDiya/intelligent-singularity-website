import type { GlobalConfig } from 'payload';
import { revalidateGlobal } from '../hooks/revalidate.ts';

export const AboutPage: GlobalConfig = {
  slug: 'about-page',
  hooks: {
    afterChange: [revalidateGlobal('about')],
  },
  versions: { drafts: true },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    { name: 'lead', type: 'textarea', required: true, localized: true },
    { name: 'founderStory', type: 'richText', required: true, localized: true },
    { name: 'incorporationContext', type: 'textarea', required: true, localized: true },
    { name: 'leanOpsPhilosophy', type: 'richText', required: true, localized: true },
  ],
};
