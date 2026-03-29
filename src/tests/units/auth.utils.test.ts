// src/tests/unit/auth.utils.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {
  hashPassword,
  comparePassword,
  generateToken,
  verifyToken,
} from '../../utils/auth.js';

describe('Auth Utilities', () => {
  const testPayload = { id: 1, email: 'test@example.com', role: 'USER' };
  let token: string;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should hash password correctly', async () => {
    const password = 'myStrongPassword123';
    const hashed = await hashPassword(password);

    expect(hashed).toBeDefined();
    expect(hashed).not.toBe(password); // Not plain text
    expect(hashed.length).toBeGreaterThan(20);
  });

  it('should compare password correctly', async () => {
    const password = 'test123';
    const hashed = await hashPassword(password);

    const isMatch = await comparePassword(password, hashed);
    const isWrong = await comparePassword('wrongpass', hashed);

    expect(isMatch).toBe(true);
    expect(isWrong).toBe(false);
  });

  it('should generate valid JWT token', () => {
    token = generateToken(testPayload);

    expect(token).toBeDefined();
    expect(typeof token).toBe('string');
    expect(token.split('.').length).toBe(3); // Header.Payload.Signature
  });

  it('should verify JWT token correctly', () => {
    token = generateToken(testPayload);
    const decoded = verifyToken(token);

    expect(decoded.id).toBe(testPayload.id);
    expect(decoded.email).toBe(testPayload.email);
    expect(decoded.role).toBe(testPayload.role);
  });

  it('should throw error on invalid token', () => {
    expect(() => verifyToken('invalid.token.here')).toThrow();
  });
});