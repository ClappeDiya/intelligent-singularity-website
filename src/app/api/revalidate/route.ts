import { revalidateTag } from 'next/cache';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const LOCALES = [
  'en', 'zh-CN', 'es', 'hi', 'ar', 'fr', 'pt', 'bn',
  'ru', 'ur', 'id', 'sw', 'yo', 'ha',
];

export async function POST(request: NextRequest) {
  const secret = request.headers.get('x-revalidate-secret');
  if (!secret || secret !== process.env.REVALIDATE_SECRET) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const body = await request.json().catch(() => null);
  if (!body || typeof body.tag !== 'string') {
    return new NextResponse('Bad Request', { status: 400 });
  }

  const tag: string = body.tag;
  revalidateTag(tag, 'default');
  for (const locale of LOCALES) {
    revalidateTag(`${tag}:${locale}`, 'default');
  }

  return NextResponse.json({ revalidated: true, tag });
}
