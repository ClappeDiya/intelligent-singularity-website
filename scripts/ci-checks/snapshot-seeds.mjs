#!/usr/bin/env node
// scripts/ci-checks/snapshot-seeds.mjs
import { mkdirSync, writeFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';

function tsEval(modulePath, exportName) {
  // Use static import syntax — tsx -e treats it as ESM and the named export resolves correctly.
  const code = `import { ${exportName} } from '${modulePath}'; console.log(JSON.stringify(${exportName}))`;
  const res = spawnSync(
    'pnpm',
    ['exec', 'tsx', '-e', code],
    { encoding: 'utf8', shell: false }
  );
  if (res.status !== 0) {
    console.error(`[snapshot-seeds] tsEval failed for ${exportName}:`);
    console.error(res.stderr);
    process.exit(1);
  }
  const lines = res.stdout.trim().split('\n').filter(Boolean);
  const last = lines[lines.length - 1];
  try {
    return JSON.parse(last);
  } catch (err) {
    console.error(`[snapshot-seeds] could not parse output of ${exportName}:`, err);
    console.error('stdout:', res.stdout);
    process.exit(1);
  }
}

function readTags() {
  const res = spawnSync(
    'git',
    ['log', '--tags', '--simplify-by-decoration', '--pretty=%h tag: %S %aI'],
    { encoding: 'utf8', shell: false }
  );
  if (res.status !== 0) return [];
  const out = [];
  for (const raw of res.stdout.split('\n')) {
    const m = raw.trim().match(/^([0-9a-f]{7,40})\s+tag:\s+(v[0-9][^\s]*)\s+([0-9T:\-+.Z]+)$/);
    if (m) out.push({ slug: m[2], gitSha: m[1], date: m[3] });
  }
  return out;
}

mkdirSync('.ci/seed-snapshots', { recursive: true });

const roadmap = tsEval('./src/lib/seed/new-pages/roadmap.ts', 'ROADMAP_SEED');
writeFileSync('.ci/seed-snapshots/roadmap.json', JSON.stringify(roadmap, null, 2));

const insights = tsEval('./src/lib/seed/new-pages/insights.ts', 'INSIGHTS_SEED');
writeFileSync('.ci/seed-snapshots/insights.json', JSON.stringify(insights, null, 2));

const trust = tsEval('./src/lib/seed/new-pages/trust.ts', 'TRUST_PAGE_SEED');
writeFileSync(
  '.ci/seed-snapshots/trust-subprocessors.json',
  JSON.stringify(trust.subprocessors, null, 2)
);

// Prefer hand-authored CHANGELOG_SEED over bare git tags — that's the real changelog content.
// Fall back to git tags when available; both sources are acceptable for the authenticity gate.
const handWritten = tsEval('./src/lib/seed/new-pages/changelog.ts', 'CHANGELOG_SEED');
const tagBased = readTags();
const changelog = [...handWritten.map((e) => ({ slug: e.slug, gitSha: e.gitSha, date: e.releaseDate })), ...tagBased];
writeFileSync('.ci/seed-snapshots/changelog.json', JSON.stringify(changelog, null, 2));

console.log('[snapshot-seeds] wrote .ci/seed-snapshots/*');
