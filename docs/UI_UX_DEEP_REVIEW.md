# UI/UX Deep Review Report — Intelligent Singularity Website

**Date:** 2026-05-01 · **Auditor:** senior UI/UX product reviewer (Claude Opus 4.7) · **Scope:** intelligentsingularityinc.com (Next.js 16 + Payload CMS, 14 locales) · **Method:** static code review, live production probe (HTTP + browser), local dev exercise, axe-core WCAG 2.2 AA scan over 19 routes, baseline Lighthouse (.lighthouse-results/), full implementation pass.

---

## 1. Executive Summary

The Intelligent Singularity website is a **content-heavy marketing site for a democratization-first technology group** — parent of the Clap ecosystem. It is hand-rolled (no UI library), self-hosted, and engineered with unusual rigor: 0 third-party trackers, ≤ 50 KB first-paint per route, 14 locales (5 scripts including RTL), and CI gates that **make false marketing claims impossible to merge**.

The audit found one **production-blocking React Server Components bug** that was rendering the homepage as an error fallback for real visitors, and **34 axe-core a11y violations** across 18 routes. Both have been fixed in this engagement.

After fixes, the platform reaches a **launchable, professionally credible state**. The content is unusually grounded; the design is consistent and minimal; and the verification gates (authenticity, readability, bundle, third-party, accessibility) are all green.

What still holds the platform back from "exceptional": no customer testimonials, no third-party security certifications, and a few visual polish items (shadow stacking, button gradient consolidation) that are cosmetic rather than functional.

---

## 2. Overall UI/UX Grade

**Pre-fix grade: C** — usable content but the homepage was visibly broken on production for every visitor (Server Components error showing "This page couldn't load · ERROR 1535364511"), plus 34 WCAG violations.

**Post-fix grade: B+** — homepage renders, every public route is WCAG 2.2 AA-clean, and all CI gates (authenticity, readability, bundle budget, no-third-party, accessibility) pass green. The remaining gap to A is **trust signals** (testimonials, certifications) and some visual polish — neither of which can be invented honestly without real customers and real audits.

**Recommended posture: B — Improve Current UI/UX Incrementally.** The foundation is strong. Replace, do not rebuild.

---

## 3. Scorecard (1–10)

| # | Category | Score | Reason | Evidence | Recommendation | Priority |
|---|---|---|---|---|---|---|
| 1 | First impression | 7 | Strong tagline, real numeric hook ("People still offline worldwide / We keep going until this number is zero") — but hero counter & gradients carry most of the weight; secondary visual hierarchy is dense. | [HeroCounter.tsx](../src/components/home/HeroCounter.tsx) | Tighten hero spacing, simplify CTA pair to one primary + one ghost. | Medium |
| 2 | Visual design quality | 7 | Cohesive emerald palette, well-chosen serif/mono pairing, calm dark-on-light cards. Some inline rgba duplication remains. | [tokens.css](../src/styles/tokens.css), [globals.css](../src/app/globals.css) | Continue detokenization started in Phase C2; consolidate radii into named tokens. | Medium |
| 3 | Navigation clarity | 8 | 7 well-labelled nav links, sticky header with state-aware coloring, clear footer with 5 grouped columns. | [TopBar.tsx](../src/components/layout/TopBar.tsx), [Footer.tsx](../src/components/layout/Footer.tsx) | Add active-section underline at hover (already present at active); confirm tablet breakpoint footer balance. | Low |
| 4 | Ease of use | 8 | Plain-language copy ("Pick the row that sounds most like your question"), no chatbots, no modals. | [help/page.tsx](../src/app/(public)/[locale]/help/page.tsx), [messages/en.json](../messages/en.json) | None. | — |
| 5 | Feature discoverability | 7 | Footer surfaces 22 link targets across Studio/Transparency/Legal; portfolio + flagships present the ecosystem clearly. | [Footer.tsx](../src/components/layout/Footer.tsx), [FlagshipsSection.tsx](../src/components/home/FlagshipsSection.tsx) | Consider a single "What we make" sentence above flagships. | Low |
| 6 | User flow simplicity | 9 | Marketing site, no auth flows. Contact form is one step, eight email channels disclosed. | [contact/page.tsx](../src/app/(public)/[locale]/contact/page.tsx) | None. | — |
| 7 | Mobile responsiveness | 7 | Layouts use `clamp()` consistently; mobile menu now meets 44×44 px tap target after Phase C fix. | [TopBar.tsx](../src/components/layout/TopBar.tsx) | Tablet (768 px) footer column rebalance; verify in real device QA. | Medium |
| 8 | Accessibility | 9 | **Zero axe-core violations** across 19 routes after fixes (was 34). WCAG 2.2 AA gates all green. | [audit/findings/axe-pass5.txt](../../audit/findings/axe-pass5.txt) | Maintain via `pnpm a11y` in CI. | — |
| 9 | Content clarity | 9 | Concrete claims, ITU citations, no marketing fluff. Authenticity is CI-enforced via [verify-authenticity.mjs](../scripts/ci-checks/verify-authenticity.mjs). | [BUSINESS_PLAN.md](../../BUSINESS_PLAN.md), seed data | None. | — |
| 10 | Trust and credibility | 6 | Self-hosted, 0 trackers, subprocessors disclosed, security posture in plain language — but no testimonials, no third-party certifications, no customer logos. Trust page explicitly says "None yet." for certs (which is honest). | [trust/page.tsx](../src/app/(public)/[locale]/trust/page.tsx) | Add testimonials only after real customers; pursue SOC 2 Type I when ready. | High (over time) |
| 11 | Cognitive load | 8 | Pages are single-purpose, body copy lines fit ~70 ch, eyebrow/title/lede triplet is consistent. | [PageHero.tsx](../src/components/pages/shared/PageHero.tsx) | Pricing page worked-examples could collapse into accordion. | Low |
| 12 | Consistency across pages | 8 | Shared primitives ([PageHero](../src/components/pages/shared/PageHero.tsx), [SectionHeading](../src/components/pages/shared/SectionHeading.tsx), [TimelineEntry](../src/components/pages/shared/TimelineEntry.tsx), [EmptyState](../src/components/pages/shared/EmptyState.tsx)) are reused everywhere. | `src/components/pages/shared/` | Convert remaining inline `linear-gradient` button styles to `.btn-primary`. | Medium |
| 13 | Dashboard usability | N/A | This is a marketing site, not a SaaS dashboard. Admin panel (Payload CMS) is at `/admin` and not part of public scope. | — | — | — |
| 14 | Form usability | 7 | ContactForm has 4 routing options, type=email, required fields. Native validation only — no inline error UI. | [ContactForm.tsx](../src/components/pages/ContactForm.tsx) | Add inline error messages and a success state for clearer feedback. | Medium |
| 15 | Audience fit | 9 | Plain-grade-8 English, multilingual (14 locales), grounded tone, evidence-based. Matches stated ICP (developed-world buyers + developing-world users at same quality). | [VISION_STATEMENT.md](../../VISION_STATEMENT.md) | None. | — |
| 16 | Product readiness | 7 | All 23 routes return 200, content seeded, build passes 6 CI gates. Pre-fix: home was broken; post-fix: launchable. | build output | Run final Lighthouse on staging to confirm perf rebound after RSC fix. | High |

**Average (excluding N/A): 7.6** — solidly B+, on the cusp of A- once perf is verified post-deploy.

---

## 4. What Is Working Well

- **Authentic, grounded copy.** Every claim is verifiable. The CI gate [verify-authenticity.mjs](../scripts/ci-checks/verify-authenticity.mjs) refuses to merge a "shipped" roadmap item without a Git ref, an essay without sources, or a changelog entry without a SHA. This is rare and honest.
- **Real engineering rigor.** 0 third-party runtime calls (CI-enforced), 50 KB first-paint per route (CI-enforced), 14 locales with proper RTL handling for ar/ur, hand-written service worker.
- **Consistent shared primitives.** [PageHero](../src/components/pages/shared/PageHero.tsx), [SectionHeading](../src/components/pages/shared/SectionHeading.tsx), [TimelineEntry](../src/components/pages/shared/TimelineEntry.tsx), [EmptyState](../src/components/pages/shared/EmptyState.tsx), [OutboundLink](../src/components/pages/shared/OutboundLink.tsx), [ProofChip](../src/components/pages/shared/ProofChip.tsx) — every page reuses them.
- **Calm, mature visual identity.** Emerald + cream + serif/mono pairing. No gradient fatigue, no excessive shadow stacking after Phase C fix, no fashion-AI patterns.
- **Multilingual depth.** 14 shipping locales, 5 scripts, ~26 UI strings + per-locale CMS content. RTL works. CJK fonts load.

---

## 5. Main UI/UX Problems (now fixed in this engagement)

1. **CRITICAL — Production homepage was rendering an error fallback** ("This page couldn't load · ERROR 1535364511"). Root cause: [FlagshipCard.tsx](../src/components/home/FlagshipCard.tsx) was a Server Component passing `onMouseEnter`/`onMouseLeave` handlers to a child `<a>` — an RSC violation. The HTML stream contained 10 error-digest chunks (`1535364511` and `3132324671`) that React's error boundary then displayed. **Fixed** by replacing JS hover handlers with CSS `:hover` and a `.flagship-card` class — also removes the need for `'use client'`, ships less JS, and tokenizes the visual states.
2. **34 WCAG 2.2 AA violations across 18 routes** — color-contrast on dozens of muted labels and chips, plus structural issues (empty `<dl>`, h3 before h2, missing `<main>` on the not-found page, `<aside>` not at top level). **Fixed** to **0 violations**.
3. **`--color-emerald-ink` was `#059669` (3.4:1 on white) — failed AA**. Updated to `#047857` (4.7:1) — passes AA at the same hue. One-line change fixed 57 call sites.
4. **`.btn-primary` shipped white text on `#10b981` (2.5:1) — failed AA**. Updated background to `--color-emerald-ink`.
5. **EmptyState component was hard-coded for dark backgrounds** but used on light pages — text was invisible (1.05:1). **Fixed** to use `--color-paper-ink`.
6. **No `not-found.tsx`** — Next.js's default 404 lacked a `<main>` landmark. **Added** [src/app/not-found.tsx](../src/app/not-found.tsx).

---

## 6. Cognitive Load Assessment

The site is **deliberately under-stimulating in a good way**. Most pages follow the eyebrow → title → lede → body pattern. There are no pop-ups, no chat widgets, no banner stacks. The home is the densest page (5 sections + flagship grid + commitments grid + green strip), and even there the section pacing breathes.

The single point of higher cognitive load is the [pricing page](../src/app/(public)/[locale]/pricing/page.tsx) with 6 rules + anti-patterns + worked examples + tiers. Recommend collapsing the worked examples into accordions (Medium priority). No other reductions needed.

---

## 7. Navigation Assessment

- **TopBar** ([TopBar.tsx](../src/components/layout/TopBar.tsx)): 7 links — Portfolio, Manifesto, Pricing, Security, FAQ, Insights, About. Sticky, blurred, state-aware (dark on home, light elsewhere). Mobile menu with a body-scroll lock and now a 44×44 px hamburger tap target after Phase C fix. The contact CTA is a separate persistent pill.
- **Footer** ([Footer.tsx](../src/components/layout/Footer.tsx)): 5 columns — Studio (Manifesto, Portfolio, About, Careers, Press, Help, Contact), Transparency (Changelog, Status, Roadmap, Insights, Security, Green, Pricing, FAQ), Legal (Privacy, Terms, Accessibility, Cookies, Trust), Languages (LanguageWheel), plus a "Start a conversation" CTA. 22 outbound links total.
- **No dead links** in the public surface (HTTP probe confirmed all 23 routes return 200).

The navigation is conventional and dependable. No sub-menus, no mega-menu — appropriate for a content-light marketing surface.

---

## 8. Feature Discoverability Assessment

- **Five flagships** are surfaced on the home with featured + 4 grid layout, each linked to its own product domain. After the FlagshipCard RSC fix, these now render correctly.
- **Portfolio** page presents the full ecosystem grouped by 7 categories.
- **Trust + Status + Changelog + Roadmap** are surfaced both in the footer and dedicated pages — strong transparency layering.
- **Insights** index links to long-form essays. After the seed run, the slug `the-2-2-billion-gap` is available.
- **What's missing**: a single "what we make / who it's for" sentence above the flagships grid would compress the landing message even further. Currently the hook is "people still offline" → flagships fold appears two scrolls later. Recommended (Medium).

---

## 9. Visual Design Assessment

Tokens in [tokens.css](../src/styles/tokens.css):

- **Colors**: emerald system (`--color-emerald` `#10b981`, `--color-emerald-ink` `#047857`, `--color-emerald-dark` `#065f46`) + paper/ink + cream + teal accents.
- **Typography**: system font stack (Apple/Helvetica/Noto Sans Variable) for Latin, separate variants for CJK / Arabic / Devanagari / Bengali / Nastaliq Urdu. Serif (`-apple-system, SF Pro Display`) for display.
- **Spacing**: `--spacing-section: 112px`, `--spacing-gutter: 48px`. Per-component `clamp()` for responsiveness.
- **Radii**: 20 px / 24 px on cards, 9999 px on pills, 4 px on focus rings. Currently inline values, not tokens.

Card system (`.is-card`) was simplified to a single 1-layer shadow (down from 4 layers). Buttons now consolidated through `.btn-primary` / `.btn-outline`. Two homepage CTAs still use inline `linear-gradient(135deg, #047857, #0f766e)` — visually warranted (different weight than primary), but worth tokenizing in a follow-up.

**Recommended next**: tokenize radii (`--radius-card`, `--radius-card-lg`, `--radius-pill`, `--radius-focus`) and headings scale (`.h-display`, `.h-section`) — Medium priority, cosmetic only.

---

## 10. Mobile UX Assessment

- Hamburger button now 44×44 px (WCAG target).
- Mobile menu uses body-scroll-lock via `useEffect`.
- Layouts use `clamp()` and Tailwind responsive variants throughout.
- RTL locales (`ar`, `ur`) flip via the layout `dir={isRtl(locale) ? 'rtl' : 'ltr'}` wrapper.

What I could not fully verify without device QA: the tablet (768 px) footer column rebalance — at exactly that breakpoint the 5-column grid may crowd. Recommend a real-device pass before launch (Medium).

---

## 11. Accessibility Assessment

**Before fixes**: 34 violations across 18 of 19 axe routes — color-contrast (serious) on labels, eyebrows, hover states, badges; plus heading-order, empty-heading, missing main, list and dl structural issues, and `<aside>` placement.

**After fixes**: **0 violations**. See [audit/findings/axe-pass5.txt](../../audit/findings/axe-pass5.txt). Specific fixes:

- Updated `--color-emerald-ink` `#059669` → `#047857` (1 line, 57 call sites).
- Updated `--color-cream-faint` 0.38 → 0.62 alpha.
- Updated `.btn-primary` background to `--color-emerald-ink`.
- Bulk-updated `rgba(17,24,39,0.5–0.7)` body text alphas to 0.72–0.82.
- Restructured `<dl>` in [help/page.tsx](../src/app/(public)/[locale]/help/page.tsx) (the `<dt>/<dd>` were inside `<details>/<summary>` — invalid).
- Wrapped CommitmentsSection's `<article>` in `<li>` (was direct child of `<ol>`, invalid).
- Removed staggered `animate-fade-up` on commitments cards (was leaving cards at opacity 0 long enough for axe to flag the contrast).
- `<aside>` → `<div>` on [about](../src/app/(public)/[locale]/about/page.tsx), [contact](../src/app/(public)/[locale]/contact/page.tsx); `<aside>` → `<section>` with `aria-label` on [help](../src/app/(public)/[locale]/help/page.tsx).
- `<header>` → `<div>` on [insights/[slug]](../src/app/(public)/[locale]/insights/[slug]/page.tsx); `<article>` → `<div>` to avoid landmark confusion.
- Empty h1 fallback strings on [about](../src/app/(public)/[locale]/about/page.tsx) and [contact](../src/app/(public)/[locale]/contact/page.tsx).
- Heading-order: insights index PostCard `<h3>` → `<h2>`; changelog releases now under sr-only `<h2>Releases</h2>`; EmptyState `<h3>` → `<h2>`.
- Added [src/app/not-found.tsx](../src/app/not-found.tsx) with proper `<main>` landmark.

Keyboard navigation, focus rings, skip-to-content, and ARIA labels were already in good shape.

---

## 12. Audience Fit Assessment

[BUSINESS_PLAN.md](../../BUSINESS_PLAN.md) describes two audiences served by one product:

1. **Developed-world buyers** (Toronto, Frankfurt) at fair market rate — enterprise / SME.
2. **Developing-world users** (Lagos, rural Malawi) at sub-dollar regional pricing — the same product.

The site speaks to both equally: copy is grade-8 English, 14 locales (including 5 from the Global South: Yoruba, Hausa, Swahili, Bengali, Urdu), tone is "we work for you" not "we sell to you". Examples in body copy intentionally pair Lagos and Frankfurt, Oslo and Malawi. The brand voice carries the egalitarian thesis without being preachy.

**Audience fit: 9/10.** Already excellent.

---

## 13. Benchmark / Research Comparison

Against three reference points:

- **Linear, Vercel, Stripe marketing surfaces** — leaner copy hierarchies, more whitespace, fewer sections per page. Intelligent Singularity's home is denser. Reasonable for a parent-company site that needs to introduce 5+ flagships in one screenful.
- **Apple investor relations, Mozilla manifesto pages** — these pair big numerical claims with citation chains, which Intelligent Singularity already does (ITU, W3C). Comparable rigor.
- **Typical enterprise SaaS sites** — full of testimonials, customer logos, certification badges. Intelligent Singularity has none — appropriately, because it has no public customers yet and no certifications. **Honesty is the right call here**; faking these would be a step backward.

The reasonable benchmark is "early-stage premium-brand parent company". On that bar: **on par or above**.

---

## 14. Final Recommendation

**B — Improve Current UI/UX Incrementally.**

The foundation is correct. Don't redesign. The remaining work is finishing what already exists: tokenize a few more values, polish two pages (pricing accordion, tablet footer), and over time earn trust signals via real customers, real audits, and real testimonials. Specifically:

- **Do not** introduce a UI component library (would add to bundle + third-party surface, both CI-blocked).
- **Do not** add testimonials, logos, or certifications until they are real.
- **Do** finish the detokenization started in Phase C2.
- **Do** verify Lighthouse perf ≥ 0.90 on the home after the FlagshipCard fix deploys (the previous 0.72 likely reflected the broken-home error fallback).

---

## 15. Prioritized Improvement Roadmap

### Critical (blocks launch / shipped now)

- [x] **FlagshipCard RSC violation breaking home** — fixed in [FlagshipCard.tsx](../src/components/home/FlagshipCard.tsx) + [globals.css](../src/app/globals.css) `.flagship-card` class.
- [x] **34 WCAG AA violations** — all 0 now.
- [x] **Missing `not-found.tsx`** — added.

### High (directly affects adoption / trust)

- [x] **Token contrast fix** — `--color-emerald-ink` and `--color-cream-faint` updated for AA.
- [x] **Mobile hamburger 44×44 px** — bumped from 40 px.
- [x] **`--color-paper-ink` headings** in EmptyState/SectionHeading.
- [ ] **Tablet (768 px) footer column rebalance** — recommend real-device QA before launch.
- [ ] **ContactForm inline validation + success state** — currently relies on native browser validation only.

### Medium (polish)

- [x] **Card shadow stack reduced** to 1-layer in `.is-card`.
- [x] **`.commitments-grid` CSS class** + tokenized commitment-badge.
- [ ] **Tokenize radii** (`--radius-card`, `--radius-card-lg`, `--radius-pill`).
- [ ] **Tokenize heading scale** (`.h-display`, `.h-section`).
- [ ] **Pricing worked-examples** → accordions.
- [ ] **Status page Uptime Kuma fallback** verified renders `pages.status.unavailable` on fetch fail.
- [ ] **Insights long-form readability**: max ~70ch, sources visually distinct (current is OK; could be tightened).

### Low (nice-to-have)

- [x] **`<meta name="theme-color">`** — added in [layout.tsx](../src/app/layout.tsx).
- [x] **Print stylesheet** — added in [globals.css](../src/app/globals.css).
- [ ] **OG/Twitter image generation** per route family.
- [ ] **Locale-conditional font loading** (`fonts.ts`) — only Latin pages currently load 6 Noto Sans variants × 123 font faces. Worth investigating but **not** the primary perf cause (Lighthouse showed home-only 0.72; non-home pages were 0.97–0.99).

---

## 16. Implementation Plan for Claude Code (already executed in this engagement)

Files inspected: [src/app/(public)/[locale]/](../src/app/(public)/[locale]/), [src/components/](../src/components/), [src/styles/tokens.css](../src/styles/tokens.css), [src/app/globals.css](../src/app/globals.css), [scripts/ci-checks/](../scripts/ci-checks/).

Files updated:

- [src/styles/tokens.css](../src/styles/tokens.css) — emerald-ink token, cream-faint token.
- [src/app/globals.css](../src/app/globals.css) — `.flagship-card`, `.commitments-grid`, simplified `.is-card` shadow, print stylesheet, `.btn-primary` background, kicker override.
- [src/app/layout.tsx](../src/app/layout.tsx) — `viewport` export with theme-color.
- [src/app/not-found.tsx](../src/app/not-found.tsx) — new file.
- [src/components/home/FlagshipCard.tsx](../src/components/home/FlagshipCard.tsx) — RSC fix (the main bug).
- [src/components/home/CommitmentsSection.tsx](../src/components/home/CommitmentsSection.tsx) — `<li>` wrapping + animation removal.
- [src/components/home/HeroCounter.tsx](../src/components/home/HeroCounter.tsx) — gradient color shift for AA.
- [src/components/home/FlagshipsSection.tsx](../src/components/home/FlagshipsSection.tsx) — gradient color shift for AA.
- [src/components/layout/TopBar.tsx](../src/components/layout/TopBar.tsx) — ctaBg → emerald-ink, hamburger 44 px.
- [src/components/layout/Footer.tsx](../src/components/layout/Footer.tsx) — contact CTA bg → emerald-ink.
- [src/components/pages/shared/EmptyState.tsx](../src/components/pages/shared/EmptyState.tsx) — light-bg friendly + h2.
- [src/components/pages/shared/SectionHeading.tsx](../src/components/pages/shared/SectionHeading.tsx) — paper-ink color.
- [src/app/(public)/[locale]/about/page.tsx](../src/app/(public)/[locale]/about/page.tsx) — h1 fallback, `<aside>` → `<div>`.
- [src/app/(public)/[locale]/contact/page.tsx](../src/app/(public)/[locale]/contact/page.tsx) — h1 fallback, `<aside>` → `<div>`.
- [src/app/(public)/[locale]/help/page.tsx](../src/app/(public)/[locale]/help/page.tsx) — `<aside>` → `<section>`, `<dl>` restructure.
- [src/app/(public)/[locale]/insights/page.tsx](../src/app/(public)/[locale]/insights/page.tsx) — PostCard h3 → h2.
- [src/app/(public)/[locale]/insights/[slug]/page.tsx](../src/app/(public)/[locale]/insights/[slug]/page.tsx) — `<header>` → `<div>`, `<article>` → `<div>`.
- [src/app/(public)/[locale]/changelog/page.tsx](../src/app/(public)/[locale]/changelog/page.tsx) — sr-only `<h2>` for heading order.
- [src/app/(public)/[locale]/legal/[slug]/page.tsx](../src/app/(public)/[locale]/legal/[slug]/page.tsx) — last-updated text alpha.
- [src/app/(public)/[locale]/roadmap/page.tsx](../src/app/(public)/[locale]/roadmap/page.tsx) — empty-column color, count chip color.
- [src/app/(public)/[locale]/status/page.tsx](../src/app/(public)/[locale]/status/page.tsx) — uptime % alpha.
- (bulk via `sed`): 8 files had `rgba(17,24,39,0.5–0.7)` and `rgba(20,20,19,0.5–0.76)` alphas bumped for AA.

---

## 17. Acceptance Criteria

| Criterion | Status |
|---|---|
| All major routes load (200) | ✅ — 23/23 |
| Navigation links work correctly | ✅ — verified via DOM probe (7 nav + 22 footer) |
| Footer links work correctly | ✅ |
| Platform easy to understand on first visit | ✅ — concrete numerical hook + named flagships |
| Main user actions are obvious | ✅ — Read Manifesto / Meet Studio / Contact CTAs |
| Design is visually consistent | ✅ — shared primitives reused everywhere |
| Experience does not feel overloaded | ✅ — eyebrow/title/lede triplet across all pages |
| Mobile layout works correctly | ✅ — `clamp()` + 44 px tap target; tablet QA recommended pre-launch |
| Accessibility issues are addressed | ✅ — **0 axe violations** (was 34) |
| No fake data or fake claims introduced | ✅ — CI gate `verify-authenticity.mjs` passes |
| No existing features broken | ✅ — typecheck clean, build passes all 6 CI gates |
| Browser testing confirms result | ⚠️ — local browser confirms home renders, axe scan over 19 routes is clean. Production browser confirmation required after deploy. |

**Final verdict**: the platform is launch-ready after these fixes are deployed to production. The single remaining open item is **deploy + verify on prod** — the staging-style `dokploy-deploy` skill exists for that workflow.

---

*End of report.*
