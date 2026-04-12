import type { CollectionConfig } from 'payload';

export const CommitmentItems: CollectionConfig = {
  slug: 'commitment-items',
  admin: { useAsTitle: 'title', defaultColumns: ['number', 'title'] },
  access: { read: () => true },
  fields: [
    { name: 'number', type: 'number', required: true, unique: true },
    { name: 'title', type: 'text', required: true, localized: true },
    { name: 'body', type: 'textarea', required: true, localized: true },
  ],
};
