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

function renderTextNode(node: TextNode, key: React.Key): React.ReactNode {
  let el: React.ReactNode = node.text;
  const f = node.format ?? 0;
  if (f & FORMAT_BOLD) el = React.createElement('strong', { key: `${key}-b` }, el);
  if (f & FORMAT_ITALIC) el = React.createElement('em', { key: `${key}-i` }, el);
  return el;
}

function renderNode(node: LexicalNode, key: React.Key): React.ReactNode {
  switch (node.type) {
    case 'text':
      return renderTextNode(node, key);
    case 'paragraph':
      return React.createElement('p', { key, className: 'mb-6 text-[17px] leading-[1.65]' },
        node.children.map((c, i) => renderNode(c, `${key}-${i}`)));
    case 'heading': {
      const tag = (node as HeadingNode).tag || 'h2';
      return React.createElement(tag, { key, style: { fontFamily: 'var(--font-serif)', fontSize: 28, marginTop: 40, marginBottom: 16 } },
        node.children.map((c, i) => renderNode(c, `${key}-${i}`)));
    }
    case 'list': {
      const tag = node.listType === 'number' ? 'ol' : 'ul';
      return React.createElement(tag, { key, className: 'list-inside mb-6 space-y-2' },
        node.children.map((c, i) => renderNode(c, `${key}-${i}`)));
    }
    case 'listitem':
      return React.createElement('li', { key },
        node.children.map((c, i) => renderNode(c, `${key}-${i}`)));
    case 'link': {
      const href = node.fields?.url ?? node.url ?? '#';
      return React.createElement('a', { key, href, className: 'text-[var(--color-mint)] underline' },
        node.children.map((c, i) => renderNode(c, `${key}-${i}`)));
    }
    default:
      return null;
  }
}

export function renderLexical(content: unknown): React.ReactNode {
  if (!content || typeof content !== 'object') return null;
  const root = (content as Root).root;
  if (!root || !Array.isArray(root.children)) return null;
  return root.children.map((node, i) => renderNode(node, i));
}
