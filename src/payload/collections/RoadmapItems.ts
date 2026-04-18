import type { CollectionConfig } from 'payload';

export const RoadmapItems: CollectionConfig = {
  slug: 'roadmap-items',
  admin: { useAsTitle: 'slug', defaultColumns: ['slug', 'status', 'category', 'ordering'] },
  access: { read: () => true },
  fields: [
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'title', type: 'text', required: true, localized: true },
    { name: 'summary', type: 'textarea', required: true, localized: true },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: ['website', 'products', 'infra', 'accessibility', 'green'],
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'planned',
      options: ['planned', 'in-progress', 'shipped', 'paused', 'cancelled'],
    },
    { name: 'targetQuarter', type: 'text' },
    { name: 'shippedAt', type: 'date' },
    { name: 'gitRefs', type: 'array', fields: [{ name: 'ref', type: 'text', required: true }] },
    { name: 'ordering', type: 'number', required: true, defaultValue: 0 },
    { name: 'whyItMatters', type: 'textarea', localized: true },
  ],
};
