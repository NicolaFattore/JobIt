import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RegisterForm from '../components/RegisterForm';

describe('RegisterForm', () => {
  test('renders email input', () => {
    render(<RegisterForm />);
    const emailInput = screen.getByLabelText(/email/i);
    expect(emailInput).toBeInTheDocument();
  });

  test.each([
    'invalid-email',
    '@example.com',
    'user@',
    'user@example',
    'a'.repeat(255) + '@example.com'
  ])('shows error for invalid email: %s', async (invalidEmail) => {
    render(<RegisterForm />);
    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByText(/register/i);

    fireEvent.change(emailInput, { target: { value: invalidEmail } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      const errorMessage = screen.getByText(/please enter a valid email address/i);
      expect(errorMessage).toBeInTheDocument();
    });
  });

  test.each([
    'test@example.com',
    'user.name@example.co.uk',
    'firstname+lastname@example.com'
  ])('accepts valid email: %s', async (validEmail) => {
    render(<RegisterForm />);
    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByText(/register/i);

    // Mock console.log to check registration
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    fireEvent.change(emailInput, { target: { value: validEmail } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('Registration with normalized email'),
        expect.any(String)
      );
    });

    consoleSpy.mockRestore();
  });

  test('handles case-insensitive email input', async () => {
    render(<RegisterForm />);
    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByText(/register/i);

    // Mock console.log to check registration
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    fireEvent.change(emailInput, { target: { value: 'Test@Example.COM' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('Registration with normalized email'),
        'test@example.com'
      );
    });

    consoleSpy.mockRestore();
  });
});