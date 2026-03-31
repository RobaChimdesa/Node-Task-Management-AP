import { Request, Response, NextFunction } from 'express';
import { authService } from '../services/auth.service';

export const authController = {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await authService.register(req.body);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  },

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await authService.login(req.body);
      res.status(200).json(result);
    } catch (error) {
      if (error instanceof Error && error.message === 'Invalid credentials') {
        return res.status(401).json({ message: error.message });
      }
      next(error);
    }
  },

  async getProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.id;
      const user = await authService.getProfile(userId);
      res.status(200).json({ user });
    } catch (error) {
      if (error instanceof Error && error.message === 'User not found') {
        return res.status(404).json({ message: error.message });
      }
      next(error);
    }
  },
};
