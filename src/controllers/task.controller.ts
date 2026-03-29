// src/controllers/task.controller.ts
import { Request, Response } from 'express';
import {
  createTaskService,
  getTasksService,
  getTaskByIdService,
  updateTaskService,
  deleteTaskService,
} from '../services/task.service.js';

export const createTask = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) throw new Error("User ID not found");

    const response = await createTaskService(userId, req.body);
    res.status(201).json(response);
  } catch (err: any) {
    res.status(400).json({
      status: "error",
      message: err.message || "Failed to create task",
    });
  }
};

export const getTasks = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) throw new Error("User ID not found");

    const response = await getTasksService(userId, req.query);
    res.json(response);
  } catch (err: any) {
    res.status(400).json({
      status: "error",
      message: err.message || "Failed to fetch tasks",
    });
  }
};

export const getTaskById = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const taskId = parseInt(req.params.id);

    if (!userId) throw new Error("User ID not found");
    if (!taskId) throw new Error("Task ID is required");

    const response = await getTaskByIdService(taskId, userId);
    res.json(response);
  } catch (err: any) {
    res.status(404).json({
      status: "error",
      message: err.message || "Task not found",
    });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const taskId = parseInt(req.params.id);

    if (!userId) throw new Error("User ID not found");
    if (!taskId) throw new Error("Task ID is required");

    const response = await updateTaskService(taskId, userId, req.body);
    res.json(response);
  } catch (err: any) {
    res.status(400).json({
      status: "error",
      message: err.message || "Failed to update task",
    });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const taskId = parseInt(req.params.id);

    if (!userId) throw new Error("User ID not found");
    if (!taskId) throw new Error("Task ID is required");

    const response = await deleteTaskService(taskId, userId);
    res.json(response);
  } catch (err: any) {
    res.status(400).json({
      status: "error",
      message: err.message || "Failed to delete task",
    });
  }
};