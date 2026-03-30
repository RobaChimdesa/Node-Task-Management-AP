// src/repositories/user.repository.ts
import prisma from '../prisma/client.js';
import { Role } from '@prisma/client';

export const createUserRepo = async (data: {
  email: string;
  password: string;
  name?: string | null;
  role?: Role;
}) => {
  return prisma.user.create({
    data: {
      email: data.email,
      password: data.password,
      name: data.name,
      role: data.role ?? Role.USER,     // Safe default
    },
  });
};

export const findUserByEmailRepo = async (email: string) => {
  return prisma.user.findUnique({
    where: { email },
  });
};