import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { isValidEmail, normalizeEmail, getEmailValidationError } from '../lib/validation';
import { validateEmailUniqueness } from '../lib/user-validation';

interface RegisterFormData {
  email: string;
  password: string;
}

const RegisterForm: React.FC = () => {
  const [emailError, setEmailError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    setError,
    clearErrors
  } = useForm<RegisterFormData>();

  const validateEmail = async (email: string): Promise<boolean> => {
    const normalizedEmail = normalizeEmail(email);
    
    // Clear previous errors
    setEmailError(null);
    clearErrors('email');

    // Check email format
    if (!isValidEmail(normalizedEmail)) {
      const errorMessage = getEmailValidationError(email);
      setEmailError(errorMessage);
      setError('email', { 
        type: 'manual', 
        message: errorMessage 
      });
      return false;
    }

    // Check email uniqueness
    try {
      const uniquenessResult = await validateEmailUniqueness(normalizedEmail);
      
      if (!uniquenessResult.isUnique) {
        setEmailError(uniquenessResult.message || 'Email is already registered');
        setError('email', { 
          type: 'manual', 
          message: uniquenessResult.message || 'Email is already registered'
        });
        return false;
      }
    } catch (error) {
      setEmailError('Error validating email');
      return false;
    }

    return true;
  };

  const onSubmit = async (data: RegisterFormData) => {
    setIsSubmitting(true);
    
    try {
      const isValid = await validateEmail(data.email);
      
      if (isValid) {
        const normalizedEmail = normalizeEmail(data.email);
        console.log('Registration with normalized email:', normalizedEmail);
        // Add actual registration logic here
      }
    } catch (error) {
      console.error('Registration error:', error);
      setEmailError('Registration failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium">Email</label>
        <input 
          id="email"
          type="email"
          {...register('email', {
            required: 'Email is required',
            validate: validateEmail
          })}
          className={`w-full p-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
        />
        {(emailError || errors.email) && (
          <p className="text-red-500 text-sm mt-1">
            {emailError || errors.email?.message}
          </p>
        )}
      </div>
      {/* Other form fields would be added here */}
      <button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full bg-blue-500 text-white p-2 disabled:opacity-50"
      >
        {isSubmitting ? 'Registering...' : 'Register'}
      </button>
    </form>
  );
};

export default RegisterForm;