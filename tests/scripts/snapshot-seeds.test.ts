import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';

describe('scripts/ci-checks/snapshot-seeds.mjs', () => {
  it('writes roadmap/insights/changelog/trust JSON snapshots', () => {
    const res = spawnSync('node', ['scripts/ci-checks/snapshot-seeds.mjs'], {
      encoding: 'utf8',
      shell: false,
    });
    expect(res.status, res.stderr).toBe(0);
    for (const name of ['roadmap', 'insights', 'changelog', 'trust-subprocessors']) {
      expect(existsSync(`.ci/seed-snapshots/${name}.json`)).toBe(true);
      const data = JSON.parse(readFileSync(`.ci/seed-snapshots/${name}.json`, 'utf8'));
      expect(Array.isArray(data)).toBe(true);
    }
  });
});
