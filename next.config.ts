import type { NextConfig } from 'next';
import { withPayload } from '@payloadcms/next/withPayload';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  // cacheComponents: true, // TODO: re-enable when Turbopack+Payload support stabilizes
  output: 'standalone',
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  // typedRoutes: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    return [];
  },
};

export default withPayload(withNextIntl(nextConfig));
