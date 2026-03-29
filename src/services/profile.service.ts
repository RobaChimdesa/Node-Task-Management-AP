// src/services/profile.service.ts
import { getProfileRepo, updateProfileRepo } from '../repositories/profile.repository.js';

export const getProfileService = async (userId: number) => {
  const user = await getProfileRepo(userId);
  if (!user) throw new Error("User not found");

  return {
    data: user,
    status: "success",
    message: "Profile retrieved successfully",
    statusCode: 200,
    error: null,
  };
};

export const updateProfileService = async (userId: number, data: { name?: string }) => {
  const user = await updateProfileRepo(userId, data);
  
  return {
    data: user,
    status: "success",
    message: "Profile updated successfully",
    statusCode: 200,
    error: null,
  };
};