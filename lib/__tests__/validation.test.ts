import { isValidEmail, sanitizeEmail, normalizeEmail } from '../validation';

describe('Email Validation', () => {
  // Comprehensive test scenarios covering 10+ different email formats
  const validEmailScenarios = [
    // Standard formats
    { email: 'user@example.com', description: 'Basic email format' },
    { email: 'firstname.lastname@example.com', description: 'Dot in local part' },
    { email: 'email+tag@example.com', description: 'Plus tag in local part' },
    
    // Domain variations
    { email: 'user@subdomain.example.com', description: 'Subdomain' },
    { email: 'user@example.co.uk', description: 'Multiple TLD parts' },
    
    // Special character scenarios
    { email: 'user_name@example.com', description: 'Underscore in local part' },
    { email: '"user name"@example.com', description: 'Quoted local part' },
    
    // Numeric and IP-based domains
    { email: 'user@123.45.67.89', description: 'IP address domain' },
    { email: 'user@[123.45.67.89]', description: 'IP in square brackets' },
    
    // Edge case formats
    { email: '1234567890@example.com', description: 'Numeric local part' },
  ];

  const invalidEmailScenarios = [
    // Malformed formats
    { email: 'plainaddress', description: 'Missing @ symbol' },
    { email: '@missingusername.com', description: 'Missing local part' },
    { email: 'username@', description: 'Missing domain' },
    
    // Invalid characters
    { email: 'user name@example.com', description: 'Spaces in local part' },
    { email: 'user@domain..com', description: 'Consecutive dots in domain' },
    
    // Length issues
    { email: 'a@b.c', description: 'Too short domain' },
    { email: 'user@' + 'a'.repeat(256) + '.com', description: 'Extremely long domain' },
    
    // Special edge cases
    { email: '', description: 'Empty string' },
    { email: null, description: 'Null value' },
    { email: undefined, description: 'Undefined value' },
  ];

  // Test valid email scenarios
  validEmailScenarios.forEach(({ email, description }) => {
    test(`Validates valid email: ${description} (${email})`, () => {
      expect(isValidEmail(email)).toBe(true);
    });
  });

  // Test invalid email scenarios
  invalidEmailScenarios.forEach(({ email, description }) => {
    test(`Identifies invalid email: ${description} (${email})`, () => {
      expect(isValidEmail(email as string)).toBe(false);
    });
  });

  // Sanitization tests
  describe('Email Sanitization', () => {
    test('Trims whitespace', () => {
      expect(sanitizeEmail('  test@example.com  ')).toBe('test@example.com');
    });

    test('Converts to lowercase', () => {
      expect(sanitizeEmail('Test@Example.COM')).toBe('test@example.com');
    });
  });

  // Normalization tests
  describe('Email Normalization', () => {
    test('Normalizes different case emails', () => {
      expect(normalizeEmail('Test@Example.COM')).toBe('test@example.com');
    });

    test('Handles edge cases', () => {
      expect(normalizeEmail(null)).toBe('');
      expect(normalizeEmail(undefined)).toBe('');
    });
  });
});