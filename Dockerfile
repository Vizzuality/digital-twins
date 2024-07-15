FROM node:22.2.0-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml tsconfig.json ./

RUN corepack enable pnpm

COPY . .

RUN pnpm install --frozen-lockfile

RUN pnpm build

ENV NODE_ENV production

# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1

EXPOSE 3000

ENV PORT 3000

CMD ["pnpm", "start"]
