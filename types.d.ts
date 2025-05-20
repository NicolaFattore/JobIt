import mongoose from 'mongoose';

declare module 'mongoose' {
  interface EmailValidationOptions {
    message?: string;
  }

  interface SchemaTypeOptions<T> {
    /**
     * Custom email validation for mongoose schemas
     */
    email?: boolean | EmailValidationOptions;
  }
}

/**
 * Email validation interface for user registration
 */
export interface IUserEmail {
  email: string;
  isValidEmail: (email: string) => boolean;
}