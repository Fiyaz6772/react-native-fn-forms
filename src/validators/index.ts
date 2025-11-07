import { FieldType, ValidationRule } from '../types';

// Common patterns for different field types
const PATTERNS = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^[\+]?[1-9][\d]{0,15}$/,
  personName: /^[a-zA-Z\s\-'\.]+$/,
  businessName: /^[a-zA-Z0-9\s\-'\.&,]+$/,
  streetAddress: /^[a-zA-Z0-9\s\-'\.#,]+$/,
  creditCard: /^[0-9\s]+$/,
  currency: /^\d+(\.\d{1,2})?$/,
  username: /^[a-zA-Z0-9_\-]+$/,
  url: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
  otp: /^[0-9]+$/,
};

// Error messages for different validation types
const ERROR_MESSAGES = {
  required: 'This field is required',
  minLength: (min: number) => `Must be at least ${min} characters long`,
  maxLength: (max: number) => `Must not exceed ${max} characters`,
  pattern: {
    email: 'Please enter a valid email address',
    phone: 'Please enter a valid phone number',
    personName: 'Names can only contain letters, spaces, hyphens, and apostrophes',
    businessName: 'Business names can contain letters, numbers, and common punctuation',
    streetAddress: 'Please enter a valid street address',
    creditCard: 'Credit card numbers can only contain digits and spaces',
    currency: 'Please enter a valid amount (e.g., 10.99)',
    username: 'Username can only contain letters, numbers, underscores, and hyphens',
    url: 'Please enter a valid URL starting with http:// or https://',
    otp: 'OTP can only contain numbers',
  },
};

// Suggestions for common validation errors
const SUGGESTIONS = {
  email: 'Make sure to include @ and a domain (e.g., user@example.com)',
  phone: 'Include country code if international (e.g., +1 555-123-4567)',
  personName: 'Remove any numbers or special characters except hyphens and apostrophes',
  creditCard: 'Remove any dashes or other characters, spaces are okay',
  currency: 'Use format like 10.99 (up to 2 decimal places)',
  username: 'Use only letters, numbers, underscores, and hyphens',
  url: 'Start with http:// or https://',
  otp: 'Enter only the numbers from your verification code',
};

// Luhn algorithm for credit card validation
const luhnCheck = (cardNumber: string): boolean => {
  const digits = cardNumber.replace(/\s/g, '').split('').reverse();
  let sum = 0;

  for (let i = 0; i < digits.length; i++) {
    let digit = parseInt(digits[i]);

    if (i % 2 === 1) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
  }

  return sum % 10 === 0;
};

// Field-specific validators
export const validators = {
  required: (value: any): ValidationRule | null => {
    const isEmpty =
      value === null ||
      value === undefined ||
      value === '' ||
      (typeof value === 'string' && value.trim() === '');

    return isEmpty
      ? {
          type: 'required',
          message: ERROR_MESSAGES.required,
          validate: () => false,
        }
      : null;
  },

  minLength:
    (min: number) =>
    (value: string): ValidationRule | null => {
      return value && value.length < min
        ? {
            type: 'minLength',
            message: ERROR_MESSAGES.minLength(min),
            validate: () => false,
          }
        : null;
    },

  maxLength:
    (max: number) =>
    (value: string): ValidationRule | null => {
      return value && value.length > max
        ? {
            type: 'maxLength',
            message: ERROR_MESSAGES.maxLength(max),
            validate: () => false,
          }
        : null;
    },

  pattern:
    (fieldType: FieldType) =>
    (value: string): ValidationRule | null => {
      if (!value) return null;

      const pattern = PATTERNS[fieldType as keyof typeof PATTERNS];
      if (!pattern) return null;

      const isValid = pattern.test(value);

      return !isValid
        ? {
            type: 'pattern',
            message:
              ERROR_MESSAGES.pattern[fieldType as keyof typeof ERROR_MESSAGES.pattern] ||
              'Invalid format',
            validate: () => false,
            suggestion: SUGGESTIONS[fieldType as keyof typeof SUGGESTIONS],
          }
        : null;
    },

  creditCardLuhn: (value: string): ValidationRule | null => {
    if (!value) return null;

    const cleanValue = value.replace(/\s/g, '');
    if (cleanValue.length < 13 || cleanValue.length > 19) {
      return {
        type: 'creditCardLength',
        message: 'Credit card number must be between 13 and 19 digits',
        validate: () => false,
      };
    }

    const isValid = luhnCheck(cleanValue);

    return !isValid
      ? {
          type: 'creditCardLuhn',
          message: 'Please enter a valid credit card number',
          validate: () => false,
          suggestion: 'Double-check the numbers for any typos',
        }
      : null;
  },

  passwordStrength:
    (requirements: {
      minLength?: number;
      uppercase?: number;
      lowercase?: number;
      numbers?: number;
      specialChars?: number;
    }) =>
    (value: string): ValidationRule | null => {
      if (!value) return null;

      const issues: string[] = [];

      if (requirements.minLength && value.length < requirements.minLength) {
        issues.push(`at least ${requirements.minLength} characters`);
      }

      if (requirements.uppercase && (value.match(/[A-Z]/g) || []).length < requirements.uppercase) {
        issues.push(
          `${requirements.uppercase} uppercase letter${requirements.uppercase > 1 ? 's' : ''}`
        );
      }

      if (requirements.lowercase && (value.match(/[a-z]/g) || []).length < requirements.lowercase) {
        issues.push(
          `${requirements.lowercase} lowercase letter${requirements.lowercase > 1 ? 's' : ''}`
        );
      }

      if (requirements.numbers && (value.match(/[0-9]/g) || []).length < requirements.numbers) {
        issues.push(`${requirements.numbers} number${requirements.numbers > 1 ? 's' : ''}`);
      }

      if (
        requirements.specialChars &&
        (value.match(/[^a-zA-Z0-9]/g) || []).length < requirements.specialChars
      ) {
        issues.push(
          `${requirements.specialChars} special character${requirements.specialChars > 1 ? 's' : ''}`
        );
      }

      return issues.length > 0
        ? {
            type: 'passwordStrength',
            message: `Password must contain ${issues.join(', ')}`,
            validate: () => false,
            suggestion: 'Try adding the missing requirements',
          }
        : null;
    },

  custom:
    (validator: (value: any) => string | null) =>
    (value: any): ValidationRule | null => {
      const error = validator(value);

      return error
        ? {
            type: 'custom',
            message: error,
            validate: () => false,
          }
        : null;
    },
};
