#!/usr/bin/env node
import { readFileSync, existsSync } from 'node:fs';

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, v] = a.replace(/^--/, '').split('=');
    return [k, v ?? 'true'];
  })
);

const urls = [];
if (args.urls) urls.push(...args.urls.split(','));
if (args.file && existsSync(args.file)) {
  const content = readFileSync(args.file, 'utf8');
  try {
    const parsed = JSON.parse(content);
    if (Array.isArray(parsed)) urls.push(...parsed);
  } catch {
    urls.push(...content.split(/\s+/).filter((s) => /^https?:\/\//.test(s)));
  }
}

if (!urls.length) {
  console.log('[verify-outbound-links] PASS — no URLs to check');
  process.exit(0);
}

const failures = [];
for (const url of urls) {
  try {
    let res = await fetch(url, {
      method: 'HEAD',
      redirect: 'follow',
      signal: AbortSignal.timeout(8000),
    });
    if (res.status >= 400) {
      res = await fetch(url, {
        method: 'GET',
        redirect: 'follow',
        signal: AbortSignal.timeout(8000),
      });
      if (res.status >= 400) failures.push({ url, status: res.status });
    }
  } catch (err) {
    failures.push({ url, status: `ERROR: ${err?.message ?? err}` });
  }
}

if (failures.length) {
  console.error(`\n[verify-outbound-links] ${failures.length} link(s) failed:`);
  for (const f of failures) console.error(`  ${f.status}  ${f.url}`);
  process.exit(1);
}
console.log(`[verify-outbound-links] PASS — ${urls.length} URL(s) resolved`);
