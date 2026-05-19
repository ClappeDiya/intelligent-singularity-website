#!/usr/bin/env node
import { readFile, writeFile } from 'node:fs/promises';
import { gzipSync } from 'node:zlib';
import { spawn } from 'node:child_process';
import { setTimeout as sleep } from 'node:timers/promises';

const PORT = process.env.MEASURE_PORT ?? '3100';
const HOST = `http://127.0.0.1:${PORT}`;
const PAGE_SIZES = '.next/page-sizes.json';
const SERVER_READY_TIMEOUT_MS = 60_000;
const SERVER_KILL_GRACE_MS = 1500;
const ROUTE_FETCH_TIMEOUT_MS = 15_000;

// Keep in sync with scripts/ci-checks/axe-scan.mjs PATHS — same routes that
// face a11y enforcement should face per-route SSR payload enforcement.
const ROUTES = [
  '/en', '/en/manifesto', '/en/portfolio', '/en/about', '/en/green',
  '/en/contact', '/en/legal/privacy', '/en/legal/terms',
  '/en/legal/accessibility', '/en/legal/cookies',
  '/en/changelog', '/en/status', '/en/roadmap', '/en/insights',
  '/en/trust', '/en/help',
  '/en/security', '/en/pricing', '/en/faq', '/en/careers', '/en/press',
  '/ar', '/ar/trust', '/ur', '/zh-CN', '/fr',
];

function log(msg) {
  console.log(`[measure-route-payloads] ${msg}`);
}

async function waitForReady(child) {
  const started = Date.now();
  let stdoutSawReady = false;
  child.stdout?.on('data', (chunk) => {
    if (chunk.toString().includes('Ready in')) stdoutSawReady = true;
  });
  while (Date.now() - started < SERVER_READY_TIMEOUT_MS) {
    if (child.exitCode !== null) {
      throw new Error(`next start exited early with code ${child.exitCode}`);
    }
    if (stdoutSawReady) {
      try {
        const r = await fetch(`${HOST}/api/health`, { signal: AbortSignal.timeout(2000) });
        if (r.status < 500) return;
      } catch {}
    }
    await sleep(300);
  }
  throw new Error(`next start did not become ready within ${SERVER_READY_TIMEOUT_MS}ms`);
}

async function startServer() {
  log(`spawning 'next start -p ${PORT}' (production server)...`);
  // detached: true → child becomes process-group leader so we can SIGKILL the whole
  // tree (pnpm → node → next-start). Without this, killing pnpm orphans next-start.
  const child = spawn('pnpm', ['exec', 'next', 'start', '-p', PORT], {
    stdio: ['ignore', 'pipe', 'pipe'],
    env: { ...process.env, PORT, NODE_ENV: 'production' },
    detached: true,
  });
  child.stderr?.on('data', (chunk) => process.stderr.write(`[next start] ${chunk}`));
  await waitForReady(child);
  log(`server ready on ${HOST}`);
  return child;
}

async function stopServer(child) {
  if (child.exitCode !== null) return;
  try { process.kill(-child.pid, 'SIGTERM'); } catch {}
  await sleep(SERVER_KILL_GRACE_MS);
  if (child.exitCode === null) {
    log('SIGTERM ignored — forcing SIGKILL on process group');
    try { process.kill(-child.pid, 'SIGKILL'); } catch {}
  }
}

async function measureRoute(route) {
  const url = `${HOST}${route}`;
  try {
    const res = await fetch(url, {
      redirect: 'manual',
      headers: { 'Accept-Encoding': 'identity', 'Accept': 'text/html' },
      signal: AbortSignal.timeout(ROUTE_FETCH_TIMEOUT_MS),
    });
    if (res.status >= 300 && res.status < 400) {
      console.warn(`  ⚠ ${route}: redirect HTTP ${res.status} → ${res.headers.get('location')} (skipping)`);
      return { skipped: true };
    }
    if (res.status >= 400) {
      console.error(`  ✗ ${route}: HTTP ${res.status} — refusing to measure error page`);
      return { error: true };
    }
    const body = Buffer.from(await res.arrayBuffer());
    const gz = gzipSync(body).length;
    return { bytes: gz, rawBytes: body.length };
  } catch (err) {
    console.error(`  ✗ ${route}: fetch failed — ${err.message}`);
    return { error: true };
  }
}

async function main() {
  let existing = {};
  try {
    existing = JSON.parse(await readFile(PAGE_SIZES, 'utf-8'));
  } catch {
    log(`${PAGE_SIZES} not found — starting fresh (run measure-page-sizes.mjs first for __shared_chunks)`);
  }

  const server = await startServer();
  let errors = 0;
  let measured = 0;

  try {
    for (const route of ROUTES) {
      const result = await measureRoute(route);
      if (result.bytes != null) {
        existing[route] = result.bytes;
        console.log(`  ✓ ${route.padEnd(50)} ${(result.bytes / 1024).toFixed(1)} KB gzip (${(result.rawBytes / 1024).toFixed(1)} KB raw)`);
        measured++;
      } else if (result.error) {
        errors++;
      }
    }
  } finally {
    await stopServer(server);
  }

  await writeFile(PAGE_SIZES, JSON.stringify(existing, null, 2));
  log(`merged ${measured} per-route entries into ${PAGE_SIZES}`);

  if (errors > 0) {
    console.error(`\n❌ ${errors} route(s) failed to measure (HTTP error / fetch error). See log above.`);
    process.exit(1);
  }
  if (measured === 0) {
    console.error(`\n❌ Measured 0 routes — measurement is vacuous, refusing to pass.`);
    process.exit(1);
  }
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(`[measure-route-payloads] fatal: ${e.message}`);
    process.exit(1);
  });
