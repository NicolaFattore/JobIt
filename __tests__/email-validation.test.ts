import { isValidEmail } from '../lib/utils';
import { validateEmail } from '../lib/validation';

describe('Email Validation', () => {
  // Valid email tests
  test('should validate standard email addresses', () => {
    const validEmails = [
      'user@example.com',
      'firstname.lastname@example.co.uk',
      'user+tag@example.org',
      'john.doe123@company-name.com',
      'first_last@domain.net'
    ];
    
    validEmails.forEach(email => {
      expect(isValidEmail(email)).toBe(true);
      expect(validateEmail(email)).toBe(true);
    });
  });

  // Invalid email tests
  test('should reject invalid email addresses', () => {
    const invalidEmails = [
      '',
      'invalid-email',
      'invalid@',
      '@invalid.com',
      'invalid@.com',
      'email@domain',
      'email@-domain.com',
      'email@111.222.333.44444',
      'email@domain..com'
    ];
    
    invalidEmails.forEach(email => {
      expect(isValidEmail(email)).toBe(false);
      expect(validateEmail(email)).toBe(false);
    });
  });

  // Edge case tests
  test('should handle edge cases', () => {
    expect(isValidEmail(' ')).toBe(false);
    expect(validateEmail(' ')).toBe(false);
    expect(isValidEmail('a@b.c')).toBe(false);
    expect(validateEmail('a@b.c')).toBe(false);
    
    // Extremely long email
    const longEmail = 'a'.repeat(320) + '@example.com';
    expect(isValidEmail(longEmail)).toBe(false);
    expect(validateEmail(longEmail)).toBe(false);
  });

  // Special character tests
  test('should validate emails with special characters', () => {
    const specialEmails = [
      'firstname+lastname@example.com',
      'firstname-lastname@example.com',
      'firstname_lastname@example.com',
      'firstname.lastname@example.com'
    ];
    
    specialEmails.forEach(email => {
      expect(isValidEmail(email)).toBe(true);
      expect(validateEmail(email)).toBe(true);
    });
  });
});