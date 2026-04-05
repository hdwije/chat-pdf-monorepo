# STAGE 1: Builder
FROM node:20-alpine AS builder
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app

# Copy workspace configuration
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY apps/web/package.json ./apps/web/
COPY packages/types/package.json ./packages/types/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build the Next.js app
# We use --filter web to only build the frontend
RUN pnpm --filter web build

# STAGE 2: Runner
FROM node:20-alpine AS runner

WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED 1

# Set production environment
ENV NODE_ENV=production

# 1. Copy the standalone folder (Next.js puts it here by default in monorepos)
COPY --from=builder /app/apps/web/.next/standalone ./

# 2. Copy static files (Next.js standalone doesn't include these for performance)
COPY --from=builder /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=builder /app/apps/web/public ./apps/web/public

EXPOSE 3000

# Start Next.js
CMD ["node", "apps/web/server.js"]
