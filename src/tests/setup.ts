// src/tests/setup.ts
import { beforeAll, afterAll } from 'vitest';
import dotenv from 'dotenv';
import prisma from '../prisma/client.js';

// Load .env file BEFORE importing prisma
dotenv.config({ path: '.env' });

beforeAll(async () => {
  console.log('🧹 Setting up test environment...');

  if (!process.env.DATABASE_URL) {
    console.warn('⚠️  DATABASE_URL is not defined. Tests may fail.');
  }

  // Optional: Clean database before tests
  try {
    await prisma.task.deleteMany();
    await prisma.category.deleteMany();
    await prisma.user.deleteMany();
    console.log('✅ Database cleaned successfully');
  } catch (error) {
    console.warn('⚠️ Could not clean database (this is okay for first run)');
  }
});

afterAll(async () => {
  console.log('✅ Tests completed. Disconnecting...');
  await prisma.$disconnect();
});