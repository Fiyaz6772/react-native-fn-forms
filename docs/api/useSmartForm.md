# useSmartForm Hook

The main hook for creating and managing forms in React Native FN Forms.

---

## Import

```typescript
import { useSmartForm } from 'react-native-fn-forms';
```

## Signature

```typescript
const form = useSmartForm(config: FormConfig): SmartFormHook
```

---

## Parameters

### `config: FormConfig`

Configuration object for the form.

#### `config.fields` (required)

Object defining all form fields.

```typescript
fields: Record<string, FieldConfig>;
```

**Example:**

```typescript
fields: {
  email: {
    type: 'email',
    required: true,
    minLength: 5,
    maxLength: 100
  },
  name: {
    type: 'personName',
    required: true
  }
}
```

#### `config.validation` (optional)

Validation behavior configuration.

```typescript
validation?: {
  mode?: 'onChange' | 'onBlur' | 'onSubmit';
  debounce?: number;
  showErrorsOn?: 'immediate' | 'touched' | 'submit';
}
```

**Properties:**

- **`mode`** - When to trigger validation
  - `'onChange'` (default) - Validate as user types
  - `'onBlur'` - Validate when field loses focus
  - `'onSubmit'` - Validate only on form submission
- **`debounce`** - Milliseconds to wait before validating (default: `300`)
  - Prevents validation on every keystroke
  - Set to `0` to disable debouncing
- **`showErrorsOn`** - When to display error messages
  - `'immediate'` - Show errors immediately
  - `'touched'` (default) - Show errors after user interacts with field
  - `'submit'` - Show errors only after form submission

**Example:**

```typescript
validation: {
  mode: 'onChange',
  debounce: 500,
  showErrorsOn: 'touched'
}
```

#### `config.accessibility` (optional)

Accessibility features configuration.

```typescript
accessibility?: {
  announceErrors?: boolean;
  errorSummary?: boolean;
  fieldLabeling?: 'basic' | 'enhanced';
}
```

**Properties:**

- **`announceErrors`** (default: `true`) - Screen reader announces errors
- **`errorSummary`** (default: `false`) - Shows error summary at top of form
- **`fieldLabeling`** - ARIA label detail level
  - `'basic'` - Simple labels
  - `'enhanced'` (default) - Detailed, context-aware labels

**Example:**

```typescript
accessibility: {
  announceErrors: true,
  errorSummary: false,
  fieldLabeling: 'enhanced'
}
```

#### `config.keyboardHandling` (optional)

Enable automatic keyboard dismissal on form submission.

```typescript
keyboardHandling?: boolean // default: true
```

#### `config.hapticFeedback` (optional)

Enable haptic feedback on validation errors (iOS/Android).

```typescript
hapticFeedback?: boolean // default: false
```

#### `config.platform` (optional)

Platform-specific configuration overrides.

```typescript
platform?: {
  ios?: Record<string, any>;
  android?: Record<string, any>;
}
```

---

## Field Configuration

Each field in `config.fields` accepts the following properties:

### `FieldConfig` Properties

#### `type` (required)

Field type that determines validation and formatting.

```typescript
type: FieldType;
```

**Available types:**

- `'text'` - Plain text
- `'email'` - Email address
- `'phone'` - Phone number
- `'personName'` - Human names
- `'businessName'` - Business/company names
- `'streetAddress'` - Street addresses
- `'creditCard'` - Credit card numbers
- `'currency'` - Monetary values
- `'password'` - Passwords
- `'username'` - Usernames
- `'url'` - Web URLs
- `'date'` - Dates
- `'number'` - Numeric values
- `'otp'` - One-time passwords

See [Field Types Guide](../guides/field-types.md) for detailed information on each type.

#### `required` (optional)

Whether the field is required.

```typescript
required?: boolean // default: false
```

#### `minLength` (optional)

Minimum length for the field value.

```typescript
minLength?: number
```

**Example:**

```typescript
password: {
  type: 'password',
  required: true,
  minLength: 8
}
```

#### `maxLength` (optional)

Maximum length for the field value.

```typescript
maxLength?: number
```

#### `pattern` (optional)

Custom RegExp pattern for validation.

```typescript
pattern?: RegExp
```

**Example:**

```typescript
customCode: {
  type: 'text',
  pattern: /^[A-Z]{3}-\d{4}$/
}
```

#### `customValidation` (optional)

Custom validation function.

```typescript
customValidation?: (value: any) => string | null | Promise<string | null>
```

**Returns:**

- `null` if validation passes
- Error message string if validation fails

**Example:**

```typescript
email: {
  type: 'email',
  required: true,
  customValidation: async (value) => {
    const exists = await checkEmailExists(value);
    return exists ? 'Email already registered' : null;
  }
}
```

See [Validation Guide](../guides/validation.md) for advanced validation patterns.

#### `transform` (optional)

Transform function applied to value before storage.

```typescript
transform?: (value: string) => string
```

**Example:**

```typescript
username: {
  type: 'username',
  transform: (value) => value.toLowerCase().trim()
}
```

#### `format` (optional)

Format function for display purposes.

```typescript
format?: (value: string) => string
```

**Example:**

```typescript
phone: {
  type: 'phone',
  format: (value) => formatPhoneNumber(value) // "(123) 456-7890"
}
```

#### `debounce` (optional)

Field-specific debounce override (milliseconds).

```typescript
debounce?: number
```

#### `validateOn` (optional)

Field-specific validation trigger override.

```typescript
validateOn?: 'change' | 'blur' | 'submit'
```

#### `inputProps` (optional)

Additional props passed to the underlying TextInput.

```typescript
inputProps?: Record<string, any>
```

**Example:**

```typescript
email: {
  type: 'email',
  inputProps: {
    keyboardType: 'email-address',
    autoCapitalize: 'none',
    autoComplete: 'email',
    textContentType: 'emailAddress'
  }
}
```

#### `suggestions` (optional)

Enable smart error suggestions.

```typescript
suggestions?: boolean // default: false
```

#### `accessibility` (optional)

Field-specific accessibility configuration.

```typescript
accessibility?: {
  label?: string;
  hint?: string;
  role?: string;
}
```

**Example:**

```typescript
email: {
  type: 'email',
  required: true,
  accessibility: {
    label: 'Email address input field',
    hint: 'Enter your email to receive updates',
    role: 'text'
  }
}
```

#### OTP-Specific Properties

For `type: 'otp'` fields:

```typescript
length?: 4 | 6 | 8; // default: 6
autoSubmit?: boolean; // default: false
```

---

## Return Value

`useSmartForm` returns a `SmartFormHook` object with the following properties and methods:

### Properties

#### `values: FormValues`

Current form values.

```typescript
const { values } = useSmartForm(config);
console.log(values.email); // "user@example.com"
```

#### `errors: FormErrors`

Current form errors.

```typescript
const { errors } = useSmartForm(config);
console.log(errors.email); // "Please enter a valid email"
```

#### `touched: FormTouched`

Fields that have been interacted with.

```typescript
const { touched } = useSmartForm(config);
console.log(touched.email); // true
```

#### `isSubmitting: boolean`

Form submission state.

```typescript
const { isSubmitting } = useSmartForm(config);
// true during submitForm() execution
```

#### `isValid: boolean`

Overall form validity.

```typescript
const { isValid } = useSmartForm(config);
if (isValid) {
  // Form has no errors and at least one field is touched
}
```

---

### Methods

#### `setFieldValue(field: string, value: any): void`

Set a field's value.

```typescript
form.setFieldValue('email', 'user@example.com');
```

#### `setFieldError(field: string, error: string): void`

Set a field's error message.

```typescript
form.setFieldError('email', 'Email already exists');
```

#### `setFieldTouched(field: string, touched: boolean): void`

Mark a field as touched/untouched.

```typescript
form.setFieldTouched('email', true);
```

#### `validateField(field: string): Promise<string | null>`

Validate a single field.

```typescript
const error = await form.validateField('email');
if (error) {
  console.log('Validation error:', error);
}
```

**Returns:**

- `null` if valid
- Error message string if invalid

#### `validateForm(): Promise<FormErrors>`

Validate entire form.

```typescript
const errors = await form.validateForm();
if (Object.keys(errors).length === 0) {
  // Form is valid
}
```

**Returns:** Object with field names as keys and error messages as values.

#### `resetForm(): void`

Reset form to initial state.

```typescript
form.resetForm();
// All values cleared, errors removed, touched reset
```

#### `submitForm(): Promise<void>`

Submit the form with validation.

```typescript
const handleSubmit = async () => {
  await form.submitForm();

  if (form.isValid) {
    // Proceed with submission
    console.log('Form data:', form.values);
  }
};
```

**Behavior:**

1. Validates all fields
2. Sets `isSubmitting` to `true`
3. If validation passes, marks all fields as touched
4. Sets `isSubmitting` to `false`

#### `getFieldProps(field: string): FieldProps`

Get props for a form field.

```typescript
const fieldProps = form.getFieldProps('email');

// Returns:
{
  value: any,
  onChangeText: (value: string) => void,
  onBlur: () => void,
  error: string | undefined,
  touched: boolean
}
```

**Usage with custom inputs:**

```typescript
<TextInput {...form.getFieldProps('email')} />
```

---

## Type Definitions

### FormConfig

```typescript
interface FormConfig {
  fields: Record<string, FieldConfig>;
  validation?: {
    mode?: 'onChange' | 'onBlur' | 'onSubmit';
    debounce?: number;
    showErrorsOn?: 'immediate' | 'touched' | 'submit';
  };
  accessibility?: {
    announceErrors?: boolean;
    errorSummary?: boolean;
    fieldLabeling?: 'basic' | 'enhanced';
  };
  keyboardHandling?: boolean;
  hapticFeedback?: boolean;
}
```

### FieldConfig

```typescript
interface FieldConfig {
  type: FieldType;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  customValidation?: (value: any) => string | null | Promise<string | null>;
  transform?: (value: string) => string;
  format?: (value: string) => string;
  debounce?: number;
  validateOn?: 'change' | 'blur' | 'submit';
  inputProps?: Record<string, any>;
  suggestions?: boolean;
  accessibility?: {
    label?: string;
    hint?: string;
    role?: string;
  };
  length?: 4 | 6 | 8; // OTP only
  autoSubmit?: boolean; // OTP only
}
```

### FieldType

```typescript
type FieldType =
  | 'text'
  | 'email'
  | 'phone'
  | 'personName'
  | 'businessName'
  | 'streetAddress'
  | 'creditCard'
  | 'currency'
  | 'password'
  | 'username'
  | 'url'
  | 'date'
  | 'number'
  | 'otp';
```

---

## Usage Example

```typescript
import { useSmartForm } from 'react-native-fn-forms';

const MyForm = () => {
  const form = useSmartForm({
    fields: {
      email: {
        type: 'email',
        required: true,
        maxLength: 100,
      },
      password: {
        type: 'password',
        required: true,
        minLength: 8,
      },
    },
    validation: {
      mode: 'onChange',
      debounce: 300,
      showErrorsOn: 'touched',
    },
  });

  const handleSubmit = async () => {
    await form.submitForm();
    if (form.isValid) {
      console.log('Form data:', form.values);
    }
  };

  return (
    // Your form UI
  );
};
```

---

## Related Documentation

- 📦 [SmartFormField Component](SmartFormField.md)
- 🔐 [SmartOTPField Component](SmartOTPField.md)
- ✅ [Validation Guide](../guides/validation.md)
- 🎯 [Field Types Guide](../guides/field-types.md)
- 📋 [Example Forms](../examples/)

---

**Version:** 1.1.1  
**Last Updated:** November 14, 2025
