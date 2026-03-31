// vitest.config.ts
import { defineConfig } from 'vitest/config';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    setupFiles: './src/tests/setup.ts',
    include: ['src/tests/**/*.test.ts'],

    // Use SQLite for tests (especially in CI)
    env: {
      DATABASE_URL: process.env.DATABASE_URL || 'file:./test.db',
    },

    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      exclude: ['node_modules/**', 'dist/**', 'src/tests/**'],
    },
  },
});