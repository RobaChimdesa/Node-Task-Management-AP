// src/controllers/profile.controller.ts
import { Request, Response } from 'express';
import { getProfileService, updateProfileService } from '../services/profile.service.js';

export const getProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) throw new Error("User ID not found");

    const response = await getProfileService(userId);
    res.json(response);
  } catch (err: any) {
    res.status(404).json({
      status: "error",
      message: err.message || "Profile not found",
    });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) throw new Error("User ID not found");

    const response = await updateProfileService(userId, req.body);
    res.json(response);
  } catch (err: any) {
    res.status(400).json({
      status: "error",
      message: err.message || "Failed to update profile",
    });
  }
};