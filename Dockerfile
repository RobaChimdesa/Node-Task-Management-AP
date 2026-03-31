FROM node:20-alpine

# Install dependencies for Prisma
RUN apk add --no-cache openssl libc6-compat

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma  
RUN npm ci

COPY . .

RUN npx prisma generate
RUN npm run build

EXPOSE 3000

# Start the application
# We run migrations first. Seeding is skipped by default to speed up startup.
# Set SEED=true environment variable if you want to seed on startup.
CMD ["sh", "-c", "echo 'Starting migrations...' && npx prisma migrate deploy && if [ \"$SEED\" = \"true\" ]; then echo 'Seeding database...' && npx prisma db seed; fi && echo 'Starting server...' &&  dist/server.js"]