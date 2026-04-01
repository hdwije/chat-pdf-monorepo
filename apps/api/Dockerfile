# STAGE 1: The Builder
FROM node:20-alpine AS builder

# Install pnpm (since we use it in our monorepo)
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copy the root workspace files first (for caching)
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY apps/api/package.json ./apps/api/
COPY packages/types/package.json ./packages/types/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of the code
COPY . .

# Build the project
RUN pnpm --filter api build

# STAGE 2: The Runner (The final, small image)
FROM node:20-alpine AS runner

WORKDIR /app

# 1. Setup pnpm environment
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack prepare pnpm@latest --activate

# 2. COPY THE LOCKFILE AND WORKSPACE CONFIG (Crucial for Monorepos)
COPY --from=builder /app/pnpm-lock.yaml ./
COPY --from=builder /app/pnpm-workspace.yaml ./
COPY --from=builder /app/package.json ./

# 3. Copy the package.json for the API and any shared packages
COPY --from=builder /app/apps/api/package.json ./apps/api/
COPY --from=builder /app/packages/types/package.json ./packages/types/

# 4. Copy the built code
COPY --from=builder /app/apps/api/dist ./apps/api/dist

# 5. Install only production dependencies
RUN pnpm install --prod --frozen-lockfile

EXPOSE 3001

# 6. Update the CMD path to match the new structure
CMD ["node", "apps/api/dist/main.js"]
