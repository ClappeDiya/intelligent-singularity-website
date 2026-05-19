import Link from 'next/link';
import { SrOpensInNewTab } from './SrOpensInNewTab';

export function EmptyState({
  title, body, href, linkText, eyebrow, as: Tag = 'h2',
}: { title: string; body: string; href?: string; linkText?: string; eyebrow: string; as?: 'h2' | 'h3' }) {
  return (
    <div
      className="rounded-2xl p-8 md:p-10 text-center border border-dashed"
      style={{ borderColor: 'rgba(16,185,129,0.22)' }}
    >
      <div
        className="text-[11px] uppercase tracking-[0.24em] mb-3"
        style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-emerald-ink)' }}
      >
        {eyebrow}
      </div>
      <Tag
        className="text-[22px] leading-[1.25] mb-3"
        style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-paper-ink)' }}
      >
        {title}
      </Tag>
      <p className="text-[15px] leading-[1.7] max-w-[52ch] mx-auto" style={{ color: 'var(--color-paper-ink-muted)' }}>
        {body}
      </p>
      {href && linkText ? (
        href.startsWith('http') ? (
          <a
            href={href}
            rel="noreferrer external"
            target="_blank"
            className="inline-block mt-6 text-[13px] uppercase tracking-[0.16em]"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-emerald-ink)' }}
          >
            {linkText}
            <SrOpensInNewTab />
            <span aria-hidden="true"> ↗</span>
          </a>
        ) : (
          <Link
            href={href}
            className="inline-block mt-6 text-[13px] uppercase tracking-[0.16em]"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-emerald-ink)' }}
          >
            {linkText} →
          </Link>
        )
      ) : null}
    </div>
  );
}
