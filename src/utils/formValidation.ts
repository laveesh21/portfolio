/**
 * Form Validation Utilities
 * Provides validation functions for contact form fields
 */

export interface ValidationError {
  [key: string]: string | null;
}

/**
 * Validate name field
 */
export const validateName = (name: string): string | null => {
  if (!name.trim()) {
    return 'Name is required';
  }
  if (name.trim().length < 2) {
    return 'Name must be at least 2 characters';
  }
  if (name.length > 50) {
    return 'Name is too long';
  }
  if (!/^[a-zA-Z\s]+$/.test(name)) {
    return 'Name can only contain letters and spaces';
  }
  return null;
};

/**
 * Validate email field
 */
export const validateEmail = (email: string): string | null => {
  if (!email.trim()) {
    return 'Email is required';
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return 'Enter a valid email address';
  }
  if (email.length > 100) {
    return 'Email is too long';
  }
  return null;
};

/**
 * Validate subject field
 */
export const validateSubject = (subject: string): string | null => {
  if (!subject.trim()) {
    return 'Subject is required';
  }
  if (subject.trim().length < 5) {
    return 'Subject must be at least 5 characters';
  }
  if (subject.length > 100) {
    return 'Subject is too long';
  }
  return null;
};

/**
 * Validate message field
 */
export const validateMessage = (message: string): string | null => {
  if (!message.trim()) {
    return 'Message is required';
  }
  if (message.trim().length < 10) {
    return 'Message must be at least 10 characters';
  }
  if (message.length > 1000) {
    return 'Message is too long (max 1000 characters)';
  }
  return null;
};

/**
 * Validate all form fields
 */
export const validateAllFields = (formData: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): ValidationError => {
  return {
    name: validateName(formData.name),
    email: validateEmail(formData.email),
    subject: validateSubject(formData.subject),
    message: validateMessage(formData.message),
  };
};

/**
 * Check if validation errors object has any errors
 */
export const hasErrors = (errors: ValidationError): boolean => {
  return Object.values(errors).some(error => error !== null);
};
