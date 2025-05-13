import { EmailValidator } from '@/lib/email-validator';

describe('Email Validation', () => {
  // Valid email test cases with various formats
  const validEmails = [
    'user@example.com',
    'john.doe@company.co.uk',
    'first-last@domain.com',
    'user+tag@example.org',
    'email123@subdomain.example.net',
    'valid.email@valid-domain.com',
    'a@b.co' // Minimal valid email
  ];

  // Invalid email test cases covering different scenarios
  const invalidEmails = [
    '', // Empty string
    '  ', // Whitespace
    'invalid-email',
    '@missing-username.com',
    'user@.com',
    'user@domain',
    'user@domain..com',
    'user name@domain.com',
    '@@@invalid.com',
    'email@domain', // Missing TLD
    'email@-domain.com', // Invalid domain start
    'email@domain-.com', // Invalid domain end
    'a'.repeat(321) + '@example.com' // Too long
  ];

  // Test valid emails
  describe('Valid Email Validation', () => {
    test.each(validEmails)('should validate valid email: %s', (email) => {
      const result = EmailValidator.validate(email);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
  });

  // Test invalid emails
  describe('Invalid Email Validation', () => {
    test.each(invalidEmails)('should invalidate invalid email: %s', (email) => {
      const result = EmailValidator.validate(email);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });
  });

  // Normalization tests
  describe('Email Normalization', () => {
    const normalizationCases = [
      { input: 'User@Example.com', expected: 'user@example.com' },
      { input: '  Test@Domain.com  ', expected: 'test@domain.com' },
      { input: 'USER@EXAMPLE.COM', expected: 'user@example.com' }
    ];

    test.each(normalizationCases)('should normalize email: $input', ({ input, expected }) => {
      expect(EmailValidator.normalize(input)).toBe(expected);
    });
  });

  // Equivalence tests
  describe('Email Equivalence', () => {
    const equivalenceCases = [
      { email1: 'User@Example.com', email2: 'user@example.com', expected: true },
      { email1: 'test@domain.com', email2: 'TEST@DOMAIN.COM', expected: true },
      { email1: 'test@domain.com', email2: 'different@domain.com', expected: false }
    ];

    test.each(equivalenceCases)(
      'should correctly compare emails: $email1 and $email2',
      ({ email1, email2, expected }) => {
        expect(EmailValidator.areEquivalent(email1, email2)).toBe(expected);
      }
    );
  });

  // Detailed error checking
  describe('Detailed Error Checking', () => {
    const errorCases = [
      { 
        email: '', 
        expectedErrors: ['Email cannot be empty'] 
      },
      { 
        email: 'invalid@domain', 
        expectedErrors: ['Invalid email format'] 
      },
      { 
        email: 'a'.repeat(321) + '@example.com', 
        expectedErrors: ['Email cannot exceed 320 characters', 'Invalid email format'] 
      }
    ];

    test.each(errorCases)('should return correct errors for: $email', ({ email, expectedErrors }) => {
      const result = EmailValidator.validate(email);
      expect(result.isValid).toBe(false);
      expectedErrors.forEach(error => {
        expect(result.errors).toContain(error);
      });
    });
  });
});
