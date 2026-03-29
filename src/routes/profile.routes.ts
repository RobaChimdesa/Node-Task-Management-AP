// src/routes/profile.routes.ts
import { Router } from 'express';
import { getProfile, updateProfile } from '../controllers/profile.controller.js';
import { authenticate } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { updateProfileSchema } from '../schemas/profile.schema.js';

const router = Router();

// All profile routes require authentication
router.use(authenticate);

router.get('/', getProfile);
router.put('/', validate(updateProfileSchema), updateProfile);

export default router;