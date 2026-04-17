#!/usr/bin/env node
import { readFileSync, existsSync } from 'node:fs';

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, v] = a.replace(/^--/, '').split('=');
    return [k, v ?? 'true'];
  })
);

function load(p) {
  if (!p || !existsSync(p)) return [];
  try {
    return JSON.parse(readFileSync(p, 'utf8'));
  } catch {
    return [];
  }
}

const failures = [];

for (const item of load(args.roadmap)) {
  if (item.status === 'shipped' && (!item.gitRefs || item.gitRefs.length === 0)) {
    failures.push(`roadmap:${item.slug} marked shipped with empty gitRefs`);
  }
}

for (const post of load(args.posts)) {
  if (!post.sources || post.sources.length === 0) {
    failures.push(`insights:${post.slug} has no sources[]`);
  }
}

for (const entry of load(args.changelog)) {
  if (!entry.gitSha || !/^[0-9a-f]{7,40}$/i.test(entry.gitSha)) {
    failures.push(`changelog:${entry.slug} missing/invalid gitSha`);
  }
}

for (const s of load(args.trust)) {
  if (!s.name || !s.purpose || !s.location) {
    failures.push(`trust:subprocessor missing name/purpose/location: ${JSON.stringify(s).slice(0, 80)}`);
  }
}

if (failures.length) {
  console.error(`\n[verify-authenticity] ${failures.length} violation(s):`);
  for (const f of failures) console.error(`  ${f}`);
  process.exit(1);
}
console.log('[verify-authenticity] PASS — all authenticity rules satisfied');
