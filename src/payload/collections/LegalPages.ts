import type { CollectionConfig } from 'payload';
import { revalidateCollection } from '../hooks/revalidate.ts';

export const LegalPages: CollectionConfig = {
  slug: 'legal-pages',
  admin: { useAsTitle: 'title', defaultColumns: ['slug', 'title', 'lastUpdated'] },
  access: { read: () => true },
  hooks: {
    afterChange: [revalidateCollection('legal')],
  },
  versions: { drafts: true },
  fields: [
    {
      name: 'slug',
      type: 'select',
      required: true,
      unique: true,
      options: [
        { label: 'Privacy', value: 'privacy' },
        { label: 'Terms', value: 'terms' },
        { label: 'Accessibility', value: 'accessibility' },
        { label: 'Cookies', value: 'cookies' },
      ],
    },
    // TODO (i18n product decision, surfaced by CMS-leakage scanner Cycle 40-46):
    // title + body are NOT localized. Privacy/Terms/Accessibility/Cookies are
    // therefore served in English to every locale. Two paths to resolve:
    //   (a) Intentional — document the decision (e.g. "legal copy stays in EN
    //       for regulatory clarity; translations are advisory and out of scope")
    //       and remove this TODO.
    //   (b) Gap — add `localized: true` to title + body, write a forward
    //       migration moving EN data to per-locale rows, and seed translations
    //       for all 13 non-EN locales. Mirrors the journal-posts hybrid pattern.
    // The scanner allowlist mechanism (FALLBACK_PATH_ALLOWLIST + EMPTY_PATH_ALLOWLIST)
    // is in place to absorb the new findings while (b)'s translations land.
    { name: 'title', type: 'text', required: true },
    { name: 'body', type: 'richText', required: true },
    { name: 'lastUpdated', type: 'date', required: true },
  ],
};
