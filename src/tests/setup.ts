// src/tests/setup.ts
import { beforeAll, afterAll } from 'vitest';
import dotenv from 'dotenv';
import prisma from '../prisma/client.js';

dotenv.config();

beforeAll(async () => {
  console.log('🧹 Setting up test environment...');

  // Clean database only if real DB is available
  if (process.env.DATABASE_URL && !process.env.DATABASE_URL.startsWith('file:')) {
    try {
      await prisma.task.deleteMany();
      await prisma.category.deleteMany();
      await prisma.user.deleteMany();
      console.log('✅ Database cleaned');
    } catch (e) {
      console.warn('⚠️ Could not clean database');
    }
  }
});

afterAll(async () => {
  await prisma.$disconnect();
});