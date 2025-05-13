import { validateEmail } from '../lib/utils';

describe('Email Validation', () => {
  // Valid email test cases
  const validEmails = [
    'user@example.com',
    'john.doe@company.co.uk',
    'user+tag@example.com',
    'firstname.lastname@domain.com',
    'email123@domain-hyphen.com',
  ];

  // Invalid email test cases
  const invalidEmails = [
    '',
    '   ',
    'invalid-email',
    'user@',
    '@domain.com',
    'user@domain',
    'user@.com',
    'user@domain..com',
    'user@domain@.com',
  ];

  // Test valid email cases
  test.each(validEmails)('should validate valid email: %s', (email) => {
    expect(validateEmail(email)).toBe(true);
  });

  // Test invalid email cases
  test.each(invalidEmails)('should invalidate invalid email: %s', (email) => {
    expect(validateEmail(email)).toBe(false);
  });

  // Additional edge case tests
  test('should trim whitespace around email', () => {
    expect(validateEmail('  user@example.com  ')).toBe(true);
  });
});