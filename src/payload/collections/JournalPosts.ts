import type { CollectionConfig } from 'payload';

function countWords(val: unknown): number {
  if (!val) return 0;
  const text = JSON.stringify(val).replace(/"[^"]*":/g, ' ');
  return (text.match(/[A-Za-z\u00C0-\uFFFF]+/g) ?? []).length;
}

const computeReadingTime = ({ data }: any) => {
  const words = countWords((data as any).body);
  const minutes = Math.max(1, Math.round(words / 225));
  return { ...(data as object), readingTime: minutes };
};

export const JournalPosts: CollectionConfig = {
  slug: 'journal-posts',
  admin: { useAsTitle: 'slug', defaultColumns: ['slug', 'status', 'publishedAt', 'readingTime'] },
  access: { read: () => true },
  hooks: { beforeChange: [computeReadingTime] },
  fields: [
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'title', type: 'text', required: true, localized: true },
    { name: 'subtitle', type: 'textarea', localized: true },
    { name: 'author', type: 'relationship', relationTo: 'users', required: true },
    { name: 'publishedAt', type: 'date', required: true },
    { name: 'updatedAt', type: 'date' },
    { name: 'readingTime', type: 'number' },
    { name: 'body', type: 'richText', required: true, localized: true },
    {
      name: 'sources',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'href', type: 'text', required: true },
      ],
    },
    { name: 'tags', type: 'array', fields: [{ name: 'tag', type: 'text', required: true }] },
    { name: 'coverImage', type: 'upload', relationTo: 'media' },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      options: ['draft', 'published', 'unlisted'],
      required: true,
    },
  ],
};
