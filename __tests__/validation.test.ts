import { validateEmail, sanitizeEmail, getEmailValidationError } from '../lib/validation';

describe('Email Validation', () => {
  // Comprehensive test cases covering various scenarios
  const validEmails = [
    'user@example.com',
    'john.doe@example.co.uk',
    'john+tag@example.com',
    'user-name@example.org',
    'user123@example.net',
    'first.last@example.com',
    'email@subdomain.example.com',
    'very.common@example.com',
    'disposable.style.email@example.com',
    'other.email-with-hyphen@example.com',
    'fully-qualified-domain@example.com',
    'user.name+tag@example.org'
  ];

  const invalidEmails = [
    '',
    '  ',
    'invalid-email',
    'invalid@email',
    '@missingusername.com',
    'username@.com',
    'username@domain',
    'username@domain.',
    'username@-domain.com',
    'a'.repeat(321) + '@example.com', // Exceed max length
    'email@111.222.333.44444', // Invalid IP domain
    'email@[123.123.123.123]', // IP in square brackets
    'much."more unusual"@example.com', // Unusual but valid local part
    'very.unusual."@".unusual.com@example.com', // Extremely unusual format
    'admin@mailserver1', // Missing top-level domain
    'email@123.123.123.123' // IP domain
  ];

  // Test valid emails
  test.each(validEmails)('validates valid email: %s', (email) => {
    expect(validateEmail(email)).toBe(true);
    expect(getEmailValidationError(email)).toBeNull();
  });

  // Test invalid emails
  test.each(invalidEmails)('invalidates invalid email: %s', (email) => {
    expect(validateEmail(email)).toBe(false);
    expect(getEmailValidationError(email)).not.toBeNull();
  });

  // Sanitization tests
  describe('Email Sanitization', () => {
    test('trims whitespace', () => {
      expect(sanitizeEmail('  test@example.com  ')).toBe('test@example.com');
    });

    test('converts to lowercase', () => {
      expect(sanitizeEmail('Test@Example.COM')).toBe('test@example.com');
    });
  });

  // Additional validation error message tests
  describe('Email Validation Error Messages', () => {
    test('returns error for empty email', () => {
      expect(getEmailValidationError('')).toBe('Email is required');
    });

    test('returns error for very short email', () => {
      expect(getEmailValidationError('a@b')).toBe('Invalid email format');
    });

    test('returns error for extremely long email', () => {
      const longEmail = 'a'.repeat(322) + '@example.com';
      expect(getEmailValidationError(longEmail)).toBe('Email is too long');
    });
  });
});