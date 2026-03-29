// src/middleware/validate.ts
import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';

export const validate = (schema: z.ZodSchema, location: 'body' | 'query' | 'params' = 'body') => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req[location];

      const validated = schema.parse(data);

      (req as any)[location] = validated;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          status: "error",
          message: "Validation failed",
          errors: error.issues.map((err) => ({
            field: err.path.join('.') || 'unknown',
            message: err.message,
          })),
        });
      } else {
        res.status(400).json({
          status: "error",
          message: "Invalid input data",
        });
      }
    }
  };
};