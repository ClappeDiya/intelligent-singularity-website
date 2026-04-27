import type { GlobalConfig } from 'payload';
import { revalidateGlobal } from '../hooks/revalidate.ts';

export const PressPage: GlobalConfig = {
  slug: 'press-page',
  access: { read: () => true },
  hooks: { afterChange: [revalidateGlobal('press-page')] },
  fields: [
    { name: 'eyebrow', type: 'text', required: true, localized: true, defaultValue: 'Press · Media room' },
    { name: 'title', type: 'text', required: true, localized: true },
    { name: 'lede', type: 'textarea', required: true, localized: true },
    {
      name: 'factSheet',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'label', type: 'text', required: true, localized: true },
        { name: 'value', type: 'text', required: true, localized: true },
      ],
    },
    {
      name: 'quotes',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'text', type: 'textarea', required: true, localized: true },
        { name: 'who', type: 'text', required: true, localized: true },
        { name: 'role', type: 'text', required: true, localized: true },
      ],
    },
    {
      name: 'boilerplate',
      type: 'textarea',
      required: true,
      localized: true,
    },
    {
      name: 'storyAnglesYes',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'title', type: 'text', required: true, localized: true },
        { name: 'body', type: 'textarea', required: true, localized: true },
      ],
    },
    {
      name: 'storyAnglesNo',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'title', type: 'text', required: true, localized: true },
        { name: 'body', type: 'textarea', required: true, localized: true },
      ],
    },
    {
      name: 'brandGuidance',
      type: 'group',
      fields: [
        { name: 'brandName', type: 'textarea', required: true, localized: true },
        { name: 'founderReference', type: 'textarea', required: true, localized: true },
      ],
    },
    {
      name: 'contactCta',
      type: 'group',
      fields: [
        { name: 'eyebrow', type: 'text', required: true, localized: true, defaultValue: 'Direct contact' },
        { name: 'heading', type: 'text', required: true, localized: true },
        { name: 'body', type: 'textarea', required: true, localized: true },
        { name: 'email', type: 'text', required: true },
      ],
    },
  ],
};
