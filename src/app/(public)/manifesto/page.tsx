import { fetchManifesto, fetchCommitments, fetchITUData } from '@/lib/payload';

export default async function ManifestoPage() {
  const locale = 'en';
  const [manifesto, commitments, itu] = await Promise.all([
    fetchManifesto(locale),
    fetchCommitments(locale),
    fetchITUData(locale),
  ]);

  return (
    <article className="px-12 py-[120px] max-w-[920px] mx-auto">
      <div className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.22em] text-[var(--color-mint)] mb-5">&mdash; Manifesto</div>
      <h1 className="font-[var(--font-serif)] font-light leading-[1.05] tracking-[-0.025em] mb-12" style={{ fontSize: 'clamp(36px, 5vw, 72px)' }}>
        {manifesto.title}
      </h1>
      <p className="font-[var(--font-serif)] italic text-[22px] leading-[1.55] text-[var(--color-cream-soft)] mb-[72px]">{manifesto.lead}</p>
      <section className="prose prose-invert max-w-none text-[18px] leading-[1.65] mb-20">
        {/* Rich text rendering — use a Payload rich text serializer here;
            for Phase 2, show a plain <pre> as a placeholder */}
        <pre className="whitespace-pre-wrap text-[16px] font-[var(--font-serif)]">
          {JSON.stringify(manifesto.body, null, 2)}
        </pre>
      </section>
      <section className="mb-20">
        <h2 className="font-[var(--font-serif)] text-[36px] mb-8">The nine commitments</h2>
        <ol className="space-y-6">
          {commitments.map((c) => (
            <li key={c.number}>
              <div className="font-[var(--font-mono)] text-[11px] text-[var(--color-mint)] tracking-[0.15em] mb-1">{String(c.number).padStart(2, '0')}</div>
              <div className="font-[var(--font-serif)] text-[22px] mb-1">{c.title}</div>
              <div className="text-[14px] text-[var(--color-cream-dim)] leading-[1.6]">{c.body}</div>
            </li>
          ))}
        </ol>
      </section>
      <footer className="text-[12px] text-[var(--color-cream-faint)] font-[var(--font-mono)] space-y-1">
        <div>Source: {itu.sourceLabel}</div>
        <a href={itu.sourceUrl} className="text-[var(--color-mint)]">{itu.sourceUrl}</a>
      </footer>
    </article>
  );
}
