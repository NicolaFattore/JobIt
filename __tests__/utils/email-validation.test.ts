import { isValidEmail } from '../../lib/utils';

describe('Email Validation', () => {
  // Valid email test cases
  const validEmails = [
    'user@example.com',
    'firstname.lastname@example.com',
    'user+tag@example.com',
    'user123@example.co.uk',
    'user-name@example.org'
  ];

  // Invalid email test cases
  const invalidEmails = [
    '',
    'invalid-email',
    'invalid@email',
    '@missing-username.com',
    'missing-domain@.com',
    'multiple@@at.com',
    'spaces not allowed@email.com',
    'very.extremely.very.extremely.very.extremely.long.email.address.that.exceeds.reasonable.length@example.com'
  ];

  // Test valid emails
  test.each(validEmails)('validates correct email format: %s', (email) => {
    expect(isValidEmail(email)).toBe(true);
  });

  // Test invalid emails
  test.each(invalidEmails)('rejects invalid email format: %s', (email) => {
    expect(isValidEmail(email)).toBe(false);
  });

  // Additional specific test cases
  test('handles null and undefined inputs', () => {
    expect(isValidEmail('')).toBe(false);
    expect(isValidEmail(null as any)).toBe(false);
    expect(isValidEmail(undefined as any)).toBe(false);
  });
});