import prisma from '../prisma/client.js';

export const createCategoryRepo = async (data: {
  name: string;
  description?: string;
  userId: number;
}) => {
  return prisma.category.create({
    data,
  });
};

export const findCategoriesByUserRepo = async (userId: number) => {
  return prisma.category.findMany({
    where: { userId },
    orderBy: { name: 'asc' },
  });
};

export const findCategoryByIdRepo = async (id: number, userId: number) => {
  return prisma.category.findFirst({
    where: { id, userId },
  });
};