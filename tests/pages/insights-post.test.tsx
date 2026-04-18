import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

const POST = {
  slug: 'a',
  title: 'A post',
  subtitle: 'sub',
  author: { name: 'Md Diya' },
  publishedAt: '2026-04-15T12:00:00Z',
  readingTime: 3,
  tags: [{ tag: 'access' }],
  body: {
    root: {
      type: 'root', version: 1, direction: 'ltr', format: '', indent: 0,
      children: [
        { type: 'paragraph', version: 1, direction: 'ltr', format: '', indent: 0,
          children: [{ type: 'text', version: 1, text: 'Hello world', detail: 0, format: 0, mode: 'normal', style: '' }] },
      ],
    },
  },
  sources: [{ label: 'Source A', href: 'https://example.org/a' }],
};

vi.mock('@/lib/payload', () => ({ fetchJournalPostBySlug: async () => POST }));
vi.mock('@/lib/seo', () => ({ buildPageMetadata: () => ({ title: 't' }) }));
vi.mock('@/lib/schema', () => ({ getWebPageSchema: () => ({}), getBreadcrumbSchema: () => ({}) }));

import PostPage from '@/app/(public)/[locale]/insights/[slug]/page';

describe('/insights/[slug]', () => {
  it('renders title, body, and numbered sources list', async () => {
    const ui = await PostPage({ params: Promise.resolve({ locale: 'en', slug: 'a' }) });
    render(ui as any);
    expect(screen.getByText('A post')).toBeInTheDocument();
    expect(screen.getByText('Hello world')).toBeInTheDocument();
    expect(screen.getByText('Source A')).toBeInTheDocument();
  });

  it('returns 404 when post missing', async () => {
    vi.resetModules();
    vi.doMock('@/lib/payload', () => ({ fetchJournalPostBySlug: async () => null }));
    const mod = await import('@/app/(public)/[locale]/insights/[slug]/page');
    await expect(mod.default({ params: Promise.resolve({ locale: 'en', slug: 'z' }) })).rejects.toThrow();
  });
});
