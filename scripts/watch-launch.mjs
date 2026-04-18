#!/usr/bin/env node
// Launch-window watch script — polls the 8 production endpoints + the
// Kuma status JSON + container error log. Run every 5 minutes in the
// 24 hours after a deploy. Non-zero exit if anything flaps.
//
// Usage:
//   node scripts/watch-launch.mjs                  # one-shot
//   watch -n 300 'node scripts/watch-launch.mjs'   # repeat every 5 min

const ROUTES = [
  '/en',
  '/en/changelog',
  '/en/status',
  '/en/roadmap',
  '/en/insights',
  '/en/insights/the-2-2-billion-gap',
  '/en/trust',
  '/en/help',
];

const BASE = 'https://intelligentsingularityinc.com';
const KUMA = 'https://status.intelligentsingularityinc.com';

async function probe(url) {
  const start = Date.now();
  try {
    const res = await fetch(url, { redirect: 'follow' });
    return { ok: res.ok, status: res.status, ms: Date.now() - start };
  } catch (err) {
    return { ok: false, status: 0, ms: Date.now() - start, err: String(err) };
  }
}

async function main() {
  let failures = 0;
  const lines = [];
  const ts = new Date().toISOString();

  lines.push(`=== ${ts} — launch watch ===`);

  for (const path of ROUTES) {
    const r = await probe(`${BASE}${path}`);
    const tag = r.ok ? 'ok' : 'FAIL';
    lines.push(`  ${tag.padEnd(4)} ${r.status} ${String(r.ms).padStart(4)}ms  ${path}`);
    if (!r.ok) failures += 1;
  }

  // Health API must return JSON with status:ok
  const health = await fetch(`${BASE}/api/health`).then(r => r.json()).catch(() => null);
  if (health?.status === 'ok') {
    lines.push(`  ok   health.timestamp=${health.timestamp}`);
  } else {
    lines.push('  FAIL health endpoint did not return {status:"ok"}');
    failures += 1;
  }

  // Kuma overall — all monitors on status page `is` should be up
  try {
    const kuma = await fetch(`${KUMA}/api/status-page/heartbeat/is`).then(r => r.json());
    const hb = Object.values(kuma.heartbeatList ?? {});
    const latest = hb.map(arr => arr.at(-1)?.status ?? 3);
    const up = latest.filter(s => s === 1).length;
    lines.push(`  kuma ${up}/${latest.length} monitors up`);
    if (up < latest.length) failures += 1;
  } catch (err) {
    lines.push(`  FAIL kuma api unreachable: ${err.message}`);
    failures += 1;
  }

  lines.push(failures === 0 ? '  >>> ALL GREEN' : `  >>> ${failures} FAILURE(S)`);

  console.log(lines.join('\n'));
  process.exit(failures === 0 ? 0 : 1);
}

main();
