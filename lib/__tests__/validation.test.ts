import { isValidEmail, sanitizeEmail } from '../validation';

describe('Email Validation', () => {
  // Valid email test cases
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
  ];

  // Invalid email test cases
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
  ];

  // Test valid email cases
  validEmails.forEach(email => {
    test(`Valid email: ${email}`, () => {
      expect(isValidEmail(email)).toBe(true);
    });
  });

  // Test invalid email cases
  invalidEmails.forEach(email => {
    test(`Invalid email: ${email}`, () => {
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
  });
});