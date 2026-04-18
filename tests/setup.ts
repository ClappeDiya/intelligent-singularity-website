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
