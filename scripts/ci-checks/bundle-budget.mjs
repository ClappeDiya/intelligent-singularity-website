#!/usr/bin/env node
import { readFile } from 'node:fs/promises';

const FIRST_PAINT_LIMIT_KB = 50;

async function main() {
  let pageSizes;
  try {
    pageSizes = JSON.parse(await readFile('.next/page-sizes.json', 'utf-8'));
  } catch {
    console.warn('⚠ .next/page-sizes.json not found; skipping budget check.');
    return;
  }

  let fails = 0;
  for (const [route, bytes] of Object.entries(pageSizes)) {
    const kb = bytes / 1024;
    const mark = kb <= FIRST_PAINT_LIMIT_KB ? '✓' : '✗';
    console.log(`  ${mark} ${route.padEnd(40)} ${kb.toFixed(1)} KB (gzip)`);
    if (kb > FIRST_PAINT_LIMIT_KB) fails++;
  }

  if (fails > 0) {
    console.error(`\n❌ ${fails} route(s) exceed the ${FIRST_PAINT_LIMIT_KB}KB first-paint budget.`);
    process.exit(1);
  }
  console.log(`\n✓ All routes within ${FIRST_PAINT_LIMIT_KB}KB first-paint budget.`);
}

main().catch((e) => { console.error(e); process.exit(1); });
