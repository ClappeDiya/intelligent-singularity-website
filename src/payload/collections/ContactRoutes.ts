import type { CollectionConfig } from 'payload';

export const ContactRoutes: CollectionConfig = {
  slug: 'contact-routes',
  admin: { useAsTitle: 'label', defaultColumns: ['slug', 'label'] },
  access: { read: () => true },
  fields: [
    {
      name: 'slug',
      type: 'select',
      required: true,
      unique: true,
      options: [
        { label: 'General', value: 'general' },
        { label: 'Press', value: 'press' },
        { label: 'Partnerships', value: 'partnerships' },
        { label: 'Legal', value: 'legal' },
      ],
    },
    { name: 'label', type: 'text', required: true, localized: true },
    {
      name: 'forwardTo',
      type: 'email',
      required: true,
      admin: {
        description:
          'This email is never rendered publicly \u2014 used only as the SMTP recipient.',
      },
    },
  ],
};
