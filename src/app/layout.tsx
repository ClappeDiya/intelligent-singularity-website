import type { Metadata } from 'next';
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
