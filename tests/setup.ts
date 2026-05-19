import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

// Mock next/headers so async server components (e.g. JsonLd) work in jsdom
vi.mock('next/headers', () => ({
  headers: () => Promise.resolve(new Map()),
  cookies: () => Promise.resolve(new Map()),
}));

// Mock next/cache so unstable_cache passes through in tests
vi.mock('next/cache', () => ({
  unstable_cache: (fn: (...args: unknown[]) => unknown) => fn,
  revalidateTag: vi.fn(),
  revalidatePath: vi.fn(),
}));

// Mock JsonLd as a lightweight sync component so page tests don't hang on async RSC
vi.mock('@/components/seo/JsonLd', () => ({
  JsonLd: ({ id }: { id: string }) => null,
}));

// Mock SrOpensInNewTab — async server component that fetches a translation;
// rendering it via React Testing Library returns a Promise, which the test renderer
// cannot resolve in nested children. In production, the real component renders fine.
vi.mock('@/components/pages/shared/SrOpensInNewTab', () => ({
  SrOpensInNewTab: () => null,
}));
