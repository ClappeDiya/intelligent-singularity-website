import { Suspense } from 'react';
import { fetchAbout } from '@/lib/payload';
import { LexicalRenderer } from '@/components/richtext/LexicalRenderer';

async function AboutContent({ locale }: { locale: string }) {
  const about = await fetchAbout(locale);
  return (
    <article className="px-12 py-[120px] max-w-[920px] mx-auto">
      <div className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.22em] text-[var(--color-mint)] mb-5">&mdash; About</div>
      <h1 className="font-[var(--font-serif)] font-light leading-[1.05] tracking-[-0.025em] mb-12" style={{ fontSize: 'clamp(36px, 5vw, 72px)' }}>
        {about.title}
      </h1>
      <p className="font-[var(--font-serif)] italic text-[22px] leading-[1.55] text-[var(--color-cream-soft)] mb-[72px]">{about.lead}</p>
      <LexicalRenderer content={about.founderStory} className="mb-12" />
      <p className="text-[16px] text-[var(--color-cream-soft)] leading-[1.65] mb-10">{about.incorporationContext}</p>
      <LexicalRenderer content={about.leanOpsPhilosophy} />
    </article>
  );
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <Suspense fallback={<div className="px-12 py-[120px]">Loading...</div>}>
      <AboutContent locale={locale} />
    </Suspense>
  );
}
