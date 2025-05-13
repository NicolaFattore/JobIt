import { validateEmail } from '../lib/utils';

describe('Email Validation', () => {
  const validEmails = [
    'user@example.com',
    'john.doe@company.co.uk',
    'user+tag@example.com',
    'firstname.lastname@domain.com',
    'email123@domain-hyphen.com',
  ];

  const invalidEmails = [
    '',
    '   ',
    'invalid-email',
    'user@',
    '@domain.com',
    'user@domain',
    'user@.com',
    'user@domain..com',
    'user@domain@.com',
  ];

  test('validates correct email formats', () => {
    validEmails.forEach(email => {
      expect(validateEmail(email)).toBe(true);
    });
  });

  test('invalidates incorrect email formats', () => {
    invalidEmails.forEach(email => {
      expect(validateEmail(email)).toBe(false);
    });
  });

  test('handles whitespace around email', () => {
    expect(validateEmail('  user@example.com  ')).toBe(true);
  });
});