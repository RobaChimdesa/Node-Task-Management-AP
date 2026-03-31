import { beforeAll, afterAll } from 'vitest';
// import prisma from '../config/prisma';
import prisma from '../config/prisma';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';

beforeAll(async () => {
  // Before running tests, maybe run migrations or check db connection?
  await prisma.$connect();
});

afterAll(async () => {
  const deleteTasks = prisma.task.deleteMany();
  const deleteCategories = prisma.category.deleteMany();
  const deleteUsers = prisma.user.deleteMany();

  await prisma.$transaction([deleteTasks, deleteCategories, deleteUsers]);
  await prisma.$disconnect();
});

export const getAuthToken = (userId: number, email: string) => {
  return jwt.sign({ id: userId, email }, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN as any,
  });
};