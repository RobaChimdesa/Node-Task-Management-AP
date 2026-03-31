import { describe, it, expect } from 'vitest';
import request from 'supertest';
import  app  from '../app';
import  prisma  from '../config/prisma';

describe('Auth Module', () => {
  const credentials = {
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123',
  };

  describe('POST /api/v1/auth/register', () => {
    it('should register a new user successfully', async () => {
      const response = await request(app)
        .post('/api/v1/auth/register')
        .send(credentials);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('token');
      expect(response.body.user).toHaveProperty('id');
      expect(response.body.user.email).toBe(credentials.email);
      expect(response.body.user).not.toHaveProperty('password');
    });

    it('should return 409 if email already exists', async () => {
      // First registration was done in previous test, but tests are not isolated yet if not cleaned up.
      // We will ensure a user is there first.
      await request(app).post('/api/v1/auth/register').send(credentials);

      const response = await request(app)
        .post('/api/v1/auth/register')
        .send(credentials);

      expect(response.status).toBe(409);
    });

    it('should return 400 for invalid input', async () => {
      const response = await request(app)
        .post('/api/v1/auth/register')
        .send({ email: 'not-an-email', password: 'short' });

      expect(response.status).toBe(400);
    });
  });

  describe('POST /api/v1/auth/login', () => {
    it('should login a user successfully', async () => {
      await request(app).post('/api/v1/auth/register').send(credentials);

      const response = await request(app)
        .post('/api/v1/auth/login')
        .send({ email: credentials.email, password: credentials.password });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
    });

    it('should return 401 for wrong password', async () => {
      await request(app).post('/api/v1/auth/register').send(credentials);

      const response = await request(app)
        .post('/api/v1/auth/login')
        .send({ email: credentials.email, password: 'wrongpassword' });

      expect(response.status).toBe(401);
    });
  });

  describe('GET /api/v1/auth/profile', () => {
    it('should get user profile with valid token', async () => {
      const loginRes = await request(app)
        .post('/api/v1/auth/login')
        .send({ email: credentials.email, password: credentials.password });
      const token = loginRes.body.token;

      const response = await request(app)
        .get('/api/v1/auth/profile')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.user.email).toBe(credentials.email);
    });

    it('should return 401 without token', async () => {
      const response = await request(app).get('/api/v1/auth/profile');
      expect(response.status).toBe(401);
    });
  });
});
