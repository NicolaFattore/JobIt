import mongoose from 'mongoose';
import User from '../models/User';
import { describe, it, expect, beforeAll, afterAll } from 'vitest';

describe('User Model Email Uniqueness', () => {
  beforeAll(async () => {
    // Connect to a test database
    await mongoose.connect(process.env.MONGODB_TEST_URI || 'mongodb://localhost:27017/test');
  });

  afterAll(async () => {
    // Disconnect from the test database
    await mongoose.connection.close();
  });

  it('should prevent duplicate emails (case-insensitive)', async () => {
    // Clear existing users
    await User.deleteMany({});

    // Create a user with a specific email
    const originalUser = new User({ 
      email: 'test@example.com',
      // Add other required fields if any
    });
    await originalUser.save();

    // Try to create another user with the same email (different case)
    const duplicateUser = new User({ 
      email: 'TEST@EXAMPLE.COM',
      // Add other required fields if any
    });

    // Expect an error due to duplicate email
    await expect(duplicateUser.save()).rejects.toThrow();
  });

  it('should check email uniqueness correctly', async () => {
    // Clear existing users
    await User.deleteMany({});

    // Create a user
    const originalUser = new User({ 
      email: 'unique@example.com',
      // Add other required fields if any
    });
    await originalUser.save();

    // Check existing email
    const isExistingEmailTaken = await User.isEmailTaken('unique@example.com');
    expect(isExistingEmailTaken).toBe(true);

    // Check non-existing email
    const isNewEmailTaken = await User.isEmailTaken('new@example.com');
    expect(isNewEmailTaken).toBe(false);
  });
});