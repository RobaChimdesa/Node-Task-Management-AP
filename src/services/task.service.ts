import {
    createTaskRepo,
    findTasksByUserRepo,
    findTaskByIdRepo,
    updateTaskRepo,
    deleteTaskRepo,
  } from '../repositories/task.repository.js';
  
  export const createTaskService = async (userId: number, data: any) => {
    const task = await createTaskRepo({
      ...data,
      userId,
      dueDate: data.dueDate ? new Date(data.dueDate) : null,
    });
  
    return {
      status: 'success',
      message: 'Task created successfully',
      data: task,
    };
  };
  
  export const getTasksService = async (userId: number, query: any) => {
    const result = await findTasksByUserRepo(userId, query);
  
    return {
      status: 'success',
      data: result.tasks,
      pagination: {
        page: result.page,
        limit: result.limit,
        total: result.total,
        pages: Math.ceil(result.total / result.limit),
      },
    };
  };
  
  export const getTaskByIdService = async (taskId: number, userId: number) => {
    const task = await findTaskByIdRepo(taskId, userId);
    if (!task) throw new Error('Task not found');
  
    return {
      status: 'success',
      data: task,
    };
  };
  
  export const updateTaskService = async (taskId: number, userId: number, data: any) => {
    const task = await updateTaskRepo(taskId, userId, data);
    return {
      status: 'success',
      message: 'Task updated successfully',
      data: task,
    };
  };
  
  export const deleteTaskService = async (taskId: number, userId: number) => {
    await deleteTaskRepo(taskId, userId);
    return {
      status: 'success',
      message: 'Task deleted successfully',
    };
  };