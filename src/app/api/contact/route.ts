import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { sendContactMessage } from '@/lib/mail';

export async function POST(request: NextRequest) {
  const form = await request.formData();
  const result = await sendContactMessage({
    route: String(form.get('route') ?? 'general'),
    from: String(form.get('from') ?? ''),
    name: String(form.get('name') ?? ''),
    subject: String(form.get('subject') ?? ''),
    body: String(form.get('body') ?? ''),
  });

  if (!result.ok) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 400 });
  }
  return NextResponse.json({ ok: true, messageId: result.messageId });
}
