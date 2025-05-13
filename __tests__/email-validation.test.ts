import { isValidEmail, validateEmailWithDetails } from '../lib/utils';
import { validateEmail, normalizeEmail } from '../lib/validation';

describe('Email Validation', () => {
  // Valid Email Test Cases
  const validEmails = [
    'user@example.com',
    'firstname.lastname@example.co.uk',
    'user+tag@example.org',
    'john.doe123@company-name.com',
    'first_last@domain.net',
    'email@subdomain.example.com',
    'firstname+lastname@example.com',
    '1234567890@example.com',
    'email@example-one.com',
    '_______@example.com'
  ];

  test('Valid email formats should pass validation', () => {
    validEmails.forEach(email => {
      expect(isValidEmail(email)).toBe(true);
      expect(validateEmail(email)).toBe(true);
      
      const validationResult = validateEmailWithDetails(email);
      expect(validationResult.isValid).toBe(true);
      expect(validationResult.errors).toHaveLength(0);
    });
  });

  // Invalid Email Test Cases
  const invalidEmails = [
    '', // Empty string
    'invalid-email',
    'invalid@',
    '@invalid.com',
    'invalid@.com',
    'email@domain',
    'email@-domain.com',
    'email@111.222.333.44444',
    'email@domain..com',
    'a@b.c', // Too short
    'email@123.123.123.123', // Invalid IP domain
    'email@[123.123.123.123]', // Invalid IP format
    'plainaddress', // Missing @
    '@no-local-part.com', // No local part
    'Outlook User@example.com', // Spaces not allowed
    'email@example.web', // Uncommon TLD
    'email@111.222.333.44444' // Invalid IP
  ];

  test('Invalid email formats should fail validation', () => {
    invalidEmails.forEach(email => {
      expect(isValidEmail(email)).toBe(false);
      expect(validateEmail(email)).toBe(false);
      
      const validationResult = validateEmailWithDetails(email);
      expect(validationResult.isValid).toBe(false);
      expect(validationResult.errors).toHaveLength(1);
    });
  });

  // Case Insensitivity Test
  test('Email validation should be case-insensitive', () => {
    const email = 'Test.Email@Example.COM';
    const normalizedEmail = normalizeEmail(email);
    
    expect(normalizedEmail).toBe('test.email@example.com');
    expect(isValidEmail(email)).toBe(true);
    expect(validateEmail(normalizedEmail)).toBe(true);
  });

  // Long Email Test
  test('Should handle long emails correctly', () => {
    const longLocalPart = 'a'.repeat(64);
    const longDomain = 'b'.repeat(255);
    const longEmail = `${longLocalPart}@${longDomain}.com`;
    
    expect(isValidEmail(longEmail)).toBe(false);
  });
});
