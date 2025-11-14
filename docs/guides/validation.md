# Validation Guide

Complete guide to validation patterns, custom validators, async validation, and error handling in React Native FN Forms.

---

## Table of Contents

- [Validation Basics](#validation-basics)
- [Validation Modes](#validation-modes)
- [Built-in Validators](#built-in-validators)
- [Custom Validation](#custom-validation)
- [Async Validation](#async-validation)
- [Field Dependencies](#field-dependencies)
- [Error Messages](#error-messages)
- [Validation Patterns](#validation-patterns)
- [Advanced Techniques](#advanced-techniques)

---

## Validation Basics

React Native FN Forms provides three layers of validation:

1. **Built-in validation** - Automatic validation based on field type
2. **Configuration validation** - `required`, `minLength`, `maxLength`, `pattern`
3. **Custom validation** - Your own validation logic

### Simple Example

```typescript
const form = useSmartForm({
  fields: {
    email: {
      type: 'email', // Built-in email validation
      required: true, // Required field validation
      maxLength: 100, // Length validation
    },
  },
});
```

---

## Validation Modes

Control when validation occurs with the `validation.mode` option.

### onChange (Default)

Validates as the user types (with debouncing).

```typescript
const form = useSmartForm({
  validation: {
    mode: 'onChange',
    debounce: 300, // Wait 300ms after user stops typing
    showErrorsOn: 'touched',
  },
  fields: {
    email: { type: 'email', required: true },
  },
});
```

**Best for:** Most forms, provides immediate feedback

### onBlur

Validates when the field loses focus.

```typescript
const form = useSmartForm({
  validation: {
    mode: 'onBlur',
    showErrorsOn: 'touched',
  },
  fields: {
    email: { type: 'email', required: true },
  },
});
```

**Best for:** Long-form text fields, less intrusive validation

### onSubmit

Validates only when the form is submitted.

```typescript
const form = useSmartForm({
  validation: {
    mode: 'onSubmit',
    showErrorsOn: 'submit',
  },
  fields: {
    email: { type: 'email', required: true },
  },
});
```

**Best for:** Simple forms, when you want minimal interference

### Comparison

| Mode       | When Validates    | User Experience      | Use Case         |
| ---------- | ----------------- | -------------------- | ---------------- |
| `onChange` | As user types     | Immediate feedback   | Most forms       |
| `onBlur`   | Field loses focus | Less intrusive       | Long text fields |
| `onSubmit` | Form submission   | Minimal interference | Simple forms     |

---

## Built-in Validators

### Required Validation

```typescript
email: {
  type: 'email',
  required: true  // Field cannot be empty
}
```

**Error:** "This field is required"

### Length Validation

```typescript
username: {
  type: 'username',
  required: true,
  minLength: 3,    // Minimum 3 characters
  maxLength: 20    // Maximum 20 characters
}
```

**Errors:**

- "Must be at least 3 characters long"
- "Must not exceed 20 characters"

### Pattern Validation

```typescript
customCode: {
  type: 'text',
  required: true,
  pattern: /^[A-Z]{3}-\d{4}$/  // Format: ABC-1234
}
```

**Custom pattern with message:**

```typescript
zipCode: {
  type: 'text',
  required: true,
  pattern: /^\d{5}(-\d{4})?$/,
  customValidation: (value) => {
    if (!value.match(/^\d{5}(-\d{4})?$/)) {
      return 'ZIP code must be in format 12345 or 12345-6789';
    }
    return null;
  }
}
```

### Type-specific Validation

Each field type has automatic validation:

```typescript
email: {
  type: 'email',  // Validates email format
  required: true
}

phone: {
  type: 'phone',  // Validates phone format
  required: true
}

creditCard: {
  type: 'creditCard',  // Validates with Luhn algorithm
  required: true
}
```

See [Field Types Guide](FIELD_TYPES.md) for all type-specific validations.

---

## Custom Validation

### Basic Custom Validation

```typescript
age: {
  type: 'number',
  required: true,
  customValidation: (value) => {
    const num = parseInt(value);

    if (isNaN(num)) {
      return 'Please enter a valid number';
    }

    if (num < 18) {
      return 'Must be 18 or older';
    }

    if (num > 120) {
      return 'Please enter a valid age';
    }

    return null;  // No error
  }
}
```

### Multiple Validation Rules

```typescript
password: {
  type: 'password',
  required: true,
  minLength: 8,
  customValidation: (value) => {
    const errors = [];

    if (!/[A-Z]/.test(value)) {
      errors.push('one uppercase letter');
    }

    if (!/[a-z]/.test(value)) {
      errors.push('one lowercase letter');
    }

    if (!/[0-9]/.test(value)) {
      errors.push('one number');
    }

    if (!/[^a-zA-Z0-9]/.test(value)) {
      errors.push('one special character');
    }

    if (errors.length > 0) {
      return `Password must contain ${errors.join(', ')}`;
    }

    return null;
  }
}
```

### Using Helper Functions

```typescript
// Define validation helpers
const validators = {
  isStrongPassword: (value: string) => {
    const strength = {
      hasUpper: /[A-Z]/.test(value),
      hasLower: /[a-z]/.test(value),
      hasNumber: /[0-9]/.test(value),
      hasSpecial: /[^a-zA-Z0-9]/.test(value),
      isLongEnough: value.length >= 8,
    };

    return Object.values(strength).every(Boolean);
  },

  isValidDate: (value: string) => {
    const date = new Date(value);
    return date instanceof Date && !isNaN(date.getTime());
  },
};

// Use in form
const form = useSmartForm({
  fields: {
    password: {
      type: 'password',
      required: true,
      customValidation: value => {
        return validators.isStrongPassword(value) ? null : 'Password is not strong enough';
      },
    },
  },
});
```

---

## Async Validation

Validate against server data with async functions.

### Email Availability Check

```typescript
email: {
  type: 'email',
  required: true,
  customValidation: async (value) => {
    try {
      const response = await fetch(`/api/check-email?email=${value}`);
      const data = await response.json();

      return data.exists
        ? 'This email is already registered'
        : null;
    } catch (error) {
      console.error('Validation error:', error);
      return null; // Allow on error
    }
  },
  debounce: 600  // Wait 600ms before checking
}
```

### Username Availability

```typescript
username: {
  type: 'username',
  required: true,
  minLength: 3,
  customValidation: async (value) => {
    if (value.length < 3) {
      return null; // Skip API call if too short
    }

    const available = await checkUsernameAvailability(value);
    return available ? null : 'Username is already taken';
  },
  debounce: 500
}
```

### Loading States

```typescript
const [isChecking, setIsChecking] = useState(false);

const form = useSmartForm({
  fields: {
    email: {
      type: 'email',
      required: true,
      customValidation: async (value) => {
        setIsChecking(true);

        try {
          const exists = await checkEmail(value);
          return exists ? 'Email already registered' : null;
        } finally {
          setIsChecking(false);
        }
      }
    }
  }
});

// In your component
<SmartFormField name="email" />
{isChecking && <Text>Checking availability...</Text>}
```

### Debouncing Async Validation

```typescript
email: {
  type: 'email',
  required: true,
  debounce: 800,  // Wait 800ms to reduce API calls
  customValidation: async (value) => {
    const exists = await checkEmailExists(value);
    return exists ? 'Email already registered' : null;
  }
}
```

---

## Field Dependencies

Validate fields based on other field values.

### Password Confirmation

```typescript
const form = useSmartForm({
  fields: {
    password: {
      type: 'password',
      required: true,
      minLength: 8,
    },
    confirmPassword: {
      type: 'password',
      required: true,
      customValidation: value => {
        // Access other field values through form.values
        if (value !== form.values.password) {
          return 'Passwords must match';
        }
        return null;
      },
    },
  },
});
```

### Conditional Required Fields

```typescript
const form = useSmartForm({
  fields: {
    shippingMethod: {
      type: 'text',
      required: true,
    },
    trackingNumber: {
      type: 'text',
      required: false,
      customValidation: value => {
        // Required only if express shipping
        if (form.values.shippingMethod === 'express' && !value) {
          return 'Tracking number required for express shipping';
        }
        return null;
      },
    },
  },
});
```

### Date Range Validation

```typescript
fields: {
  startDate: {
    type: 'date',
    required: true,
    customValidation: (value) => {
      const start = new Date(value);
      const end = new Date(form.values.endDate);

      if (form.values.endDate && start > end) {
        return 'Start date must be before end date';
      }
      return null;
    }
  },
  endDate: {
    type: 'date',
    required: true,
    customValidation: (value) => {
      const start = new Date(form.values.startDate);
      const end = new Date(value);

      if (form.values.startDate && end < start) {
        return 'End date must be after start date';
      }
      return null;
    }
  }
}
```

### Age Based on Birth Date

```typescript
birthDate: {
  type: 'date',
  required: true,
  customValidation: (value) => {
    const birth = new Date(value);
    const today = new Date();
    const age = today.getFullYear() - birth.getFullYear();

    if (age < 18) {
      return 'Must be 18 or older to register';
    }

    if (age > 120) {
      return 'Please enter a valid birth date';
    }

    return null;
  }
}
```

---

## Error Messages

### Custom Error Messages

```typescript
email: {
  type: 'email',
  required: true,
  customValidation: (value) => {
    if (!value.includes('@')) {
      return 'Email must contain @ symbol';
    }

    if (value.endsWith('@gmail.com')) {
      return 'Please use your work email, not Gmail';
    }

    return null;
  }
}
```

### Dynamic Error Messages

```typescript
username: {
  type: 'username',
  required: true,
  minLength: 3,
  maxLength: 20,
  customValidation: (value) => {
    if (value.length < 3) {
      return `Username too short (${value.length}/3 characters)`;
    }

    if (value.length > 20) {
      return `Username too long (${value.length}/20 characters)`;
    }

    if (/^[0-9]/.test(value)) {
      return 'Username cannot start with a number';
    }

    return null;
  }
}
```

### Internationalization (i18n)

```typescript
import { useTranslation } from 'react-i18next';

const MyForm = () => {
  const { t } = useTranslation();

  const form = useSmartForm({
    fields: {
      email: {
        type: 'email',
        required: true,
        customValidation: value => {
          if (!value.includes('@')) {
            return t('validation.email.invalid');
          }
          return null;
        },
      },
    },
  });
};
```

### Error Message Templates

```typescript
const errorMessages = {
  required: (field: string) => `${field} is required`,
  minLength: (field: string, min: number) => `${field} must be at least ${min} characters`,
  maxLength: (field: string, max: number) => `${field} must not exceed ${max} characters`,
  invalidFormat: (field: string, format: string) => `${field} must be in format: ${format}`,
};

const form = useSmartForm({
  fields: {
    zipCode: {
      type: 'text',
      required: true,
      customValidation: value => {
        if (!value.match(/^\d{5}$/)) {
          return errorMessages.invalidFormat('ZIP code', '12345');
        }
        return null;
      },
    },
  },
});
```

---

## Validation Patterns

### Email Domain Whitelist

```typescript
email: {
  type: 'email',
  required: true,
  customValidation: (value) => {
    const allowedDomains = ['company.com', 'company.co.uk'];
    const domain = value.split('@')[1];

    if (!allowedDomains.includes(domain)) {
      return `Email must be from: ${allowedDomains.join(', ')}`;
    }

    return null;
  }
}
```

### Phone Number Country Code

```typescript
phone: {
  type: 'phone',
  required: true,
  customValidation: (value) => {
    const digits = value.replace(/\D/g, '');

    // US/Canada requires 10 or 11 digits
    if (digits.length !== 10 && digits.length !== 11) {
      return 'Phone must be 10 digits (or 11 with country code)';
    }

    // Must start with 1 for US/Canada if 11 digits
    if (digits.length === 11 && !digits.startsWith('1')) {
      return 'Country code must be 1 for US/Canada';
    }

    return null;
  }
}
```

### Credit Card Expiry

```typescript
cardExpiry: {
  type: 'text',
  required: true,
  pattern: /^(0[1-9]|1[0-2])\/\d{2}$/,
  customValidation: (value) => {
    const [month, year] = value.split('/');
    const expiry = new Date(2000 + parseInt(year), parseInt(month) - 1);
    const now = new Date();

    if (expiry < now) {
      return 'Card has expired';
    }

    return null;
  }
}
```

### SSN Format

```typescript
ssn: {
  type: 'text',
  required: true,
  pattern: /^\d{3}-\d{2}-\d{4}$/,
  transform: (value) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length >= 3) {
      return `${digits.slice(0, 3)}-${digits.slice(3, 5)}-${digits.slice(5, 9)}`;
    }
    return digits;
  },
  customValidation: (value) => {
    const digits = value.replace(/\D/g, '');

    if (digits.length !== 9) {
      return 'SSN must be 9 digits';
    }

    // Invalid SSN patterns
    if (digits === '000000000' || digits === '123456789') {
      return 'Please enter a valid SSN';
    }

    return null;
  }
}
```

### File Size Validation

```typescript
profilePicture: {
  type: 'text', // Would be file type in practice
  required: false,
  customValidation: async (uri) => {
    if (!uri) return null;

    const file = await fetch(uri);
    const blob = await file.blob();
    const sizeInMB = blob.size / (1024 * 1024);

    if (sizeInMB > 5) {
      return 'Image must be less than 5MB';
    }

    return null;
  }
}
```

---

## Advanced Techniques

### Validation on Specific Conditions

```typescript
couponCode: {
  type: 'text',
  required: false,
  customValidation: async (value) => {
    // Only validate if user entered something
    if (!value || value.trim() === '') {
      return null;
    }

    const isValid = await validateCoupon(value);
    return isValid ? null : 'Invalid coupon code';
  }
}
```

### Cross-field Validation

```typescript
const form = useSmartForm({
  fields: {
    country: { type: 'text', required: true },
    state: {
      type: 'text',
      required: false,
      customValidation: value => {
        // State required only for US
        if (form.values.country === 'USA' && !value) {
          return 'State is required for US addresses';
        }
        return null;
      },
    },
    zipCode: {
      type: 'text',
      required: true,
      customValidation: value => {
        const country = form.values.country;

        // Different zip formats for different countries
        if (country === 'USA' && !value.match(/^\d{5}(-\d{4})?$/)) {
          return 'US ZIP code format: 12345 or 12345-6789';
        }

        if (country === 'Canada' && !value.match(/^[A-Z]\d[A-Z] \d[A-Z]\d$/)) {
          return 'Canadian postal code format: A1A 1A1';
        }

        return null;
      },
    },
  },
});
```

### Debounced Validation with Loading State

```typescript
const [validationState, setValidationState] = useState<{
  [key: string]: 'idle' | 'validating' | 'valid' | 'invalid';
}>({});

const form = useSmartForm({
  fields: {
    username: {
      type: 'username',
      required: true,
      minLength: 3,
      debounce: 600,
      customValidation: async (value) => {
        setValidationState(prev => ({ ...prev, username: 'validating' }));

        try {
          const available = await checkUsernameAvailability(value);
          setValidationState(prev => ({
            ...prev,
            username: available ? 'valid' : 'invalid'
          }));

          return available ? null : 'Username is taken';
        } catch (error) {
          setValidationState(prev => ({ ...prev, username: 'idle' }));
          return null;
        }
      }
    }
  }
});

// Show loading indicator
{validationState.username === 'validating' && <Text>Checking...</Text>}
{validationState.username === 'valid' && <Text>✓ Available</Text>}
```

### Form-level Validation

```typescript
const form = useSmartForm({
  fields: {
    // ... field definitions
  },
});

const handleSubmit = async () => {
  // Validate entire form
  const errors = await form.validateForm();

  if (Object.keys(errors).length > 0) {
    Alert.alert('Validation Error', 'Please fix all errors before submitting');
    return;
  }

  // Custom form-level validation
  if (form.values.password !== form.values.confirmPassword) {
    form.setFieldError('confirmPassword', 'Passwords must match');
    return;
  }

  // All valid, proceed
  submitToServer(form.values);
};
```

### Validation Schemas

```typescript
const validationSchemas = {
  registration: {
    email: {
      type: 'email' as const,
      required: true,
      maxLength: 100,
    },
    password: {
      type: 'password' as const,
      required: true,
      minLength: 8,
      customValidation: (value: string) => {
        if (!/[A-Z]/.test(value)) return 'Need uppercase';
        if (!/[a-z]/.test(value)) return 'Need lowercase';
        if (!/[0-9]/.test(value)) return 'Need number';
        return null;
      },
    },
  },

  profile: {
    name: {
      type: 'personName' as const,
      required: true,
      minLength: 2,
    },
    bio: {
      type: 'text' as const,
      required: false,
      maxLength: 500,
    },
  },
};

// Use schema
const form = useSmartForm({
  fields: validationSchemas.registration,
});
```

---

## Best Practices

### 1. Validate Early and Often

```typescript
// ✅ Good - Immediate feedback
validation: {
  mode: 'onChange',
  debounce: 300,
  showErrorsOn: 'touched'
}
```

### 2. Provide Helpful Error Messages

```typescript
// ❌ Bad
customValidation: value => (!isValid(value) ? 'Invalid' : null);

// ✅ Good
customValidation: value => {
  if (!isValid(value)) {
    return 'Email must be in format: user@example.com';
  }
  return null;
};
```

### 3. Debounce Async Validation

```typescript
// ✅ Good - Reduces API calls
email: {
  type: 'email',
  debounce: 600,
  customValidation: async (value) => {
    const exists = await checkEmail(value);
    return exists ? 'Email taken' : null;
  }
}
```

### 4. Handle Validation Errors Gracefully

```typescript
customValidation: async value => {
  try {
    const result = await validateWithAPI(value);
    return result.valid ? null : result.message;
  } catch (error) {
    console.error('Validation failed:', error);
    return null; // Allow submission on API error
  }
};
```

### 5. Use Type-specific Validation

```typescript
// ✅ Good - Leverage built-in validation
email: { type: 'email', required: true }

// ❌ Bad - Reinventing the wheel
email: {
  type: 'text',
  customValidation: (v) => /email regex/.test(v) ? null : 'Invalid'
}
```

---

## Next Steps

- 📖 [API Reference](../api/useSmartForm.md) - Complete API documentation
- 🎯 [Field Types Guide](field-types.md) - All field types with examples
- 🔐 [OTP Guide](otp.md) - OTP implementation
- 🎨 [Styling Guide](styling.md) - Customization

---

**Version:** 1.1.1  
**Last Updated:** November 14, 2025
