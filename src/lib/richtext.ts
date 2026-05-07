import React from 'react';

type TextNode = { type: 'text'; text: string; format?: number };
type ParagraphNode = { type: 'paragraph'; children: LexicalNode[] };
type HeadingNode = { type: 'heading'; tag: string; children: LexicalNode[] };
type ListNode = { type: 'list'; listType: 'bullet' | 'number'; children: LexicalNode[] };
type ListItemNode = { type: 'listitem'; children: LexicalNode[] };
type LinkNode = { type: 'link'; fields?: { url?: string }; url?: string; children: LexicalNode[] };
type LexicalNode = TextNode | ParagraphNode | HeadingNode | ListNode | ListItemNode | LinkNode;
type Root = { root: { type: 'root'; children: LexicalNode[] } };

const FORMAT_BOLD = 1;
const FORMAT_ITALIC = 1 << 1;

function renderTextNode(node: TextNode, key: string | number): React.ReactNode {
  let el: React.ReactNode = node.text;
  const f = node.format ?? 0;
  if (f & FORMAT_BOLD) el = React.createElement('strong', { key: `${String(key)}-b` }, el);
  if (f & FORMAT_ITALIC) el = React.createElement('em', { key: `${String(key)}-i` }, el);
  return el;
}

function getNodeText(node: LexicalNode): string {
  if (node.type === 'text') return node.text;
  const children = (node as { children?: LexicalNode[] }).children;
  if (Array.isArray(children)) return children.map(getNodeText).join('');
  return '';
}

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function collectHeadingIds(nodes: LexicalNode[]): Map<HeadingNode, string> {
  const ids = new Map<HeadingNode, string>();
  const seen = new Map<string, number>();
  for (const node of nodes) {
    if (node.type !== 'heading') continue;
    const tag = node.tag;
    if (tag !== 'h2' && tag !== 'h3') continue;
    const base = slugifyHeading(getNodeText(node));
    if (!base) continue;
    const count = seen.get(base) ?? 0;
    ids.set(node, count === 0 ? base : `${base}-${count + 1}`);
    seen.set(base, count + 1);
  }
  return ids;
}

function renderNode(
  node: LexicalNode,
  key: string | number,
  headingIds?: Map<HeadingNode, string>
): React.ReactNode {
  switch (node.type) {
    case 'text':
      return renderTextNode(node, key);
    case 'paragraph':
      return React.createElement('p', { key, className: 'mb-6 text-[17px] leading-[1.65]' },
        node.children.map((c, i) => renderNode(c, `${key}-${i}`, headingIds)));
    case 'heading': {
      const tag = node.tag || 'h2';
      const id = headingIds?.get(node);
      return React.createElement(tag, { key, ...(id ? { id } : {}) },
        node.children.map((c, i) => renderNode(c, `${key}-${i}`, headingIds)));
    }
    case 'list': {
      const tag = node.listType === 'number' ? 'ol' : 'ul';
      return React.createElement(tag, { key, className: 'list-inside mb-6 space-y-2' },
        node.children.map((c, i) => renderNode(c, `${key}-${i}`, headingIds)));
    }
    case 'listitem':
      return React.createElement('li', { key },
        node.children.map((c, i) => renderNode(c, `${key}-${i}`, headingIds)));
    case 'link': {
      const href = node.fields?.url ?? node.url ?? '#';
      return React.createElement('a', { key, href, className: 'text-[var(--color-mint)] underline' },
        node.children.map((c, i) => renderNode(c, `${key}-${i}`, headingIds)));
    }
    default:
      return null;
  }
}

export function renderLexical(content: unknown): React.ReactNode {
  if (!content || typeof content !== 'object') return null;
  const root = (content as Root).root;
  if (!root || !Array.isArray(root.children)) return null;
  const headingIds = collectHeadingIds(root.children);
  return root.children.map((node, i) => renderNode(node, i, headingIds));
}

export type ExtractedHeading = { id: string; text: string; level: 2 | 3 };

export function extractHeadings(content: unknown): ExtractedHeading[] {
  if (!content || typeof content !== 'object') return [];
  const root = (content as Root).root;
  if (!root || !Array.isArray(root.children)) return [];
  const ids = collectHeadingIds(root.children);
  const out: ExtractedHeading[] = [];
  for (const node of root.children) {
    if (node.type !== 'heading') continue;
    if (node.tag !== 'h2' && node.tag !== 'h3') continue;
    const id = ids.get(node);
    if (!id) continue;
    out.push({ id, text: getNodeText(node), level: node.tag === 'h2' ? 2 : 3 });
  }
  return out;
}
