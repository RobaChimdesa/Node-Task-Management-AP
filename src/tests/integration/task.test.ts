// src/tests/integration/task.test.ts
import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import app from '../../app.js';

let token: string;
let taskId: number;

describe('Task Endpoints', () => {
  beforeAll(async () => {
    // Login to get token
    const loginRes = await request(app)
      .post('/auth/login')
      .send({
        email: 'demo@example.com',
        password: 'password123',
      });

    token = loginRes.body.token;
  });

  it('should create a new task', async () => {
    const res = await request(app)
      .post('/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: "Integration Test Task",
        description: "Testing task creation",
        priority: "HIGH",
        dueDate: "2026-04-30T23:59:59Z"
      });

    expect(res.status).toBe(201);
    expect(res.body.status).toBe('success');
    expect(res.body.data.title).toBe("Integration Test Task");
    taskId = res.body.data.id;
  });

  it('should get all tasks for authenticated user', async () => {
    const res = await request(app)
      .get('/tasks')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.status).toBe('success');
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('should return 401 without token', async () => {
    const res = await request(app).get('/tasks');
    expect(res.status).toBe(401);
  });
});