/**
 * Comprehensive email validation utility
 */
export class EmailValidator {
  /**
   * Advanced email validation regex
   * Supports most standard email formats with additional constraints
   */
  private static EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  /**
   * Validate email format
   * @param email - Email address to validate
   * @returns boolean indicating if email is valid
   */
  static validate(email: string): boolean {
    // Check if email is empty or undefined
    if (!email) return false;

    // Trim and convert to lowercase
    const trimmedEmail = email.trim().toLowerCase();

    // Length checks
    if (trimmedEmail.length < 5 || trimmedEmail.length > 320) return false;

    // Regex validation
    if (!this.EMAIL_REGEX.test(trimmedEmail)) return false;

    // Split email into local and domain parts
    const [localPart, domainPart] = trimmedEmail.split('@');

    // Additional checks for local and domain parts
    if (localPart.length > 64 || domainPart.length > 255) return false;

    // Ensure valid top-level domain
    const domainParts = domainPart.split('.');
    if (domainParts.length < 2) return false;
    const tld = domainParts[domainParts.length - 1];
    if (tld.length < 2 || tld.length > 63) return false;

    return true;
  }

  /**
   * Generate descriptive error message for invalid emails
   * @param email - Email address to validate
   * @returns Error message or null if email is valid
   */
  static getValidationError(email: string): string | null {
    if (!email) return 'Email cannot be empty';
    
    const trimmedEmail = email.trim().toLowerCase();

    if (trimmedEmail.length < 5) return 'Email is too short';
    if (trimmedEmail.length > 320) return 'Email is too long';

    if (!this.validate(trimmedEmail)) {
      return 'Please enter a valid email address';
    }

    return null;
  }

  /**
   * Normalize email for case-insensitive comparison
   * @param email - Email to normalize
   * @returns Normalized email
   */
  static normalize(email: string): string {
    return email.trim().toLowerCase();
  }
}

/**
 * Email uniqueness checker (mock implementation)
 * In a real application, this would interact with the database
 */
export class EmailUniquenessChecker {
  // Simulated email storage (would be replaced by database check)
  private static registeredEmails: Set<string> = new Set();

  /**
   * Check if email is unique
   * @param email - Email to check
   * @returns boolean indicating if email is unique
   */
  static async isUnique(email: string): Promise<boolean> {
    const normalizedEmail = EmailValidator.normalize(email);
    return !this.registeredEmails.has(normalizedEmail);
  }

  /**
   * Register an email (simulating database insertion)
   * @param email - Email to register
   */
  static async registerEmail(email: string): Promise<void> {
    const normalizedEmail = EmailValidator.normalize(email);
    this.registeredEmails.add(normalizedEmail);
  }
}
