# syntax=docker/dockerfile:1.7
FROM node:24-alpine AS base
RUN apk add --no-cache libc6-compat

FROM base AS deps
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@9.12.0 --activate
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

FROM base AS builder
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@9.12.0 --activate
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
# Build-time env vars (overridden at runtime)
ENV DATABASE_URL=postgres://placeholder:placeholder@localhost:5432/placeholder
ENV PAYLOAD_SECRET=build-time-placeholder-secret-that-is-at-least-32-characters-long
ENV NEXT_PUBLIC_SITE_URL=https://intelligentsingularityinc.com
RUN pnpm exec next build --webpack

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
RUN corepack enable && corepack prepare pnpm@9.12.0 --activate
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
# Keep full node_modules + source + payload config so `payload migrate:*`
# commands can run inside the container (needed for schema push on deploy).
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./full-node_modules
COPY --from=builder --chown=nextjs:nodejs /app/src ./src
COPY --from=builder --chown=nextjs:nodejs /app/tsconfig.json /app/package.json /app/pnpm-lock.yaml ./
USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]
