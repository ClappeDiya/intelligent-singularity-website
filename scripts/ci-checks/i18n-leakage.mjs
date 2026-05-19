#!/usr/bin/env node
// Scans customer-facing components for hardcoded English JSX text that should be translated.
// Customer-facing components live in src/components/home/, src/components/pages/, src/components/layout/,
// src/components/seo/ (limited), and src/app/(public)/[locale]/**/page.tsx (and similar).
//
// What this catches:
//  - <h1>Hello world</h1>            → flagged (JsxText with letters)
//  - <Link>Read more</Link>           → flagged
//  - <Foo title="Static heading" />  → flagged (JSX attribute string literal in an "i18n-likely" attribute name)
//  - <a aria-label={`Email ${x}`} /> → flagged (template literal initializer with English chunks)
//  - <img alt={`Photo of ${who}`} /> → flagged (same)
//
// What this allows:
//  - {tFoo('key')}, {t.bar('key')}    → translation call
//  - {someProp}, {hp.something}       → variable interpolation
//  - text containing only non-alpha chars (→, ·, ↗, numbers)
//  - text containing only known brand strings or short stop-words (Visit, OK, etc., per ALLOWLIST_STRINGS)
//  - file with an opt-out marker `// i18n-leakage:file-ignore` at top
//  - any line preceded by `// i18n-leakage:next-line-ignore`
//
// Usage:
//  node scripts/ci-checks/i18n-leakage.mjs            # advisory (warn but always exit 0)
//  node scripts/ci-checks/i18n-leakage.mjs --check    # exit 1 if any findings
//
// Exit codes: 0 (always in advisory mode; success in --check mode), 1 (--check mode with findings).

import { readdir, readFile } from 'node:fs/promises';
import { join, relative } from 'node:path';
import process from 'node:process';
import ts from 'typescript';

const ROOTS = [
  'src/components/home',
  'src/components/pages',
  'src/components/layout',
  'src/app/(public)',
];

// Schema-builder calls whose name/description args end up inside a JSON-LD <script>
// payload that search engines and AI assistants read. Hardcoded English here is an
// SEO + multilingual-discovery leak. Enforced as fatal after the original 19-source
// backlog was migrated in Cycles 19-36 (2026-05-17 → 2026-05-18).
const SCHEMA_HELPERS = new Set(['getWebPageSchema', 'getBreadcrumbSchema']);
const SCHEMA_HELPERS_ARE_FATAL = true;

const ATTRIBUTE_NAMES_TO_CHECK = new Set([
  // Component-prop conventions
  'title', 'label', 'tagline', 'description', 'heading', 'body',
  'lede', 'eyebrow', 'kicker', 'linkText', 'cta', 'subtitle', 'placeholder',
  'errorMessage', 'successMessage', 'privacyNote',
  // DOM accessibility attributes (text that reaches assistive tech)
  'aria-label', 'aria-description', 'aria-roledescription',
  'aria-placeholder', 'aria-valuetext', 'alt',
]);

const ALLOWLIST_STRINGS = new Set([
  'Intelligent Singularity', 'ITU', 'ITU 2025', 'Clappe', 'ClapBill', 'ClapDiet',
  'ClapMove', 'Clapwork', 'ClapPay', 'ClapMed', 'Apogee', 'Joint Exercise',
  'RSS', 'Visit', 'OK', 'Next', 'Prev',
  'careers@…', 'press@…', 'security@…',
]);

const SHORT_STOPWORDS = new Set([
  'the', 'and', 'or', 'a', 'an', 'of', 'in', 'on', 'at', 'to', 'is', 'are',
  'by', 'for', 'as', 'it', 'we', 'i', 'you',
]);

function looksLikeEnglish(text) {
  const trimmed = text.trim();
  if (!trimmed) return false;
  if (ALLOWLIST_STRINGS.has(trimmed)) return false;
  const alphaCount = (trimmed.match(/[A-Za-z]/g) || []).length;
  if (alphaCount < 3) return false;
  // Single short stopword like "the" is noise; require either > 4 chars OR multi-word
  const words = trimmed.split(/\s+/).filter(Boolean);
  if (words.length === 1 && SHORT_STOPWORDS.has(words[0].toLowerCase())) return false;
  return true;
}

async function walk(dir) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return [];
  }
  const out = [];
  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(full)));
    else if (full.endsWith('.tsx')) out.push(full);
  }
  return out;
}

function scanFile(filePath, source) {
  if (source.includes('// i18n-leakage:file-ignore')) return [];
  const sf = ts.createSourceFile(filePath, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const findings = [];
  const ignoredLines = new Set();
  // Collect "next-line-ignore" markers
  source.split('\n').forEach((line, i) => {
    if (line.includes('// i18n-leakage:next-line-ignore')) ignoredLines.add(i + 2); // next line is 1-indexed (+1) +1 more
  });

  function record(node, text, kind, advisory = false) {
    const { line, character } = sf.getLineAndCharacterOfPosition(node.getStart());
    const lineNum = line + 1;
    if (ignoredLines.has(lineNum)) return;
    findings.push({ file: filePath, line: lineNum, col: character + 1, kind, text: text.replace(/\s+/g, ' ').slice(0, 80), advisory });
  }

  // Pull a literal-string value from a PropertyAssignment's initializer if it's a
  // StringLiteral or NoSubstitutionTemplateLiteral; returns null for anything else
  // (function calls like `t('key')`, identifiers, etc. — those are presumed translated).
  function literalStringValue(initializer) {
    if (ts.isStringLiteral(initializer) || ts.isNoSubstitutionTemplateLiteral(initializer)) {
      return initializer.text;
    }
    return null;
  }

  // For getBreadcrumbSchema's crumbs array, walk each element and check its `name:` prop.
  function checkCrumbsArray(arrayExpr) {
    if (!ts.isArrayLiteralExpression(arrayExpr)) return;
    for (const el of arrayExpr.elements) {
      if (!ts.isObjectLiteralExpression(el)) continue;
      for (const prop of el.properties) {
        if (!ts.isPropertyAssignment(prop)) continue;
        if (prop.name.getText() !== 'name') continue;
        const text = literalStringValue(prop.initializer);
        if (text && looksLikeEnglish(text)) record(prop, text, 'schema-arg:crumb-name', true);
      }
    }
  }

  function visit(node) {
    // JSX text content: <Foo>Hello</Foo>
    if (ts.isJsxText(node)) {
      const text = node.text;
      if (looksLikeEnglish(text)) record(node, text, 'jsx-text');
    }
    // JSX attribute initializer, only for i18n-likely attribute names.
    // Covers three shapes that reach the DOM as text:
    //   <Foo title="Hello" />                        — StringLiteral
    //   <Foo title={`Hello ${x} world`} />            — TemplateExpression (with substitutions)
    //   <Foo title={`Hello world`} />                 — NoSubstitutionTemplateLiteral
    if (ts.isJsxAttribute(node) && node.initializer) {
      const attrName = node.name.getText();
      if (ATTRIBUTE_NAMES_TO_CHECK.has(attrName)) {
        if (ts.isStringLiteral(node.initializer)) {
          const text = node.initializer.text;
          if (looksLikeEnglish(text)) record(node, text, `attr:${attrName}`);
        } else if (ts.isJsxExpression(node.initializer) && node.initializer.expression) {
          const expr = node.initializer.expression;
          if (ts.isNoSubstitutionTemplateLiteral(expr)) {
            if (looksLikeEnglish(expr.text)) record(node, expr.text, `attr:${attrName}`);
          } else if (ts.isTemplateExpression(expr)) {
            // Concatenate head + each span's literal, marking substitutions with {x}
            // so a chunk like `Email ${y}` evaluates as "Email {x}" — enough alpha for detection.
            const parts = [expr.head.text];
            for (const span of expr.templateSpans) {
              parts.push('{x}');
              parts.push(span.literal.text);
            }
            const collapsed = parts.join('');
            if (looksLikeEnglish(collapsed)) record(node, collapsed, `attr:${attrName}`);
          }
        }
      }
    }
    // CallExpression to a known schema-builder: peek into its first-arg ObjectLiteralExpression
    // and flag hardcoded English strings on the i18n-likely properties (`name`, `description`,
    // and crumbs[].name for the breadcrumb variant). Findings here are advisory by default
    // (SCHEMA_HELPERS_ARE_FATAL=false) because there is a large pre-existing backlog of
    // ~16 page files that still pass English literals; they will be migrated cycle-by-cycle.
    if (ts.isCallExpression(node) && ts.isIdentifier(node.expression) && SCHEMA_HELPERS.has(node.expression.text)) {
      const helperName = node.expression.text;
      const arg0 = node.arguments[0];
      if (arg0 && ts.isObjectLiteralExpression(arg0)) {
        for (const prop of arg0.properties) {
          if (!ts.isPropertyAssignment(prop)) continue;
          const propName = prop.name.getText();
          if (propName === 'name' || propName === 'description') {
            const text = literalStringValue(prop.initializer);
            if (text && looksLikeEnglish(text)) record(prop, text, `schema-arg:${propName}`, true);
          } else if (propName === 'crumbs' && helperName === 'getBreadcrumbSchema') {
            checkCrumbsArray(prop.initializer);
          }
        }
      }
    }
    ts.forEachChild(node, visit);
  }
  visit(sf);
  return findings;
}

async function main() {
  const checkMode = process.argv.includes('--check');
  const pathOverride = process.argv.find((a) => a.startsWith('--path='));
  const roots = pathOverride ? [pathOverride.slice('--path='.length)] : ROOTS;
  const files = (await Promise.all(roots.map(walk))).flat();
  const allFindings = [];
  for (const file of files) {
    const source = await readFile(file, 'utf-8');
    const findings = scanFile(file, source);
    allFindings.push(...findings);
  }
  const fatal = allFindings.filter((f) => !f.advisory || SCHEMA_HELPERS_ARE_FATAL);
  const advisory = allFindings.filter((f) => f.advisory && !SCHEMA_HELPERS_ARE_FATAL);

  if (fatal.length === 0 && advisory.length === 0) {
    console.log('✓ No hardcoded English JSX strings found in customer-facing components.');
    return;
  }
  if (fatal.length > 0) {
    console.log(`⚠ ${fatal.length} hardcoded English string(s) detected in customer-facing components:`);
    for (const f of fatal) {
      const rel = relative(process.cwd(), f.file);
      console.log(`  ${rel}:${f.line}:${f.col}  [${f.kind}]  "${f.text}"`);
    }
  }
  if (advisory.length > 0) {
    console.log(`\nℹ ${advisory.length} advisory finding(s) — not blocking (set SCHEMA_HELPERS_ARE_FATAL=true to enforce):`);
    for (const f of advisory) {
      const rel = relative(process.cwd(), f.file);
      console.log(`  ${rel}:${f.line}:${f.col}  [${f.kind}]  "${f.text}"`);
    }
  }
  if (checkMode && fatal.length > 0) {
    console.log(`\n❌ \`pnpm lint:i18n-leakage --check\` failed: ${fatal.length} string(s) need translation routing.`);
    console.log('   Move each string to messages/{locale}.json and replace with useTranslations(\'namespace\') / getTranslations(...).');
    console.log('   To explicitly accept a finding, add // i18n-leakage:next-line-ignore on the line before, or // i18n-leakage:file-ignore at file top.');
    process.exit(1);
  }
  if (fatal.length === 0 && advisory.length > 0) {
    console.log('\n✓ No fatal findings. Advisory items above will be enforced once SCHEMA_HELPERS_ARE_FATAL is flipped.');
  } else if (!checkMode) {
    console.log('\n  (Advisory mode. Run with --check to fail the build on findings.)');
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
