import type { GlobalConfig } from 'payload';
import { revalidateGlobal } from '../hooks/revalidate.ts';

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  hooks: {
    afterChange: [revalidateGlobal('site-settings')],
  },
  fields: [
    { name: 'companyName', type: 'text', required: true, defaultValue: 'Intelligent Singularity' },
    { name: 'studioBlurb', type: 'textarea', required: true, localized: true },
    { name: 'footerSources', type: 'textarea', localized: true },
    { name: 'topBarStatusText', type: 'text', localized: true },
  ],
};
