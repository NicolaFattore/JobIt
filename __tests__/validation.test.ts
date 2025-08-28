import { isValidEmail, normalizeEmail, getEmailValidationError } from '../lib/validation';

describe('Email Validation', () => {
  // Valid email test cases covering various formats
  const validEmails = [
    'user@example.com',
    'firstname.lastname@example.com',
    'email@subdomain.example.com',
    'firstname+lastname@example.com',
    'email@123.123.123.123',
    '1234567890@example.com',
    'email@example-one.com',
    '_______@example.com',
    'email@example.name',
    'email@example.museum',
    'email@example.co.jp',
    'very.common@example.com',
    'disposable.style.email@example.com',
    'other.email-with-hyphen@example.com',
    'fully-qualified-domain@example.com',
    // Test IP and domain variations
    'user@[123.123.123.123]',
    'user@[IPv6:2001:0db8:85a3:0000:0000:8a2e:0370:7334]'
  ];

  // Invalid email test cases
  const invalidEmails = [
    '',
    ' ',
    'plainaddress',
    '@example.com',
    'Joe Smith <email@example.com>',
    'email.example.com',
    'email@example@example.com',
    '.email@example.com',
    'email.@example.com',
    'email..email@example.com',
    'email@example.com (Joe Smith)',
    'email@example',
    'email@-example.com',
    'email@example..com',
    // Emails exceeding 254 characters
    'a'.repeat(255) + '@example.com'
  ];

  // Test valid email validation
  validEmails.forEach(email => {
    test(`Valid email: ${email}`, () => {
      expect(isValidEmail(email)).toBe(true);
    });
  });

  // Test invalid email validation
  invalidEmails.forEach(email => {
    test(`Invalid email: ${email}`, () => {
      expect(isValidEmail(email)).toBe(false);
    });
  });

  // Test email normalization
  describe('Email Normalization', () => {
    test('Normalize email to lowercase', () => {
      expect(normalizeEmail('Test@Example.COM')).toBe('test@example.com');
    });

    test('Trim whitespace in email', () => {
      expect(normalizeEmail('  test@example.com  ')).toBe('test@example.com');
    });
  });

  // Test error message generation
  describe('Email Validation Error Messages', () => {
    test('Empty email error message', () => {
      expect(getEmailValidationError('')).toBe('Email cannot be empty');
    });

    test('Too long email error message', () => {
      expect(getEmailValidationError('a'.repeat(255) + '@example.com')).toBe('Email address is too long');
    });

    test('Invalid email error message', () => {
      expect(getEmailValidationError('invalid-email')).toBe('Please enter a valid email address');
    });
  });
});