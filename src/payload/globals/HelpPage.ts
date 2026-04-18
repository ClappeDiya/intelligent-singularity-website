import type { GlobalConfig } from 'payload';

export const HelpPage: GlobalConfig = {
  slug: 'help-page',
  access: { read: () => true },
  fields: [
    { name: 'eyebrow', type: 'text', localized: true, defaultValue: 'HELP' },
    { name: 'title', type: 'text', required: true, localized: true },
    { name: 'lede', type: 'textarea', required: true, localized: true },
    {
      name: 'emergencyRow',
      type: 'group',
      fields: [
        { name: 'heading', type: 'text', required: true, localized: true },
        { name: 'body', type: 'textarea', required: true, localized: true },
        { name: 'href', type: 'text', required: true },
      ],
    },
    {
      name: 'routes',
      type: 'array',
      minRows: 4,
      maxRows: 6,
      fields: [
        { name: 'key', type: 'text', required: true },
        { name: 'heading', type: 'text', required: true, localized: true },
        { name: 'blurb', type: 'textarea', required: true, localized: true },
        {
          name: 'links',
          type: 'array',
          minRows: 1,
          fields: [
            { name: 'label', type: 'text', required: true, localized: true },
            { name: 'href', type: 'text', required: true },
            { name: 'external', type: 'checkbox', defaultValue: false },
          ],
        },
      ],
    },
    {
      name: 'popularQuestions',
      type: 'array',
      minRows: 0,
      maxRows: 3,
      fields: [
        { name: 'question', type: 'text', required: true, localized: true },
        { name: 'answer', type: 'textarea', required: true, localized: true },
      ],
    },
    {
      name: 'contactFallback',
      type: 'group',
      fields: [
        { name: 'heading', type: 'text', required: true, localized: true },
        { name: 'body', type: 'textarea', required: true, localized: true },
        { name: 'href', type: 'text', required: true },
      ],
    },
  ],
};
