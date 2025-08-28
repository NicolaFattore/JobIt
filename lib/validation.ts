/**
 * Advanced email validation and normalization utility
 */
export class EmailValidator {
  /**
   * Comprehensive email validation regex
   * Supports:
   * - Standard email formats
   * - International domain names
   * - Multiple TLDs
   * - Email length constraints
   */
  private static EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  /**
   * Validate and normalize an email address
   * @param email - Raw email input
   * @returns Normalized email or null if invalid
   */
  static validate(email: string): string | null {
    // Check for null, undefined, or empty string
    if (!email) return null;

    // Trim and convert to lowercase
    const trimmedEmail = email.trim().toLowerCase();

    // Check length constraints (RFC 5321)
    if (trimmedEmail.length > 254) return null;

    // Validate using comprehensive regex
    if (!this.EMAIL_REGEX.test(trimmedEmail)) return null;

    // Additional custom validations can be added here
    const [local, domain] = trimmedEmail.split('@');
    
    // Local part length check (64 characters max)
    if (local.length > 64) return null;

    // Prevent disposable or invalid email domains
    const invalidDomains = ['temp', 'throwaway', 'spam'];
    if (invalidDomains.some(invalidDomain => domain.includes(invalidDomain))) {
      return null;
    }

    return trimmedEmail;
  }

  /**
   * Get descriptive validation error
   * @param email - Email to validate
   * @returns Error message or null if valid
   */
  static getValidationError(email: string): string | null {
    if (!email) return 'Email is required';
    
    const normalizedEmail = this.validate(email);
    
    if (!normalizedEmail) {
      return 'Please enter a valid email address';
    }
    
    return null;
  }

  /**
   * Create case-insensitive database query for email uniqueness
   * @param email - Email to check
   * @returns Query condition or null if invalid
   */
  static createUniquenessQuery(email: string): { email: RegExp } | null {
    const normalizedEmail = this.validate(email);
    
    if (!normalizedEmail) return null;

    return { 
      email: new RegExp(`^${normalizedEmail}$`, 'i') 
    };
  }
}