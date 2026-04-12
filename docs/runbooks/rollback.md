# Rolling back an IS website deployment

## Fastest path (30 seconds): Dokploy UI

1. Log into Dokploy.
2. Project "IS Website" -> app "is-web" -> Deployments tab.
3. Find the previous working deployment (typically second in the list).
4. Click "Rollback" -> confirm.
5. Traefik flips traffic within seconds.
6. Verify `https://intelligentsingularityinc.com` works.

## Git-based rollback (if Dokploy UI is unavailable)

1. On your laptop:
   `git revert <bad-commit-sha>`
   `git push origin main`
2. Dokploy auto-deploys the revert commit.
3. Verify.

## Never

- Never force-push to `main` to roll back — use `git revert` so history is preserved.
- Never manually edit production DB to "fix" a bad migration — restore from backup instead.
