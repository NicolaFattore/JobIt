import { validateEmail, getEmailValidationError } from '../lib/email-validation';

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
    'firstname-lastname@example.com'
  ];

  // Invalid email test cases
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

  // Validate email format tests
  test.each(validEmails)('validates valid email: %s', (email) => {
    expect(validateEmail(email)).toBe(true);
    expect(getEmailValidationError(email)).toBeNull();
  });

  test.each(invalidEmails)('invalidates invalid email: %s', (email) => {
    expect(validateEmail(email)).toBe(false);
    expect(getEmailValidationError(email)).not.toBeNull();
  });

  // Edge case tests
  test('handles null and undefined inputs', () => {
    expect(validateEmail('')).toBe(false);
    expect(validateEmail(null as any)).toBe(false);
    expect(validateEmail(undefined as any)).toBe(false);
  });

  test('trims whitespace around email', () => {
    expect(validateEmail('  user@example.com  ')).toBe(true);
  });

  test('checks email length constraints', () => {
    const shortEmail = 'a@b';
    const longEmail = 'a'.repeat(255) + '@example.com';
    
    expect(validateEmail(shortEmail)).toBe(false);
    expect(validateEmail(longEmail)).toBe(false);
  });
});