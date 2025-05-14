import { isEmailUnique, createEmailUniqueConstraint } from '../database-utils';

describe('Email Uniqueness', () => {
  const mockUsers = [
    { email: 'user1@example.com', id: 1 },
    { email: 'USER2@EXAMPLE.COM', id: 2 },
    { email: 'user3@example.org', id: 3 }
  ];

  describe('isEmailUnique', () => {
    test('Identifies unique email', async () => {
      const uniqueEmail = 'newuser@example.com';
      const result = await isEmailUnique(mockUsers, uniqueEmail);
      expect(result).toBe(true);
    });

    test('Detects non-unique email (exact match)', async () => {
      const duplicateEmail = 'user1@example.com';
      const result = await isEmailUnique(mockUsers, duplicateEmail);
      expect(result).toBe(false);
    });

    test('Detects non-unique email (case-insensitive)', async () => {
      const duplicateEmail = 'USER2@example.com';
      const result = await isEmailUnique(mockUsers, duplicateEmail);
      expect(result).toBe(false);
    });

    test('Handles empty collection', async () => {
      const uniqueEmail = 'user@example.com';
      const result = await isEmailUnique([], uniqueEmail);
      expect(result).toBe(true);
    });
  });

  describe('createEmailUniqueConstraint', () => {
    test('Creates a unique constraint validator', async () => {
      const uniqueConstraint = createEmailUniqueConstraint(mockUsers);
      
      // Test unique email
      const uniqueResult = await uniqueConstraint('newuser@example.com');
      expect(uniqueResult).toBe(true);
      
      // Test duplicate email
      const duplicateResult = await uniqueConstraint('user1@example.com');
      expect(duplicateResult).toBe(false);
    });
  });
});