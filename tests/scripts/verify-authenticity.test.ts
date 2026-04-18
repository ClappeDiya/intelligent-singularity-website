import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { spawnSync } from 'node:child_process';
import { writeFileSync, mkdirSync, rmSync, existsSync } from 'node:fs';
import path from 'node:path';

const TMP = path.join(process.cwd(), '.authenticity-test-fixtures');

function runScript(argv: string[]) {
  return spawnSync('node', ['scripts/ci-checks/verify-authenticity.mjs', ...argv], {
    encoding: 'utf8',
    shell: false,
  });
}

describe('scripts/ci-checks/verify-authenticity.mjs', () => {
  beforeEach(() => mkdirSync(TMP, { recursive: true }));
  afterEach(() => { if (existsSync(TMP)) rmSync(TMP, { recursive: true }); });

  it('fails when shipped roadmap item has no gitRefs', () => {
    writeFileSync(
      path.join(TMP, 'roadmap.json'),
      JSON.stringify([{ slug: 'foo', status: 'shipped', gitRefs: [] }])
    );
    const r = runScript([`--roadmap=${TMP}/roadmap.json`]);
    expect(r.status).toBe(1);
  });

  it('fails when journal post has no sources', () => {
    writeFileSync(
      path.join(TMP, 'posts.json'),
      JSON.stringify([{ slug: 'bar', title: 'T', sources: [] }])
    );
    const r = runScript([`--posts=${TMP}/posts.json`]);
    expect(r.status).toBe(1);
  });

  it('passes valid fixtures', () => {
    writeFileSync(
      path.join(TMP, 'roadmap.json'),
      JSON.stringify([{ slug: 'foo', status: 'shipped', gitRefs: ['https://github.com/x/y/pull/1'] }])
    );
    writeFileSync(
      path.join(TMP, 'posts.json'),
      JSON.stringify([{ slug: 'bar', title: 'T', sources: [{ label: 'Vision', url_or_path: 'VISION_STATEMENT.md' }] }])
    );
    const r = runScript([`--roadmap=${TMP}/roadmap.json`, `--posts=${TMP}/posts.json`]);
    expect(r.status).toBe(0);
    expect(r.stdout).toContain('PASS');
  });
});
