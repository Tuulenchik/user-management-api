# ---------- 1) Install deps (with dev deps) ----------
FROM node:22-slim AS deps
WORKDIR /app

# Copy only dependency manifests first (better caching)
COPY package*.json ./

# Deterministic install (uses package-lock.json)
RUN npm ci


# ---------- 2) Build TS -> dist ----------
FROM node:22-slim AS build
WORKDIR /app

# Reuse installed deps
COPY --from=deps /app/package*.json ./
COPY --from=deps /app/node_modules ./node_modules

# Copy source + tsconfig
COPY tsconfig*.json ./
COPY src ./src

# Build output into /app/dist (based on your tsconfig outDir)
RUN npm run build


# ---------- 3) Production runtime image ----------
FROM node:22-slim AS runner
WORKDIR /app

ENV NODE_ENV=production

# Only install production deps in the final image
COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

# Copy compiled JS only
COPY --from=build /app/dist ./dist

# Optional: document the port (doesn't actually publish it)
EXPOSE 8000

CMD ["node", "dist/server.js"]
