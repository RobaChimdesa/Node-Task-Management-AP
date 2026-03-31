// import prisma from '../config/prisma';
import prisma from '../prisma/client';
import { CreateCategoryInput, UpdateCategoryInput } from '../schemas/category.schema';

export const categoryRepository = {
  async create(userId: number, data: CreateCategoryInput) {
    return prisma.category.create({
      data: {
        ...data,
        userId,
      },
    });
  },

  async findAllByUserId(userId: number) {
    return prisma.category.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  },

  async findByIdAndUserId(id: number, userId: number) {
    return prisma.category.findFirst({
      where: { id, userId },
    });
  },

  async update(id: number, userId: number, data: UpdateCategoryInput) {
    return prisma.category.update({
      where: { id },
      data,
    });
  },

  async delete(id: number, userId: number) {
    return prisma.category.delete({
      where: { id },
    });
  },
};