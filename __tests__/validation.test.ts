import mongoose from 'mongoose';
import { isValidEmail, getEmailValidationError, createUniqueEmailValidator } from '../lib/validation';
import User from '../models/User';

describe('Email Validation', () => {
  // Setup MongoDB connection for unique constraint tests
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/testdb');
  });

  // Cleanup after tests
  afterAll(async () => {
    await mongoose.connection.close();
  });

  // Clear database before each test
  beforeEach(async () => {
    await User.deleteMany({});
  });

  // Comprehensive test cases for email formats
  const validEmails = [
    'user@example.com',
    'firstname.lastname@example.com',
    'user+tag@example.com',
    'user123@example.co.uk',
    'very.common@example.com',
    'disposable.style.email.with+symbol@example.com',
    'other.email-with-hyphen@example.com',
    'user.name+tag@example.org',
  ];

  const invalidEmails = [
    '',
    '   ',
    'invalid-email',
    'user@',
    '@example.com',
    'user@example',
    'user@.com',
    'user@example.',
    'user@example..com',
    'a@b.c',  // Too short
    'a' .repeat(65) + '@example.com', // Local part too long
    'user@' + 'a'.repeat(254) + '.com', // Domain too long
  ];

  // Validate email format tests
  describe('isValidEmail - Format Validation', () => {
    validEmails.forEach(email => {
      it(`should return true for valid email: ${email}`, () => {
        expect(isValidEmail(email)).toBe(true);
      });
    });

    invalidEmails.forEach(email => {
      it(`should return false for invalid email: ${email}`, () => {
        expect(isValidEmail(email)).toBe(false);
      });
    });
  });

  // Error message generation tests
  describe('getEmailValidationError', () => {
    it('should return error for empty email', () => {
      expect(getEmailValidationError('')).toBe('Email address is required');
      expect(getEmailValidationError('   ')).toBe('Email address is required');
    });

    it('should return error for invalid email formats', () => {
      expect(getEmailValidationError('invalid-email')).toBe('Please enter a valid email address (e.g., example@domain.com)');
    });

    it('should return null for valid email', () => {
      expect(getEmailValidationError('user@example.com')).toBeNull();
    });
  });

  // Unique constraint tests
  describe('Unique Email Constraint', () => {
    it('should prevent duplicate email registration (case-insensitive)', async () => {
      // Create first user
      const user1 = new User({ email: 'test@example.com' });
      await user1.save();

      // Attempt to create user with same email (different case)
      const user2 = new User({ email: 'TEST@EXAMPLE.COM' });
      
      // Expect an error about duplicate email
      await expect(user2.save()).rejects.toThrow('Email already in use');
    });

    it('should allow unique email registration', async () => {
      const user1 = new User({ email: 'unique1@example.com' });
      const user2 = new User({ email: 'unique2@example.com' });

      await expect(user1.save()).resolves.toBeTruthy();
      await expect(user2.save()).resolves.toBeTruthy();
    });
  });
});