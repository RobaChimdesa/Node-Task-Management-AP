import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { userRepository } from '../repositories/user.repository';
import { RegisterInput, LoginInput } from '../schemas/auth.schema';
import { env } from '../config/env';
import { Prisma } from '@prisma/client';

export const authService = {
  async register(data: RegisterInput) {
    const existingUser = await userRepository.findByEmail(data.email);
    if (existingUser) {
      const error = new Prisma.PrismaClientKnownRequestError('User exists', {
        code: 'P2002',
        clientVersion: '7',
      });
      throw error;
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await userRepository.createUser({
      ...data,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: user.id, email: user.email }, env.JWT_SECRET, {
      expiresIn: env.JWT_EXPIRES_IN as any,
    });

    // Omit password from response
    const { password, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, token };
  },

  async login(data: LoginInput) {
    const user = await userRepository.findByEmail(data.email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isValidPassword = await bcrypt.compare(data.password, user.password);
    if (!isValidPassword) {
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign({ id: user.id, email: user.email }, env.JWT_SECRET, {
      expiresIn: env.JWT_EXPIRES_IN as any,
    });

    const { password, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, token };
  },

  async getProfile(userId: number) {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  },
};