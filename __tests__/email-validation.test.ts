import { isValidEmail } from '../lib/utils';

describe('Comprehensive Email Validation', () => {
  // 10 different email format scenarios
  const emailTestCases = [
    // 1. Standard valid email
    { email: 'user@example.com', isValid: true },
    
    // 2. Email with subdomains
    { email: 'user.name@company.co.uk', isValid: true },
    
    // 3. Email with plus addressing
    { email: 'user+label@example.com', isValid: true },
    
    // 4. Email with numbers and special characters
    { email: 'user123.name+test@example-domain.com', isValid: true },
    
    // 5. Email with single character local part
    { email: 'a@example.com', isValid: true },
    
    // 6. Email with IP address domain
    { email: 'user@[192.168.0.1]', isValid: true },
    
    // 7. Invalid: Missing @ symbol
    { email: 'userexample.com', isValid: false },
    
    // 8. Invalid: Multiple @ symbols
    { email: 'user@domain@example.com', isValid: false },
    
    // 9. Invalid: Missing domain
    { email: 'user@', isValid: false },
    
    // 10. Invalid: Incorrect special character placement
    { email: 'user.@example.com', isValid: false },
  ];

  // Test email validation
  test.each(emailTestCases)('should validate email format correctly', ({ email, isValid }) => {
    expect(isValidEmail(email)).toBe(isValid);
  });

  // Additional validation tests
  test('should trim whitespace', () => {
    expect(isValidEmail('  user@example.com  ')).toBe(true);
  });

  test('should reject emails exceeding max length', () => {
    const longEmail = 'a'.repeat(255) + '@example.com';
    expect(isValidEmail(longEmail)).toBe(false);
  });
});