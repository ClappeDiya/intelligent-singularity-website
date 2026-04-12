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

import { SiteSettings } from './globals/SiteSettings';
import { HomepageContent } from './globals/HomepageContent';
import { ManifestoPage } from './globals/ManifestoPage';
import { AboutPage } from './globals/AboutPage';
import { GreenPage } from './globals/GreenPage';
import { ContactPage } from './globals/ContactPage';
import { ITUData } from './globals/ITUData';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
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
  ],
  globals: [
    SiteSettings,
    HomepageContent,
    ManifestoPage,
    AboutPage,
    GreenPage,
    ContactPage,
    ITUData,
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
