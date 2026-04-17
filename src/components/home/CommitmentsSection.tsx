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
          {items.map((c) => (
            <li
              key={c.number}
              className="relative rounded-[24px] p-7 md:p-8 flex gap-5"
              style={{ background: 'var(--color-paper-warm)' }}
            >
              <div className="flex-shrink-0 flex items-start justify-center w-10 pt-1">
                <span
                  className="inline-flex items-center justify-center w-9 h-9 rounded-full text-[13px]"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 500,
                    color: 'var(--color-paper-ink)',
                    background: 'var(--color-paper-soft)',
                  }}
                >
                  {String(c.number).padStart(2, '0')}
                </span>
              </div>
              <div>
                <h3
                  className="text-[24px] md:text-[26px] leading-[1.1] tracking-[-0.028em] mb-3 max-w-[22ch]"
                  style={{
                    fontFamily: 'var(--font-serif)',
                    color: 'var(--color-paper-ink)',
                    fontWeight: 600,
                  }}
                >
                  {c.title}
                </h3>
                <p
                  className="text-[15.5px] leading-[1.78] max-w-[46ch]"
                  style={{ color: 'rgba(20,20,19,0.78)' }}
                >
                  {c.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
