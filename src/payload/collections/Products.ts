import type { CollectionConfig } from 'payload';
import { revalidateCollection } from '../hooks/revalidate';

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'status', 'isFlagship', 'ordering'],
  },
  access: { read: () => true },
  hooks: {
    afterChange: [revalidateCollection('products')],
  },
  versions: { drafts: true },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    {
      name: 'publicName',
      type: 'text',
      admin: {
        description:
          'If the product is publicly known by a different name (e.g. ClapMove \u2192 "Joint Exercise"), enter it here. Otherwise leave blank.',
      },
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'product-categories',
      required: true,
    },
    { name: 'tagline', type: 'text', localized: true },
    { name: 'shortDescription', type: 'textarea', localized: true },
    { name: 'longDescription', type: 'richText', localized: true },
    { name: 'universalReachNote', type: 'textarea', localized: true },
    { name: 'outboundURL', type: 'text', required: true },
    {
      name: 'status',
      type: 'select',
      required: true,
      options: [
        { label: 'Production', value: 'production' },
        { label: 'Staging', value: 'staging' },
        { label: 'Awaiting approval', value: 'awaiting-approval' },
        { label: 'Infrastructure', value: 'infrastructure' },
      ],
      defaultValue: 'staging',
    },
    {
      name: 'isFlagship',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description:
          'Marks the 5 products shown on the homepage: Clappe, ClapBill, Clapwork, ClapDiet, ClapMove.',
      },
    },
    { name: 'launchDate', type: 'date' },
    { name: 'icon', type: 'upload', relationTo: 'media' },
    { name: 'ordering', type: 'number', required: true, defaultValue: 0 },
  ],
};
