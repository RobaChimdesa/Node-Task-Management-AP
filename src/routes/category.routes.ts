import { Router } from 'express';
import { categoryController } from '../controllers/category.controller';
import { validate } from '../middleware/validate';
import { authMiddleware } from '../middleware/auth';
import { createCategorySchema, updateCategorySchema } from '../schemas/category.schema';

export const categoryRoutes = Router();

// Apply auth middleware to all category routes
categoryRoutes.use(authMiddleware);

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Category management
 */

/**
 * @swagger
 * /api/v1/categories:
 *   get:
 *     summary: Get all categories for current user
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of categories
 *   post:
 *     summary: Create a new category
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Category created
 *       400:
 *         description: Validation error
 *       409:
 *         description: Category name already exists for this user
 */
categoryRoutes.route('/')
  .get(categoryController.getAll)
  .post(validate(createCategorySchema), categoryController.create);

/**
 * @swagger
 * /api/v1/categories/{id}:
 *   get:
 *     summary: Get category by ID
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Category details
 *       404:
 *         description: Category not found
 *   put:
 *     summary: Update a category
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Category updated
 *       404:
 *         description: Category not found
 *   delete:
 *     summary: Delete a category
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Category deleted
 *       404:
 *         description: Category not found
 */
categoryRoutes.route('/:id')
  .get(categoryController.getOne)
  .put(validate(updateCategorySchema), categoryController.update)
  .delete(categoryController.delete);
