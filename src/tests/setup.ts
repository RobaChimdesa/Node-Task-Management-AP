// src/tests/setup.ts
import { beforeAll, afterAll } from 'vitest';
import dotenv from 'dotenv';
import prisma from '../prisma/client.js';

dotenv.config();

beforeAll(async () => {
  console.log('🧹 Setting up test environment...');

  // Don't fail tests if DATABASE_URL is missing in CI (use mock values)
  if (!process.env.DATABASE_URL) {
    console.warn('⚠️ DATABASE_URL not found. Using test mode.');
    return;
  }

  try {
    await prisma.task.deleteMany();
    await prisma.category.deleteMany();
    await prisma.user.deleteMany();
    console.log('✅ Test database cleaned');
  } catch (error) {
    console.warn('⚠️ Could not clean database');
  }
});

afterAll(async () => {
  if (process.env.DATABASE_URL) {
    await prisma.$disconnect();
  }
});