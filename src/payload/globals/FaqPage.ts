import type { GlobalConfig } from 'payload';
import { revalidateGlobal } from '../hooks/revalidate.ts';

export const FaqPage: GlobalConfig = {
  slug: 'faq-page',
  access: { read: () => true },
  hooks: { afterChange: [revalidateGlobal('faq-page')] },
  fields: [
    { name: 'eyebrow', type: 'text', required: true, localized: true, defaultValue: 'FAQ · Plain answers' },
    { name: 'title', type: 'text', required: true, localized: true },
    { name: 'lede', type: 'textarea', required: true, localized: true },
    {
      name: 'sections',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'title', type: 'text', required: true, localized: true },
        {
          name: 'items',
          type: 'array',
          minRows: 1,
          fields: [
            { name: 'q', type: 'text', required: true, localized: true },
            { name: 'a', type: 'textarea', required: true, localized: true },
          ],
        },
      ],
    },
    {
      name: 'stillStuckCta',
      type: 'group',
      fields: [
        { name: 'eyebrow', type: 'text', required: true, localized: true, defaultValue: 'Still have a question?' },
        { name: 'heading', type: 'text', required: true, localized: true },
        { name: 'body', type: 'textarea', required: true, localized: true },
        { name: 'email', type: 'text', required: true },
      ],
    },
  ],
};
