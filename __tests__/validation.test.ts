import { validateEmail, sanitizeEmail } from '../lib/validation';

describe('Email Validation', () => {
  // Valid email test cases
  const validEmails = [
    'user@example.com',
    'john.doe@example.co.uk',
    'john+tag@example.com',
    'user-name@example.org',
    'user123@example.net',
    'first.last@example.com',
    'email@subdomain.example.com'
  ];

  // Invalid email test cases
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
    'a'.repeat(321) + '@example.com' // Exceed max length
  ];

  // Test valid emails
  test.each(validEmails)('validates valid email: %s', (email) => {
    expect(validateEmail(email)).toBe(true);
  });

  // Test invalid emails
  test.each(invalidEmails)('invalidates invalid email: %s', (email) => {
    expect(validateEmail(email)).toBe(false);
  });

  // Email sanitization tests
  describe('Email Sanitization', () => {
    test('trims whitespace', () => {
      expect(sanitizeEmail('  test@example.com  ')).toBe('test@example.com');
    });

    test('converts to lowercase', () => {
      expect(sanitizeEmail('Test@Example.COM')).toBe('test@example.com');
    });
  });
});