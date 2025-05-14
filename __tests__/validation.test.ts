import { isValidEmail, getEmailValidationError } from '../lib/validation';

describe('Email Validation', () => {
  // Valid email test cases
  const validEmails = [
    'user@example.com',
    'firstname.lastname@example.com',
    'user+tag@example.com',
    'user123@example.co.uk',
    'user@subdomain.example.com',
  ];

  // Invalid email test cases
  const invalidEmails = [
    '',
    '   ',
    'invalid-email',
    'user@',
    '@example.com',
    'user@example',
    'user@.com',
    'user@example.',
    'user@example..com',
  ];

  // Test valid email scenarios
  describe('isValidEmail - Valid Emails', () => {
    validEmails.forEach(email => {
      it(`should return true for valid email: ${email}`, () => {
        expect(isValidEmail(email)).toBe(true);
      });
    });
  });

  // Test invalid email scenarios
  describe('isValidEmail - Invalid Emails', () => {
    invalidEmails.forEach(email => {
      it(`should return false for invalid email: ${email}`, () => {
        expect(isValidEmail(email)).toBe(false);
      });
    });
  });

  // Test error message generation
  describe('getEmailValidationError', () => {
    it('should return error for empty email', () => {
      expect(getEmailValidationError('')).toBe('Email address is required');
      expect(getEmailValidationError('   ')).toBe('Email address is required');
    });

    it('should return error for invalid email formats', () => {
      expect(getEmailValidationError('invalid-email')).toBe('Please enter a valid email address (e.g., example@domain.com)');
      expect(getEmailValidationError('user@')).toBe('Please enter a valid email address (e.g., example@domain.com)');
    });

    it('should return null for valid email', () => {
      expect(getEmailValidationError('user@example.com')).toBeNull();
    });
  });
});