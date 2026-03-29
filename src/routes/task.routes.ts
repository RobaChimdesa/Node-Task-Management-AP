// src/routes/task.routes.ts
import { Router } from 'express';
import {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask,
} from '../controllers/task.controller.js';
import { authenticate } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import {
    createTaskSchema,
    updateTaskSchema,
    taskQuerySchema,
} from '../schemas/task.schema.js';

const router = Router();

// Protect all task routes
router.use(authenticate);
/**
 * @openapi
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     description: Create a task for the authenticated user
 *     tags: [Tasks]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Finish project documentation"
 *               description:
 *                 type: string
 *                 example: "Complete the final report"
 *               status:
 *                 type: string
 *                 enum: [TODO, IN_PROGRESS, DONE]
 *                 example: "TODO"
 *               priority:
 *                 type: string
 *                 enum: [LOW, MEDIUM, HIGH]
 *                 example: "HIGH"
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-04-30T23:59:59Z"
 *               categoryId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Task created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */

router.post('/', validate(createTaskSchema), createTask);

/**
 * @openapi
 * /tasks:
 *   get:
 *     summary: Get all tasks
 *     description: Retrieve tasks with optional filtering and pagination
 *     tags: [Tasks]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [TODO, IN_PROGRESS, DONE]
 *       - in: query
 *         name: priority
 *         schema:
 *           type: string
 *           enum: [LOW, MEDIUM, HIGH]
 *       - in: query
 *         name: categoryId
 *         schema:
 *           type: integer
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: List of tasks with pagination
 *       401:
 *         description: Unauthorized
 */
router.get('/', validate(taskQuerySchema, 'query'), getTasks);
/**
 * @openapi
 * /tasks/{id}:
 *   get:
 *     summary: Get task by ID
 *     description: Retrieve a single task by its ID
 *     tags: [Tasks]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Task details
 *       404:
 *         description: Task not found
 *       401:
 *         description: Unauthorized
 */
router.get('/:id', getTaskById);
/**
 * @openapi
 * /tasks/{id}:
 *   put:
 *     summary: Update a task
 *     description: Update an existing task
 *     tags: [Tasks]
 *     security:
 *       - BearerAuth: []
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
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [TODO, IN_PROGRESS, DONE]
 *               priority:
 *                 type: string
 *                 enum: [LOW, MEDIUM, HIGH]
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *               categoryId:
 *                 type: integer
 *                 nullable: true
 *     responses:
 *       200:
 *         description: Task updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Task not found
 */
router.put('/:id', validate(updateTaskSchema), updateTask);
/**
 * @openapi
 * /tasks/{id}:
 *   delete:
 *     summary: Delete a task
 *     description: Delete a task by ID
 *     tags: [Tasks]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       404:
 *         description: Task not found
 *       401:
 *         description: Unauthorized
 */
router.delete('/:id', deleteTask);

export default router;