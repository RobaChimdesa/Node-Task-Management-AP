import { Request, Response } from 'express';
import { registerService, loginService } from '../services/auth.service.js';

export const register = async (req: Request, res: Response) => {
  try {
    const user = await registerService(req.body);
    res.status(201).json({
      status: 'success',
      message: 'User registered successfully',
      data: user,
    });
  } catch (err: any) {
    res.status(400).json({
      status: 'error',
      message: err.message,
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const result = await loginService(req.body.email, req.body.password);
    res.json({
      status: 'success',
      message: 'Login successful',
      ...result,
    });
  } catch (err: any) {
    res.status(401).json({
      status: 'error',
      message: err.message,
    });
  }
};