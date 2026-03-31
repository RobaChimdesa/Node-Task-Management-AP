import prisma from '../config/prisma';
import { RegisterInput } from '../schemas/auth.schema';

export const userRepository = {
  async createUser(data: RegisterInput) {
    return prisma.user.create({
      data,
    });
  },

  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  },

  async findById(id: number) {
    return prisma.user.findUnique({
      where: { id },
    });
  },
};
