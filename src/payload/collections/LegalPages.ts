import type { CollectionConfig } from 'payload';

export const LegalPages: CollectionConfig = {
  slug: 'legal-pages',
  admin: { useAsTitle: 'title', defaultColumns: ['slug', 'title', 'lastUpdated'] },
  access: { read: () => true },
  versions: { drafts: true },
  fields: [
    {
      name: 'slug',
      type: 'select',
      required: true,
      unique: true,
      options: [
        { label: 'Privacy', value: 'privacy' },
        { label: 'Terms', value: 'terms' },
        { label: 'Accessibility', value: 'accessibility' },
        { label: 'Cookies', value: 'cookies' },
      ],
    },
    { name: 'title', type: 'text', required: true },
    { name: 'body', type: 'richText', required: true },
    { name: 'lastUpdated', type: 'date', required: true },
  ],
};
