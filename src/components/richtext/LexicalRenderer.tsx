import { renderLexical } from '@/lib/richtext';

export function LexicalRenderer({ content, className = '' }: { content: unknown; className?: string }) {
  const rendered = renderLexical(content);
  if (rendered === null) return null;
  return <div className={className}>{rendered}</div>;
}
