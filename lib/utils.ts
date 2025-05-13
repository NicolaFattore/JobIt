import { programmingLanguages } from "@/constants";
import { type ClassValue, clsx } from "clsx";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { twMerge } from "tailwind-merge";
import { EmailValidator } from "./email-validator";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Maintain backwards compatibility with previous email validation method
export function validateEmail(email: string): boolean {
  return EmailValidator.validate(email).isValid;
}

// Exported for broader use
export { EmailValidator };

// ... [rest of the previous file contents remain unchanged]
