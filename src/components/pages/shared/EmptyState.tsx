import Link from 'next/link';

export function EmptyState({
  title, body, href, linkText,
}: { title: string; body: string; href?: string; linkText?: string }) {
  return (
    <div
      className="rounded-2xl p-8 md:p-10 text-center border border-dashed"
      style={{ borderColor: 'rgba(246,241,231,0.16)' }}
    >
      <div
        className="text-[11px] uppercase tracking-[0.24em] mb-3"
        style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-mint)' }}
      >
        Honest note
      </div>
      <h3
        className="text-[22px] leading-[1.25] text-[var(--color-cream)] mb-3"
        style={{ fontFamily: 'var(--font-serif)' }}
      >
        {title}
      </h3>
      <p className="text-[15px] leading-[1.7] text-[var(--color-cream-dim)] max-w-[52ch] mx-auto">
        {body}
      </p>
      {href && linkText ? (
        href.startsWith('http') ? (
          <a
            href={href}
            rel="noreferrer external"
            target="_blank"
            className="inline-block mt-6 text-[13px] uppercase tracking-[0.16em]"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-mint)' }}
          >
            {linkText} ↗
          </a>
        ) : (
          <Link
            href={href}
            className="inline-block mt-6 text-[13px] uppercase tracking-[0.16em]"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-mint)' }}
          >
            {linkText} →
          </Link>
        )
      ) : null}
    </div>
  );
}
