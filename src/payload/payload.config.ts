import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import path from 'node:path';
import { buildConfig } from 'payload';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

import { Users } from './collections/Users.ts';
import { ProductCategories } from './collections/ProductCategories.ts';
import { Products } from './collections/Products.ts';
import { Media } from './collections/Media.ts';
import { CommitmentItems } from './collections/CommitmentItems.ts';
import { TimelineEvents } from './collections/TimelineEvents.ts';
import { LegalPages } from './collections/LegalPages.ts';
import { ContactRoutes } from './collections/ContactRoutes.ts';
import { Redirects } from './collections/Redirects.ts';
import { ReleaseNotes } from './collections/ReleaseNotes.ts';
import { RoadmapItems } from './collections/RoadmapItems.ts';
import { JournalPosts } from './collections/JournalPosts.ts';

import { SiteSettings } from './globals/SiteSettings.ts';
import { HomepageContent } from './globals/HomepageContent.ts';
import { ManifestoPage } from './globals/ManifestoPage.ts';
import { AboutPage } from './globals/AboutPage.ts';
import { GreenPage } from './globals/GreenPage.ts';
import { ContactPage } from './globals/ContactPage.ts';
import { ITUData } from './globals/ITUData.ts';
import { StatusPage } from './globals/StatusPage.ts';
import { TrustPage } from './globals/TrustPage.ts';
import { HelpPage } from './globals/HelpPage.ts';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  localization: {
    locales: [
      { label: 'English', code: 'en' },
      { label: '简体中文', code: 'zh-CN' },
      { label: 'Español', code: 'es' },
      { label: 'हिन्दी', code: 'hi' },
      { label: 'العربية', code: 'ar', rtl: true },
      { label: 'Français', code: 'fr' },
      { label: 'Português', code: 'pt' },
      { label: 'বাংলা', code: 'bn' },
      { label: 'Русский', code: 'ru' },
      { label: 'اردو', code: 'ur', rtl: true },
      { label: 'Bahasa Indonesia', code: 'id' },
      { label: 'Kiswahili', code: 'sw' },
      { label: 'Yorùbá', code: 'yo' },
      { label: 'Hausa', code: 'ha' },
    ],
    defaultLocale: 'en',
    fallback: true,
  },
  collections: [
    Users,
    Media,
    ProductCategories,
    Products,
    CommitmentItems,
    TimelineEvents,
    LegalPages,
    ContactRoutes,
    Redirects,
    ReleaseNotes,
    RoadmapItems,
    JournalPosts,
  ],
  globals: [
    SiteSettings,
    HomepageContent,
    ManifestoPage,
    AboutPage,
    GreenPage,
    ContactPage,
    ITUData,
    StatusPage,
    TrustPage,
    HelpPage,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, '../types/payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
    push: true,
  }),
  sharp,
  cors: [process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'],
});
