import { EmailValidator } from '../lib/email-validation';

describe('Email Validation', () => {
  // Comprehensive test scenarios covering 10+ email format cases
  const validEmailScenarios = [
    // Standard email formats
    'user@example.com',
    'firstname.lastname@example.com',
    'email@subdomain.example.com',
    
    // Special character handling
    'firstname+lastname@example.com',
    'email.with.dots@example.com',
    'email-with-hyphen@example.com',
    
    // Numeric and special domain cases
    'email@123.123.123.123', // IP address domain
    'email@[123.123.123.123]', // IP in square brackets
    '1234567890@example.com', // Numeric local part
    
    // Complex valid emails
    '"email with spaces"@example.com',
    'very.common@example.com',
    'disposable.style.email.with+symbol@example.com',
    'other.email-with-hyphen@example.com',
    'fully-qualified-domain@example.com',
    'user.name+tag@example.com'
  ];

  const invalidEmailScenarios = [
    // Empty and whitespace inputs
    '',
    '   ',
    null as any,
    undefined as any,

    // Invalid formats
    'invalid',
    '@invalid.com',
    'invalid@',
    'invalid@.com',
    'invalid@domain',
    'invalid@domain.',
    
    // Problematic patterns
    'email@example',
    'email.@example.com',
    '.email@example.com',
    'email..email@example.com',
    
    // Special character issues
    'あいうえお@example.com', // Non-ASCII characters
    'email@-example.com',
    'email@example-.com',
    
    // Length and dot issues
    'a'.repeat(65) + '@example.com', // Too long local part
    'email@' + 'a'.repeat(256) + '.com' // Too long domain
  ];

  // Validate correct email formats
  test.each(validEmailScenarios)('validates valid email: %s', (email) => {
    expect(EmailValidator.validate(email)).toBe(true);
    expect(EmailValidator.getValidationError(email)).toBeNull();
  });

  // Invalidate incorrect email formats
  test.each(invalidEmailScenarios)('invalidates invalid email: %s', (email) => {
    expect(EmailValidator.validate(email)).toBe(false);
    expect(EmailValidator.getValidationError(email)).not.toBeNull();
  });

  // Normalization tests
  describe('Email Normalization', () => {
    test('normalizes emails consistently', () => {
      expect(EmailValidator.normalize('  User@Example.com  ')).toBe('user@example.com');
      expect(EmailValidator.normalize('USER@EXAMPLE.COM')).toBe('user@example.com');
      expect(EmailValidator.normalize('')).toBe('');
    });
  });

  // Error message tests
  describe('Validation Error Messages', () => {
    test('provides appropriate error messages', () => {
      expect(EmailValidator.getValidationError('')).toBe('Email is required');
      expect(EmailValidator.getValidationError('a@b')).toBe('Invalid email format');
      expect(EmailValidator.getValidationError('a'.repeat(300) + '@example.com')).toBe('Email is too long');
    });
  });
});