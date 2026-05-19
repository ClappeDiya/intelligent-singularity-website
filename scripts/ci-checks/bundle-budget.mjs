#!/usr/bin/env node
import { readFile } from 'node:fs/promises';

const FIRST_PAINT_LIMIT_KB = 50;
const SHARED_CHUNKS_LIMIT_KB = 150;

async function main() {
  let pageSizes;
  try {
    pageSizes = JSON.parse(await readFile('.next/page-sizes.json', 'utf-8'));
  } catch {
    console.error('❌ .next/page-sizes.json not found. Run measure-page-sizes.mjs first.');
    process.exit(1);
  }

  if (Object.keys(pageSizes).length === 0) {
    console.error('❌ page-sizes.json is empty — measurement produced nothing to check.');
    process.exit(1);
  }

  let fails = 0;

  for (const [route, bytes] of Object.entries(pageSizes)) {
    const kb = bytes / 1024;
    const limit = route === '__shared_chunks' ? SHARED_CHUNKS_LIMIT_KB : FIRST_PAINT_LIMIT_KB;
    const label = route === '__shared_chunks' ? `shared rootMainFiles (limit ${limit} KB)` : route;
    const mark = kb <= limit ? '✓' : '✗';
    console.log(`  ${mark} ${label.padEnd(50)} ${kb.toFixed(1)} KB (gzip)`);
    if (kb > limit) fails++;
  }

  if (fails > 0) {
    console.error(`\n❌ ${fails} entry(ies) exceed budget.`);
    process.exit(1);
  }
  console.log('\n✓ All measured entries within budget.');
}

main().catch((e) => { console.error(e); process.exit(1); });
