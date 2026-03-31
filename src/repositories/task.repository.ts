import { Prisma } from '@prisma/client';
// import prisma from '../config/prisma';
import prisma from '../config/prisma';
import { CreateTaskInput, UpdateTaskInput, TaskQueryInput } from '../schemas/task.schema';

export const taskRepository = {
  async create(userId: number, data: CreateTaskInput) {
    return prisma.task.create({
      data: {
        ...data,
        userId,
      },
      include: {
        category: true,
      },
    });
  },

  async findByIdAndUserId(id: number, userId: number) {
    return prisma.task.findFirst({
      where: { id, userId },
      include: { category: true },
    });
  },

  async update(id: number, userId: number, data: UpdateTaskInput) {
    return prisma.task.update({
      where: { id }, // ownership checked in service
      data,
      include: { category: true },
    });
  },

  async delete(id: number, userId: number) {
    return prisma.task.delete({
      where: { id }, // ownership checked in service
    });
  },

  async findManyWithPagination(userId: number, query: TaskQueryInput) {
    const { status, priority, categoryId, search, sortBy, order } = query;
    const page = parseInt(query.page as any, 10) || 1;
    const limit = parseInt(query.limit as any, 10) || 10;

    const where: Prisma.TaskWhereInput = {
      userId,
      ...(status && { status }),
      ...(priority && { priority }),
      ...(categoryId && { categoryId }),
      ...(search && {
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
        ],
      }),
    };

    const orderBy: Prisma.TaskOrderByWithRelationInput = sortBy ? {
      [sortBy]: order || 'asc',
    } : { createdAt: 'desc' };

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      prisma.task.findMany({
        where,
        orderBy,
        skip,
        take: limit,
        include: { category: true },
      }),
      prisma.task.count({ where }),
    ]);

    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  },
};