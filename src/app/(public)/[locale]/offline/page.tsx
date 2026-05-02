import Link from 'next/link';
import { MeridianMark } from '@/components/brand/MeridianMark';
import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({
    locale,
    pathname: '/offline',
    title: 'Offline | Intelligent Singularity',
    description: 'Offline fallback page for Intelligent Singularity web experiences.',
    noindex: true,
  });
}

export default function OfflinePage() {
  return (
    <section className="min-h-[100dvh] flex flex-col items-center justify-center gap-8 px-6 py-24">
      <MeridianMark size={72} />
      <div
        className="label-mono"
      >
        No connection · You are offline
      </div>
      <h1
        className="text-center text-[var(--color-paper-ink)]"
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(40px, 6vw, 68px)',
          letterSpacing: '-0.035em',
          lineHeight: 1.02,
          fontWeight: 600,
        }}
      >
        Designed for this moment.
      </h1>
      <p
        className="text-center italic max-w-[560px]"
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(17px, 1.6vw, 20px)',
          lineHeight: 1.55,
          color: 'rgba(17,24,39,0.72)',
        }}
      >
        Universal access is the brief. This site keeps working without a connection — every page you
        visited once is cached and readable. Try a page you&apos;ve already seen, or reconnect to
        load something new.
      </p>
      <Link
        href="/"
        className="btn-outline mt-2"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        Return to the home page
        <span aria-hidden="true">→</span>
      </Link>
    </section>
  );
}
