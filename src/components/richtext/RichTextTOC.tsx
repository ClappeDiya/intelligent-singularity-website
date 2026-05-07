import { extractHeadings } from '@/lib/richtext';

export function RichTextTOC({
  content,
  label = 'On this page',
}: {
  content: unknown;
  label?: string;
}) {
  const headings = extractHeadings(content);
  if (headings.length < 3) return null;
  return (
    <nav
      aria-label={label}
      className="mt-2 mb-12 max-w-[680px]"
      style={{
        borderTop: '1px solid rgba(16,185,129,0.18)',
        borderBottom: '1px solid rgba(16,185,129,0.18)',
        paddingTop: '1.25rem',
        paddingBottom: '1.25rem',
      }}
    >
      <div
        className="text-[11px] mb-3"
        style={{
          fontFamily: 'var(--font-mono)',
          color: 'var(--color-emerald-ink)',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          fontWeight: 600,
        }}
      >
        {label}
      </div>
      <ol className="space-y-1.5 text-[14.5px] leading-[1.55]">
        {headings.map((h) => (
          <li key={h.id} style={{ paddingInlineStart: h.level === 3 ? '1rem' : 0 }}>
            <a
              href={`#${h.id}`}
              className="toc-link"
              style={{
                color: 'rgba(17, 24, 39, 0.78)',
                textDecoration: 'none',
              }}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
