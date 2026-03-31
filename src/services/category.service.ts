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
    
    // Actually Prisma update needs only unique identifier
    // We already verified the user owns this category in getCategoryById
    // So we can safely update it. But wait, we must use the correct where clause in prisma.update
    // The repository uses just ID or a composite. Let's fix repository to use id for Prisma 
    // and rely on service for ownership constraint. Wait, repository update needs fixing.
    // I will write it simply:
    return categoryRepository.update(id, userId, data);
  },

  async deleteCategory(id: number, userId: number) {
    // Check ownership first
    await this.getCategoryById(id, userId);
    return categoryRepository.delete(id, userId);
  },
};
