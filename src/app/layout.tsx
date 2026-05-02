import type { Metadata, Viewport } from 'next';
import './globals.css';
import { getSiteUrl } from '@/lib/seo';

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: 'Intelligent Singularity',
  description: 'A studio building software for universal access.',
  manifest: '/manifest.webmanifest',
  icons: {
    icon: '/icons/icon.svg',
    shortcut: '/icons/icon.svg',
    apple: '/icons/icon.svg',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#111827' },
  ],
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
