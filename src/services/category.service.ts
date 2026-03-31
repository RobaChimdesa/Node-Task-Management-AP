import { categoryRepository } from '../repositories/category.repository';
import { CreateCategoryInput, UpdateCategoryInput } from '../schemas/category.schema';

export const categoryService = {
  async createCategory(userId: number, data: CreateCategoryInput) {
    return categoryRepository.create(userId, data);
  },

  async getCategories(userId: number) {
    return categoryRepository.findAllByUserId(userId);
  },

  async getCategoryById(id: number, userId: number) {
    const category = await categoryRepository.findByIdAndUserId(id, userId);
    if (!category) {
      throw new Error('Category not found');
    }
    return category;
  },

  async updateCategory(id: number, userId: number, data: UpdateCategoryInput) {
    // Check ownership first
    await this.getCategoryById(id, userId);
    
    return categoryRepository.update(id, userId, data);
  },

  async deleteCategory(id: number, userId: number) {
    // Check ownership first
    await this.getCategoryById(id, userId);
    return categoryRepository.delete(id, userId);
  },
};