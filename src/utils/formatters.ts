import { FieldType, CountryCode } from '../types';

// Phone formatting configurations by country
const PHONE_FORMATS: Record<
  CountryCode,
  { code: string; format: (digits: string) => string; length: number[] }
> = {
  // North America (NANP)
  US: {
    code: '+1',
    format: d =>
      d.length === 10
        ? `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`
        : d.length === 11 && d[0] === '1'
          ? `+1 (${d.slice(1, 4)}) ${d.slice(4, 7)}-${d.slice(7)}`
          : d,
    length: [10, 11],
  },
  CA: {
    code: '+1',
    format: d =>
      d.length === 10
        ? `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`
        : d.length === 11 && d[0] === '1'
          ? `+1 (${d.slice(1, 4)}) ${d.slice(4, 7)}-${d.slice(7)}`
          : d,
    length: [10, 11],
  },
  // Europe
  GB: {
    code: '+44',
    format: d =>
      d.length === 10
        ? `+44 ${d.slice(0, 4)} ${d.slice(4, 7)} ${d.slice(7)}`
        : d.length === 12 && d.slice(0, 2) === '44'
          ? `+44 ${d.slice(2, 6)} ${d.slice(6, 9)} ${d.slice(9)}`
          : d,
    length: [10, 12],
  },
  DE: {
    code: '+49',
    format: d =>
      d.length >= 10 && d.length <= 11
        ? `+49 ${d.slice(0, 3)} ${d.slice(3)}`
        : d.length >= 12 && d.length <= 13 && d.slice(0, 2) === '49'
          ? `+49 ${d.slice(2, 5)} ${d.slice(5)}`
          : d,
    length: [10, 11, 12, 13],
  },
  FR: {
    code: '+33',
    format: d =>
      d.length === 9
        ? `+33 ${d[0]} ${d.slice(1, 3)} ${d.slice(3, 5)} ${d.slice(5, 7)} ${d.slice(7)}`
        : d.length === 11 && d.slice(0, 2) === '33'
          ? `+33 ${d[2]} ${d.slice(3, 5)} ${d.slice(5, 7)} ${d.slice(7, 9)} ${d.slice(9)}`
          : d,
    length: [9, 11],
  },
  ES: {
    code: '+34',
    format: d =>
      d.length === 9
        ? `+34 ${d.slice(0, 3)} ${d.slice(3, 5)} ${d.slice(5, 7)} ${d.slice(7)}`
        : d.length === 11 && d.slice(0, 2) === '34'
          ? `+34 ${d.slice(2, 5)} ${d.slice(5, 7)} ${d.slice(7, 9)} ${d.slice(9)}`
          : d,
    length: [9, 11],
  },
  IT: {
    code: '+39',
    format: d =>
      d.length === 10
        ? `+39 ${d.slice(0, 2)} ${d.slice(2, 6)} ${d.slice(6)}`
        : d.length === 12 && d.slice(0, 2) === '39'
          ? `+39 ${d.slice(2, 4)} ${d.slice(4, 8)} ${d.slice(8)}`
          : d,
    length: [10, 12],
  },
  // Asia
  IN: {
    code: '+91',
    format: d =>
      d.length === 10
        ? `+91 ${d.slice(0, 5)} ${d.slice(5)}`
        : d.length === 12 && d.slice(0, 2) === '91'
          ? `+91 ${d.slice(2, 7)} ${d.slice(7)}`
          : d,
    length: [10, 12],
  },
  CN: {
    code: '+86',
    format: d =>
      d.length === 11
        ? `+86 ${d.slice(0, 3)} ${d.slice(3, 7)} ${d.slice(7)}`
        : d.length === 13 && d.slice(0, 2) === '86'
          ? `+86 ${d.slice(2, 5)} ${d.slice(5, 9)} ${d.slice(9)}`
          : d,
    length: [11, 13],
  },
  JP: {
    code: '+81',
    format: d =>
      d.length === 10
        ? `+81 ${d.slice(0, 2)} ${d.slice(2, 6)} ${d.slice(6)}`
        : d.length === 12 && d.slice(0, 2) === '81'
          ? `+81 ${d.slice(2, 4)} ${d.slice(4, 8)} ${d.slice(8)}`
          : d,
    length: [10, 12],
  },
  PK: {
    code: '+92',
    format: d =>
      d.length === 10
        ? `+92 ${d.slice(0, 3)} ${d.slice(3)}`
        : d.length === 12 && d.slice(0, 2) === '92'
          ? `+92 ${d.slice(2, 5)} ${d.slice(5)}`
          : d,
    length: [10, 12],
  },
  AE: {
    code: '+971',
    format: d =>
      d.length === 9
        ? `+971 ${d.slice(0, 2)} ${d.slice(2, 5)} ${d.slice(5)}`
        : d.length === 12 && d.slice(0, 3) === '971'
          ? `+971 ${d.slice(3, 5)} ${d.slice(5, 8)} ${d.slice(8)}`
          : d,
    length: [9, 12],
  },
  // Other regions
  AU: {
    code: '+61',
    format: d =>
      d.length === 9
        ? `+61 ${d.slice(0, 3)} ${d.slice(3, 6)} ${d.slice(6)}`
        : d.length === 11 && d.slice(0, 2) === '61'
          ? `+61 ${d.slice(2, 5)} ${d.slice(5, 8)} ${d.slice(8)}`
          : d,
    length: [9, 11],
  },
  BR: {
    code: '+55',
    format: d =>
      d.length === 11
        ? `+55 ${d.slice(0, 2)} ${d.slice(2, 7)}-${d.slice(7)}`
        : d.length === 13 && d.slice(0, 2) === '55'
          ? `+55 ${d.slice(2, 4)} ${d.slice(4, 9)}-${d.slice(9)}`
          : d,
    length: [11, 13],
  },
  MX: {
    code: '+52',
    format: d =>
      d.length === 10
        ? `+52 ${d.slice(0, 2)} ${d.slice(2, 6)} ${d.slice(6)}`
        : d.length === 12 && d.slice(0, 2) === '52'
          ? `+52 ${d.slice(2, 4)} ${d.slice(4, 8)} ${d.slice(8)}`
          : d,
    length: [10, 12],
  },
  ZA: {
    code: '+27',
    format: d =>
      d.length === 9
        ? `+27 ${d.slice(0, 2)} ${d.slice(2, 5)} ${d.slice(5)}`
        : d.length === 11 && d.slice(0, 2) === '27'
          ? `+27 ${d.slice(2, 4)} ${d.slice(4, 7)} ${d.slice(7)}`
          : d,
    length: [9, 11],
  },
};

// Formatters for different field types
export const formatters = {
  // Clean and format person names
  personName: (value: string): string => {
    return value
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .replace(/^\s/, '') // Remove only leading spaces
      .replace(/^./, c => c.toUpperCase()) // Capitalize first letter
      .replace(/\s./g, c => c.toUpperCase()); // Capitalize after spaces
  },

  // Format business names
  businessName: (value: string): string => {
    return value
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .replace(/^\s/, ''); // Remove only leading spaces
  },

  // Format email addresses
  email: (value: string): string => {
    return value.trim().toLowerCase();
  },

  // Format phone numbers by country code
  phone: (value: string, countryCode?: CountryCode): string => {
    // If no country code provided, return as-is (preserve user input)
    if (!countryCode) {
      return value;
    }

    const cleaned = value.replace(/\D/g, ''); // Remove all non-digits

    // Get country format configuration
    const config = PHONE_FORMATS[countryCode];
    if (!config) {
      return value; // Unknown country, return as-is
    }

    // Apply country-specific formatting
    return config.format(cleaned);
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
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .replace(/^\s/, '') // Remove only leading spaces
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
  auto: (value: string, fieldType: FieldType, options?: { countryCode?: CountryCode }): string => {
    const formatter = formatters[fieldType as keyof typeof formatters];

    if (typeof formatter === 'function') {
      // Special handling for phone formatter with country code
      if (fieldType === 'phone' && options?.countryCode) {
        return formatters.phone(value, options.countryCode);
      }
      return (formatter as (value: string) => string)(value);
    }

    return formatters.text(value);
  },
};
