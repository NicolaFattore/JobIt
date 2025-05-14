import { isEmailUnique } from '../database-utils';

describe('Email Uniqueness', () => {
  const mockUsers = [
    { email: 'user1@example.com' },
    { email: 'USER2@EXAMPLE.COM' },
    { email: 'user3@example.org' }
  ];

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
    const duplicateEmail = 'user2@example.com';
    const result = await isEmailUnique(mockUsers, duplicateEmail);
    expect(result).toBe(false);
  });

  test('Handles empty collection', async () => {
    const uniqueEmail = 'user@example.com';
    const result = await isEmailUnique([], uniqueEmail);
    expect(result).toBe(true);
  });
});