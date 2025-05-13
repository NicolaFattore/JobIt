import crypto from 'crypto';

/**
 * Password utility functions for secure password hashing and verification
 */
export class PasswordUtils {
  // Number of iterations for key derivation (adjustable for security)
  private static readonly ITERATIONS = 10000;
  // Length of the derived key
  private static readonly KEY_LENGTH = 64;
  // Hashing algorithm
  private static readonly HASH_ALGORITHM = 'sha512';

  /**
   * Hash a password using PBKDF2 (Password-Based Key Derivation Function 2)
   * @param password Plain text password
   * @returns Object containing salt and hashed password
   */
  static hashPassword(password: string): { salt: string; hashedPassword: string } {
    // Validate input
    if (!password || password.length < 8) {
      throw new Error('Password must be at least 8 characters long');
    }

    // Generate a cryptographically secure random salt
    const salt = crypto.randomBytes(16).toString('hex');

    // Derive key using PBKDF2
    const hashedPassword = crypto.pbkdf2Sync(
      password, 
      salt, 
      this.ITERATIONS, 
      this.KEY_LENGTH, 
      this.HASH_ALGORITHM
    ).toString('hex');

    return { salt, hashedPassword };
  }

  /**
   * Verify a password against a stored hash
   * @param storedSalt Salt used in original hashing
   * @param storedHash Stored hashed password
   * @param providedPassword Password to verify
   * @returns Boolean indicating if password is correct
   */
  static verifyPassword(
    storedSalt: string, 
    storedHash: string, 
    providedPassword: string
  ): boolean {
    // Validate inputs
    if (!storedSalt || !storedHash || !providedPassword) {
      return false;
    }

    // Hash the provided password with the stored salt
    const hashedAttempt = crypto.pbkdf2Sync(
      providedPassword, 
      storedSalt, 
      this.ITERATIONS, 
      this.KEY_LENGTH, 
      this.HASH_ALGORITHM
    ).toString('hex');

    // Constant-time comparison to prevent timing attacks
    return crypto.timingSafeEqual(
      Buffer.from(storedHash), 
      Buffer.from(hashedAttempt)
    );
  }

  /**
   * Validate password strength
   * @param password Password to validate
   * @returns Boolean indicating if password meets requirements
   */
  static validatePasswordStrength(password: string): boolean {
    // At least 8 characters, one uppercase, one lowercase, one number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return passwordRegex.test(password);
  }
}