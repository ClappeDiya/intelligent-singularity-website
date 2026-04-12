#!/usr/bin/env node
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

const STATIC_DIR = '.next/static';
const FORBIDDEN_HOSTS = [
  'fonts.googleapis.com',
  'fonts.gstatic.com',
  'googletagmanager.com',
  'google-analytics.com',
  'segment.io',
  'segment.com',
  'hotjar.com',
  'mixpanel.com',
  'fullstory.com',
  'intercom.io',
  'clarity.ms',
  'sentry.io',
];

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const out = [];
  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(full)));
    else if (full.endsWith('.js') || full.endsWith('.css')) out.push(full);
  }
  return out;
}

async function main() {
  let hits = 0;
  let files;
  try {
    files = await walk(STATIC_DIR);
  } catch {
    console.warn('⚠ .next/static not found; skipping third-party check.');
    return;
  }

  for (const file of files) {
    const content = await readFile(file, 'utf-8');
    for (const host of FORBIDDEN_HOSTS) {
      if (content.includes(host)) {
        console.error(`❌ ${file} references forbidden host: ${host}`);
        hits++;
      }
    }
  }

  if (hits > 0) {
    console.error(`\n❌ ${hits} third-party reference(s) detected in client bundles.`);
    process.exit(1);
  }
  console.log('✓ Zero forbidden third-party references in client bundles.');
}

main().catch((e) => { console.error(e); process.exit(1); });
