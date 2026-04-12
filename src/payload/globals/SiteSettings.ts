import type { GlobalConfig } from 'payload';

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  fields: [
    { name: 'companyName', type: 'text', required: true, defaultValue: 'Intelligent Singularity' },
    { name: 'studioBlurb', type: 'textarea', required: true, localized: true },
    { name: 'footerSources', type: 'textarea', localized: true },
    { name: 'topBarStatusText', type: 'text', localized: true },
  ],
};
