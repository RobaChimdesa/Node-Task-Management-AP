# ==================== BUILD STAGE ====================
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including dev)
RUN npm ci

# Copy source code
COPY . .

# Generate Prisma Client + Build TypeScript
RUN npm run build

# ==================== PRODUCTION STAGE ====================
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy built files from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# Expose port
EXPOSE 3000

# Run migrations and start the app
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/app.js"]