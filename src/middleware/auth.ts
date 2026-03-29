// src/middleware/auth.ts
import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/auth.js';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        status: "error",
        message: "No token provided. Please login first."
      });
    }

    const token = authHeader.split(' ')[1];

    const decoded = verifyToken(token);

    // Attach user info to request object
    (req as any).user = decoded;

    next(); // Continue to the next middleware or controller
  } catch (err: any) {
    return res.status(401).json({
      status: "error",
      message: "Invalid or expired token. Please login again."
    });
  }
};