import { describe, it, expect } from 'vitest';
import { spawnSync } from 'node:child_process';

function runScript(argv: string[]) {
  return spawnSync('node', ['scripts/ci-checks/verify-outbound-links.mjs', ...argv], {
    encoding: 'utf8',
    shell: false,
  });
}

describe('scripts/ci-checks/verify-outbound-links.mjs', () => {
  it('exits 0 with no URLs', () => {
    const r = runScript([]);
    expect(r.status).toBe(0);
    expect(r.stdout).toContain('PASS');
  });

  it('exits 0 when URL resolves', { timeout: 15000 }, () => {
    const r = runScript(['--urls=https://example.com']);
    expect(r.status).toBe(0);
  });

  it('exits 1 when URL returns 404', { timeout: 15000 }, () => {
    const r = runScript(['--urls=https://example.com/definitely-404-xyz-12345']);
    expect(r.status).toBe(1);
  });
});
