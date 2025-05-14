import { validateEmail, normalizeEmail, getEmailValidationError } from '../lib/email-validation';
import mongoose from 'mongoose';
import User from '../models/User';

describe('Email Validation', () => {
  // Setup and teardown for MongoDB connection
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/testdb');
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await User.deleteMany({});
  });

  // Existing email format validation tests
  const validEmails = [
    'user@example.com',
    'firstname.lastname@example.com',
    'email@subdomain.example.com',
    'firstname+lastname@example.com',
    'email@123.123.123.123',
    'email@[123.123.123.123]',
    '"email"@example.com',
    '1234567890@example.com',
    'email@example-one.com',
    '_______@example.com',
    'email@example.name',
    'email@example.museum',
    'email@example.co.jp',
    'firstname-lastname@example.com'
  ];

  const invalidEmails = [
    '',
    'invalid',
    '@invalid.com',
    'invalid@',
    'invalid@.com',
    'invalid@domain',
    'invalid@domain.',
    '   @example.com',
    'email@example',
    'email.@example.com',
    '.email@example.com',
    'email..email@example.com',
    'あいうえお@example.com'
  ];

  // Existing format validation tests
  test.each(validEmails)('validates valid email: %s', (email) => {
    expect(validateEmail(email)).toBe(true);
    expect(getEmailValidationError(email)).toBeNull();
  });

  test.each(invalidEmails)('invalidates invalid email: %s', (email) => {
    expect(validateEmail(email)).toBe(false);
    expect(getEmailValidationError(email)).not.toBeNull();
  });

  // Email normalization tests
  test('normalizes email consistently', () => {
    expect(normalizeEmail('  User@Example.com  ')).toBe('user@example.com');
    expect(normalizeEmail('USER@EXAMPLE.COM')).toBe('user@example.com');
  });

  // Database-level unique constraint tests
  describe('Database Email Uniqueness', () => {
    test('prevents duplicate emails (case-insensitive)', async () => {
      // Create a user with a specific email
      const initialUser = new User({
        email: 'test@example.com',
        password: 'password123'
      });
      await initialUser.save();

      // Try to create another user with the same email (different case)
      const duplicateUser = new User({
        email: 'TEST@EXAMPLE.COM',
        password: 'differentpassword'
      });

      // Expect an error about duplicate email
      await expect(duplicateUser.save()).rejects.toThrow();
    });

    test('allows unique emails', async () => {
      const user1 = new User({
        email: 'user1@example.com',
        password: 'password123'
      });
      const user2 = new User({
        email: 'user2@example.com',
        password: 'password456'
      });

      await expect(user1.save()).resolves.toBeTruthy();
      await expect(user2.save()).resolves.toBeTruthy();
    });
  });
});