import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Intelligent Singularity',
  description: 'A studio building software for universal access.',
  manifest: '/manifest.webmanifest',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
