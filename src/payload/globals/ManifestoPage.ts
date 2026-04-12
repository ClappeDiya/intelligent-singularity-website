import type { GlobalConfig } from 'payload';
import { revalidateGlobal } from '../hooks/revalidate';

export const ManifestoPage: GlobalConfig = {
  slug: 'manifesto-page',
  hooks: {
    afterChange: [revalidateGlobal('manifesto')],
  },
  versions: { drafts: true },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    { name: 'lead', type: 'textarea', required: true, localized: true },
    { name: 'body', type: 'richText', required: true, localized: true },
    { name: 'sources', type: 'array', localized: true, fields: [
      { name: 'label', type: 'text', required: true },
      { name: 'url', type: 'text', required: true },
    ] },
  ],
};
