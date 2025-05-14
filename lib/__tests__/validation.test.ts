import { isValidEmail, sanitizeEmail, normalizeEmail } from '../validation';

describe('Email Validation', () => {
  // Comprehensive test cases covering various scenarios
  const validEmails = [
    'user@example.com',
    'firstname.lastname@example.com',
    'email@subdomain.example.com',
    'firstname+lastname@example.com',
    'email@123.123.123.123',
    'email@[123.123.123.123]',
    '"email"@example.com',
    '1234567890@example.com',
    'email@example-one.com',
    '_______@example.com',
    'email@example.name',
    'email@example.museum',
    'email@example.co.jp',
    'UPPERCASE@example.com',
    'very.common@example.com',
    'disposable.style.email@example.com',
    'other.email-with-hyphen@example.com',
    'fully-qualified-domain@example.com'
  ];

  const invalidEmails = [
    'plainaddress',
    '@missingusername.com',
    'username@.com',
    'username@domain',
    'username@domain.',
    'username@-domain.com',
    'username@domain..com',
    '.username@domain.com',
    'username.@domain.com',
    'username@domain@.com',
    '',
    '   ',
    null,
    undefined,
    'email@111.222.333.44444', // Invalid IP
    'email@[111.222.333.44444]', // Invalid IP in brackets
    'email@domain..com', // Consecutive dots
    'email@domian', // Missing TLD
    'a@b.c', // Too short domain
    'email@123.123.123.123.123' // Too many IP segments
  ];

  // Test valid email cases
  validEmails.forEach(email => {
    test(`Validates valid email: ${email}`, () => {
      expect(isValidEmail(email)).toBe(true);
    });
  });

  // Test invalid email cases
  invalidEmails.forEach(email => {
    test(`Identifies invalid email: ${email}`, () => {
      expect(isValidEmail(email as string)).toBe(false);
    });
  });

  // Email sanitization tests
  describe('Email Sanitization', () => {
    test('Trims whitespace', () => {
      expect(sanitizeEmail('  test@example.com  ')).toBe('test@example.com');
    });

    test('Converts to lowercase', () => {
      expect(sanitizeEmail('Test@Example.COM')).toBe('test@example.com');
    });

    test('Handles null input', () => {
      expect(sanitizeEmail(null)).toBe('');
    });

    test('Handles undefined input', () => {
      expect(sanitizeEmail(undefined)).toBe('');
    });
  });

  // Email normalization tests
  describe('Email Normalization', () => {
    test('Normalizes different case emails', () => {
      expect(normalizeEmail('Test@Example.COM')).toBe('test@example.com');
      expect(normalizeEmail('test@example.com')).toBe('test@example.com');
    });

    test('Trims whitespace during normalization', () => {
      expect(normalizeEmail('  test@example.com  ')).toBe('test@example.com');
    });

    test('Handles null and undefined', () => {
      expect(normalizeEmail(null)).toBe('');
      expect(normalizeEmail(undefined)).toBe('');
    });
  });
});