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

import prisma from '../prisma/client.js';
import { Prisma } from '@prisma/client';

export const createUserRepo = async (data: {
  email: string;
  password: string;
  name?: string | null;
  role?: Prisma.Role;
}) => {
  return prisma.user.create({
    data: {
      email: data.email,
      password: data.password,
      name: data.name,
      role: data.role ?? Prisma.Role.USER,
    },
  });
};