import { z } from 'zod';

export const updateProfileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50).optional(),
  // You can add more fields later (bio, avatar, etc.)
}).strict();