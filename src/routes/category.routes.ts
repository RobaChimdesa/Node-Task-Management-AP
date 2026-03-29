// src/routes/category.routes.ts
import { Router } from 'express';
import {
  createCategory,
  getCategories,
} from '../controllers/category.controller.js';
import { authenticate } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { createCategorySchema } from '../schemas/category.schema.js';

const router = Router();

router.use(authenticate);

router.post('/', validate(createCategorySchema), createCategory);
router.get('/', getCategories);

export default router;