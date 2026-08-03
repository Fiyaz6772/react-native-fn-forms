import { formatters } from '../src/utils/formatters';
import { CountryCode } from '../src/types';

describe('Phone Number Multi-Country Formatting', () => {
  describe('No Country Code - Preserve User Input', () => {
    it('should preserve input as-is when no country code is provided', () => {
      expect(formatters.phone('1234567890')).toBe('1234567890');
      expect(formatters.phone('+44 7911 123456')).toBe('+44 7911 123456');
      expect(formatters.phone('(555) 123-4567')).toBe('(555) 123-4567');
      expect(formatters.phone('anything')).toBe('anything');
    });
  });

  describe('North America - US/CA', () => {
    it('should format US 10-digit phone numbers', () => {
      expect(formatters.phone('5551234567', 'US')).toBe('(555) 123-4567');
    });

    it('should format US 11-digit phone numbers with country code', () => {
      expect(formatters.phone('15551234567', 'US')).toBe('+1 (555) 123-4567');
    });

    it('should format Canadian phone numbers same as US', () => {
      expect(formatters.phone('4165551234', 'CA')).toBe('(416) 555-1234');
      expect(formatters.phone('14165551234', 'CA')).toBe('+1 (416) 555-1234');
    });

    it('should preserve partially entered US numbers', () => {
      expect(formatters.phone('555', 'US')).toBe('555');
      expect(formatters.phone('555123', 'US')).toBe('555123');
    });
  });

  describe('Europe - GB, DE, FR, ES, IT', () => {
    it('should format UK phone numbers', () => {
      expect(formatters.phone('7911123456', 'GB')).toBe('+44 7911 123 456');
      expect(formatters.phone('447911123456', 'GB')).toBe('+44 7911 123 456');
    });

    it('should format German phone numbers', () => {
      expect(formatters.phone('3012345678', 'DE')).toBe('+49 301 2345678');
      expect(formatters.phone('493012345678', 'DE')).toBe('+49 301 2345678');
    });

    it('should format French phone numbers', () => {
      expect(formatters.phone('123456789', 'FR')).toBe('+33 1 23 45 67 89');
      expect(formatters.phone('33123456789', 'FR')).toBe('+33 1 23 45 67 89');
    });

    it('should format Spanish phone numbers', () => {
      expect(formatters.phone('912345678', 'ES')).toBe('+34 912 34 56 78');
      expect(formatters.phone('34912345678', 'ES')).toBe('+34 912 34 56 78');
    });

    it('should format Italian phone numbers', () => {
      expect(formatters.phone('0612345678', 'IT')).toBe('+39 06 1234 5678');
      expect(formatters.phone('390612345678', 'IT')).toBe('+39 06 1234 5678');
    });
  });

  describe('Asia - IN, CN, JP, PK, AE', () => {
    it('should format Indian phone numbers', () => {
      expect(formatters.phone('9876543210', 'IN')).toBe('+91 98765 43210');
      expect(formatters.phone('919876543210', 'IN')).toBe('+91 98765 43210');
    });

    it('should format Chinese phone numbers', () => {
      expect(formatters.phone('13800138000', 'CN')).toBe('+86 138 0013 8000');
      expect(formatters.phone('8613800138000', 'CN')).toBe('+86 138 0013 8000');
    });

    it('should format Japanese phone numbers', () => {
      expect(formatters.phone('9012345678', 'JP')).toBe('+81 90 1234 5678');
      expect(formatters.phone('819012345678', 'JP')).toBe('+81 90 1234 5678');
    });

    it('should format Pakistani phone numbers', () => {
      expect(formatters.phone('3001234567', 'PK')).toBe('+92 300 1234567');
      expect(formatters.phone('923001234567', 'PK')).toBe('+92 300 1234567');
    });

    it('should format UAE phone numbers', () => {
      expect(formatters.phone('501234567', 'AE')).toBe('+971 50 123 4567');
      expect(formatters.phone('971501234567', 'AE')).toBe('+971 50 123 4567');
    });
  });

  describe('Other Regions - AU, BR, MX, ZA', () => {
    it('should format Australian phone numbers', () => {
      expect(formatters.phone('412345678', 'AU')).toBe('+61 412 345 678');
      expect(formatters.phone('61412345678', 'AU')).toBe('+61 412 345 678');
    });

    it('should format Brazilian phone numbers', () => {
      expect(formatters.phone('11987654321', 'BR')).toBe('+55 11 98765-4321');
      expect(formatters.phone('5511987654321', 'BR')).toBe('+55 11 98765-4321');
    });

    it('should format Mexican phone numbers', () => {
      expect(formatters.phone('5512345678', 'MX')).toBe('+52 55 1234 5678');
      expect(formatters.phone('525512345678', 'MX')).toBe('+52 55 1234 5678');
    });

    it('should format South African phone numbers', () => {
      expect(formatters.phone('821234567', 'ZA')).toBe('+27 82 123 4567');
      expect(formatters.phone('27821234567', 'ZA')).toBe('+27 82 123 4567');
    });
  });

  describe('Edge Cases', () => {
    it('should handle phone numbers with existing formatting', () => {
      expect(formatters.phone('(555) 123-4567', 'US')).toBe('(555) 123-4567');
      expect(formatters.phone('+44 7911 123 456', 'GB')).toBe('+44 7911 123 456');
      expect(formatters.phone('+91 98765 43210', 'IN')).toBe('+91 98765 43210');
    });

    it('should handle incomplete phone numbers', () => {
      expect(formatters.phone('555', 'US')).toBe('555');
      expect(formatters.phone('79', 'GB')).toBe('79');
      expect(formatters.phone('98765', 'IN')).toBe('98765');
    });

    it('should handle phone numbers that are too long', () => {
      const longNumber = '12345678901234567890';
      expect(formatters.phone(longNumber, 'US')).toBe(longNumber);
    });

    it('should handle empty strings', () => {
      expect(formatters.phone('', 'US')).toBe('');
      expect(formatters.phone('', 'GB')).toBe('');
      expect(formatters.phone('')).toBe('');
    });

    it('should handle non-digit characters', () => {
      expect(formatters.phone('abc-def-ghij', 'US')).toBe('');
      expect(formatters.phone('***', 'GB')).toBe('');
    });
  });

  describe('All Supported Countries', () => {
    const countries: CountryCode[] = [
      'US',
      'CA',
      'GB',
      'DE',
      'FR',
      'ES',
      'IT',
      'IN',
      'CN',
      'JP',
      'PK',
      'AE',
      'AU',
      'BR',
      'MX',
      'ZA',
    ];

    it('should accept all defined country codes', () => {
      countries.forEach(country => {
        expect(() => formatters.phone('1234567890', country)).not.toThrow();
      });
    });
  });
});
