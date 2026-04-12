#!/usr/bin/env node
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { gzipSync } from 'node:zlib';

const BUILD_DIR = '.next';
const SERVER_APP = join(BUILD_DIR, 'server', 'app');

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

async function main() {
  let sizes = {};
  try {
    const files = await walk(SERVER_APP);
    for (const file of files) {
      if (!file.endsWith('.html')) continue;
      const body = await readFile(file);
      const gz = gzipSync(body).length;
      const route = file.replace(SERVER_APP, '').replace(/\.html$/, '') || '/';
      sizes[route] = gz;
    }
  } catch (err) {
    console.warn('[measure-page-sizes] skipped:', err.message);
  }
  await writeFile(join(BUILD_DIR, 'page-sizes.json'), JSON.stringify(sizes, null, 2));
  console.log(`[measure-page-sizes] wrote ${Object.keys(sizes).length} entries`);
}

main().catch((e) => { console.error(e); process.exit(1); });
