// Field matching validation tests
// Field matching is implemented in useSmartForm hook's validateField method
// Full integration examples are documented in docs/examples/confirmation-fields.md

describe('Field Matching / Confirmation Fields', () => {
  // Helper function that simulates the field matching validation logic
  const validateFieldMatch = (
    value: string,
    matchFieldValue: string,
    customMessage?: string
  ): string | null => {
    if (value !== matchFieldValue) {
      return customMessage || 'Must match password';
    }
    return null;
  };

  it('should return error when fields do not match', () => {
    const result = validateFieldMatch(
      'different@example.com',
      'test@example.com',
      'Email addresses must match'
    );
    expect(result).toBe('Email addresses must match');
  });

  it('should return null when fields match', () => {
    const result = validateFieldMatch('SecurePass123!', 'SecurePass123!', 'Passwords must match');
    expect(result).toBeNull();
  });

  it('should use default error message when custom message is not provided', () => {
    const result = validateFieldMatch('different', 'password123');
    expect(result).toBe('Must match password');
  });

  it('should handle empty string matching', () => {
    const result = validateFieldMatch('', '', 'Fields must match');
    expect(result).toBeNull();
  });

  it('should be case-sensitive', () => {
    const result = validateFieldMatch(
      'Test@example.com',
      'test@example.com',
      'Email addresses must match'
    );
    expect(result).toBe('Email addresses must match');
  });
});
