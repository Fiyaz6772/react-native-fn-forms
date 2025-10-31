import { FieldType } from '../types';

// Formatters for different field types
export const formatters = {
  // Clean and format person names
  personName: (value: string): string => {
    return value
      .trim()
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .replace(/^./, c => c.toUpperCase()) // Capitalize first letter
      .replace(/\s./g, c => c.toUpperCase()); // Capitalize after spaces
  },

  // Format business names
  businessName: (value: string): string => {
    return value.trim().replace(/\s+/g, ' '); // Clean up spacing
  },

  // Format email addresses
  email: (value: string): string => {
    return value.trim().toLowerCase();
  },

  // Format phone numbers
  phone: (value: string, format: 'international' | 'national' = 'national'): string => {
    const cleaned = value.replace(/\D/g, ''); // Remove all non-digits

    if (format === 'international' && !cleaned.startsWith('1') && cleaned.length === 10) {
      return `+1${cleaned}`;
    }

    // US phone number formatting
    if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    } else if (cleaned.length === 11 && cleaned.startsWith('1')) {
      return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
    }

    return value; // Return as-is if doesn't match expected patterns
  },

  // Format credit card numbers
  creditCard: (value: string): string => {
    const cleaned = value.replace(/\D/g, ''); // Remove all non-digits

    // Add spaces every 4 digits
    return cleaned.replace(/(.{4})/g, '$1 ').trim();
  },

  // Format currency values
  currency: (value: string): string => {
    const cleaned = value.replace(/[^\d.]/g, ''); // Keep only digits and decimal
    const parts = cleaned.split('.');

    if (parts.length > 2) {
      // Remove extra decimal points
      return `${parts[0]}.${parts.slice(1).join('')}`;
    }

    if (parts[1] && parts[1].length > 2) {
      // Limit to 2 decimal places
      return `${parts[0]}.${parts[1].slice(0, 2)}`;
    }

    return cleaned;
  },

  // Format usernames
  username: (value: string): string => {
    return value
      .toLowerCase()
      .replace(/[^a-z0-9_-]/g, '') // Remove invalid characters
      .replace(/^[_-]+|[_-]+$/g, ''); // Remove leading/trailing underscores and hyphens
  },

  // Format URLs
  url: (value: string): string => {
    const trimmed = value.trim().toLowerCase();

    if (trimmed && !trimmed.startsWith('http://') && !trimmed.startsWith('https://')) {
      return `https://${trimmed}`;
    }

    return trimmed;
  },

  // Format street addresses
  streetAddress: (value: string): string => {
    return value
      .trim()
      .replace(/\s+/g, ' ') // Clean up spacing
      .replace(/\b\w/g, c => c.toUpperCase()); // Title case
  },

  // Generic text formatter
  text: (value: string): string => {
    return value.trim();
  },

  // Number formatter
  number: (value: string): string => {
    return value.replace(/[^\d.-]/g, ''); // Keep only digits, decimal, and minus
  },

  // Auto-formatter based on field type
  auto: (value: string, fieldType: FieldType): string => {
    const formatter = formatters[fieldType as keyof typeof formatters];

    if (typeof formatter === 'function') {
      return (formatter as (value: string) => string)(value);
    }

    return formatters.text(value);
  },
};
