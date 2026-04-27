import type { GlobalConfig } from 'payload';
import { revalidateGlobal } from '../hooks/revalidate.ts';

export const SecurityPage: GlobalConfig = {
  slug: 'security-page',
  access: { read: () => true },
  hooks: { afterChange: [revalidateGlobal('security-page')] },
  fields: [
    { name: 'eyebrow', type: 'text', required: true, localized: true, defaultValue: 'Security · Trust · Data' },
    { name: 'title', type: 'text', required: true, localized: true },
    { name: 'lede', type: 'textarea', required: true, localized: true },
    {
      name: 'postureSummary',
      type: 'group',
      fields: [
        { name: 'eyebrow', type: 'text', required: true, localized: true, defaultValue: 'Posture summary' },
        { name: 'heading', type: 'text', required: true, localized: true },
        { name: 'body', type: 'textarea', required: true, localized: true },
      ],
    },
    {
      name: 'topStats',
      type: 'array',
      minRows: 1,
      maxRows: 4,
      fields: [
        { name: 'label', type: 'text', required: true, localized: true },
        { name: 'value', type: 'text', required: true, localized: true },
        { name: 'hint', type: 'text', required: true, localized: true },
      ],
    },
    {
      name: 'posture',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'title', type: 'text', required: true, localized: true },
        { name: 'body', type: 'textarea', required: true, localized: true },
      ],
    },
    {
      name: 'dataHandling',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'title', type: 'text', required: true, localized: true },
        { name: 'body', type: 'textarea', required: true, localized: true },
      ],
    },
    {
      name: 'compliance',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'title', type: 'text', required: true, localized: true },
        { name: 'body', type: 'textarea', required: true, localized: true },
      ],
    },
    {
      name: 'reportCta',
      type: 'group',
      fields: [
        { name: 'eyebrow', type: 'text', required: true, localized: true, defaultValue: 'Report a vulnerability' },
        { name: 'heading', type: 'text', required: true, localized: true },
        { name: 'body', type: 'textarea', required: true, localized: true },
        { name: 'email', type: 'text', required: true },
      ],
    },
  ],
};
