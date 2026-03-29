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

/**
 * @openapi
 * /categories:
 *   post:
 *     summary: Create a new category
 *     description: Create a category for the authenticated user
 *     tags: [Categories]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Work"
 *               description:
 *                 type: string
 *                 example: "All work-related tasks"
 *     responses:
 *       201:
 *         description: Category created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.post('/', validate(createCategorySchema), createCategory);
/**
 * @openapi
 * /categories:
 *   get:
 *     summary: Get all categories
 *     description: Retrieve all categories belonging to the authenticated user
 *     tags: [Categories]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of categories
 *       401:
 *         description: Unauthorized
 */
router.get('/', getCategories);

export default router;