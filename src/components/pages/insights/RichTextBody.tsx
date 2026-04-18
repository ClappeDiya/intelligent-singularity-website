// src/components/pages/insights/RichTextBody.tsx
import * as React from 'react';

type LexNode = { type: string; children?: LexNode[]; text?: string; tag?: string; [k: string]: unknown };

function Node({ node }: { node: LexNode }): React.ReactNode {
  if (node.type === 'text') return node.text ?? '';
  const children = (node.children ?? []).map((c, i) => <Node key={i} node={c} />);
  switch (node.type) {
    case 'paragraph':
      return <p>{children}</p>;
    case 'heading': {
      const Tag = (node.tag ?? 'h2') as keyof React.JSX.IntrinsicElements;
      return React.createElement(Tag, null, children);
    }
    case 'quote':
      return <blockquote>{children}</blockquote>;
    case 'list':
      return <ul>{children}</ul>;
    case 'listitem':
      return <li>{children}</li>;
    case 'link':
      return <a href={String(node.url ?? '#')}>{children}</a>;
    default:
      return <>{children}</>;
  }
}

export function RichTextBody({ data }: { data: { root: LexNode } | null | undefined }) {
  if (!data?.root) return null;
  return (
    <div
      className="prose-body"
      style={{ fontFamily: 'var(--font-serif)', fontSize: 18, lineHeight: 1.75, color: 'var(--color-paper-ink)', maxWidth: '68ch' }}
    >
      <Node node={data.root} />
    </div>
  );
}
