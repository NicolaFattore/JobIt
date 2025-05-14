import { describe, it, expect } from 'vitest';
import { isValidEmail, normalizeEmail } from '../lib/utils';

describe('Comprehensive Email Validation', () => {
  // Valid email test cases covering various scenarios
  const validEmails = [
    // Standard formats
    'user@example.com',
    'firstname.lastname@example.com',
    'user+tag@example.com',
    'user123@example.co.uk',
    
    // Quoted local parts
    '"john.smith"@example.com',
    '"very.common"@example.com',
    '"very,unusual"@example.com',
    
    // Subdomains and complex domains
    'user@subdomain.example.com',
    'user@example.co.uk',
    
    // Special characters in local part
    'firstname+lastname@example.com',
    'user.name@example.com',
    
    // IP address domains
    'user@[192.168.0.1]',
    'user@[IPv6:2001:db8::1]'
  ];

  // Invalid email test cases covering various error scenarios
  const invalidEmails = [
    // Empty or invalid inputs
    '',
    ' ',
    'invalid-email',
    'user@.com',
    '@example.com',
    
    // Incomplete domains
    'user@example',
    'user@example..com',
    'user@-example.com',
    
    // Excessive length
    'a'.repeat(65) + '@example.com', // Too long local part
    'user@' + 'a'.repeat(256) + '.com', // Too long domain
    
    // Disallowed characters
    'user name@example.com', // Space in local part
    'user@example,com', // Comma in domain
    'invalid@exam@ple.com', // Multiple @ symbols
    
    // No TLD
    'user@localhost',
    
    // Invalid special character placements
    '.user@example.com', // Leading dot
    'user.@example.com', // Trailing dot
    'user..name@example.com' // Consecutive dots
  ];

  // Test valid emails
  it.each(validEmails)('should validate valid email: %s', (email) => {
    expect(isValidEmail(email)).toBe(true);
  });

  // Test invalid emails
  it.each(invalidEmails)('should invalidate invalid email: %s', (email) => {
    expect(isValidEmail(email)).toBe(false);
  });

  // Email normalization tests
  describe('Email Normalization', () => {
    it('should normalize emails consistently', () => {
      const testCases = [
        { input: '  User@Example.com  ', expected: 'user@example.com' },
        { input: 'USER@EXAMPLE.COM', expected: 'user@example.com' },
        { input: '', expected: '' },
        { input: '  ', expected: '' }
      ];

      testCases.forEach(({ input, expected }) => {
        expect(normalizeEmail(input)).toBe(expected);
      });
    });
  });
});