import { isValidEmail, getEmailValidationError } from '../lib/validation';

describe('Email Validation', () => {
  // Comprehensive test cases covering various scenarios
  const validEmails = [
    'user@example.com',
    'firstname.lastname@example.com',
    'user+tag@example.com',
    'user123@example.co.uk',
    'user@subdomain.example.com',
    'very.common@example.com',
    'disposable.style.email.with+symbol@example.com',
    'other.email-with-hyphen@example.com',
    'fully-qualified-domain@example.com',
    'user.name+tag@example.org',
  ];

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
    'a@b.c',  // Too short
    'a' .repeat(65) + '@example.com', // Local part too long
    'user@' + 'a'.repeat(254) + '.com', // Domain too long
    'user name@example.com', // Space in local part
    'user@domain', // Missing TLD
    '.user@example.com', // Starts with dot
    'user.@example.com', // Ends with dot
    'user..name@example.com', // Consecutive dots
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