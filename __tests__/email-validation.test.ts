import { isValidEmail } from '../lib/utils';

describe('Email Validation', () => {
  // Valid email tests
  test('should validate standard email addresses', () => {
    expect(isValidEmail('user@example.com')).toBe(true);
    expect(isValidEmail('firstname.lastname@example.co.uk')).toBe(true);
    expect(isValidEmail('user+tag@example.org')).toBe(true);
  });

  // Invalid email tests
  test('should reject invalid email addresses', () => {
    expect(isValidEmail('')).toBe(false);
    expect(isValidEmail('invalid-email')).toBe(false);
    expect(isValidEmail('invalid@')).toBe(false);
    expect(isValidEmail('@invalid.com')).toBe(false);
    expect(isValidEmail('invalid@.com')).toBe(false);
  });

  // Edge case tests
  test('should handle edge cases', () => {
    expect(isValidEmail(' ')).toBe(false);
    expect(isValidEmail('a@b.c')).toBe(false); // Too short domain
    expect(isValidEmail('very.long.email.address.that.exceeds.the.maximum.length.limit@example.com')).toBe(false);
  });

  // Special character tests
  test('should validate emails with special characters', () => {
    expect(isValidEmail('firstname+lastname@example.com')).toBe(true);
    expect(isValidEmail('firstname-lastname@example.com')).toBe(true);
    expect(isValidEmail('firstname_lastname@example.com')).toBe(true);
  });
});