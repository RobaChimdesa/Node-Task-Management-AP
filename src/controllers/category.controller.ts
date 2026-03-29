// src/controllers/category.controller.ts
import { Request, Response } from 'express';
import {
  createCategoryService,
  getCategoriesService,
} from '../services/category.service.js';

export const createCategory = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) throw new Error("User ID not found");

    const response = await createCategoryService(userId, req.body);
    res.status(201).json(response);
  } catch (err: any) {
    res.status(400).json({
      status: "error",
      message: err.message || "Failed to create category",
    });
  }
};

export const getCategories = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) throw new Error("User ID not found");

    const response = await getCategoriesService(userId);
    res.json(response);
  } catch (err: any) {
    res.status(400).json({
      status: "error",
      message: err.message || "Failed to fetch categories",
    });
  }
};