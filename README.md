# React Native FN Forms

🚀 **Intelligent form validation library for React Native with built-in field-specific validators**

A pure JavaScript React Native library that provides smart, real-time form validation with built-in validators for common field types like names, emails, phone numbers, and more.

## ✨ Features

- 🧠 **Smart Field Validation** - Built-in validators for common field types (name, email, phone, etc.)
- ⚡ **Real-time Validation** - Debounced validation with customizable timing
- 🎯 **React Native Optimized** - Platform-specific input props and keyboard handling
- 📱 **Cross-platform** - Works on iOS, Android, and React Native Web
- 🔧 **TypeScript Support** - Full type safety and IntelliSense
- ♿ **Accessibility First** - Built-in accessibility features and screen reader support
- 🎨 **Customizable** - Flexible styling and custom validation rules
- 📦 **Pure JavaScript** - No native dependencies, easy installation

## 🚀 Installation

```bash
npm install react-native-fn-forms
# or
yarn add react-native-fn-forms
```

## 📖 Quick Start

```typescript
import React from 'react';
import { View, Button } from 'react-native';
import { useSmartForm, FormProvider, SmartFormField } from 'react-native-fn-forms';

const MyForm = () => {
  const form = useSmartForm({
    fields: {
      name: {
        type: 'personName',
        required: true,
        minLength: 2,
      },
      email: {
        type: 'email',
        required: true,
      },
      phone: {
        type: 'phone',
        required: false,
      },
    },
  });

  const handleSubmit = async () => {
    await form.submitForm();
    if (form.isValid) {
      console.log('Form data:', form.values);
    }
  };

  return (
    <FormProvider value={form}>
      <View style={{ padding: 20 }}>
        <SmartFormField
          name="name"
          label="Full Name"
          placeholder="Enter your name"
        />

        <SmartFormField
          name="email"
          label="Email"
          placeholder="Enter your email"
        />

        <SmartFormField
          name="phone"
          label="Phone (Optional)"
          placeholder="Enter your phone number"
        />

        <Button title="Submit" onPress={handleSubmit} />
      </View>
    </FormProvider>
  );
};
```

## 🔍 Built-in Field Types

| Field Type      | Description                                      | Auto-formatting                | Validation                     |
| --------------- | ------------------------------------------------ | ------------------------------ | ------------------------------ |
| `personName`    | Names with letters, spaces, hyphens, apostrophes | ✅ Capitalizes properly        | ✅ Rejects numbers/symbols     |
| `businessName`  | Business names with additional characters        | ✅ Cleans spacing              | ✅ Allows business punctuation |
| `email`         | Email addresses                                  | ✅ Lowercase formatting        | ✅ Email format validation     |
| `phone`         | Phone numbers                                    | ✅ Format: (123) 456-7890      | ✅ Valid phone patterns        |
| `creditCard`    | Credit card numbers                              | ✅ Format: 1234 5678 9012 3456 | ✅ Luhn algorithm check        |
| `currency`      | Monetary values                                  | ✅ Format: 10.99               | ✅ Valid currency format       |
| `username`      | Usernames                                        | ✅ Lowercase, clean chars      | ✅ Alphanumeric + \_ -         |
| `streetAddress` | Street addresses                                 | ✅ Title case                  | ✅ Address characters          |
| `url`           | Web URLs                                         | ✅ Add https:// if missing     | ✅ Valid URL format            |
| `password`      | Passwords                                        | ❌ No formatting               | ✅ Strength requirements       |

## 🛠 Advanced Usage

### Custom Validation

```typescript
const form = useSmartForm({
  fields: {
    username: {
      type: 'username',
      required: true,
      minLength: 3,
      customValidation: async value => {
        const isAvailable = await checkUsernameAvailability(value);
        return isAvailable ? null : 'Username is already taken';
      },
    },
  },
});
```

### Password Strength Validation

```typescript
const form = useSmartForm({
  fields: {
    password: {
      type: 'password',
      required: true,
      customValidation: value => {
        const strength = validators.passwordStrength({
          minLength: 8,
          uppercase: 1,
          lowercase: 1,
          numbers: 1,
          specialChars: 1,
        });
        const result = strength(value);
        return result ? result.message : null;
      },
    },
  },
});
```

### Real-time Validation Settings

```typescript
const form = useSmartForm({
  validation: {
    mode: 'onChange', // 'onChange' | 'onBlur' | 'onSubmit'
    debounce: 300, // milliseconds
    showErrorsOn: 'touched', // 'immediate' | 'touched' | 'submit'
  },
  fields: {
    // ... your fields
  },
});
```

### Platform-specific Input Props

```typescript
const form = useSmartForm({
  fields: {
    email: {
      type: 'email',
      inputProps: {
        keyboardType: 'email-address',
        autoCapitalize: 'none',
        autoComplete: 'email',
        textContentType: 'emailAddress', // iOS
      },
    },
  },
});
```

## 🎨 Custom Components

You can create your own form field components:

```typescript
import { useFormContext } from 'react-native-fn-forms';

const CustomField = ({ name, ...props }) => {
  const form = useFormContext();
  const fieldProps = form.getFieldProps(name);

  return (
    <TextInput
      {...fieldProps}
      {...props}
      style={[
        styles.input,
        fieldProps.error && styles.errorInput
      ]}
    />
  );
};
```

## ♿ Accessibility

Built-in accessibility features:

```typescript
const form = useSmartForm({
  accessibility: {
    announceErrors: true, // Screen reader announcements
    errorSummary: true, // Error summary at top
    fieldLabeling: 'enhanced', // Enhanced ARIA labels
  },
  fields: {
    name: {
      type: 'personName',
      accessibility: {
        label: 'Full name input field',
        hint: 'Enter your first and last name',
        role: 'text',
      },
    },
  },
});
```

## 📚 API Reference

### `useSmartForm(config)`

Main hook for form management.

**Parameters:**

- `config: FormConfig` - Form configuration object

**Returns:** `SmartFormHook` object with:

- `values` - Current form values
- `errors` - Current form errors
- `touched` - Fields that have been interacted with
- `isSubmitting` - Form submission state
- `isValid` - Overall form validation state
- `setFieldValue(field, value)` - Set field value
- `setFieldError(field, error)` - Set field error
- `setFieldTouched(field, touched)` - Mark field as touched
- `validateField(field)` - Validate single field
- `validateForm()` - Validate entire form
- `resetForm()` - Reset form to initial state
- `submitForm()` - Submit form with validation
- `getFieldProps(field)` - Get props for input component

### `FormProvider`

Context provider for form state.

### `SmartFormField`

Pre-built input component with built-in validation display.

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🙏 Support

- ⭐ Star this repo if you find it helpful
- 🐛 [Report bugs](https://github.com/Fiyaz6772/react-native-fn-forms/issues)
- 💡 [Request features](https://github.com/Fiyaz6772/react-native-fn-forms/issues)
- 📖 [Read the docs](https://github.com/Fiyaz6772/react-native-fn-forms#readme)

---

Made with ❤️ for the React Native community
