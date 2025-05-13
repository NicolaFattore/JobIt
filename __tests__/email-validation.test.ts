import { isValidEmail } from '../lib/utils';

describe('Email Validation', () => {
  // Valid email test cases
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
  ];

  // Invalid email test cases
  const invalidEmails = [
    '',
    ' ',
    'invalid',
    '@',
    'email@',
    'email@example',
    'email@.com',
    'email@example..com',
    'email@example.com.',
    'email@example,com',
    'email@example@example.com',
    'plainaddress',
    '@example.com',
    'Joe Smith <email@example.com>',
    'email.example.com',
    'email@example@example.com',
    '.email@example.com',
    'email.@example.com',
    'email..email@example.com',
  ];

  // Test valid emails
  test.each(validEmails)('should validate valid email: %s', (email) => {
    expect(isValidEmail(email)).toBe(true);
  });

  // Test invalid emails
  test.each(invalidEmails)('should invalidate invalid email: %s', (email) => {
    expect(isValidEmail(email)).toBe(false);
  });

  // Additional specific test cases
  test('should handle null and undefined inputs', () => {
    expect(isValidEmail('')).toBe(false);
    expect(isValidEmail(null as any)).toBe(false);
    expect(isValidEmail(undefined as any)).toBe(false);
  });

  // Test whitespace handling
  test('should trim whitespace', () => {
    expect(isValidEmail('  user@example.com  ')).toBe(true);
  });

  // Test maximum email length
  test('should reject emails exceeding max length', () => {
    const longEmail = 'a'.repeat(250) + '@example.com';
    expect(isValidEmail(longEmail)).toBe(false);
  });
});