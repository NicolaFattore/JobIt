/**
 * Comprehensive email validation utility
 */
export class EmailValidator {
  /**
   * Validate email format with comprehensive checks
   * @param email - Email address to validate
   * @returns boolean indicating email validity
   */
  static validate(email: string): boolean {
    // Check for null, undefined, or empty input
    if (!email) return false;

    // Trim and convert to lowercase
    const trimmedEmail = email.trim().toLowerCase();

    // Length check (RFC 5321 limits)
    if (trimmedEmail.length < 3 || trimmedEmail.length > 254) return false;

    // Comprehensive email regex with RFC 5322 standard
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    // Additional validation checks
    if (!emailRegex.test(trimmedEmail)) return false;

    // Local part length check
    const [local, domain] = trimmedEmail.split('@');
    if (local.length > 64 || domain.length > 255) return false;

    // Disallow consecutive dots
    if (/\.{2,}/.test(trimmedEmail)) return false;

    // Disallow leading/trailing dots in local part
    if (/^\.|\.@|\.$/.test(local)) return false;

    return true;
  }

  /**
   * Normalize email for consistent comparison
   * @param email - Email to normalize
   * @returns Normalized email
   */
  static normalize(email: string): string {
    return email ? email.trim().toLowerCase() : '';
  }

  /**
   * Get detailed validation error message
   * @param email - Email to validate
   * @returns Error message or null if valid
   */
  static getValidationError(email: string): string | null {
    if (!email) return 'Email is required';

    const trimmedEmail = email.trim().toLowerCase();

    if (trimmedEmail.length < 3) return 'Email is too short';
    if (trimmedEmail.length > 254) return 'Email is too long';

    if (!this.validate(trimmedEmail)) return 'Invalid email format';

    return null;
  }
}