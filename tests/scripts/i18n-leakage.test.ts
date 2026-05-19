import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { spawnSync } from 'node:child_process';
import { writeFileSync, mkdirSync, rmSync, existsSync } from 'node:fs';
import path from 'node:path';

const TMP = path.join(process.cwd(), '.i18n-leakage-test-fixtures');

function runScript(extraArgs: string[] = []) {
  return spawnSync('node', ['scripts/ci-checks/i18n-leakage.mjs', `--path=${TMP}`, '--check', ...extraArgs], {
    encoding: 'utf8',
    shell: false,
  });
}

function fixture(name: string, body: string) {
  writeFileSync(path.join(TMP, name), body, 'utf-8');
}

describe('scripts/ci-checks/i18n-leakage.mjs', () => {
  beforeEach(() => mkdirSync(TMP, { recursive: true }));
  afterEach(() => { if (existsSync(TMP)) rmSync(TMP, { recursive: true }); });

  it('passes when all strings flow through translations', () => {
    fixture('Ok.tsx', `
      export function Ok({ t, email }: { t: (k: string, v?: Record<string, string>) => string; email: string }) {
        return (
          <a
            href={\`mailto:\${email}\`}
            aria-label={t('emailLinkAriaLabel', { email })}
            alt={t('decorativeAlt')}
          >{t('cta')}</a>
        );
      }
    `);
    const r = runScript();
    expect(r.status).toBe(0);
    expect(r.stdout).toContain('No hardcoded English JSX strings');
  });

  it('flags hardcoded JsxText', () => {
    fixture('Text.tsx', `export const X = () => <h1>Hello world from the homepage</h1>;`);
    const r = runScript();
    expect(r.status).toBe(1);
    expect(r.stdout).toContain('[jsx-text]');
  });

  it('flags string-literal attribute initializers on i18n-likely attrs', () => {
    fixture('Attr.tsx', `export const X = () => <button title="Submit the form" />;`);
    const r = runScript();
    expect(r.status).toBe(1);
    expect(r.stdout).toContain('[attr:title]');
  });

  it('flags template-literal aria-label (regression for Cycle 18 scanner upgrade)', () => {
    // Was invisible before the upgrade: the StringLiteral check did not walk JsxExpression initializers.
    fixture('Tpl.tsx', `
      export const X = ({ name }: { name: string }) =>
        <a aria-label={\`Email \${name}\`} href="#" />;
    `);
    const r = runScript();
    expect(r.status).toBe(1);
    expect(r.stdout).toContain('[attr:aria-label]');
    expect(r.stdout).toContain('Email {x}');
  });

  it('flags template-literal alt attribute', () => {
    fixture('Alt.tsx', `
      export const X = ({ who }: { who: string }) =>
        // eslint-disable-next-line @next/next/no-img-element
        <img src="/x.png" alt={\`Photo of \${who} in the studio\`} />;
    `);
    const r = runScript();
    expect(r.status).toBe(1);
    expect(r.stdout).toContain('[attr:alt]');
  });

  it('flags no-substitution template literals on i18n-likely attrs', () => {
    fixture('NoSub.tsx', `export const X = () => <button title={\`Submit the form\`} />;`);
    const r = runScript();
    expect(r.status).toBe(1);
    expect(r.stdout).toContain('[attr:title]');
  });

  it('allows template literals that only interpolate variables (no English text)', () => {
    fixture('OnlyVars.tsx', `
      export const X = ({ a, b }: { a: string; b: string }) =>
        <button aria-label={\`\${a}-\${b}\`} />;
    `);
    const r = runScript();
    expect(r.status).toBe(0);
  });

  it('emits FATAL findings for getWebPageSchema with string-literal name/description', () => {
    fixture('Schema.tsx', `
      import { getWebPageSchema } from '@/lib/schema';
      export const data = getWebPageSchema({
        locale: 'en',
        pathname: '/x',
        name: 'Hardcoded Page Title',
        description: 'Hardcoded description goes here.',
      });
    `);
    const r = runScript();
    expect(r.status).toBe(1);
    expect(r.stdout).toContain('[schema-arg:name]');
    expect(r.stdout).toContain('[schema-arg:description]');
    expect(r.stdout).toContain('hardcoded English string(s) detected');
  });

  it('emits FATAL findings for getBreadcrumbSchema crumb names', () => {
    fixture('Crumbs.tsx', `
      import { getBreadcrumbSchema } from '@/lib/schema';
      export const data = getBreadcrumbSchema({
        locale: 'en',
        crumbs: [
          { name: 'Home', pathname: '/' },
          { name: 'Status', pathname: '/status' },
        ],
      });
    `);
    const r = runScript();
    expect(r.status).toBe(1);
    expect(r.stdout).toContain('[schema-arg:crumb-name]');
  });

  it('treats t() calls in schema args as already-translated (no finding)', () => {
    fixture('SchemaTranslated.tsx', `
      import { getWebPageSchema } from '@/lib/schema';
      const t = (k: string) => k;
      export const data = getWebPageSchema({
        locale: 'en',
        pathname: '/x',
        name: t('schemaName'),
        description: t('schemaDescription'),
      });
    `);
    const r = runScript();
    expect(r.status).toBe(0);
    expect(r.stdout).not.toContain('[schema-arg:');
  });

  it('respects // i18n-leakage:next-line-ignore', () => {
    fixture('Ignored.tsx', `
      export const X = () => (
        // i18n-leakage:next-line-ignore
        <h1>Brand-name H1 we intentionally keep in English</h1>
      );
    `);
    const r = runScript();
    expect(r.status).toBe(0);
  });
});
