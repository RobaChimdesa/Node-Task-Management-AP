import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
  DATABASE_URL: process.env.DATABASE_URL as string,
  JWT_SECRET: process.env.JWT_SECRET || 'myjwtsecretkey',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1d',
  SENTRY_DSN: process.env.SENTRY_DSN,
};