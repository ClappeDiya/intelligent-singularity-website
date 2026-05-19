#!/usr/bin/env tsx
// Scans Payload CMS content for English-fallback leakage.
//
// Why this exists: the JSX scanner (scripts/ci-checks/i18n-leakage.mjs) catches hardcoded
// English in source files. It cannot see what's in the database — if a global or doc
// only has an EN value populated, Payload's fallback returns the EN string for every
// other locale, and users in those locales see English. This script queries Payload
// with `fallbackLocale: 'null'` so missing translations come back as null, then flags:
//   - EMPTY:    a required localized field that is null/empty in a non-EN locale
//   - FALLBACK: a localized field whose non-EN value is byte-identical to EN
//
// Usage:
//   pnpm tsx scripts/ci-checks/cms-content-leakage.ts            # advisory (always exit 0)
//   pnpm tsx scripts/ci-checks/cms-content-leakage.ts --check    # exit 1 if any findings
//   pnpm tsx scripts/ci-checks/cms-content-leakage.ts --json     # machine-readable output
//
// V1 scope: top-level localized text/textarea/richText fields on all 15 globals.
// V2 (cycle 39): adds opt-in collection scanning. Iterates configured collections,
// loads docs per locale, compares per-doc. Path includes the doc slug-or-id so a
// finding can be located in the admin panel. Configured collections live in
// SCANNED_COLLECTIONS — extend cycle-by-cycle as burndown progresses.
// Arrays/groups inside collections still deferred; per-item index expansion is
// the next scoping decision.

import 'dotenv/config';
import { getPayload, type Field } from 'payload';
import config from '@payload-config';

type Finding = {
  kind: 'EMPTY' | 'FALLBACK';
  scope: string;
  locale: string;
  path: string;
  enPreview: string;
  otherPreview: string;
};

const TRANSLATABLE_TYPES = new Set(['text', 'textarea', 'richText', 'email', 'code']);

// Per-path allowlist: scope + locale + path + value tuples the scanner should
// skip even when the non-EN value byte-matches the EN value. Use for genuine
// equal-by-coincidence cases — brand names, ISO codes, URLs, or words spelled
// identically across languages. Each entry MUST carry a reason so future
// maintainers can re-evaluate if EN copy changes.
const FALLBACK_ALLOWLIST: ReadonlyArray<{
  scope: string;
  locale: string;
  path: string;
  value: string;
  reason: string;
}> = [
  {
    scope: 'global:status-page',
    locale: 'id',
    path: 'eyebrow',
    value: 'STATUS',
    reason: '"STATUS" is the correct Indonesian word and rendered as an uppercase label — identical spelling to English by language coincidence, not a missing translation.',
  },
];

// Collections to scan for cross-locale leakage. Each slug here triggers a per-doc
// comparison of all top-level localized fields. legal-pages is intentionally
// excluded (no localized fields — schema choice; revisit when legal docs need
// per-locale translation). Arrays inside collections (e.g. release-notes.changes)
// still deferred until per-item path expansion lands.
const SCANNED_COLLECTIONS: ReadonlyArray<string> = [
  'journal-posts',
  'release-notes',
  'products',
  'commitment-items',
  'product-categories',
  'timeline-events',
  'roadmap-items',
  'contact-routes',
];

// Path-pattern allowlist: skip FALLBACK findings matching a regex on `path`
// within a scope. Use for known-deferred surfaces (e.g. a richText field whose
// per-locale translation is a planned later cycle and where the EN value is
// intentionally replicated to non-EN rows so the page still renders content).
// Coarser than FALLBACK_ALLOWLIST — use this when the deferred surface spans
// many docs/values; use FALLBACK_ALLOWLIST when it's one specific value.
const FALLBACK_PATH_ALLOWLIST: ReadonlyArray<{
  scope: string;
  pathPattern: RegExp;
  reason: string;
}> = [
  // (journal-posts.body entry retired in Cycle 48 — body de-localized: column
  // moved to journal_posts base table, journal_posts_locales.body dropped, schema
  // flag flipped to localized:false. Body is now a single shared field across
  // locales by design.)
  // (release-notes.summary entry retired in Cycle 44 — all 5 summaries are now
  // genuinely translated across 13 non-EN locales.)
  {
    scope: 'collection:roadmap-items',
    pathPattern: /\.(summary|whyItMatters)$/,
    reason: 'Roadmap item summaries + why-it-matters (6 items × 2 fields × 13 locales = 156 FALLBACK findings) deferred to a future cycle. Cycle 45 translated titles (78 strings) using the hybrid pattern from journal-posts (titles translated, body/long-form deferred). EN content replicated to non-EN rows because both fields are NOT NULL in the locales table.',
  },
];

// EMPTY path allowlist: same idea as FALLBACK_PATH_ALLOWLIST but for missing
// translations rather than EN-replicated values. Use when a localized field
// has no non-EN row yet and the translations are scoped to a later cycle.
const EMPTY_PATH_ALLOWLIST: ReadonlyArray<{
  scope: string;
  pathPattern: RegExp;
  reason: string;
}> = [
  // (roadmap-items.title entry retired in Cycle 45 — titles now translated for
  // all 13 non-EN locales. summary + whyItMatters moved to FALLBACK_PATH_ALLOWLIST
  // below since they're now EN-replicated to satisfy the NOT NULL constraint.)
];

function isAllowlistedEmpty(scope: string, path: string): boolean {
  return EMPTY_PATH_ALLOWLIST.some(
    (e) => e.scope === scope && e.pathPattern.test(path),
  );
}

function isAllowlistedFallback(scope: string, locale: string, path: string, value: unknown): boolean {
  if (typeof value === 'string') {
    if (FALLBACK_ALLOWLIST.some(
      (e) => e.scope === scope && e.locale === locale && e.path === path && e.value === value,
    )) return true;
  }
  return FALLBACK_PATH_ALLOWLIST.some(
    (e) => e.scope === scope && e.pathPattern.test(path),
  );
}

function collectLocalizedPaths(fields: Field[], prefix = ''): Array<{ path: string; type: string }> {
  const out: Array<{ path: string; type: string }> = [];
  for (const f of fields) {
    if (!('name' in f)) continue;
    const path = prefix ? `${prefix}.${f.name}` : f.name;
    if (TRANSLATABLE_TYPES.has(f.type) && (f as { localized?: boolean }).localized) {
      out.push({ path, type: f.type });
    }
    // Recurse into groups (group.localized=true marks the whole group; either way descend).
    if (f.type === 'group' && Array.isArray(f.fields)) {
      out.push(...collectLocalizedPaths(f.fields, path));
    }
    // Arrays handled in cycle 38+ — their per-item paths need index expansion at fetch time.
  }
  return out;
}

function getPath(obj: unknown, path: string): unknown {
  return path.split('.').reduce<unknown>((acc, seg) => {
    if (acc == null || typeof acc !== 'object') return undefined;
    return (acc as Record<string, unknown>)[seg];
  }, obj);
}

function preview(value: unknown): string {
  if (value == null) return '<null>';
  if (typeof value === 'string') return value.replace(/\s+/g, ' ').slice(0, 60);
  if (typeof value === 'object') return JSON.stringify(value).slice(0, 60);
  return String(value).slice(0, 60);
}

function isEmpty(value: unknown): boolean {
  if (value == null) return true;
  if (typeof value === 'string') return value.trim().length === 0;
  if (typeof value === 'object' && 'root' in (value as object)) {
    // Lexical richText: empty root with no children
    const root = (value as { root?: { children?: unknown[] } }).root;
    return !root?.children || root.children.length === 0;
  }
  return false;
}

function isLeakedFallback(enValue: unknown, otherValue: unknown, type: string): boolean {
  if (enValue == null || otherValue == null) return false;
  if (type === 'richText') {
    return JSON.stringify(enValue) === JSON.stringify(otherValue);
  }
  if (typeof enValue === 'string' && typeof otherValue === 'string') {
    return enValue === otherValue && enValue.trim().length > 0;
  }
  return false;
}

async function main() {
  const checkMode = process.argv.includes('--check');
  const jsonMode = process.argv.includes('--json');

  const resolvedConfig = await config;
  const localesConfig = resolvedConfig.localization;
  if (!localesConfig || typeof localesConfig === 'boolean') {
    console.error('No localization configured in payload.config — nothing to audit.');
    process.exit(0);
  }
  const localeCodes = localesConfig.locales.map((l) =>
    typeof l === 'string' ? l : l.code
  );
  const nonEnLocales = localeCodes.filter((c) => c !== 'en');

  const payload = await getPayload({ config });
  const findings: Finding[] = [];

  for (const global of resolvedConfig.globals ?? []) {
    const paths = collectLocalizedPaths(global.fields);
    if (paths.length === 0) continue;

    let enDoc: Record<string, unknown>;
    try {
      enDoc = (await payload.findGlobal({
        slug: global.slug,
        locale: 'en',
        fallbackLocale: 'null' as never,
        depth: 0,
      })) as unknown as Record<string, unknown>;
    } catch (e) {
      console.warn(`[skip] global:${global.slug} EN fetch failed:`, (e as Error).message);
      continue;
    }

    for (const locale of nonEnLocales) {
      let otherDoc: Record<string, unknown>;
      try {
        otherDoc = (await payload.findGlobal({
          slug: global.slug,
          locale: locale as 'en',
          fallbackLocale: 'null' as never,
          depth: 0,
        })) as unknown as Record<string, unknown>;
      } catch (e) {
        console.warn(`[skip] global:${global.slug} locale=${locale} fetch failed:`, (e as Error).message);
        continue;
      }

      for (const { path, type } of paths) {
        const enVal = getPath(enDoc, path);
        const otherVal = getPath(otherDoc, path);
        if (isEmpty(otherVal) && !isEmpty(enVal)) {
          if (isAllowlistedEmpty(`global:${global.slug}`, path)) continue;
          findings.push({
            kind: 'EMPTY',
            scope: `global:${global.slug}`,
            locale,
            path,
            enPreview: preview(enVal),
            otherPreview: preview(otherVal),
          });
        } else if (isLeakedFallback(enVal, otherVal, type)) {
          if (isAllowlistedFallback(`global:${global.slug}`, locale, path, otherVal)) {
            continue;
          }
          findings.push({
            kind: 'FALLBACK',
            scope: `global:${global.slug}`,
            locale,
            path,
            enPreview: preview(enVal),
            otherPreview: preview(otherVal),
          });
        }
      }
    }
  }

  for (const collection of resolvedConfig.collections ?? []) {
    if (!SCANNED_COLLECTIONS.includes(collection.slug)) continue;
    const paths = collectLocalizedPaths(collection.fields);
    if (paths.length === 0) continue;

    // Pull every doc per locale in one round-trip per locale, index by id.
    const docsByLocale = new Map<string, Map<string | number, Record<string, unknown>>>();
    for (const loc of localeCodes) {
      try {
        const res = await payload.find({
          collection: collection.slug as 'journal-posts',
          locale: loc as 'en',
          fallbackLocale: 'null' as never,
          limit: 1000,
          depth: 0,
        });
        const byId = new Map<string | number, Record<string, unknown>>();
        for (const d of res.docs as unknown as Array<Record<string, unknown>>) {
          byId.set(d.id as string | number, d);
        }
        docsByLocale.set(loc, byId);
      } catch (e) {
        console.warn(`[skip] collection:${collection.slug} locale=${loc} fetch failed:`, (e as Error).message);
      }
    }

    const enDocs = docsByLocale.get('en');
    if (!enDocs) continue;

    for (const [docId, enDoc] of enDocs) {
      // Prefer slug for the path identifier (human-readable in admin); fall back to id.
      const docIdent = (enDoc.slug as string | undefined) ?? String(docId);
      for (const locale of nonEnLocales) {
        const otherDoc = docsByLocale.get(locale)?.get(docId);
        if (!otherDoc) continue;
        for (const { path, type } of paths) {
          const enVal = getPath(enDoc, path);
          const otherVal = getPath(otherDoc, path);
          const scopedPath = `${docIdent}.${path}`;
          if (isEmpty(otherVal) && !isEmpty(enVal)) {
            if (isAllowlistedEmpty(`collection:${collection.slug}`, scopedPath)) continue;
            findings.push({
              kind: 'EMPTY',
              scope: `collection:${collection.slug}`,
              locale,
              path: scopedPath,
              enPreview: preview(enVal),
              otherPreview: preview(otherVal),
            });
          } else if (isLeakedFallback(enVal, otherVal, type)) {
            if (isAllowlistedFallback(`collection:${collection.slug}`, locale, scopedPath, otherVal)) {
              continue;
            }
            findings.push({
              kind: 'FALLBACK',
              scope: `collection:${collection.slug}`,
              locale,
              path: scopedPath,
              enPreview: preview(enVal),
              otherPreview: preview(otherVal),
            });
          }
        }
      }
    }
  }

  if (jsonMode) {
    process.stdout.write(JSON.stringify({ count: findings.length, findings }, null, 2));
  } else if (findings.length === 0) {
    const scopeSummary = SCANNED_COLLECTIONS.length > 0
      ? `globals + ${SCANNED_COLLECTIONS.join(', ')}`
      : 'globals';
    console.log(`✓ No CMS content leakage detected (${scopeSummary}).`);
  } else {
    const byScopeLocale = new Map<string, number>();
    for (const f of findings) {
      const key = `${f.scope}|${f.locale}|${f.kind}`;
      byScopeLocale.set(key, (byScopeLocale.get(key) ?? 0) + 1);
    }
    console.log(`⚠ ${findings.length} CMS content leakage finding(s):\n`);
    console.log('Summary by global × locale × kind:');
    const sortedKeys = Array.from(byScopeLocale.keys()).sort();
    for (const key of sortedKeys) {
      console.log(`  ${key.padEnd(50)} ${byScopeLocale.get(key)}`);
    }
    console.log('\nDetails (first 40):');
    for (const f of findings.slice(0, 40)) {
      console.log(
        `  [${f.kind.padEnd(8)}] ${f.scope.padEnd(30)} ${f.locale.padEnd(6)} ${f.path}`
      );
      if (f.kind === 'FALLBACK') {
        console.log(`             en="${f.enPreview}" ${f.locale}="${f.otherPreview}"`);
      } else {
        console.log(`             en="${f.enPreview}" ${f.locale}=<empty>`);
      }
    }
    if (findings.length > 40) {
      console.log(`  …and ${findings.length - 40} more (use --json for full output).`);
    }
  }

  if (checkMode && findings.length > 0) {
    console.log('\n❌ CMS content leakage check failed.');
    console.log('   For each finding, populate the locale via /api/seed-translations or admin panel.');
    process.exit(1);
  }

  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
