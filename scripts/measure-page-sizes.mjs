#!/usr/bin/env node
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { gzipSync } from 'node:zlib';

const BUILD_DIR = '.next';
const SERVER_APP = join(BUILD_DIR, 'server', 'app');
const BUILD_MANIFEST = join(BUILD_DIR, 'build-manifest.json');

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory()) files.push(...(await walk(full)));
    else files.push(full);
  }
  return files;
}

async function gzipFile(path) {
  return gzipSync(await readFile(path)).length;
}

async function measureStaticHtml() {
  const sizes = {};
  try {
    const files = await walk(SERVER_APP);
    for (const file of files) {
      if (!file.endsWith('.html')) continue;
      const body = await readFile(file);
      const route = file.replace(SERVER_APP, '').replace(/\.html$/, '') || '/';
      sizes[route] = gzipSync(body).length;
    }
  } catch (err) {
    console.warn('[measure-page-sizes] static html walk skipped:', err.message);
  }
  return sizes;
}

async function measureSharedChunks() {
  const manifest = JSON.parse(await readFile(BUILD_MANIFEST, 'utf-8'));
  const rootFiles = manifest.rootMainFiles ?? [];
  let total = 0;
  const breakdown = {};
  for (const rel of rootFiles) {
    const full = join(BUILD_DIR, rel);
    try {
      const gz = await gzipFile(full);
      total += gz;
      breakdown[rel] = gz;
    } catch (err) {
      console.warn(`[measure-page-sizes] could not gzip ${rel}:`, err.message);
    }
  }
  return { total, breakdown };
}

async function main() {
  const sizes = await measureStaticHtml();
  const shared = await measureSharedChunks();
  sizes['__shared_chunks'] = shared.total;
  await writeFile(join(BUILD_DIR, 'page-sizes.json'), JSON.stringify(sizes, null, 2));
  await writeFile(
    join(BUILD_DIR, 'shared-chunks-breakdown.json'),
    JSON.stringify(shared.breakdown, null, 2),
  );
  const staticCount = Object.keys(sizes).filter((k) => !k.startsWith('__')).length;
  console.log(
    `[measure-page-sizes] wrote ${staticCount} static-route entries + __shared_chunks (${(shared.total / 1024).toFixed(1)} KB gzip)`,
  );
  if (staticCount === 0) {
    console.log(
      '[measure-page-sizes] note: 0 static HTML routes — all routes are dynamic SSR. Per-route first-paint payload requires runtime measurement (not yet implemented).',
    );
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
