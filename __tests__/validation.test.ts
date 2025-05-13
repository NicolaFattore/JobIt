import { 
  validateAndNormalizeEmail, 
  getEmailValidationError,
  createCaseInsensitiveEmailQuery 
} from '../lib/validation';

describe('Email Validation', () => {
  // Valid email test cases with expected normalization
  const validEmailScenarios = [
    { input: 'user@example.com', expected: 'user@example.com' },
    { input: 'User@Example.com', expected: 'user@example.com' },
    { input: '  John.Doe@Company.co.uk  ', expected: 'john.doe@company.co.uk' },
    { input: 'first+last@domain.com', expected: 'first+last@domain.com' }
  ];

  // Invalid email test cases
  const invalidEmails = [
    '',
    'invalid-email',
    'user@',
    '@domain.com',
    'user@domain',
    'user@.com',
    'user@domain.',
    '   ',
    null,
    undefined
  ];

  // Test valid email normalization
  validEmailScenarios.forEach(({ input, expected }) => {
    test(`should normalize valid email: ${input}`, () => {
      const normalized = validateAndNormalizeEmail(input);
      expect(normalized).toBe(expected);
      expect(getEmailValidationError(input)).toBeNull();
    });
  });

  // Test invalid email cases
  invalidEmails.forEach(email => {
    test(`should invalidate email: ${email}`, () => {
      const normalized = validateAndNormalizeEmail(email as string);
      expect(normalized).toBeNull();
      expect(getEmailValidationError(email as string)).not.toBeNull();
    });
  });

  // Test case-insensitive email query creation
  describe('Case-insensitive email query', () => {
    test('should create case-insensitive query for valid email', () => {
      const email = 'Test@Example.com';
      const query = createCaseInsensitiveEmailQuery(email);
      
      expect(query).toEqual({
        email: /^test@example.com$/i
      });
    });

    test('should return null for invalid email', () => {
      const email = 'invalid-email';
      const query = createCaseInsensitiveEmailQuery(email);
      
      expect(query).toBeNull();
    });
  });
});