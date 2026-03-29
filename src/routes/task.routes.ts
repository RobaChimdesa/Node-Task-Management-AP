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

router.post('/', validate(createTaskSchema), createTask);
router.get('/', validate(taskQuerySchema, 'query'), getTasks);
router.get('/:id', getTaskById);
router.put('/:id', validate(updateTaskSchema), updateTask);
router.delete('/:id', deleteTask);

export default router;