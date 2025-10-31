import { validators } from '../src/validators';

describe('Validators', () => {
  describe('required validator', () => {
    it('should return error for empty values', () => {
      expect(validators.required('')).toBeTruthy();
      expect(validators.required(null)).toBeTruthy();
      expect(validators.required(undefined)).toBeTruthy();
      expect(validators.required('   ')).toBeTruthy();
    });

    it('should return null for non-empty values', () => {
      expect(validators.required('test')).toBeNull();
      expect(validators.required('a')).toBeNull();
    });
  });

  describe('pattern validator', () => {
    it('should validate email format', () => {
      const emailValidator = validators.pattern('email');

      expect(emailValidator('test@example.com')).toBeNull();
      expect(emailValidator('invalid-email')).toBeTruthy();
      expect(emailValidator('test@')).toBeTruthy();
    });

    it('should validate person name format', () => {
      const nameValidator = validators.pattern('personName');

      expect(nameValidator('John Doe')).toBeNull();
      expect(nameValidator("O'Connor")).toBeNull();
      expect(nameValidator('Mary-Jane')).toBeNull();
      expect(nameValidator('John123')).toBeTruthy();
      expect(nameValidator('John@Doe')).toBeTruthy();
    });

    it('should validate phone number format', () => {
      const phoneValidator = validators.pattern('phone');

      expect(phoneValidator('1234567890')).toBeNull();
      expect(phoneValidator('+1234567890')).toBeNull();
      expect(phoneValidator('abc123')).toBeTruthy();
    });
  });

  describe('minLength validator', () => {
    const minLength5 = validators.minLength(5);

    it('should return error for short strings', () => {
      expect(minLength5('test')).toBeTruthy();
      expect(minLength5('a')).toBeTruthy();
    });

    it('should return null for valid length strings', () => {
      expect(minLength5('testing')).toBeNull();
      expect(minLength5('tests')).toBeNull();
    });
  });

  describe('credit card Luhn validator', () => {
    it('should validate correct credit card numbers', () => {
      // Valid test credit card numbers
      expect(validators.creditCardLuhn('4532015112830366')).toBeNull();
      expect(validators.creditCardLuhn('4532 0151 1283 0366')).toBeNull();
    });

    it('should reject invalid credit card numbers', () => {
      expect(validators.creditCardLuhn('1234567890123456')).toBeTruthy();
      expect(validators.creditCardLuhn('4532015112830367')).toBeTruthy();
    });

    it('should reject numbers with invalid length', () => {
      expect(validators.creditCardLuhn('123')).toBeTruthy();
      expect(validators.creditCardLuhn('12345678901234567890')).toBeTruthy();
    });
  });
});
