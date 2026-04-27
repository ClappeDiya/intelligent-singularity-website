import type { GlobalConfig } from 'payload';
import { revalidateGlobal } from '../hooks/revalidate.ts';

export const CareersPage: GlobalConfig = {
  slug: 'careers-page',
  access: { read: () => true },
  hooks: { afterChange: [revalidateGlobal('careers-page')] },
  fields: [
    { name: 'eyebrow', type: 'text', required: true, localized: true, defaultValue: 'Careers · Join the studio' },
    { name: 'title', type: 'text', required: true, localized: true },
    { name: 'lede', type: 'textarea', required: true, localized: true },
    {
      name: 'howWeWork',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'title', type: 'text', required: true, localized: true },
        { name: 'body', type: 'textarea', required: true, localized: true },
      ],
    },
    {
      name: 'productFamily',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'name', type: 'text', required: true, localized: true },
        { name: 'line', type: 'text', required: true, localized: true },
      ],
    },
    {
      name: 'process',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'stage', type: 'text', required: true, localized: true },
        { name: 'what', type: 'textarea', required: true, localized: true },
      ],
    },
    {
      name: 'openings',
      type: 'group',
      fields: [
        { name: 'heading', type: 'text', required: true, localized: true, defaultValue: 'Currently hiring for…' },
        { name: 'currentlyHiringText', type: 'text', required: true, localized: true },
        { name: 'note', type: 'textarea', required: true, localized: true },
      ],
    },
    {
      name: 'introduceYourself',
      type: 'group',
      fields: [
        { name: 'eyebrow', type: 'text', required: true, localized: true, defaultValue: 'Introduce yourself anyway' },
        { name: 'heading', type: 'text', required: true, localized: true },
        { name: 'body', type: 'textarea', required: true, localized: true },
        { name: 'email', type: 'text', required: true },
      ],
    },
  ],
};
