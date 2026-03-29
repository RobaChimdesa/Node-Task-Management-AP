import {
    createCategoryRepo,
    findCategoriesByUserRepo,
    findCategoryByIdRepo,
  } from '../repositories/category.repository.js';
  
  export const createCategoryService = async (userId: number, data: any) => {
    const category = await createCategoryRepo({ ...data, userId });
  
    return {
      status: 'success',
      message: 'Category created successfully',
      data: category,
    };
  };
  
  export const getCategoriesService = async (userId: number) => {
    const categories = await findCategoriesByUserRepo(userId);
  
    return {
      status: 'success',
      data: categories,
    };
  };