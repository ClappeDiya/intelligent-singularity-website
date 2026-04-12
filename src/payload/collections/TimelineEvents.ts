import type { CollectionConfig } from 'payload';

export const TimelineEvents: CollectionConfig = {
  slug: 'timeline-events',
  admin: { useAsTitle: 'title', defaultColumns: ['date', 'title'] },
  access: { read: () => true },
  fields: [
    { name: 'date', type: 'date', required: true },
    { name: 'title', type: 'text', required: true, localized: true },
    { name: 'description', type: 'textarea', localized: true },
    { name: 'media', type: 'upload', relationTo: 'media' },
  ],
};
