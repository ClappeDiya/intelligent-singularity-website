# Rotating secrets

## PAYLOAD_SECRET

Impact: invalidates all active admin sessions.
1. Generate: `openssl rand -hex 32`
2. Update in Dokploy UI -> app env vars
3. Redeploy
4. Log back into /admin

## REVALIDATE_SECRET

Impact: no-op on sessions; revalidation calls from Payload to Next.js continue using the new value after redeploy.
Same steps as above.

## SMTP_PASS (Mailcow)

1. Generate new mailbox password in Mailcow admin UI
2. Update SMTP_PASS in Dokploy
3. Redeploy
4. Test the contact form

## ADMIN_ALLOWED_IPS

Update the comma-separated list in Dokploy -> redeploy. No downtime.

## ANTHROPIC_API_KEY (seed-time only)

Seed-time only. Rotate in Anthropic console, update env, next seed/translate run uses the new key.
