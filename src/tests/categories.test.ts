import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import app  from '../app';
// import { prisma } from '../config/prisma';
import prisma from '../prisma/client';
import bcrypt from 'bcrypt';
import { getAuthToken } from './setup';

describe('Categories Module', () => {
  let token: string;
  let user: any;

  beforeAll(async () => {
    const hashedPassword = await bcrypt.hash('password123', 10);
    user = await prisma.user.create({
      data: {
        name: 'Cat User',
        email: 'cat@example.com',
        password: hashedPassword,
      },
    });
    token = getAuthToken(user.id, user.email);
  });

  describe('POST /api/v1/categories', () => {
    it('should create a new category', async () => {
      const response = await request(app)
        .post('/api/v1/categories')
        .set('Authorization', `Bearer ${token}`)
        .send({ name: 'Work', description: 'Work related tasks' });

      expect(response.status).toBe(201);
      expect(response.body.name).toBe('Work');
      expect(response.body.userId).toBe(user.id);
    });

    it('should fail if category name already exists for user', async () => {
      await request(app)
        .post('/api/v1/categories')
        .set('Authorization', `Bearer ${token}`)
        .send({ name: 'Personal' });

      const response = await request(app)
        .post('/api/v1/categories')
        .set('Authorization', `Bearer ${token}`)
        .send({ name: 'Personal' });

      expect(response.status).toBe(409);
    });
  });

  describe('GET /api/v1/categories', () => {
    it('should get all categories for user', async () => {
      await request(app)
        .post('/api/v1/categories')
        .set('Authorization', `Bearer ${token}`)
        .send({ name: 'Hobbies' });

      const response = await request(app)
        .get('/api/v1/categories')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBeTruthy();
      expect(response.body.length).toBeGreaterThan(0);
    });
  });

  describe('PUT /api/v1/categories/:id', () => {
    it('should update a category', async () => {
      const createRes = await request(app)
        .post('/api/v1/categories')
        .set('Authorization', `Bearer ${token}`)
        .send({ name: 'UpdateMe' });
      const id = createRes.body.id;

      const response = await request(app)
        .put(`/api/v1/categories/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ name: 'Updated' });

      expect(response.status).toBe(200);
      expect(response.body.name).toBe('Updated');
    });
  });

  describe('DELETE /api/v1/categories/:id', () => {
    it('should delete a category', async () => {
      const createRes = await request(app)
        .post('/api/v1/categories')
        .set('Authorization', `Bearer ${token}`)
        .send({ name: 'DeleteMe' });
      const id = createRes.body.id;

      const response = await request(app)
        .delete(`/api/v1/categories/${id}`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(204);

      // Verify deletion
      const getRes = await request(app)
        .get(`/api/v1/categories/${id}`)
        .set('Authorization', `Bearer ${token}`);
      expect(getRes.status).toBe(404);
    });
  });
});