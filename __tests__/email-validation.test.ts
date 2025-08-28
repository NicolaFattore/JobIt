import { isValidEmail, normalizeEmail } from '../lib/utils';

describe('Comprehensive Email Validation', () => {
  // Test cases for email validation
  const emailTestCases = [
    // Valid emails
    { email: 'user@example.com', isValid: true },
    { email: 'firstName.lastName@company.co.uk', isValid: true },
    { email: 'user+label@example.com', isValid: true },
    { email: 'user123.name+test@example-domain.com', isValid: true },
    { email: 'a@example.com', isValid: true },
    
    // Invalid emails
    { email: 'invalid', isValid: false },
    { email: '@example.com', isValid: false },
    { email: 'user@', isValid: false },
    { email: 'user@example', isValid: false },
    { email: 'user@.com', isValid: false },
    
    // Edge cases
    { email: '', isValid: false },
    { email: ' ', isValid: false },
    { email: 'a'.repeat(255) + '@example.com', isValid: false },
  ];

  // Test email validation
  test.each(emailTestCases)('should validate email format correctly', ({ email, isValid }) => {
    expect(isValidEmail(email)).toBe(isValid);
  });

  // Test email normalization
  describe('Email Normalization', () => {
    const normalizationCases = [
      { input: 'User@Example.com', expected: 'user@example.com' },
      { input: '  Test@Example.com  ', expected: 'test@example.com' },
      { input: 'user+label@Example.com', expected: 'user+label@example.com' },
    ];

    test.each(normalizationCases)('should normalize email correctly', ({ input, expected }) => {
      expect(normalizeEmail(input)).toBe(expected);
    });
  });

  // Additional specific tests
  test('should handle whitespace', () => {
    expect(isValidEmail('  user@example.com  ')).toBe(true);
  });

  test('should reject emails with consecutive dots', () => {
    expect(isValidEmail('user..name@example.com')).toBe(false);
  });
});