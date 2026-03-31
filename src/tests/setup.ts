// src/tests/setup.ts
import { beforeAll, afterAll } from 'vitest';
import dotenv from 'dotenv';
import prisma from '../prisma/client.js';

// Load environment variables at the very beginning
dotenv.config({ path: '.env' });

if (!process.env.DATABASE_URL) {
  console.error('❌ DATABASE_URL is not defined in .env file');
  process.exit(1);
}

beforeAll(async () => {
  console.log('🧹 Cleaning test database...');

  try {
    await prisma.task.deleteMany();
    await prisma.category.deleteMany();
    await prisma.user.deleteMany();
    console.log('✅ Test database cleaned');
  } catch (error) {
    console.warn('⚠️  Could not clean database (this is normal on first run)');
  }
});

afterAll(async () => {
  await prisma.$disconnect();
  console.log('✅ Database disconnected');
});