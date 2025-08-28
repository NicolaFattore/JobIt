import mongoose from 'mongoose';
import { isEmailUnique, validateEmailUniqueness } from '../lib/user-validation';
import User from '../models/User';

// Mock MongoDB connection
beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/testdb');
});

// Clean up and close connection after tests
afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

// Clear users before each test
beforeEach(async () => {
  await User.deleteMany({});
});

describe('Email Uniqueness Validation', () => {
  test('should return true for a new email', async () => {
    const uniqueEmail = 'newuser@example.com';
    const result = await isEmailUnique(uniqueEmail);
    expect(result).toBe(true);
  });

  test('should return false for an existing email', async () => {
    // Create a user first
    await User.create({
      email: 'existing@example.com',
      password: 'password123'
    });

    const result = await isEmailUnique('existing@example.com');
    expect(result).toBe(false);
  });

  test('should be case-insensitive for email uniqueness', async () => {
    // Create a user with lowercase email
    await User.create({
      email: 'test@example.com',
      password: 'password123'
    });

    // Check with different cases
    const result1 = await isEmailUnique('TEST@EXAMPLE.COM');
    const result2 = await isEmailUnique('Test@Example.com');

    expect(result1).toBe(false);
    expect(result2).toBe(false);
  });

  test('validateEmailUniqueness should provide detailed result', async () => {
    // Create an existing user
    await User.create({
      email: 'existing@example.com',
      password: 'password123'
    });

    // Test unique email
    const uniqueResult = await validateEmailUniqueness('newuser@example.com');
    expect(uniqueResult.isUnique).toBe(true);
    expect(uniqueResult.message).toBeUndefined();

    // Test existing email
    const existingResult = await validateEmailUniqueness('existing@example.com');
    expect(existingResult.isUnique).toBe(false);
    expect(existingResult.message).toBe('This email is already registered');
  });
});