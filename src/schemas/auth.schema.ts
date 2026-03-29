// src/schemas/auth.schema.ts
import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name is too long")
    .trim(),

  email: z.string()
    .email("Invalid email address")
    .trim()
    .toLowerCase(),

  password: z.string()
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password is too long"),
}).strict();   // This will reject extra fields

export const loginSchema = z.object({
  email: z.string()
    .email("Invalid email address")
    .trim()
    .toLowerCase(),

  password: z.string()
    .min(1, "Password is required"),
});