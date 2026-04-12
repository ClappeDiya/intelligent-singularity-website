import type { GlobalConfig } from 'payload';
import { revalidateGlobal } from '../hooks/revalidate';

export const ContactPage: GlobalConfig = {
  slug: 'contact-page',
  hooks: {
    afterChange: [revalidateGlobal('contact')],
  },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    { name: 'lead', type: 'textarea', required: true, localized: true },
    { name: 'privacyNote', type: 'textarea', required: true, localized: true },
    { name: 'successMessage', type: 'text', required: true, localized: true },
    { name: 'errorMessage', type: 'text', required: true, localized: true },
  ],
};
