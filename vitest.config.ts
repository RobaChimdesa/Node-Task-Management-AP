// vitest.config.ts
import { defineConfig } from 'vitest/config';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    setupFiles: './src/tests/setup.ts',
    include: ['src/tests/**/*.test.ts'],

    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      reportsDirectory: './coverage',
      exclude: ['node_modules/**', 'dist/**', 'src/tests/**'],
    },
  },
});