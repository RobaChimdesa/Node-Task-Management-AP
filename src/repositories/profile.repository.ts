// src/repositories/profile.repository.ts
import prisma from '../prisma/client.js';

export const getProfileRepo = async (userId: number) => {
  return prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    }
  });
};

export const updateProfileRepo = async (userId: number, data: { name?: string }) => {
  return prisma.user.update({
    where: { id: userId },
    data: {
      name: data.name,
    },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      updatedAt: true,
    }
  });
};