import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import  app  from '../app';
import  prisma  from '../config/prisma';
import bcrypt from 'bcrypt';
import { getAuthToken } from './setup';

describe('Tasks Module', () => {
  let token: string;
  let user: any;
  let category: any;

  beforeAll(async () => {
    const hashedPassword = await bcrypt.hash('password123', 10);
    user = await prisma.user.create({
      data: {
        name: 'Task User',
        email: 'task@example.com',
        password: hashedPassword,
      },
    });
    token = getAuthToken(user.id, user.email);

    category = await prisma.category.create({
      data: {
        name: 'General',
        userId: user.id,
      },
    });
  });

  describe('POST /api/v1/tasks', () => {
    it('should create a task without category', async () => {
      const response = await request(app)
        .post('/api/v1/tasks')
        .set('Authorization', `Bearer ${token}`)
        .send({ title: 'Task 1', description: 'Desc 1', priority: 'HIGH' });

      expect(response.status).toBe(201);
      expect(response.body.title).toBe('Task 1');
      expect(response.body.userId).toBe(user.id);
      expect(response.body.status).toBe('TODO'); // Default
    });

    it('should create a task with category', async () => {
      const response = await request(app)
        .post('/api/v1/tasks')
        .set('Authorization', `Bearer ${token}`)
        .send({ title: 'Task 2', categoryId: category.id });

      expect(response.status).toBe(201);
      expect(response.body.categoryId).toBe(category.id);
    });
  });

  describe('GET /api/v1/tasks', () => {
    it('should fetch paginated tasks', async () => {
      await request(app)
        .post('/api/v1/tasks')
        .set('Authorization', `Bearer ${token}`)
        .send({ title: 'Task 3', status: 'IN_PROGRESS' });

      const response = await request(app)
        .get('/api/v1/tasks?page=1&limit=10')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('data');
      expect(response.body).toHaveProperty('total');
      expect(response.body.data.length).toBeGreaterThan(0);
    });

    it('should filter tasks by status', async () => {
      const response = await request(app)
        .get('/api/v1/tasks?status=IN_PROGRESS')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      response.body.data.forEach((task: any) => {
        expect(task.status).toBe('IN_PROGRESS');
      });
    });

    it('should search tasks by title', async () => {
      const response = await request(app)
        .get('/api/v1/tasks?search=Task 2')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.data[0].title).toBe('Task 2');
    });
  });

  describe('PUT /api/v1/tasks/:id', () => {
    it('should update a task', async () => {
      const createRes = await request(app)
        .post('/api/v1/tasks')
        .set('Authorization', `Bearer ${token}`)
        .send({ title: 'Update Task' });
      const id = createRes.body.id;

      const response = await request(app)
        .put(`/api/v1/tasks/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ status: 'DONE', priority: 'LOW' });

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('DONE');
      expect(response.body.priority).toBe('LOW');
    });
  });

  describe('DELETE /api/v1/tasks/:id', () => {
    it('should delete a task', async () => {
      const createRes = await request(app)
        .post('/api/v1/tasks')
        .set('Authorization', `Bearer ${token}`)
        .send({ title: 'Delete Task' });
      const id = createRes.body.id;

      const response = await request(app)
        .delete(`/api/v1/tasks/${id}`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(204);
    });
  });
});
