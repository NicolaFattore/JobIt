import { isValidEmail } from '../lib/utils';

describe('Email Validation', () => {
  // Valid email test cases
  const validEmails = [
    'user@example.com',
    'firstname.lastname@example.com',
    'email+tag@example.co.uk',
    'user123@example-domain.com',
    'user.name@example.org'
  ];

  // Invalid email test cases
  const invalidEmails = [
    '',
    'invalid-email',
    'invalid@',
    '@invalid.com',
    'user@.com',
    'user@domain',
    'user@domain..com',
    ' user@example.com ', // Whitespace
    'user @example.com', // Space in email
    'user@example.', // Incomplete domain
    'a'.repeat(255) + '@example.com' // Too long email
  ];

  // Test valid emails
  test.each(validEmails)('should validate valid email: %s', (email) => {
    expect(isValidEmail(email)).toBe(true);
  });

  // Test invalid emails
  test.each(invalidEmails)('should invalidate email: %s', (email) => {
    expect(isValidEmail(email)).toBe(false);
  });

  // Additional specific test cases
  test('should handle null and undefined', () => {
    expect(isValidEmail(null as any)).toBe(false);
    expect(isValidEmail(undefined as any)).toBe(false);
  });
});