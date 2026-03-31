import { taskRepository } from '../repositories/task.repository';
import { categoryService } from '../services/category.service';
import { CreateTaskInput, UpdateTaskInput, TaskQueryInput } from '../schemas/task.schema';

export const taskService = {
  async createTask(userId: number, data: CreateTaskInput) {
    if (data.categoryId) {
      // Validate category ownership
      await categoryService.getCategoryById(data.categoryId, userId);
    }
    return taskRepository.create(userId, data);
  },

  async getTasks(userId: number, query: TaskQueryInput) {
    return taskRepository.findManyWithPagination(userId, query);
  },

  async getTaskById(id: number, userId: number) {
    const task = await taskRepository.findByIdAndUserId(id, userId);
    if (!task) {
      throw new Error('Task not found');
    }
    return task;
  },

  async updateTask(id: number, userId: number, data: UpdateTaskInput) {
    await this.getTaskById(id, userId);
    
    if (data.categoryId) {
      await categoryService.getCategoryById(data.categoryId, userId);
    }
    
    return taskRepository.update(id, userId, data);
  },

  async deleteTask(id: number, userId: number) {
    await this.getTaskById(id, userId);
    return taskRepository.delete(id, userId);
  },
};
