import { programmingLanguages } from "@/constants";
import { type ClassValue, clsx } from "clsx";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { twMerge } from "tailwind-merge";
import { validateEmail } from "./validation";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Validates email format using Zod schema
 * @param email - Email address to validate
 * @returns boolean indicating if the email is valid
 */
export function isValidEmail(email: string): boolean {
  return validateEmail(email);
}

// Rest of the existing utility functions remain unchanged 
function truncateString(str: string, num: number) {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + "...";
}

// Existing functions from the original file, abbreviated for space
function calculateDaysLeft(expTime: number): number {
  if (!expTime) {
    return 0;
  }
  const expDate = new Date(expTime * 1000);
  const currentDate = new Date();

  const timeDiff = expDate.getTime() - currentDate.getTime();
  const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

  return daysLeft;
}

// ... rest of the existing file contents remain the same
}