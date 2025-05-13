import { PasswordUtils } from '../passwordUtils';

describe('PasswordUtils', () => {
  const testPassword = 'StrongPass123!';

  describe('hashPassword', () => {
    it('should hash a valid password', () => {
      const { salt, hashedPassword } = PasswordUtils.hashPassword(testPassword);
      
      expect(salt).toBeTruthy();
      expect(hashedPassword).toBeTruthy();
      expect(salt).not.toEqual(hashedPassword);
    });

    it('should throw error for short password', () => {
      expect(() => PasswordUtils.hashPassword('short')).toThrow('Password must be at least 8 characters long');
    });
  });

  describe('verifyPassword', () => {
    it('should verify correct password', () => {
      const { salt, hashedPassword } = PasswordUtils.hashPassword(testPassword);
      
      const isValid = PasswordUtils.verifyPassword(salt, hashedPassword, testPassword);
      expect(isValid).toBe(true);
    });

    it('should reject incorrect password', () => {
      const { salt, hashedPassword } = PasswordUtils.hashPassword(testPassword);
      
      const isValid = PasswordUtils.verifyPassword(salt, hashedPassword, 'WrongPassword123!');
      expect(isValid).toBe(false);
    });

    it('should handle empty inputs', () => {
      const isValid = PasswordUtils.verifyPassword('', '', '');
      expect(isValid).toBe(false);
    });
  });

  describe('validatePasswordStrength', () => {
    it('should validate strong passwords', () => {
      expect(PasswordUtils.validatePasswordStrength('StrongPass123')).toBe(true);
      expect(PasswordUtils.validatePasswordStrength('AnotherSecure456')).toBe(true);
    });

    it('should reject weak passwords', () => {
      expect(PasswordUtils.validatePasswordStrength('weak')).toBe(false);
      expect(PasswordUtils.validatePasswordStrength('onlylowercase')).toBe(false);
      expect(PasswordUtils.validatePasswordStrength('ONLYUPPERCASE')).toBe(false);
      expect(PasswordUtils.validatePasswordStrength('12345678')).toBe(false);
    });
  });
});