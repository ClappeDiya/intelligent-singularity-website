#!/usr/bin/env node
import { readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, v] = a.replace(/^--/, '').split('=');
    return [k, v ?? 'true'];
  })
);

const ROOT = path.resolve(args.path ?? 'src/lib/seed');
const MAX = Number(args.maxGrade ?? 10);
const EXT = (args.ext ?? '.ts,.tsx,.mjs,.md,.txt').split(',');

const VOWELS = /[aeiouy]+/g;
function syllables(w) {
  const x = w.toLowerCase().replace(/[^a-z]/g, '');
  if (x.length <= 3) return 1;
  const c = x.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '').replace(/^y/, '');
  const m = c.match(VOWELS);
  return Math.max(1, m ? m.length : 1);
}
function grade(text) {
  const t = text.trim();
  if (!t) return 0;
  const sents = t.split(/[.!?]+/).filter((s) => s.trim());
  const words = t.split(/\s+/).filter((w) => /[a-zA-Z]/.test(w));
  if (!sents.length || !words.length) return 0;
  const syl = words.reduce((n, w) => n + syllables(w), 0);
  return 0.39 * (words.length / sents.length) + 11.8 * (syl / words.length) - 15.59;
}

function walk(dir) {
  const out = [];
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    return out;
  }
  for (const name of entries) {
    if (name.startsWith('.') || name === 'node_modules') continue;
    const p = path.join(dir, name);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else if (EXT.some((e) => p.endsWith(e))) out.push(p);
  }
  return out;
}

const STRING_RE = /["'`]([^"'`\n]{40,})["'`]/g;
const MD_PARA_RE = /(?:^|\n)([^\n#`>|\-*]{60,})(?:\n|$)/g;

const failures = [];
const files = walk(ROOT);
for (const f of files) {
  const src = readFileSync(f, 'utf8');
  const isMd = f.endsWith('.md') || f.endsWith('.txt');
  const re = isMd ? MD_PARA_RE : STRING_RE;
  let m;
  while ((m = re.exec(src))) {
    const txt = m[1].trim();
    if (txt.split(/\s+/).length < 12) continue;
    const g = grade(txt);
    if (g > MAX) {
      failures.push({ file: f, grade: g.toFixed(1), snippet: txt.slice(0, 80) + '...' });
    }
  }
}

if (failures.length) {
  console.error(`\n[readability] ${failures.length} paragraph(s) exceed grade ${MAX}:`);
  for (const f of failures) console.error(`  ${f.file} · grade ${f.grade}\n    "${f.snippet}"`);
  process.exit(1);
}
console.log(`[readability] PASS — ${files.length} files scanned, all within grade ${MAX}`);
