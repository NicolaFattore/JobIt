import { programmingLanguages } from "@/constants";
import { type ClassValue, clsx } from "clsx";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Validates email format using a comprehensive regex pattern
 * @param email - Email address to validate
 * @returns boolean indicating if the email is valid
 */
export function isValidEmail(email: string): boolean {
  // RFC 5322 compliant email regex with some additional restrictions
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  
  // Additional validation steps
  if (!email) return false;
  if (email.length > 254) return false; // Maximum email length
  if (email.length < 5) return false; // Minimum reasonable email length
  
  return emailRegex.test(email);
}

// Rest of the existing utility functions... (kept as is from previous file)
truncateString(str: string, num: number) {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + "...";
}

/* {Calculate Days left for job posting} */
calculateDaysLeft(expTime: number): number {
  if (!expTime) {
    return 0;
  }
  const expDate = new Date(expTime * 1000); // Convert to milliseconds
  const currentDate = new Date();

  const timeDiff = expDate.getTime() - currentDate.getTime();
  const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

  return daysLeft;
}

// ... (rest of the original file contents)