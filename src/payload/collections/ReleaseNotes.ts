import type { CollectionConfig } from 'payload';

export const ReleaseNotes: CollectionConfig = {
  slug: 'release-notes',
  admin: { useAsTitle: 'version', defaultColumns: ['version', 'releaseDate', 'status'] },
  access: { read: () => true },
  fields: [
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'version', type: 'text', required: true },
    { name: 'releaseDate', type: 'date', required: true },
    { name: 'gitTag', type: 'text', required: true },
    { name: 'gitSha', type: 'text', required: true, minLength: 7, maxLength: 40 },
    { name: 'title', type: 'text', required: true, localized: true },
    { name: 'summary', type: 'textarea', localized: true },
    {
      name: 'changes',
      type: 'array',
      localized: true,
      fields: [
        {
          name: 'type',
          type: 'select',
          required: true,
          options: ['added', 'changed', 'fixed', 'removed', 'security'],
        },
        { name: 'entry', type: 'text', required: true },
      ],
    },
    { name: 'authors', type: 'array', fields: [{ name: 'username', type: 'text', required: true }] },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      options: ['draft', 'published'],
      required: true,
    },
    { name: 'ordering', type: 'number', defaultValue: 0 },
  ],
};
