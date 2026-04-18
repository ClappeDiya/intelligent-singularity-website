import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { spawnSync } from 'node:child_process';

describe('rollback artefacts', () => {
  it('new-collections.sql exists and targets only the three new collections', () => {
    const p = 'scripts/rollback/new-collections.sql';
    expect(existsSync(p)).toBe(true);
    const src = readFileSync(p, 'utf8');
    for (const tbl of ['release_notes', 'roadmap_items', 'journal_posts']) {
      expect(src).toContain(`DROP TABLE IF EXISTS ${tbl}`);
    }
    for (const global of ['status_page', 'trust_page', 'help_page']) {
      expect(src).toContain(`DROP TABLE IF EXISTS ${global}`);
    }
    // Must not drop any pre-existing table.
    for (const tbl of ['products', 'users', 'commitment_items', 'legal_pages']) {
      expect(src).not.toContain(`DROP TABLE IF EXISTS ${tbl}`);
    }
    // Wrapped in a transaction.
    expect(src).toContain('BEGIN;');
    expect(src).toContain('COMMIT;');
  });

  it('new-collections.sh exists, is executable, refuses without --confirm', () => {
    const p = 'scripts/rollback/new-collections.sh';
    expect(existsSync(p)).toBe(true);
    const mode = statSync(p).mode & 0o111;
    expect(mode).not.toBe(0);
    const res = spawnSync('bash', [p], { encoding: 'utf8', shell: false });
    expect(res.status).toBe(1);
    expect(res.stderr).toContain('--confirm');
  });
});
