FROM node:22.15.0-slim AS base

# Install dependencies required for sharp to work properly
RUN apt-get update \
    && apt-get install -y \
    build-essential \
    python3 \
    sqlite3 \
    libvips-dev \
    && rm -rf /var/lib/apt/lists/*

# Enable pnpm globally in this base
RUN corepack enable pnpm

WORKDIR /app


# -------- Dev Dependencies Stage --------
# Installs ALL dependencies (dev included) based *only* on manifest files
FROM base AS dev-deps

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.json ./

# Use BuildKit cache mount for pnpm store - Modified to use --no-frozen-lockfile
RUN --mount=type=cache,id=pnpm-store-dev,target=/root/.local/share/pnpm/store/v3 pnpm install --no-frozen-lockfile

# -------- Dev Stage --------
# Uses the cached dev dependencies, then copies source code
FROM base AS development

WORKDIR /app

# Copy pre-installed dependencies and potentially pre-built shared package
COPY --from=dev-deps /app ./

# No need to copy the source code, it is mounted as a volume from host

# Prune the store after everything potentially needing dev deps is done
RUN pnpm store prune

ARG PORT=3000

ENV PORT=${PORT}

EXPOSE ${PORT}
EXPOSE 9229

ENTRYPOINT ["/bin/sh", "./entrypoint.sh"]


# -------- Prod Dependencies Stage --------
# Installs ONLY production dependencies based *only* on manifest files
FROM base AS prod-deps

WORKDIR /app

COPY --from=dev-deps /app/package.json /app/pnpm-lock.yaml /app/pnpm-workspace.yaml ./

# Use BuildKit cache mount (can be a different ID than dev if desired)
RUN --mount=type=cache,id=pnpm-store-prod,target=/root/.local/share/pnpm/store/v3 \
    pnpm install --prod --frozen-lockfile


# -------- Builder Stage --------
# Rebuild the source code only when needed
FROM base AS builder

WORKDIR /app

COPY --from=dev-deps /app ./

COPY . .

# Build the application(s)
# Use cache mount for potential intermediate build steps within pnpm build
RUN --mount=type=cache,id=pnpm-store-dev,target=/root/.local/share/pnpm/store/v3 \
    pnpm build \
    # Prune the store after build
    && pnpm store prune


# -------- Production Stage --------
# Starts clean, copies only production dependencies and built code
FROM base AS production

ARG PORT=3000

ENV NODE_ENV=production
ENV PORT=${PORT}

EXPOSE ${PORT}

WORKDIR /app

# Define ARG defaults, can be overridden during build
ARG LINUX_GID=1001
ARG LINUX_UID=1001

RUN addgroup --system --gid ${LINUX_GID} nodejs \
    && adduser --system --uid ${LINUX_UID} --ingroup nodejs nextjs \
    && mkdir media \
    && chown nextjs:nodejs media

# Copy necessary package manifests for runtime resolution (if needed) and ownership
COPY --from=dev-deps --chown=nextjs:nodejs /app/package.json /app/pnpm-lock.yaml /app/pnpm-workspace.yaml ./

# Copy ONLY production node_modules structure from prod-deps stage
# Using --chown ensures correct permissions from the start
COPY --from=prod-deps --chown=nextjs:nodejs /app/node_modules ./node_modules

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone/ ./
COPY --from=builder --chown=nextjs:nodejs /app/public ./public/
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static/

# Install sharp directly in the production environment - critical for Next.js image optimization in standalone mode
RUN apt-get update && apt-get install -y --no-install-recommends \
    g++ \
    make \
    && corepack enable pnpm \
    && pnpm install --prod sharp@0.34.1 \
    && apt-get purge -y --auto-remove g++ make \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

USER nextjs

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
ENTRYPOINT ["/bin/sh", "-c", "HOSTNAME=0.0.0.0 node server.js"]
