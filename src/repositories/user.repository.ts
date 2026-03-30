// // src/repositories/user.repository.ts
// import prisma from '../prisma/client.js';
// // import { Role } from '@prisma/client';
// import { Prisma } from '@prisma/client';

// export const createUserRepo = async (data: {
//   role: string;
//   email: string;
//   password: string;
//   name?: string | null;
//   // role?: Role;
  
// }) => {
//   return prisma.user.create({
//     data: {
//       email: data.email,
//       password: data.password,
//       name: data.name,
      
//       role: data.role ?? 'USER',     // Safe default
//     },
//   });
// };

// export const findUserByEmailRepo = async (email: string) => {
//   return prisma.user.findUnique({
//     where: { email },
//   });
// };

// src/repositories/user.repository.ts
import prisma from '../prisma/client.js';

export const createUserRepo = async (data: {
  email: string;
  password: string;
  name?: string | null;
  role?: 'USER' | 'ADMIN';        // Use literal union instead of imported Role
}) => {
  return prisma.user.create({
    data: {
      email: data.email,
      password: data.password,
      name: data.name,
      role: data.role ?? 'USER',
    },
  });
};

export const findUserByEmailRepo = async (email: string) => {
  return prisma.user.findUnique({
    where: { email },
  });
};