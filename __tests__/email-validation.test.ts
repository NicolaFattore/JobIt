import { validateEmail, getEmailValidationError } from '../lib/email-validation';

describe('Email Validation', () => {
  // Valid email tests
  const validEmails = [
    'user@example.com',
    'first.last@example.co.uk',
    'user+tag@example.org',
    'user123@example-domain.com',
  ];

  validEmails.forEach(email => {
    test(`should validate valid email: ${email}`, () => {
      expect(validateEmail(email)).toBe(true);
      expect(getEmailValidationError(email)).toBeNull();
    });
  });

  // Invalid email tests
  const invalidEmails = [
    '',
    '   ',
    'invalid-email',
    'user@',
    '@domain.com',
    'user@domain',
    'user@.com',
    'user@domain..com',
    'a'.repeat(101) + '@example.com',
    'user@' + 'a'.repeat(256) + '.com',
  ];

  invalidEmails.forEach(email => {
    test(`should invalidate invalid email: ${email}`, () => {
      expect(validateEmail(email)).toBe(false);
      expect(getEmailValidationError(email)).not.toBeNull();
    });
  });

  // Edge case tests
  test('should handle whitespace and case sensitivity', () => {
    expect(validateEmail('  User@Example.COM  ')).toBe(true);
  });

  test('should return specific error messages', () => {
    expect(getEmailValidationError('')).toBe('Email cannot be empty');
    expect(getEmailValidationError('a@b')).toBe('Please enter a valid email address');
  });
});