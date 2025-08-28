import { validateEmail, isEmailUnique } from '../lib/email-validation';

describe('Email Validation', () => {
  // Valid email test cases
  const validEmails = [
    'user@example.com',
    'john.doe@company.co.uk',
    'user123@domain.org',
    'first+last@domain.com',
    'user.name@domain.net',
    'very.long.email.address@example.com',
    'email-with-hyphen@domain.com',
    'email_with_underscore@domain.com',
    'user@subdomain.example.com',
    'user@[123.123.123.123]'
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
    'user name@domain.com',
    'user@domain_name.com',
    '@',
    'email@-domain.com',
    'email@domain..com',
    'very.very.long.email.that.exceeds.reasonable.length@domain.com'.repeat(10)
  ];

  // Test valid emails
  test.each(validEmails)('should validate valid email: %s', (email) => {
    const result = validateEmail(email);
    expect(result).not.toBeNull();
    expect(result).toBe(email.trim().toLowerCase());
  });

  // Test invalid emails
  test.each(invalidEmails)('should invalidate invalid email: %s', (email) => {
    const result = validateEmail(email);
    expect(result).toBeNull();
  });

  // Additional edge case tests
  test('should handle null and undefined inputs', () => {
    expect(validateEmail(null)).toBeNull();
    expect(validateEmail(undefined)).toBeNull();
  });

  // Email uniqueness tests
  describe('Email Uniqueness', () => {
    const existingEmails = [
      'user1@example.com',
      'User2@Example.com',
      'another.user@domain.org'
    ];

    test('should detect non-unique emails (case-insensitive)', () => {
      expect(isEmailUnique('user1@example.com', existingEmails)).toBe(false);
      expect(isEmailUnique('USER1@EXAMPLE.COM', existingEmails)).toBe(false);
      expect(isEmailUnique('User1@Example.Com', existingEmails)).toBe(false);
    });

    test('should allow unique emails', () => {
      expect(isEmailUnique('unique.email@domain.com', existingEmails)).toBe(true);
    });

    test('should handle invalid emails in uniqueness check', () => {
      expect(isEmailUnique('invalid-email', existingEmails)).toBe(false);
    });
  });

  // Case sensitivity and normalization tests
  test('should normalize email to lowercase', () => {
    expect(validateEmail('UsEr@ExAmPlE.cOm')).toBe('user@example.com');
  });
});