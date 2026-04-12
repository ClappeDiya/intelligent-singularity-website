# Intelligent Singularity Website — Pre-Launch Checklist

Run this entire list before flipping the public announcement. Every item must pass.

## Functional
- [ ] All 7 pages render in all 14 locales (spot-check 3 per locale)
- [ ] Language wheel switches locales, cookie persists
- [ ] Arabic + Urdu render RTL with correct fonts
- [ ] Counter on homepage shows 2.2B with last digit flickering
- [ ] Five flagship cards render (Clappe, ClapBill, Clapwork, ClapDiet, ClapMove)
- [ ] "See the full ecosystem" link goes to /portfolio
- [ ] /portfolio shows all 23 products with honest status labels
- [ ] Contact form submits successfully to Mailcow test inbox
- [ ] Legal pages render in English only on non-English locales with the "English only" notice

## Performance
- [ ] Lighthouse >= 95 on Performance, Accessibility, Best Practices, SEO (desktop)
- [ ] First-paint < 50 KB on all routes
- [ ] Zero forbidden third-party hosts in build output
- [ ] Carbon per visit <= 0.15g shown live in top bar
- [ ] PWA installable on Chrome mobile (check install prompt)
- [ ] Offline mode: after first visit, site loads fully with network throttled to "Offline"

## Accessibility
- [ ] axe-core zero violations on /en, /ar, /ur
- [ ] Keyboard navigation works end-to-end (no mouse required)
- [ ] Skip-to-content link appears on keyboard focus
- [ ] Screen reader test on VoiceOver (macOS) — homepage + manifesto + contact form
- [ ] Contrast ratios: mint on ink (13:1), cream on ink (17:1) — verified
- [ ] prefers-reduced-motion disables counter flicker + scroll progress animation

## Security
- [ ] SSL Labs grade A or A+ (ssllabs.com/ssltest)
- [ ] HSTS preload submitted (hstspreload.org)
- [ ] Security headers via securityheaders.com — all green
- [ ] CSP blocks inline + eval (no violations in DevTools console)
- [ ] /admin on main domain redirects to /
- [ ] admin.intelligentsingularityinc.com blocks non-allowlisted IPs (test from mobile data)
- [ ] 2FA enabled on all Dokploy, Payload, Uptime Kuma, GlitchTip accounts
- [ ] Rate limiting: 80-request burst test returns 429s
- [ ] Honeypot routes (/wp-admin etc.) return 404 and log warnings
- [ ] CrowdSec daemon running, bouncer attached, decisions list functional

## Data & Operations
- [ ] Postgres backup ran last night and landed on Audiflo secondary
- [ ] Backup restore rehearsal has been run at least once (document the date)
- [ ] All env vars rotated and stored in Dokploy (not in git)
- [ ] Translation pipeline has been run; every localized field has a value
- [ ] No strings fell back to English (check for [EN] markers)

## Monitoring
- [ ] Uptime Kuma pinging all 5 monitors, alerts configured
- [ ] GlitchTip receiving a test error successfully
- [ ] Plausible receiving pageviews from the live site
- [ ] Email notifications route to ops@intelligentsingularityinc.com

## Legal & Content
- [ ] Privacy policy references the actual data we collect (no boilerplate)
- [ ] Terms of service reviewed (at minimum by Dr. Md)
- [ ] Accessibility statement links to the WCAG 2.2 AA target
- [ ] Cookie policy accurately says "one first-party locale cookie, nothing else"
- [ ] Robots.txt is present and sensible
- [ ] Sitemap.xml is generated and includes all locale variants

## Announcement readiness
- [ ] Share the launch link with a small group first (5-10 people) for fresh-eye bugs
- [ ] Fix anything they find
- [ ] Social posts drafted
- [ ] Backup contact (if Dr. Md is unavailable) knows runbooks

When every item above is checked — launch.
