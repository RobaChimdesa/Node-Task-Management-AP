// src/tests/setup.ts
import { beforeAll, afterAll } from 'vitest';
import dotenv from 'dotenv';
import prisma from '../prisma/client.js';

dotenv.config();

beforeAll(async () => {
  console.log('🧹 Setting up test environment...');

  // Skip database cleaning if using SQLite in CI (or if no real DB)
  if (process.env.DATABASE_URL && !process.env.DATABASE_URL.startsWith('file:')) {
    try {
      await prisma.task.deleteMany();
      await prisma.category.deleteMany();
      await prisma.user.deleteMany();
      console.log('✅ Test database cleaned');
    } catch (error) {
      console.warn('⚠️ Could not clean database (normal in CI)');
    }
  } else {
    console.log('Using SQLite for tests');
  }
});

afterAll(async () => {
  await prisma.$disconnect();
  console.log('✅ Prisma disconnected');
});