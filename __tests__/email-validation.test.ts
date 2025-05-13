import { User } from '../models/User';
import { normalizeEmail, validateEmail } from '../lib/validation';
import mongoose from 'mongoose';

describe('Email Validation and Uniqueness', () => {
  // Setup MongoDB connection before tests
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/jobittest');
  });

  // Clean up database after tests
  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  // Clear users before each test
  beforeEach(async () => {
    await User.deleteMany({});
  });

  // Unique Email Test Cases
  test('Should prevent duplicate emails (case-insensitive)', async () => {
    // Create first user
    const firstUser = new User({ 
      email: 'test.user@example.com',
      // other required user fields
    });
    await firstUser.save();

    // Try to create user with same email (different case)
    const duplicateUser = new User({ 
      email: 'Test.User@EXAMPLE.com',
      // other required user fields
    });

    // Attempt to save should throw unique constraint error
    await expect(duplicateUser.save()).rejects.toThrow();
  });

  // Normalization Test
  test('Email should be normalized before saving', async () => {
    const user = new User({ 
      email: '  Test.User@EXAMPLE.com  ',
      // other required user fields
    });
    await user.save();

    // Check that email is normalized
    expect(user.email).toBe('test.user@example.com');
  });

  // Unique Email Check Method Test
  test('isEmailTaken method should work correctly', async () => {
    const email = 'test.user@example.com';
    
    // Initially email should not be taken
    const isFirstTaken = await User.isEmailTaken(email);
    expect(isFirstTaken).toBe(false);

    // Create user
    const user = new User({ 
      email,
      // other required user fields
    });
    await user.save();

    // Now email should be taken (case-insensitive)
    const isSecondTaken = await User.isEmailTaken('Test.User@EXAMPLE.com');
    expect(isSecondTaken).toBe(true);
  });

  // Additional validation tests from previous implementation
  test('Should validate and normalize emails', () => {
    const testCases = [
      'user@example.com',
      'Test.User@EXAMPLE.com',
      '  user@example.com  '
    ];

    testCases.forEach(email => {
      const normalized = normalizeEmail(email);
      expect(validateEmail(email)).toBe(true);
      expect(normalized).toBe(normalized.toLowerCase().trim());
    });
  });
});
