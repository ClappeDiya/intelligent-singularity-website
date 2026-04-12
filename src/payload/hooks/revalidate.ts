import type { CollectionAfterChangeHook, GlobalAfterChangeHook } from 'payload';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
const SECRET = process.env.REVALIDATE_SECRET || '';

async function fireRevalidate(tag: string) {
  try {
    await fetch(`${SITE_URL}/api/revalidate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-revalidate-secret': SECRET,
      },
      body: JSON.stringify({ tag }),
    });
  } catch (err) {
    console.error('[revalidate hook] failed for', tag, err);
  }
}

export function revalidateCollection(tag: string): CollectionAfterChangeHook {
  return async () => {
    await fireRevalidate(tag);
  };
}

export function revalidateGlobal(tag: string): GlobalAfterChangeHook {
  return async () => {
    await fireRevalidate(tag);
  };
}
