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
    const payload = await getPayload({ config: (config as any).default });
    const db = payload.db as any;
    // push: true relies on an explicit schema push against the live adapter;
    // Payload does not do this at init automatically. Drizzle's `push`
    // reconciles the code schema with the DB, creating any missing tables.
    if (typeof db?.pushDevSchema === 'function') {
      await db.pushDevSchema(payload);
      console.log('[instrumentation] Payload schema push complete');
    } else if (typeof db?.push === 'function') {
      await db.push();
      console.log('[instrumentation] Payload db.push() complete');
    } else {
      console.log('[instrumentation] Payload init complete (no push function found)');
    }
  } catch (err) {
    console.error('[instrumentation] Payload init failed:', (err as Error).message);
  }
}
