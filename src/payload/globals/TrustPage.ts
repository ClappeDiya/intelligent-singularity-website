import type { GlobalConfig } from 'payload';

export const TrustPage: GlobalConfig = {
  slug: 'trust-page',
  access: { read: () => true },
  fields: [
    { name: 'eyebrow', type: 'text', localized: true, defaultValue: 'TRUST' },
    { name: 'title', type: 'text', required: true, localized: true },
    { name: 'lede', type: 'textarea', required: true, localized: true },
    {
      name: 'pillars',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'id',
          type: 'select',
          required: true,
          options: ['security', 'privacy', 'sustainability', 'accessibility', 'finance'],
        },
        { name: 'heading', type: 'text', required: true, localized: true },
        { name: 'blurb', type: 'textarea', required: true, localized: true },
        { name: 'href', type: 'text', required: true },
        {
          name: 'proof',
          type: 'array',
          fields: [
            { name: 'label', type: 'text', required: true, localized: true },
            { name: 'value', type: 'text', required: true },
            { name: 'href', type: 'text' },
          ],
        },
      ],
    },
    {
      name: 'certifications',
      type: 'array',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'issuer', type: 'text', required: true },
        { name: 'issuedAt', type: 'date', required: true },
        { name: 'evidenceURL', type: 'text', required: true },
      ],
    },
    { name: 'dataResidency', type: 'richText', localized: true },
    {
      name: 'subprocessors',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'purpose', type: 'text', required: true, localized: true },
        { name: 'dataAccessed', type: 'text', localized: true },
        { name: 'location', type: 'text', required: true },
        { name: 'href', type: 'text' },
      ],
    },
    { name: 'reportIncident', type: 'richText', localized: true },
    { name: 'lastReviewedAt', type: 'date' },
  ],
};
