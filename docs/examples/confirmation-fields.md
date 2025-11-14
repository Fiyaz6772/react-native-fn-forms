# Confirmation Fields Example

Complete example of using field matching for email and password confirmation.

---

## Overview

This example demonstrates how to use the `matchField` property to create confirmation fields that automatically validate whether they match another field.

---

## Complete Example

```typescript
import React from 'react';
import { View, Button, StyleSheet, ScrollView } from 'react-native';
import { useSmartForm, FormProvider, SmartFormField } from 'react-native-fn-forms';

const ConfirmationFieldsExample = () => {
  const form = useSmartForm({
    fields: {
      email: {
        type: 'email',
        required: true,
      },
      confirmEmail: {
        type: 'email',
        required: true,
        matchField: 'email',
        matchErrorMessage: 'Email addresses must match',
      },
      password: {
        type: 'password',
        required: true,
        minLength: 8,
      },
      confirmPassword: {
        type: 'password',
        required: true,
        matchField: 'password',
        matchErrorMessage: 'Passwords must match',
      },
    },
  });

  const handleSubmit = async () => {
    await form.submitForm();
    if (form.isValid) {
      console.log('Form submitted successfully:', form.values);
      // Proceed with registration
    }
  };

  return (
    <ScrollView style={styles.container}>
      <FormProvider value={form}>
        <SmartFormField
          name="email"
          label="Email Address"
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
        />

        <SmartFormField
          name="confirmEmail"
          label="Confirm Email"
          placeholder="Re-enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
        />

        <SmartFormField
          name="password"
          label="Password"
          placeholder="Create a password"
          secureTextEntry
          autoCapitalize="none"
          autoComplete="password-new"
        />

        <SmartFormField
          name="confirmPassword"
          label="Confirm Password"
          placeholder="Re-enter your password"
          secureTextEntry
          autoCapitalize="none"
          autoComplete="password-new"
        />

        <Button
          title="Create Account"
          onPress={handleSubmit}
          disabled={form.isSubmitting}
        />
      </FormProvider>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
});

export default ConfirmationFieldsExample;
```

---

## Key Features

### 1. **Email Confirmation**

```typescript
{
  email: {
    type: 'email',
    required: true,
  },
  confirmEmail: {
    type: 'email',
    required: true,
    matchField: 'email',  // Must match the 'email' field
    matchErrorMessage: 'Email addresses must match',
  },
}
```

The `confirmEmail` field will automatically validate that its value matches the `email` field.

### 2. **Password Confirmation**

```typescript
{
  password: {
    type: 'password',
    required: true,
    minLength: 8,
  },
  confirmPassword: {
    type: 'password',
    required: true,
    matchField: 'password',  // Must match the 'password' field
    matchErrorMessage: 'Passwords must match',
  },
}
```

The `confirmPassword` field validates against the `password` field with a custom error message.

### 3. **Real-time Validation**

When the user changes the original field (e.g., `email`), the confirmation field (`confirmEmail`) is automatically revalidated if it has been touched. This provides instant feedback to the user.

### 4. **Custom Error Messages**

Use `matchErrorMessage` to provide clear, user-friendly error messages:

```typescript
matchErrorMessage: 'Email addresses must match'; // Clear and specific
matchErrorMessage: 'Passwords do not match'; // User-friendly
```

---

## Advanced Usage

### Multiple Confirmation Fields

You can have multiple fields that match different fields:

```typescript
const form = useSmartForm({
  fields: {
    email: { type: 'email', required: true },
    confirmEmail: {
      type: 'email',
      required: true,
      matchField: 'email',
      matchErrorMessage: 'Email addresses must match',
    },
    password: { type: 'password', required: true, minLength: 8 },
    confirmPassword: {
      type: 'password',
      required: true,
      matchField: 'password',
      matchErrorMessage: 'Passwords must match',
    },
    newPin: { type: 'number', required: true, minLength: 4, maxLength: 4 },
    confirmPin: {
      type: 'number',
      required: true,
      matchField: 'newPin',
      matchErrorMessage: 'PINs must match',
    },
  },
});
```

### With Custom Validation

Combine field matching with additional custom validation:

```typescript
{
  confirmPassword: {
    type: 'password',
    required: true,
    matchField: 'password',
    matchErrorMessage: 'Passwords must match',
    customValidation: (value) => {
      // Additional validation logic
      if (value.length < 8) {
        return 'Password must be at least 8 characters';
      }
      return null;
    },
  },
}
```

### Default Error Message

If you don't provide `matchErrorMessage`, a default message is used:

```typescript
{
  confirmEmail: {
    type: 'email',
    required: true,
    matchField: 'email',
    // Default message: "Must match email"
  },
}
```

---

## Best Practices

### 1. **Always Use Required**

Confirmation fields should always be required:

```typescript
confirmEmail: {
  type: 'email',
  required: true,  // ✅ Always required
  matchField: 'email',
}
```

### 2. **Provide Clear Error Messages**

Use descriptive error messages that tell users exactly what's wrong:

```typescript
matchErrorMessage: 'Email addresses must match'; // ✅ Clear
matchErrorMessage: 'No match'; // ❌ Vague
```

### 3. **Match Field Types**

Ensure the confirmation field has the same type as the original field:

```typescript
email: { type: 'email' },
confirmEmail: {
  type: 'email',  // ✅ Same type
  matchField: 'email',
}
```

### 4. **Use Appropriate Input Props**

Set the same input properties for both fields:

```typescript
<SmartFormField
  name="password"
  secureTextEntry
  autoCapitalize="none"
  autoComplete="password-new"
/>

<SmartFormField
  name="confirmPassword"
  secureTextEntry        // ✅ Same props
  autoCapitalize="none"
  autoComplete="password-new"
/>
```

---

## Common Use Cases

### Registration Form

```typescript
const registrationForm = useSmartForm({
  fields: {
    username: { type: 'username', required: true },
    email: { type: 'email', required: true },
    confirmEmail: {
      type: 'email',
      required: true,
      matchField: 'email',
      matchErrorMessage: 'Email addresses must match',
    },
    password: { type: 'password', required: true, minLength: 8 },
    confirmPassword: {
      type: 'password',
      required: true,
      matchField: 'password',
      matchErrorMessage: 'Passwords must match',
    },
  },
});
```

### Change Password Form

```typescript
const changePasswordForm = useSmartForm({
  fields: {
    currentPassword: { type: 'password', required: true },
    newPassword: { type: 'password', required: true, minLength: 8 },
    confirmNewPassword: {
      type: 'password',
      required: true,
      matchField: 'newPassword',
      matchErrorMessage: 'New passwords must match',
    },
  },
});
```

### Email Update Form

```typescript
const emailUpdateForm = useSmartForm({
  fields: {
    newEmail: { type: 'email', required: true },
    confirmNewEmail: {
      type: 'email',
      required: true,
      matchField: 'newEmail',
      matchErrorMessage: 'Email addresses must match',
    },
    password: {
      type: 'password',
      required: true,
      // Require password to confirm email change
    },
  },
});
```

---

## Validation Behavior

### When Original Field Changes

When the user modifies the original field (e.g., `password`), the library automatically revalidates the confirmation field (`confirmPassword`) **if it has been touched**. This ensures:

1. User gets immediate feedback
2. Validation stays in sync
3. No stale error messages

### When Confirmation Field Changes

When the user types in the confirmation field, it validates against the current value of the original field with debouncing for a smooth experience.

### On Form Submit

All fields, including confirmation fields, are validated before submission.

---

## Troubleshooting

### Confirmation Field Not Validating

**Problem:** Confirmation field doesn't show validation errors.

**Solution:** Ensure:

1. The `matchField` property references the correct field name
2. Both fields exist in the form configuration
3. The confirmation field has been touched

### Error Persists After Fixing Original Field

**Problem:** Error message stays even after matching values.

**Solution:** This is expected behavior. The confirmation field needs to be touched/changed to trigger revalidation. Alternatively, the user can blur the field to trigger validation.

### Custom Error Message Not Showing

**Problem:** Default error message appears instead of custom message.

**Solution:** Ensure `matchErrorMessage` is properly set:

```typescript
confirmEmail: {
  type: 'email',
  required: true,
  matchField: 'email',
  matchErrorMessage: 'Email addresses must match',  // ✅ Correct property name
}
```

---

## See Also

- [Field Types Guide](../guides/field-types.md) - All available field types
- [Validation Guide](../guides/validation.md) - Advanced validation patterns
- [Signup Form Example](./signup-form.md) - Complete registration form
- [useSmartForm Hook](../api/useSmartForm.md) - Full API reference
