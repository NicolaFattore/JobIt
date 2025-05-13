import { programmingLanguages } from "@/constants";
import { type ClassValue, clsx } from "clsx";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Validates an email address using a comprehensive regex pattern
 * @param email The email address to validate
 * @returns boolean indicating whether the email is valid
 */
export function validateEmail(email: string): boolean {
  // RFC 5322 Official Email Standard Regex
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
  // Check if email is not empty and matches the regex pattern
  return email.trim().length > 0 && emailRegex.test(email.trim());
}

// ... (rest of the previous file contents remain unchanged)