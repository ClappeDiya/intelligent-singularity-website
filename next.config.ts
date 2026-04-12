import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  cacheComponents: true,
  output: 'standalone',
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  experimental: {
    typedRoutes: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    return [];
  },
};

export default nextConfig;
