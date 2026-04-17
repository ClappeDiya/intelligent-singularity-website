import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import path from 'node:path';
import { buildConfig } from 'payload';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

import { Users } from './collections/Users';
import { ProductCategories } from './collections/ProductCategories';
import { Products } from './collections/Products';
import { Media } from './collections/Media';
import { CommitmentItems } from './collections/CommitmentItems';
import { TimelineEvents } from './collections/TimelineEvents';
import { LegalPages } from './collections/LegalPages';
import { ContactRoutes } from './collections/ContactRoutes';
import { Redirects } from './collections/Redirects';
import { ReleaseNotes } from './collections/ReleaseNotes';
import { RoadmapItems } from './collections/RoadmapItems';
import { JournalPosts } from './collections/JournalPosts';

import { SiteSettings } from './globals/SiteSettings';
import { HomepageContent } from './globals/HomepageContent';
import { ManifestoPage } from './globals/ManifestoPage';
import { AboutPage } from './globals/AboutPage';
import { GreenPage } from './globals/GreenPage';
import { ContactPage } from './globals/ContactPage';
import { ITUData } from './globals/ITUData';
import { StatusPage } from './globals/StatusPage';
import { TrustPage } from './globals/TrustPage';
import { HelpPage } from './globals/HelpPage';

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
