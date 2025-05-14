import { EmailValidator, EmailUniquenessChecker } from '../lib/email-validation';

describe('Email Validation', () => {
  // Valid email test cases
  const validEmails = [
    'user@example.com',
    'first.last@example.co.uk',
    'user+tag@example.org',
    'user123@example-domain.com',
    'very.common@example.com',
    'disposable.style.email.with+symbol@example.com',
    'other.email-with-hyphen@example.com',
    'fully-qualified-domain@example.com',
    'user.name+tag@example.org',
    'x@example.com', // Shortest possible valid email
  ];

  validEmails.forEach(email => {
    test(`should validate valid email: ${email}`, () => {
      expect(EmailValidator.validate(email)).toBe(true);
      expect(EmailValidator.getValidationError(email)).toBeNull();
    });
  });

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
    'a'.repeat(321) + '@example.com', // Too long
    'user@' + 'a'.repeat(256) + '.com',
    'invalid@domain',
    'invalid@domain.',
    'invalid@.domain',
    'invalid@domain..com',
    'invalid@-domain.com',
    'invalid@domain-.com',
  ];

  invalidEmails.forEach(email => {
    test(`should invalidate invalid email: ${email}`, () => {
      expect(EmailValidator.validate(email)).toBe(false);
      expect(EmailValidator.getValidationError(email)).not.toBeNull();
    });
  });

  // Email normalization and case-insensitivity tests
  describe('Email Normalization', () => {
    test('should normalize emails to lowercase', () => {
      expect(EmailValidator.normalize('User@Example.COM')).toBe('user@example.com');
    });

    test('should trim whitespace', () => {
      expect(EmailValidator.normalize('  user@example.com  ')).toBe('user@example.com');
    });
  });

  // Email uniqueness tests
  describe('Email Uniqueness', () => {
    beforeEach(async () => {
      // Reset uniqueness checker before each test
      const registeredEmail = 'existing@example.com';
      await EmailUniquenessChecker.registerEmail(registeredEmail);
    });

    test('should detect non-unique email (case-insensitive)', async () => {
      const existingEmail = 'Existing@Example.COM';
      const uniqueResult = await EmailUniquenessChecker.isUnique(existingEmail);
      expect(uniqueResult).toBe(false);
    });

    test('should allow unique email', async () => {
      const uniqueEmail = 'new.unique@example.com';
      const uniqueResult = await EmailUniquenessChecker.isUnique(uniqueEmail);
      expect(uniqueResult).toBe(true);
    });
  });
});
