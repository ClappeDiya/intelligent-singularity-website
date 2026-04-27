import type { CommitmentItem } from '@/types/cms';

type Props = { title: string; lead: string; items: CommitmentItem[] };

export function CommitmentsSection({ title, lead, items }: Props) {
  return (
    <section className="px-4 sm:px-6 md:px-8 lg:px-12 pt-6 pb-24 md:pt-10 md:pb-28 lg:pt-14 lg:pb-36">
      <div className="home-story-panel">
        <div className="home-story-header mb-14">
          <div className="home-story-kicker">Nine non-negotiables</div>
          <h2 className="home-story-title">{title}</h2>
          <p className="home-story-lead editorial-muted">{lead}</p>
        </div>
        <ol className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-7 lg:gap-8" aria-label="The nine commitments">
          {items.map((c, i) => (
            <article
              key={c.number}
              className="is-card flex gap-6 md:gap-8 items-start rounded-[20px] p-6 md:p-7 animate-fade-up"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div
                className="shrink-0 text-[12px] font-semibold w-9 h-9 rounded-full flex items-center justify-center mt-0.5"
                style={{
                  fontFamily: 'var(--font-mono)',
                  background: 'linear-gradient(135deg, rgba(16,185,129,0.12), rgba(20,184,166,0.12))',
                  color: 'var(--color-emerald-ink)',
                  border: '1px solid rgba(16,185,129,0.2)',
                }}
              >
                {String(c.number).padStart(2, '0')}
              </div>
              <div>
                <h3
                  className="font-semibold text-[var(--color-paper-ink)] mb-2"
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(20px, 1.9vw, 24px)',
                    lineHeight: 1.18,
                    letterSpacing: '-0.025em',
                    textWrap: 'balance',
                  }}
                >
                  {c.title}
                </h3>
                <p className="text-[15px] leading-[1.78]" style={{ color: 'rgba(17,24,39,0.7)' }}>{c.body}</p>
              </div>
            </article>
          ))}
        </ol>
      </div>
    </section>
  );
}
