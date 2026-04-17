import type { GlobalConfig } from 'payload';

export const StatusPage: GlobalConfig = {
  slug: 'status-page',
  access: { read: () => true },
  fields: [
    { name: 'kumaBaseUrl', type: 'text', required: true, defaultValue: 'https://status.intelligentsingularityinc.com' },
    { name: 'kumaSlug', type: 'text', required: true, defaultValue: 'is' },
    { name: 'eyebrow', type: 'text', localized: true, defaultValue: 'STATUS' },
    { name: 'title', type: 'text', required: true, localized: true },
    { name: 'lede', type: 'textarea', required: true, localized: true },
    {
      name: 'groups',
      type: 'array',
      fields: [
        { name: 'heading', type: 'text', required: true, localized: true },
        { name: 'monitorIds', type: 'array', fields: [{ name: 'id', type: 'text', required: true }] },
      ],
    },
    { name: 'operationalCopy', type: 'textarea', localized: true },
  ],
};
