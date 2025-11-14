# Field Types Guide

Complete guide to all built-in field types in React Native FN Forms with examples, validation rules, and formatting behavior.

---

## Table of Contents

- [Overview](#overview)
- [Text Fields](#text-fields)
  - [text](#text)
  - [personName](#personname)
  - [businessName](#businessname)
  - [username](#username)
- [Contact Fields](#contact-fields)
  - [email](#email)
  - [phone](#phone)
  - [streetAddress](#streetaddress)
  - [url](#url)
- [Financial Fields](#financial-fields)
  - [creditCard](#creditcard)
  - [currency](#currency)
- [Security Fields](#security-fields)
  - [password](#password)
  - [otp](#otp)
- [Numeric Fields](#numeric-fields)
  - [number](#number)
  - [date](#date)
- [Custom Patterns](#custom-patterns)

---

## Overview

Each field type in React Native FN Forms comes with:

- ✅ **Built-in validation** - No need to write validation logic
- ✅ **Auto-formatting** - Values are automatically formatted
- ✅ **Smart error messages** - Helpful, user-friendly errors
- ✅ **Platform optimization** - iOS/Android specific keyboard types

---

## Text Fields

### text

**Purpose:** Generic text input for any plain text data.

**Validation:**

- No specific pattern validation
- Supports `minLength` and `maxLength`
- Requires manual validation for specific formats

**Auto-formatting:**

- Trims whitespace from start and end

**Use Cases:**

- Comments or notes
- Generic text fields
- Custom-validated fields

#### Basic Usage

```typescript
const form = useSmartForm({
  fields: {
    notes: {
      type: 'text',
      required: false,
      maxLength: 500,
    },
  },
});
```

#### Examples

| Input                | Output               | Valid |
| -------------------- | -------------------- | ----- |
| `"Hello World"`      | `"Hello World"`      | ✅    |
| `"  spaces  "`       | `"spaces"`           | ✅    |
| `"Any text 123 !@#"` | `"Any text 123 !@#"` | ✅    |

---

### personName

**Purpose:** Human names with proper capitalization and validation.

**Validation:**

- Only allows letters, spaces, hyphens, apostrophes, and periods
- Rejects numbers and special characters
- Validates against pattern: `/^[a-zA-Z\s\-'\.]+$/`

**Auto-formatting:**

- Capitalizes first letter of each word
- Removes multiple consecutive spaces
- Trims whitespace

**Use Cases:**

- First name, last name, full name
- Contact names
- User profiles

#### Basic Usage

```typescript
const form = useSmartForm({
  fields: {
    fullName: {
      type: 'personName',
      required: true,
      minLength: 2,
      maxLength: 50,
    },
  },
});
```

#### Advanced Options

```typescript
fullName: {
  type: 'personName',
  required: true,
  minLength: 2,
  maxLength: 100,
  customValidation: (value) => {
    const parts = value.trim().split(' ');
    if (parts.length < 2) {
      return 'Please enter both first and last name';
    }
    return null;
  }
}
```

#### Examples

| Input             | Output            | Valid                                                                        |
| ----------------- | ----------------- | ---------------------------------------------------------------------------- |
| `"john doe"`      | `"John Doe"`      | ✅                                                                           |
| `"mary o'connor"` | `"Mary O'Connor"` | ✅                                                                           |
| `"jean-paul"`     | `"Jean-Paul"`     | ✅                                                                           |
| `"dr. smith"`     | `"Dr. Smith"`     | ✅                                                                           |
| `"john123"`       | -                 | ❌ Error: "Names can only contain letters, spaces, hyphens, and apostrophes" |
| `"user@test"`     | -                 | ❌ Error: "Names can only contain letters, spaces, hyphens, and apostrophes" |

#### Platform Props

```typescript
fullName: {
  type: 'personName',
  inputProps: {
    autoCapitalize: 'words',
    autoComplete: 'name',
    textContentType: 'name', // iOS
  }
}
```

---

### businessName

**Purpose:** Business or company names with more flexible character support.

**Validation:**

- Allows letters, numbers, spaces, and business punctuation
- Permits: `& , . ' - #`
- Validates against pattern: `/^[a-zA-Z0-9\s\-'\.&,]+$/`

**Auto-formatting:**

- Removes excessive spacing
- Trims whitespace

**Use Cases:**

- Company names
- Organization names
- Store names

#### Basic Usage

```typescript
const form = useSmartForm({
  fields: {
    companyName: {
      type: 'businessName',
      required: true,
      minLength: 2,
      maxLength: 100,
    },
  },
});
```

#### Examples

| Input              | Output             | Valid                                                                           |
| ------------------ | ------------------ | ------------------------------------------------------------------------------- |
| `"ABC Corp"`       | `"ABC Corp"`       | ✅                                                                              |
| `"Smith & Sons"`   | `"Smith & Sons"`   | ✅                                                                              |
| `"Joe's Cafe"`     | `"Joe's Cafe"`     | ✅                                                                              |
| `"Tech Inc. #123"` | `"Tech Inc. #123"` | ✅                                                                              |
| `"Company (USA)"`  | -                  | ❌ Error: "Business names can contain letters, numbers, and common punctuation" |

---

### username

**Purpose:** Usernames for login/registration systems.

**Validation:**

- Only alphanumeric characters, underscores, and hyphens
- Validates against pattern: `/^[a-zA-Z0-9_\-]+$/`
- Typically requires `minLength: 3`

**Auto-formatting:**

- Converts to lowercase
- Removes invalid characters
- Trims leading/trailing underscores and hyphens

**Use Cases:**

- Login usernames
- Social media handles
- User identifiers

#### Basic Usage

```typescript
const form = useSmartForm({
  fields: {
    username: {
      type: 'username',
      required: true,
      minLength: 3,
      maxLength: 20,
    },
  },
});
```

#### Advanced with Availability Check

```typescript
username: {
  type: 'username',
  required: true,
  minLength: 3,
  maxLength: 20,
  customValidation: async (value) => {
    const available = await checkUsernameAvailability(value);
    return available ? null : 'Username is already taken';
  },
  debounce: 500 // Wait 500ms before checking
}
```

#### Examples

| Input          | Output         | Valid                                          |
| -------------- | -------------- | ---------------------------------------------- |
| `"JohnDoe123"` | `"johndoe123"` | ✅                                             |
| `"user_name"`  | `"user_name"`  | ✅                                             |
| `"my-handle"`  | `"my-handle"`  | ✅                                             |
| `"user@test"`  | `"usertest"`   | ✅ (@ removed)                                 |
| `"ab"`         | -              | ❌ Error: "Must be at least 3 characters long" |

#### Platform Props

```typescript
username: {
  type: 'username',
  inputProps: {
    autoCapitalize: 'none',
    autoComplete: 'username',
    autoCorrect: false,
  }
}
```

---

## Contact Fields

### email

**Purpose:** Email addresses with comprehensive validation.

**Validation:**

- Validates email format: `user@domain.ext`
- Validates against pattern: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- Checks for @ symbol and domain

**Auto-formatting:**

- Converts to lowercase
- Trims whitespace
- Removes spaces

**Use Cases:**

- Registration forms
- Login forms
- Contact information

#### Basic Usage

```typescript
const form = useSmartForm({
  fields: {
    email: {
      type: 'email',
      required: true,
      maxLength: 100,
    },
  },
});
```

#### Advanced with Async Validation

```typescript
email: {
  type: 'email',
  required: true,
  customValidation: async (value) => {
    // Check if email exists
    const exists = await checkEmailExists(value);
    if (exists) {
      return 'This email is already registered';
    }

    // Check disposable email
    if (isDisposableEmail(value)) {
      return 'Disposable email addresses are not allowed';
    }

    return null;
  },
  debounce: 600
}
```

#### Examples

| Input                      | Output                     | Valid                                          |
| -------------------------- | -------------------------- | ---------------------------------------------- |
| `"User@Example.com"`       | `"user@example.com"`       | ✅                                             |
| `"test.user@domain.co.uk"` | `"test.user@domain.co.uk"` | ✅                                             |
| `"user+tag@example.com"`   | `"user+tag@example.com"`   | ✅                                             |
| `"invalid@"`               | -                          | ❌ Error: "Please enter a valid email address" |
| `"@domain.com"`            | -                          | ❌ Error: "Please enter a valid email address" |
| `"no-at-symbol.com"`       | -                          | ❌ Error: "Please enter a valid email address" |

#### Platform Props

```typescript
email: {
  type: 'email',
  inputProps: {
    keyboardType: 'email-address',
    autoCapitalize: 'none',
    autoComplete: 'email',
    autoCorrect: false,
    textContentType: 'emailAddress', // iOS
  }
}
```

#### Suggestions

When validation fails, users see:

> "Make sure to include @ and a domain (e.g., user@example.com)"

---

### phone

**Purpose:** Phone numbers with automatic formatting.

**Validation:**

- Validates international format
- Validates against pattern: `/^[\+]?[1-9][\d]{0,15}$/`
- Accepts optional country code

**Auto-formatting:**

- US format: `(123) 456-7890`
- International: `+1 (123) 456-7890`
- Removes all non-numeric characters for validation

**Use Cases:**

- Contact phone numbers
- SMS verification
- Customer support

#### Basic Usage

```typescript
const form = useSmartForm({
  fields: {
    phone: {
      type: 'phone',
      required: true,
    },
  },
});
```

#### Advanced with Country Code

```typescript
phone: {
  type: 'phone',
  required: true,
  customValidation: (value) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length !== 10 && digits.length !== 11) {
      return 'Phone number must be 10 digits (or 11 with country code)';
    }
    return null;
  }
}
```

#### Examples

| Input               | Output                | Valid                                         |
| ------------------- | --------------------- | --------------------------------------------- |
| `"5551234567"`      | `"(555) 123-4567"`    | ✅                                            |
| `"15551234567"`     | `"+1 (555) 123-4567"` | ✅                                            |
| `"+1-555-123-4567"` | `"+1 (555) 123-4567"` | ✅                                            |
| `"555.123.4567"`    | `"(555) 123-4567"`    | ✅                                            |
| `"123"`             | -                     | ❌ Error: "Please enter a valid phone number" |

#### Platform Props

```typescript
phone: {
  type: 'phone',
  inputProps: {
    keyboardType: 'phone-pad',
    autoComplete: 'tel',
    textContentType: 'telephoneNumber', // iOS
    dataDetectorTypes: 'phoneNumber', // iOS
  }
}
```

---

### streetAddress

**Purpose:** Street addresses with title case formatting.

**Validation:**

- Allows letters, numbers, spaces, and address symbols
- Permits: `# . , - '`
- Validates against pattern: `/^[a-zA-Z0-9\s\-'\.#,]+$/`

**Auto-formatting:**

- Title case (capitalizes first letter of each word)
- Cleans up spacing

**Use Cases:**

- Shipping addresses
- Billing addresses
- Location information

#### Basic Usage

```typescript
const form = useSmartForm({
  fields: {
    street: {
      type: 'streetAddress',
      required: true,
      minLength: 5,
      maxLength: 200,
    },
  },
});
```

#### Examples

| Input                    | Output                   | Valid                                           |
| ------------------------ | ------------------------ | ----------------------------------------------- |
| `"123 main st"`          | `"123 Main St"`          | ✅                                              |
| `"456 oak ave, apt #2b"` | `"456 Oak Ave, Apt #2b"` | ✅                                              |
| `"789 elm street"`       | `"789 Elm Street"`       | ✅                                              |
| `"invalid@address"`      | -                        | ❌ Error: "Please enter a valid street address" |

#### Platform Props

```typescript
street: {
  type: 'streetAddress',
  inputProps: {
    autoCapitalize: 'words',
    autoComplete: 'street-address',
    textContentType: 'fullStreetAddress', // iOS
  }
}
```

---

### url

**Purpose:** Web URLs with automatic protocol addition.

**Validation:**

- Validates URL format
- Requires protocol (http:// or https://)
- Validates domain structure

**Auto-formatting:**

- Adds `https://` if missing
- Converts to lowercase
- Trims whitespace

**Use Cases:**

- Website links
- Social media profiles
- Portfolio links

#### Basic Usage

```typescript
const form = useSmartForm({
  fields: {
    website: {
      type: 'url',
      required: false,
    },
  },
});
```

#### Examples

| Input               | Output                   | Valid                                |
| ------------------- | ------------------------ | ------------------------------------ |
| `"example.com"`     | `"https://example.com"`  | ✅                                   |
| `"www.site.com"`    | `"https://www.site.com"` | ✅                                   |
| `"http://test.com"` | `"http://test.com"`      | ✅                                   |
| `"EXAMPLE.COM"`     | `"https://example.com"`  | ✅                                   |
| `"not a url"`       | -                        | ❌ Error: "Please enter a valid URL" |

#### Platform Props

```typescript
website: {
  type: 'url',
  inputProps: {
    keyboardType: 'url',
    autoCapitalize: 'none',
    autoComplete: 'url',
    autoCorrect: false,
    textContentType: 'URL', // iOS
  }
}
```

---

## Financial Fields

### creditCard

**Purpose:** Credit card numbers with Luhn algorithm validation.

**Validation:**

- Validates card number length (13-19 digits)
- Luhn algorithm checksum validation
- Detects card type (Visa, Mastercard, etc.)

**Auto-formatting:**

- Formats with spaces: `1234 5678 9012 3456`
- Removes dashes and other characters
- Preserves only digits and spaces

**Use Cases:**

- Payment forms
- Subscription checkout
- Saved payment methods

#### Basic Usage

```typescript
const form = useSmartForm({
  fields: {
    cardNumber: {
      type: 'creditCard',
      required: true,
    },
  },
});
```

#### Advanced with CVV

```typescript
fields: {
  cardNumber: {
    type: 'creditCard',
    required: true,
  },
  cvv: {
    type: 'text',
    required: true,
    pattern: /^\d{3,4}$/,
    maxLength: 4,
    inputProps: {
      keyboardType: 'number-pad',
      secureTextEntry: true,
    }
  },
  expiry: {
    type: 'text',
    required: true,
    pattern: /^(0[1-9]|1[0-2])\/\d{2}$/,
    placeholder: 'MM/YY'
  }
}
```

#### Examples

| Input                   | Output                  | Valid                                               |
| ----------------------- | ----------------------- | --------------------------------------------------- |
| `"4532123456789012"`    | `"4532 1234 5678 9012"` | ✅ (Visa)                                           |
| `"5425-2334-3010-9903"` | `"5425 2334 3010 9903"` | ✅ (Mastercard)                                     |
| `"378282246310005"`     | `"3782 822463 10005"`   | ✅ (Amex)                                           |
| `"1234567890123456"`    | -                       | ❌ Error: "Please enter a valid credit card number" |

#### Platform Props

```typescript
cardNumber: {
  type: 'creditCard',
  inputProps: {
    keyboardType: 'number-pad',
    autoComplete: 'cc-number',
  }
}
```

---

### currency

**Purpose:** Monetary values with decimal precision.

**Validation:**

- Validates numeric format
- Allows up to 2 decimal places
- Validates against pattern: `/^\d+(\.\d{1,2})?$/`

**Auto-formatting:**

- Removes non-numeric characters (except decimal)
- Limits to 2 decimal places
- Removes extra decimal points

**Use Cases:**

- Price inputs
- Payment amounts
- Salary fields

#### Basic Usage

```typescript
const form = useSmartForm({
  fields: {
    amount: {
      type: 'currency',
      required: true,
      customValidation: value => {
        const num = parseFloat(value);
        if (num <= 0) {
          return 'Amount must be greater than 0';
        }
        if (num > 10000) {
          return 'Amount cannot exceed $10,000';
        }
        return null;
      },
    },
  },
});
```

#### Examples

| Input      | Output    | Valid                                   |
| ---------- | --------- | --------------------------------------- |
| `"10.99"`  | `"10.99"` | ✅                                      |
| `"100"`    | `"100"`   | ✅                                      |
| `"$19.95"` | `"19.95"` | ✅ ($ removed)                          |
| `"5.999"`  | `"5.99"`  | ✅ (rounded)                            |
| `"10.5.3"` | `"10.53"` | ✅ (extra . removed)                    |
| `"abc"`    | -         | ❌ Error: "Please enter a valid amount" |

#### Display Formatting

```typescript
// For display with currency symbol
const displayAmount = (value: string) => {
  return `$${parseFloat(value || '0').toFixed(2)}`;
};
```

#### Platform Props

```typescript
amount: {
  type: 'currency',
  inputProps: {
    keyboardType: 'decimal-pad',
  }
}
```

---

## Security Fields

### password

**Purpose:** Password fields with strength validation.

**Validation:**

- No automatic pattern validation
- Use `customValidation` for strength requirements
- Supports `minLength` and `maxLength`

**Auto-formatting:**

- No auto-formatting (preserves input exactly)

**Use Cases:**

- Registration forms
- Login forms
- Password change forms

#### Basic Usage

```typescript
const form = useSmartForm({
  fields: {
    password: {
      type: 'password',
      required: true,
      minLength: 8,
    },
  },
});
```

#### Advanced with Strength Requirements

```typescript
password: {
  type: 'password',
  required: true,
  minLength: 8,
  maxLength: 128,
  customValidation: (value) => {
    const requirements = {
      minLength: 8,
      uppercase: 1,
      lowercase: 1,
      numbers: 1,
      specialChars: 1
    };

    const issues = [];

    if (value.length < requirements.minLength) {
      issues.push(`at least ${requirements.minLength} characters`);
    }
    if (!/[A-Z]/.test(value)) {
      issues.push('one uppercase letter');
    }
    if (!/[a-z]/.test(value)) {
      issues.push('one lowercase letter');
    }
    if (!/[0-9]/.test(value)) {
      issues.push('one number');
    }
    if (!/[^a-zA-Z0-9]/.test(value)) {
      issues.push('one special character');
    }

    return issues.length > 0
      ? `Password must contain ${issues.join(', ')}`
      : null;
  }
}
```

#### Password Confirmation

```typescript
fields: {
  password: {
    type: 'password',
    required: true,
    minLength: 8
  },
  confirmPassword: {
    type: 'password',
    required: true,
    customValidation: (value, values) => {
      return value !== values.password
        ? 'Passwords must match'
        : null;
    }
  }
}
```

#### Platform Props

```typescript
password: {
  type: 'password',
  inputProps: {
    secureTextEntry: true,
    autoCapitalize: 'none',
    autoComplete: 'password',
    autoCorrect: false,
    textContentType: 'password', // iOS
  }
}
```

---

### otp

**Purpose:** One-time password codes for verification.

**Validation:**

- Only numeric digits allowed
- Validates length (4, 6, or 8 digits)
- Validates against pattern: `/^[0-9]+$/`

**Auto-formatting:**

- No formatting (preserves digits)

**Use Cases:**

- SMS verification
- Email verification
- Two-factor authentication

#### Basic Usage

```typescript
const form = useSmartForm({
  fields: {
    otp: {
      type: 'otp',
      required: true,
      length: 6,
    },
  },
});
```

#### With SmartOTPField Component

```typescript
<SmartOTPField
  name="otp"
  length={6}
  autoFocus={true}
  autoSubmit={true}
  onComplete={(code) => {
    console.log('OTP entered:', code);
    verifyCode(code);
  }}
/>
```

#### Examples

| Input        | Valid                                    |
| ------------ | ---------------------------------------- |
| `"123456"`   | ✅ (6 digits)                            |
| `"1234"`     | ✅ (4 digits if length=4)                |
| `"12345678"` | ✅ (8 digits if length=8)                |
| `"abc123"`   | ❌ Error: "OTP can only contain numbers" |
| `"12 34 56"` | ❌ Error: "OTP can only contain numbers" |

**See also:** [OTP Guide](otp.md) for complete implementation details.

---

## Numeric Fields

### number

**Purpose:** Pure numeric values.

**Validation:**

- Only allows digits, decimal point, and minus sign
- No automatic range validation (use `customValidation`)

**Auto-formatting:**

- Removes all non-numeric characters (except . and -)

**Use Cases:**

- Age
- Quantity
- Ratings

#### Basic Usage

```typescript
const form = useSmartForm({
  fields: {
    age: {
      type: 'number',
      required: true,
      customValidation: value => {
        const num = parseInt(value);
        if (num < 18) {
          return 'Must be 18 or older';
        }
        if (num > 120) {
          return 'Please enter a valid age';
        }
        return null;
      },
    },
  },
});
```

#### Examples

| Input     | Output   | Valid                |
| --------- | -------- | -------------------- |
| `"25"`    | `"25"`   | ✅                   |
| `"3.14"`  | `"3.14"` | ✅                   |
| `"-10"`   | `"-10"`  | ✅                   |
| `"12abc"` | `"12"`   | ✅ (letters removed) |

#### Platform Props

```typescript
age: {
  type: 'number',
  inputProps: {
    keyboardType: 'number-pad', // or 'numeric' for decimals
  }
}
```

---

### date

**Purpose:** Date values (currently basic support).

**Validation:**

- Basic date validation
- Use `customValidation` for complex date logic

**Auto-formatting:**

- Minimal formatting

**Use Cases:**

- Birth dates
- Event dates
- Expiration dates

#### Basic Usage

```typescript
const form = useSmartForm({
  fields: {
    birthDate: {
      type: 'date',
      required: true,
      customValidation: value => {
        const date = new Date(value);
        const age = new Date().getFullYear() - date.getFullYear();
        if (age < 18) {
          return 'Must be 18 or older';
        }
        return null;
      },
    },
  },
});
```

**Note:** For better date handling, consider using a date picker library with React Native FN Forms.

---

## Custom Patterns

### Creating Custom Field Types

You can create fields with custom patterns using the `pattern` property:

```typescript
const form = useSmartForm({
  fields: {
    customCode: {
      type: 'text',
      required: true,
      pattern: /^[A-Z]{3}-\d{4}$/,
      transform: value => value.toUpperCase(),
      customValidation: value => {
        if (!value.match(/^[A-Z]{3}-\d{4}$/)) {
          return 'Format must be ABC-1234';
        }
        return null;
      },
    },
  },
});
```

### Using Transform Functions

```typescript
// Auto-format as user types
zipCode: {
  type: 'text',
  pattern: /^\d{5}(-\d{4})?$/,
  transform: (value) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length > 5) {
      return `${digits.slice(0, 5)}-${digits.slice(5, 9)}`;
    }
    return digits;
  }
}
```

---

## Comparison Table

| Field Type      | Auto-Format       | Validation            | Use Case           |
| --------------- | ----------------- | --------------------- | ------------------ |
| `text`          | Trim              | None                  | Generic text       |
| `personName`    | Title case        | Letters only          | Names              |
| `businessName`  | Clean spaces      | Letters + punctuation | Company names      |
| `username`      | Lowercase         | Alphanumeric + \_-    | Login IDs          |
| `email`         | Lowercase         | Email format          | Email addresses    |
| `phone`         | (123) 456-7890    | Phone format          | Phone numbers      |
| `streetAddress` | Title case        | Address chars         | Addresses          |
| `url`           | Add https://      | URL format            | Websites           |
| `creditCard`    | 1234 5678         | Luhn algorithm        | Credit cards       |
| `currency`      | Decimal           | Numeric + 2 decimals  | Money amounts      |
| `password`      | None              | Custom strength       | Passwords          |
| `otp`           | None              | Digits only           | Verification codes |
| `number`        | Remove non-digits | Numeric               | Numbers            |
| `date`          | Minimal           | Date format           | Dates              |

---

## Best Practices

### 1. Choose the Right Field Type

```typescript
// ✅ Good - Specific type
email: { type: 'email', required: true }

// ❌ Bad - Generic with custom validation
email: {
  type: 'text',
  customValidation: (v) => /email regex/.test(v) ? null : 'Invalid'
}
```

### 2. Combine with Custom Validation

```typescript
// Use built-in type + custom rules
email: {
  type: 'email', // Built-in format validation
  required: true,
  customValidation: async (value) => {
    // Additional business logic
    const exists = await checkEmailExists(value);
    return exists ? 'Email already registered' : null;
  }
}
```

### 3. Leverage Platform Props

```typescript
// Optimize for mobile
phone: {
  type: 'phone',
  inputProps: {
    keyboardType: 'phone-pad',
    autoComplete: 'tel',
    textContentType: 'telephoneNumber',
  }
}
```

### 4. Provide Clear Error Messages

```typescript
username: {
  type: 'username',
  minLength: 3,
  customValidation: (value) => {
    if (value.length < 3) {
      return 'Username must be at least 3 characters';
    }
    if (/^[0-9]/.test(value)) {
      return 'Username cannot start with a number';
    }
    return null;
  }
}
```

---

## Next Steps

- 📖 [API Reference](API_REFERENCE.md) - Complete API documentation
- ✅ [Validation Guide](VALIDATION.md) - Advanced validation patterns
- 🎨 [Styling Guide](STYLING_GUIDE.md) - Customization and theming
- 🔐 [OTP Guide](OTP_GUIDE.md) - Complete OTP implementation

---

**Version:** 1.1.1  
**Last Updated:** November 14, 2025
