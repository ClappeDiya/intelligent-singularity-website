export async function register() {
  if (process.env.NEXT_RUNTIME !== 'nodejs') return;

  console.log('[instrumentation] IS website server started');

  // Ensure Payload's schema is pushed on boot. The postgres adapter is
  // configured with `push: true`, but Next.js standalone does not trigger
  // Payload init until the first request — so a brand-new collection or
  // global returns "relation does not exist" on its first call. We
  // short-circuit that by initialising Payload here.
  try {
    const [{ getPayload }, config] = await Promise.all([
      import('payload'),
      import('@payload-config'),
    ]);
    await getPayload({ config: (config as any).default });
    console.log('[instrumentation] Payload init complete');
  } catch (err) {
    console.error('[instrumentation] Payload init failed:', (err as Error).message);
  }
}
