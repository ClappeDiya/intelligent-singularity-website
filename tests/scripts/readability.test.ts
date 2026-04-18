import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { spawnSync } from 'node:child_process';
import { writeFileSync, mkdirSync, rmSync, existsSync } from 'node:fs';
import path from 'node:path';

const TMP = path.join(process.cwd(), '.readability-test-fixtures');

function runScript(argv: string[]) {
  return spawnSync('node', ['scripts/ci-checks/readability.mjs', ...argv], {
    encoding: 'utf8',
    shell: false,
  });
}

describe('scripts/ci-checks/readability.mjs', () => {
  beforeEach(() => mkdirSync(TMP, { recursive: true }));
  afterEach(() => { if (existsSync(TMP)) rmSync(TMP, { recursive: true }); });

  it('exits 0 when all text is at or below maxGrade', () => {
    writeFileSync(
      path.join(TMP, 'ok.txt'),
      'We write slowly. We cite every claim. You can trust us.'
    );
    const r = runScript([`--path=${TMP}`, '--maxGrade=10']);
    expect(r.status).toBe(0);
    expect(r.stdout).toContain('PASS');
  });

  it('exits 1 when text exceeds maxGrade', () => {
    writeFileSync(
      path.join(TMP, 'bad.txt'),
      'Notwithstanding aforementioned contractual obligations, parties shall indemnify one another for any consequential damages arising from unforeseeable jurisdictional ambiguities that may or may not materialise through a complex multifaceted regulatory framework.'
    );
    const r = runScript([`--path=${TMP}`, '--maxGrade=10']);
    expect(r.status).toBe(1);
  });
});
