import { Request, Response, NextFunction } from 'express';
import { taskService } from '../services/task.service';
import { TaskQueryInput } from '../schemas/task.schema';

export const taskController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await taskService.createTask(req.user!.id, req.body);
      res.status(201).json(result);
    } catch (error) {
      if (error instanceof Error && error.message === 'Category not found') {
        return res.status(400).json({ message: 'Invalid categoryId or category does not belong to user' });
      }
      next(error);
    }
  },

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await taskService.getTasks(req.user!.id, req.query as unknown as TaskQueryInput);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },

  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id as string, 10);
      const result = await taskService.getTaskById(id, req.user!.id);
      res.status(200).json(result);
    } catch (error) {
      if (error instanceof Error && error.message === 'Task not found') {
        return res.status(404).json({ message: error.message });
      }
      next(error);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id as string, 10);
      const result = await taskService.updateTask(id, req.user!.id, req.body);
      res.status(200).json(result);
    } catch (error) {
      if (error instanceof Error && error.message === 'Task not found') {
        return res.status(404).json({ message: error.message });
      }
      if (error instanceof Error && error.message === 'Category not found') {
        return res.status(400).json({ message: 'Invalid categoryId or category does not belong to user' });
      }
      next(error);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id as string, 10);
      await taskService.deleteTask(id, req.user!.id);
      res.status(204).end();
    } catch (error) {
      if (error instanceof Error && error.message === 'Task not found') {
        return res.status(404).json({ message: error.message });
      }
      next(error);
    }
  },
};
