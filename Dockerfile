# ── Manto / tarot-app — production image for self-hosting (VPS) ──
FROM node:20-slim

WORKDIR /app

# Prisma's query engine needs OpenSSL at build & runtime.
RUN apt-get update && apt-get install -y --no-install-recommends openssl \
  && rm -rf /var/lib/apt/lists/*

# Install deps first (better layer caching). Copy the Prisma schema before
# `npm ci` so the `postinstall` → `prisma generate` step can find it.
COPY package.json package-lock.json ./
COPY prisma ./prisma
RUN npm ci

# Copy the rest of the source and build the Next.js production bundle.
COPY . .
RUN npm run build

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
EXPOSE 3000

# Entrypoint applies the DB schema (idempotent) then starts the server.
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh
ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["npm", "run", "start"]
