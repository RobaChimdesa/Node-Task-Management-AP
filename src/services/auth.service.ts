// src/services/auth.service.ts
import { hashPassword, comparePassword, generateToken } from '../utils/auth.js';
import { createUserRepo, findUserByEmailRepo } from '../repositories/user.repository.js';

export const registerService = async (data: { 
  email: string; 
  password: string; 
  name?: string 
}) => {
  const existing = await findUserByEmailRepo(data.email);
  if (existing) throw new Error('Email already exists');

  const hashedPassword = await hashPassword(data.password);

  const user = await createUserRepo({
    email: data.email,
    password: hashedPassword,
    name: data.name,
  });

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  };
};

export const loginService = async (email: string, password: string) => {
  const user = await findUserByEmailRepo(email);
  if (!user) throw new Error('Invalid email or password');

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) throw new Error('Invalid email or password');

  const token = generateToken({
    id: user.id,
    email: user.email,
    role: user.role,
  });

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
  };
};