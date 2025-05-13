import { isValidEmail, getEmailValidationError } from '../lib/validation';

describe('Email Validation', () => {
  // Valid email test cases
  const validEmails = [
    'user@example.com',
    'john.doe@company.co.uk',
    'first+last@domain.com',
    'email123@domain-name.com'
  ];

  // Invalid email test cases
  const invalidEmails = [
    '',
    'invalid-email',
    'user@',
    '@domain.com',
    'user@domain',
    'user@.com',
    'user@domain.',
    '   ',
    null,
    undefined
  ];

  // Test valid email cases
  validEmails.forEach(email => {
    test(`should validate valid email: ${email}`, () => {
      expect(isValidEmail(email)).toBe(true);
      expect(getEmailValidationError(email)).toBeNull();
    });
  });

  // Test invalid email cases
  invalidEmails.forEach(email => {
    test(`should invalidate email: ${email}`, () => {
      expect(isValidEmail(email as string)).toBe(false);
      expect(getEmailValidationError(email as string)).not.toBeNull();
    });
  });

  // Additional specific test cases
  test('should handle whitespace', () => {
    expect(isValidEmail('  user@example.com  ')).toBe(true);
  });
});