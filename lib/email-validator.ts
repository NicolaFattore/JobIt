/**
 * Comprehensive Email Validation Utility
 * Provides robust email validation with multiple checks
 */
export class EmailValidator {
  /**
   * Regular expression for comprehensive email validation
   * Based on RFC 5322 with practical constraints
   */
  private static EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  /**
   * Maximum allowed email length
   */
  private static MAX_EMAIL_LENGTH = 320;

  /**
   * Validate email format
   * @param email - Email address to validate
   * @returns Validation result with details
   */
  static validate(email: string): {
    isValid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    // Check for null or undefined
    if (!email) {
      errors.push('Email cannot be empty');
      return { isValid: false, errors };
    }

    // Trim whitespace
    const trimmedEmail = email.trim();

    // Check length
    if (trimmedEmail.length === 0) {
      errors.push('Email cannot be empty');
      return { isValid: false, errors };
    }

    if (trimmedEmail.length > this.MAX_EMAIL_LENGTH) {
      errors.push(`Email cannot exceed ${this.MAX_EMAIL_LENGTH} characters`);
    }

    // Check format using regex
    if (!this.EMAIL_REGEX.test(trimmedEmail)) {
      errors.push('Invalid email format');
    }

    // Additional domain-specific checks
    const [localPart, domain] = trimmedEmail.split('@');

    // Check local part and domain separately
    if (!localPart || localPart.length === 0) {
      errors.push('Email local part is missing');
    }

    if (!domain || domain.length === 0) {
      errors.push('Email domain is missing');
    }

    // Check for consecutive dots
    if (/\.{2,}/.test(trimmedEmail)) {
      errors.push('Email cannot contain consecutive dots');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Normalize email for consistent comparison
   * @param email - Email to normalize
   * @returns Normalized email
   */
  static normalize(email: string): string {
    // Trim, convert to lowercase
    return email.trim().toLowerCase();
  }

  /**
   * Check if two emails are equivalent after normalization
   * @param email1 - First email
   * @param email2 - Second email
   * @returns Whether emails are equivalent
   */
  static areEquivalent(email1: string, email2: string): boolean {
    return this.normalize(email1) === this.normalize(email2);
  }
}
