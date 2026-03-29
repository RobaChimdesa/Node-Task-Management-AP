// src/tests/integration/auth.test.ts
import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../../app.js';

describe('Auth Endpoints', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({
        name: 'Test User',
        email: 'testnew@example.com',
        password: 'password123',
      });

    expect(res.status).toBe(201);
    expect(res.body.status).toBe('success');
    expect(res.body.data.email).toBe('testnew@example.com');
  });

  it('should login user and return token', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        email: 'demo@example.com',
        password: 'password123',
      });

    expect(res.status).toBe(200);
    expect(res.body.status).toBe('success');
    expect(res.body.token).toBeDefined();
  });
});