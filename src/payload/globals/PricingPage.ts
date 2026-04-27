import type { GlobalConfig } from 'payload';
import { revalidateGlobal } from '../hooks/revalidate.ts';

export const PricingPage: GlobalConfig = {
  slug: 'pricing-page',
  access: { read: () => true },
  hooks: { afterChange: [revalidateGlobal('pricing-page')] },
  fields: [
    { name: 'eyebrow', type: 'text', required: true, localized: true, defaultValue: 'Pricing · Our six rules' },
    { name: 'title', type: 'text', required: true, localized: true },
    { name: 'lede', type: 'textarea', required: true, localized: true },
    {
      name: 'whyThisExists',
      type: 'group',
      fields: [
        { name: 'eyebrow', type: 'text', required: true, localized: true, defaultValue: 'Why this exists' },
        { name: 'heading', type: 'text', required: true, localized: true },
        { name: 'body', type: 'textarea', required: true, localized: true },
        { name: 'freeTierLine', type: 'text', required: true, localized: true },
        { name: 'paidTierLine', type: 'text', required: true, localized: true },
        { name: 'enterpriseLine', type: 'text', required: true, localized: true },
      ],
    },
    {
      name: 'principles',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'title', type: 'text', required: true, localized: true },
        { name: 'body', type: 'textarea', required: true, localized: true },
      ],
    },
    {
      name: 'antiPatterns',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'title', type: 'text', required: true, localized: true },
        { name: 'body', type: 'textarea', required: true, localized: true },
      ],
    },
    {
      name: 'workedExample',
      type: 'array',
      minRows: 1,
      maxRows: 4,
      fields: [
        { name: 'who', type: 'text', required: true, localized: true },
        { name: 'tier', type: 'text', required: true, localized: true },
        { name: 'what', type: 'textarea', required: true, localized: true },
        { name: 'note', type: 'text', required: true, localized: true },
      ],
    },
    {
      name: 'seePricesCta',
      type: 'group',
      fields: [
        { name: 'eyebrow', type: 'text', required: true, localized: true, defaultValue: 'See actual prices' },
        { name: 'heading', type: 'text', required: true, localized: true },
        { name: 'body', type: 'textarea', required: true, localized: true },
      ],
    },
  ],
};
