# Build stage
FROM node:22-alpine AS builder

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm@10.4.1

# Copy package files and patches
COPY package.json pnpm-lock.yaml ./
COPY patches ./patches/

# Install all dependencies (including dev for build)
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
RUN pnpm build

# Production stage
FROM node:22-alpine

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm@10.4.1

# Copy package files and patches
COPY package.json pnpm-lock.yaml ./
COPY patches ./patches/

# Install ALL dependencies (vite is needed at runtime due to esbuild external packages)
RUN pnpm install --frozen-lockfile

# Copy built application from builder
COPY --from=builder /app/dist ./dist

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Start application
CMD ["node", "dist/index.js"]
