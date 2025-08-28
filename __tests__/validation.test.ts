import { EmailValidator } from '../lib/validation';

describe('Email Validation', () => {
  // Valid email scenarios
  const validEmails = [
    'user@example.com',
    'john.doe@company.co.uk',
    'first+last@domain.com',
    'user123@domain-name.com',
    'USER@EXAMPLE.COM', // Case variation
    '  Test@Example.com  ' // Whitespace
  ];

  // Invalid email scenarios
  const invalidEmails = [
    '', // Empty
    'invalid-email',
    'user@',
    '@domain.com',
    'user@domain',
    'user@.com',
    'user@domain.',
    '   ',
    null,
    undefined,
    'a'.repeat(65) + '@example.com', // Too long local part
    'user@' + 'a'.repeat(255), // Excessive total length
    'user@temp.com', // Disposable domain
    'user@throwaway.email'
  ];

  // Validate correct emails
  validEmails.forEach(email => {
    test(`should validate correct email: ${email}`, () => {
      const normalized = EmailValidator.validate(email);
      expect(normalized).not.toBeNull();
      expect(EmailValidator.getValidationError(email)).toBeNull();
    });
  });

  // Validate incorrect emails
  invalidEmails.forEach(email => {
    test(`should invalidate incorrect email: ${email}`, () => {
      const normalized = EmailValidator.validate(email as string);
      expect(normalized).toBeNull();
      expect(EmailValidator.getValidationError(email as string)).not.toBeNull();
    });
  });

  // Test uniqueness query generation
  describe('Uniqueness Query', () => {
    test('should create case-insensitive query for valid email', () => {
      const email = 'Test@Example.com';
      const query = EmailValidator.createUniquenessQuery(email);
      
      expect(query).toEqual({
        email: /^test@example.com$/i
      });
    });

    test('should return null for invalid email', () => {
      const email = 'invalid-email';
      const query = EmailValidator.createUniquenessQuery(email);
      
      expect(query).toBeNull();
    });
  });

  // Normalization tests
  describe('Email Normalization', () => {
    test('should normalize email to lowercase', () => {
      const email = 'User@Example.com';
      const normalized = EmailValidator.validate(email);
      
      expect(normalized).toBe('user@example.com');
    });

    test('should trim whitespace', () => {
      const email = '  test@example.com  ';
      const normalized = EmailValidator.validate(email);
      
      expect(normalized).toBe('test@example.com');
    });
  });
});