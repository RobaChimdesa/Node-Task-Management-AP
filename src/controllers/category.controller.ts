import { Request, Response, NextFunction } from 'express';
import { categoryService } from '../services/category.service';

export const categoryController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await categoryService.createCategory(req.user!.id, req.body);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  },

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await categoryService.getCategories(req.user!.id);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },

  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id as string, 10);
      const result = await categoryService.getCategoryById(id, req.user!.id);
      res.status(200).json(result);
    } catch (error) {
      if (error instanceof Error && error.message === 'Category not found') {
        return res.status(404).json({ message: error.message });
      }
      next(error);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id as string, 10);
      const result = await categoryService.updateCategory(id, req.user!.id, req.body);
      res.status(200).json(result);
    } catch (error) {
      if (error instanceof Error && error.message === 'Category not found') {
        return res.status(404).json({ message: error.message });
      }
      next(error);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id as string, 10);
      await categoryService.deleteCategory(id, req.user!.id);
      res.status(204).end();
    } catch (error) {
      if (error instanceof Error && error.message === 'Category not found') {
        return res.status(404).json({ message: error.message });
      }
      next(error);
    }
  },
};
