import prisma from '../prisma/client.js';

export const createTaskRepo = async (data: {
  title: string;
  description?: string;
  status?: string;
  priority?: string;
  dueDate?: Date | null;
  userId: number;
  categoryId?: number | null;
}) => {
  return prisma.task.create({
    data: {
      title: data.title,
      description: data.description,
      status: data.status as any,
      priority: data.priority as any,
      dueDate: data.dueDate,
      userId: data.userId,
      categoryId: data.categoryId,
    },
    include: {
      category: true,
    },
  });
};

export const findTasksByUserRepo = async (userId: number, filters: any = {}) => {
  const { status, priority, categoryId, page = 1, limit = 10 } = filters;

  const skip = (page - 1) * limit;

  const where: any = { userId };

  if (status) where.status = status;
  if (priority) where.priority = priority;
  if (categoryId) where.categoryId = categoryId;

  const [tasks, total] = await Promise.all([
    prisma.task.findMany({
      where,
      include: { category: true },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    }),
    prisma.task.count({ where }),
  ]);

  return { tasks, total, page, limit };
};

export const findTaskByIdRepo = async (id: number, userId: number) => {
  return prisma.task.findFirst({
    where: { id, userId },
    include: { category: true },
  });
};

export const updateTaskRepo = async (id: number, userId: number, data: any) => {
  return prisma.task.update({
    where: { id, userId },
    data: {
      ...data,
      dueDate: data.dueDate ? new Date(data.dueDate) : null,
    },
    include: { category: true },
  });
};

export const deleteTaskRepo = async (id: number, userId: number) => {
  return prisma.task.delete({
    where: { id, userId },
  });
};