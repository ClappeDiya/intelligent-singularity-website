# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: new-pages-resize.spec.ts >> en/status renders at 375px with no horizontal scroll
- Location: tests/e2e/new-pages-resize.spec.ts:10:7

# Error details

```
Error: horizontal overflow at 375px

expect(received).toBe(expected) // Object.is equality

Expected: false
Received: true
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e2]:
    - link "Skip to main content" [ref=e3] [cursor=pointer]:
      - /url: "#main-content"
    - main [ref=e4]:
      - article [ref=e5]:
        - generic [ref=e7]:
          - generic [ref=e8]: STATUS
          - heading "How everything is running." [level=1] [ref=e9]
          - paragraph [ref=e10]: This page is pulled live from our public status monitor. If the numbers look wrong, tell us — that is part of keeping this honest.
        - region "Overall status" [ref=e11]:
          - paragraph [ref=e13]: All systems operational
          - paragraph [ref=e14]:
            - text: updated
            - time [ref=e15]: 2026-04-18 06:55Z
        - region "Systems" [ref=e16]:
          - heading "Systems" [level=2] [ref=e17]
          - generic [ref=e19]:
            - heading "Website" [level=3] [ref=e20]
            - list [ref=e21]:
              - listitem [ref=e22]:
                - generic [ref=e23]:
                  - generic [ref=e24]: Homepage (/en)
                  - generic [ref=e25]: 100.00% · 24h
                - img "Uptime over the last 90 days, 100.00% in the last 24 hours." [ref=e27]:
                  - generic "2026-04-18 06:46:02.041" [ref=e108]
                  - generic "2026-04-18 06:47:02.257" [ref=e109]
                  - generic "2026-04-18 06:48:02.356" [ref=e110]
                  - generic "2026-04-18 06:49:02.445" [ref=e111]
                  - generic "2026-04-18 06:50:02.532" [ref=e112]
                  - generic "2026-04-18 06:51:02.602" [ref=e113]
                  - generic "2026-04-18 06:52:02.680" [ref=e114]
                  - generic "2026-04-18 06:53:02.786" [ref=e115]
                  - generic "2026-04-18 06:54:02.874" [ref=e116]
                  - generic "2026-04-18 06:55:02.957" [ref=e117]
              - listitem [ref=e118]:
                - generic [ref=e119]:
                  - generic [ref=e120]: Health API
                  - generic [ref=e121]: 100.00% · 24h
                - img "Uptime over the last 90 days, 100.00% in the last 24 hours." [ref=e123]:
                  - generic "2026-04-18 06:46:28.360" [ref=e204]
                  - generic "2026-04-18 06:47:28.421" [ref=e205]
                  - generic "2026-04-18 06:48:28.461" [ref=e206]
                  - generic "2026-04-18 06:49:28.498" [ref=e207]
                  - generic "2026-04-18 06:50:28.545" [ref=e208]
                  - generic "2026-04-18 06:51:28.582" [ref=e209]
                  - generic "2026-04-18 06:52:28.625" [ref=e210]
                  - generic "2026-04-18 06:53:28.664" [ref=e211]
                  - generic "2026-04-18 06:54:28.706" [ref=e212]
                  - generic "2026-04-18 06:55:28.745" [ref=e213]
              - listitem [ref=e214]:
                - generic [ref=e215]:
                  - generic [ref=e216]: Trust (/en/trust)
                  - generic [ref=e217]: 100.00% · 24h
                - img "Uptime over the last 90 days, 100.00% in the last 24 hours." [ref=e219]:
                  - generic "2026-04-18 06:46:48.893" [ref=e301]
                  - generic "2026-04-18 06:47:49.119" [ref=e302]
                  - generic "2026-04-18 06:48:49.199" [ref=e303]
                  - generic "2026-04-18 06:49:49.288" [ref=e304]
                  - generic "2026-04-18 06:50:49.361" [ref=e305]
                  - generic "2026-04-18 06:51:49.430" [ref=e306]
                  - generic "2026-04-18 06:52:49.531" [ref=e307]
                  - generic "2026-04-18 06:53:49.602" [ref=e308]
                  - generic "2026-04-18 06:54:49.680" [ref=e309]
              - listitem [ref=e310]:
                - generic [ref=e311]:
                  - generic [ref=e312]: Help (/en/help)
                  - generic [ref=e313]: 100.00% · 24h
                - img "Uptime over the last 90 days, 100.00% in the last 24 hours." [ref=e315]:
                  - generic "2026-04-18 06:47:10.109" [ref=e397]
                  - generic "2026-04-18 06:48:10.336" [ref=e398]
                  - generic "2026-04-18 06:49:10.429" [ref=e399]
                  - generic "2026-04-18 06:50:10.508" [ref=e400]
                  - generic "2026-04-18 06:51:10.578" [ref=e401]
                  - generic "2026-04-18 06:52:10.647" [ref=e402]
                  - generic "2026-04-18 06:53:10.774" [ref=e403]
                  - generic "2026-04-18 06:54:10.863" [ref=e404]
                  - generic "2026-04-18 06:55:10.950" [ref=e405]
              - listitem [ref=e406]:
                - generic [ref=e407]:
                  - generic [ref=e408]: Roadmap (/en/roadmap)
                  - generic [ref=e409]: 100.00% · 24h
                - img "Uptime over the last 90 days, 100.00% in the last 24 hours." [ref=e411]:
                  - generic "2026-04-18 06:47:37.596" [ref=e494]
                  - generic "2026-04-18 06:48:37.759" [ref=e495]
                  - generic "2026-04-18 06:49:37.835" [ref=e496]
                  - generic "2026-04-18 06:50:37.915" [ref=e497]
                  - generic "2026-04-18 06:51:37.977" [ref=e498]
                  - generic "2026-04-18 06:52:38.051" [ref=e499]
                  - generic "2026-04-18 06:53:38.122" [ref=e500]
                  - generic "2026-04-18 06:54:38.185" [ref=e501]
              - listitem [ref=e502]:
                - generic [ref=e503]:
                  - generic [ref=e504]: Changelog (/en/changelog)
                  - generic [ref=e505]: 100.00% · 24h
                - img "Uptime over the last 90 days, 100.00% in the last 24 hours." [ref=e507]:
                  - generic "2026-04-18 06:47:57.379" [ref=e590]
                  - generic "2026-04-18 06:48:57.517" [ref=e591]
                  - generic "2026-04-18 06:49:57.622" [ref=e592]
                  - generic "2026-04-18 06:50:57.698" [ref=e593]
                  - generic "2026-04-18 06:51:57.763" [ref=e594]
                  - generic "2026-04-18 06:52:57.830" [ref=e595]
                  - generic "2026-04-18 06:53:57.970" [ref=e596]
                  - generic "2026-04-18 06:54:58.036" [ref=e597]
              - listitem [ref=e598]:
                - generic [ref=e599]:
                  - generic [ref=e600]: Insights (/en/insights)
                  - generic [ref=e601]: 100.00% · 24h
                - img "Uptime over the last 90 days, 100.00% in the last 24 hours." [ref=e603]:
                  - generic "2026-04-18 06:48:13.217" [ref=e686]
                  - generic "2026-04-18 06:49:13.335" [ref=e687]
                  - generic "2026-04-18 06:50:13.421" [ref=e688]
                  - generic "2026-04-18 06:51:13.481" [ref=e689]
                  - generic "2026-04-18 06:52:13.534" [ref=e690]
                  - generic "2026-04-18 06:53:13.623" [ref=e691]
                  - generic "2026-04-18 06:54:13.684" [ref=e692]
                  - generic "2026-04-18 06:55:13.748" [ref=e693]
        - paragraph [ref=e694]: Operational means the service answered within the target time for every check in the last five minutes. A small blip does not break that. A sustained failure does.
        - navigation "External" [ref=e695]:
          - text: "Source of truth:"
          - link "https://status.intelligentsingularityinc.com" [ref=e696] [cursor=pointer]:
            - /url: https://status.intelligentsingularityinc.com/status/is
          - text: ·
          - link "Changelog" [ref=e697] [cursor=pointer]:
            - /url: /en/changelog
    - contentinfo [ref=e698]:
      - generic [ref=e699]:
        - generic [ref=e700]:
          - generic [ref=e701]:
            - generic [ref=e702]:
              - img [ref=e703]
              - generic [ref=e706]: Intelligent Singularity
            - paragraph [ref=e707]: A studio building software for universal access. Incorporated in Alberta, Canada. Merging human knowledge with artificial intelligence to deliver tools for every person and every business — online or offline.
            - generic [ref=e708]:
              - generic [ref=e709]: 0 trackers
              - generic [ref=e710]: ·
              - generic [ref=e711]: 0 third-party calls
              - generic [ref=e712]: ·
              - generic [ref=e713]: Self-hosted on a single VPS
          - generic [ref=e714]:
            - generic [ref=e715]: Studio
            - generic [ref=e716]:
              - link "Manifesto" [ref=e717] [cursor=pointer]:
                - /url: /manifesto
              - link "Flagships" [ref=e718] [cursor=pointer]:
                - /url: /#flagships
              - link "Portfolio" [ref=e719] [cursor=pointer]:
                - /url: /portfolio
              - link "About" [ref=e720] [cursor=pointer]:
                - /url: /about
              - link "Careers" [ref=e721] [cursor=pointer]:
                - /url: /careers
              - link "Press" [ref=e722] [cursor=pointer]:
                - /url: /press
              - link "Help" [ref=e723] [cursor=pointer]:
                - /url: /help
              - link "Contact" [ref=e724] [cursor=pointer]:
                - /url: /contact
          - generic [ref=e725]:
            - generic [ref=e726]: Transparency
            - generic [ref=e727]:
              - link "Changelog" [ref=e728] [cursor=pointer]:
                - /url: /changelog
              - link "Status" [ref=e729] [cursor=pointer]:
                - /url: /status
              - link "Roadmap" [ref=e730] [cursor=pointer]:
                - /url: /roadmap
              - link "Insights" [ref=e731] [cursor=pointer]:
                - /url: /insights
              - link "Security" [ref=e732] [cursor=pointer]:
                - /url: /security
              - link "Green pledge" [ref=e733] [cursor=pointer]:
                - /url: /green
              - link "Pricing" [ref=e734] [cursor=pointer]:
                - /url: /pricing
              - link "FAQ" [ref=e735] [cursor=pointer]:
                - /url: /faq
          - generic [ref=e736]:
            - generic [ref=e737]: Legal
            - generic [ref=e738]:
              - link "Privacy" [ref=e739] [cursor=pointer]:
                - /url: /legal/privacy
              - link "Terms" [ref=e740] [cursor=pointer]:
                - /url: /legal/terms
              - link "Accessibility" [ref=e741] [cursor=pointer]:
                - /url: /legal/accessibility
              - link "Cookies" [ref=e742] [cursor=pointer]:
                - /url: /legal/cookies
              - link "Trust" [ref=e743] [cursor=pointer]:
                - /url: /trust
              - paragraph [ref=e744]: Legal pages are maintained in English only.
          - generic [ref=e745]:
            - generic [ref=e746]: 14 Languages
            - paragraph [ref=e747]: Every public page ships in fourteen languages, including Arabic, Nastaliq Urdu, Bengali, Hindi, Hausa, Swahili, and Yoruba.
            - group "Language selector" [ref=e748]:
              - button "Switch language to English" [pressed] [ref=e749]: EN
              - button "Switch language to 简体中文" [ref=e750]: 中
              - button "Switch language to Español" [ref=e751]: ES
              - button "Switch language to हिन्दी" [ref=e752]: हि
              - button "Switch language to العربية" [ref=e753]: ع
              - button "Switch language to Français" [ref=e754]: FR
              - button "Switch language to Português" [ref=e755]: PT
              - button "Switch language to বাংলা" [ref=e756]: বা
              - button "Switch language to Русский" [ref=e757]: RU
              - button "Switch language to اردو" [ref=e758]: ار
              - button "Switch language to Bahasa Indonesia" [ref=e759]: ID
              - button "Switch language to Kiswahili" [ref=e760]: SW
              - button "Switch language to Yorùbá" [ref=e761]: YO
              - button "Switch language to Hausa" [ref=e762]: HA
        - generic [ref=e763]:
          - generic [ref=e764]:
            - generic [ref=e765]: © 2026 Intelligent Singularity Inc. · Alberta, Canada
            - generic [ref=e766]: Self-hosted on a single VPS · No CDN · No tracker
          - link "Start a conversation" [ref=e767] [cursor=pointer]:
            - /url: /contact
            - text: Start a conversation
            - generic [ref=e768]: →
  - alert [ref=e769]
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | const ROUTES = ['/changelog', '/status', '/roadmap', '/insights', '/trust', '/help'];
  4  | const LOCALES = ['en', 'ar', 'hi'];
  5  | const WIDTHS = [375, 768, 1280];
  6  | 
  7  | for (const locale of LOCALES) {
  8  |   for (const route of ROUTES) {
  9  |     for (const width of WIDTHS) {
  10 |       test(`${locale}${route} renders at ${width}px with no horizontal scroll`, async ({
  11 |         page,
  12 |       }) => {
  13 |         await page.setViewportSize({ width, height: 900 });
  14 |         await page.goto(`/${locale}${route}`, { waitUntil: 'domcontentloaded' });
  15 |         const scrollsHorizontally = await page.evaluate(
  16 |           () => document.documentElement.scrollWidth > window.innerWidth
  17 |         );
> 18 |         expect(scrollsHorizontally, `horizontal overflow at ${width}px`).toBe(false);
     |                                                                          ^ Error: horizontal overflow at 375px
  19 |         await expect(page.locator('h1')).toBeVisible();
  20 |       });
  21 |     }
  22 |   }
  23 | }
  24 | 
  25 | test('drag resize from 1536 to 375 without layout explosion', async ({ page }) => {
  26 |   await page.setViewportSize({ width: 1536, height: 900 });
  27 |   await page.goto('/en/roadmap', { waitUntil: 'domcontentloaded' });
  28 |   for (const w of [1280, 1024, 900, 768, 640, 480, 375]) {
  29 |     await page.setViewportSize({ width: w, height: 900 });
  30 |     const overflow = await page.evaluate(
  31 |       () => document.documentElement.scrollWidth > window.innerWidth
  32 |     );
  33 |     expect(overflow, `overflow at ${w}px`).toBe(false);
  34 |   }
  35 | });
  36 | 
```