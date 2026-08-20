# syntax=docker/dockerfile:1

FROM node:18.20-bookworm-slim

WORKDIR /app

ENV NODE_ENV=production \
    PORT=8082

COPY package.json package-lock.json ./
# Prefer lockfile install; fall back if host/Docker npm resolve peers differently
RUN npm ci --omit=dev --no-audit --no-fund || npm install --omit=dev --no-audit --no-fund

COPY src ./src
COPY init ./init

EXPOSE 8082

HEALTHCHECK --interval=15s --timeout=5s --start-period=40s --retries=5 \
  CMD node -e "require('http').get('http://127.0.0.1:8082/health',r=>process.exit(r.statusCode===200?0:1)).on('error',()=>process.exit(1))"

CMD ["npm", "start"]
