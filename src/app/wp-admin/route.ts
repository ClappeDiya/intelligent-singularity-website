export async function GET(request: Request) {
  const ip = request.headers.get('x-forwarded-for') ?? 'unknown';
  console.warn(`[HONEYPOT] wp-admin hit from ${ip}`);
  return new Response('Not Found', { status: 404 });
}
