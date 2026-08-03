# React Native FN Forms

🚀 **The smartest form validation library for React Native** 🚀

![npm](https://img.shields.io/npm/v/react-native-fn-forms) ![npm downloads](https://img.shields.io/npm/dt/react-native-fn-forms) ![GitHub](https://img.shields.io/github/license/Fiyaz6772/react-native-fn-forms) ![React Native](https://img.shields.io/badge/React%20Native-0.60%2B-blue)

**React Native FN Forms** is an intelligent form validation library with built-in field-specific validators for email, phone numbers, names, credit cards, OTP verification, and more. Perfect for React Native apps that need smart, real-time form validation with seamless OTP verification flows.

## 🎯 **Why Choose React Native FN Forms?**

- ✅ **10+ Built-in Validators** - Email, phone, credit card, names, addresses, etc.
- ✅ **OTP Verification** - Complete OTP input component with SMS auto-fill
- ✅ **Icon Support** - Left/right icons with interactive features (password toggle, clear buttons)
- ✅ **Smart Auto-formatting** - Phone numbers, credit cards format automatically
- ✅ **Real-time Validation** - Instant feedback with customizable debouncing
- ✅ **TypeScript First** - Full type safety and IntelliSense support
- ✅ **Accessibility Ready** - Screen reader support and proper ARIA labels
- ✅ **Cross-platform** - iOS, Android, and React Native Web
- ✅ **Zero Native Dependencies** - Pure JavaScript, easy installation
- ✅ **Performance Optimized** - Minimal re-renders, efficient validation

## ✨ Features

- 🧠 **Smart Field Validation** - Built-in validators for common field types (name, email, phone, etc.)
- 🔐 **OTP Verification** - Complete OTP component with SMS auto-fill (iOS/Android)
- 🌍 **Multi-Country Phone Formatting** - Auto-format phone numbers for 14+ countries (US, UK, India, etc.)
- 🎨 **Icon Support** - Left/right icons with interactive handlers (password toggle, clear button, etc.)
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

## 📚 Documentation

### API Documentation

- 🎯 **[useSmartForm Hook](docs/api/useSmartForm.md)** - Main form management hook
- 📦 **[SmartFormField Component](docs/api/SmartFormField.md)** - Pre-built form field component
- 🔐 **[SmartOTPField Component](docs/api/SmartOTPField.md)** - OTP verification component

### Guides

- 📋 **[Field Types Guide](docs/guides/field-types.md)** - All 14 field types with examples
- ✅ **[Validation Guide](docs/guides/validation.md)** - Advanced validation patterns
- 🎨 **[Styling Guide](docs/guides/styling.md)** - Customization and theming
- 🔐 **[OTP Guide](docs/guides/otp.md)** - Complete OTP implementation guide
- 🌍 **[Multi-Country Phone Formatting](docs/features/phone-country-formats.md)** - International phone number formatting

### Examples

- 🔐 **[Login Form](docs/examples/login-form.md)** - Complete login form example
- 📝 **[Signup Form](docs/examples/signup-form.md)** - Registration form with validation
- 💳 **[Payment Form](docs/examples/payment-form.md)** - Credit card payment form
- ✅ **[Confirmation Fields](docs/examples/confirmation-fields.md)** - Email and password confirmation
- 💾 **[Auto-save & Draft Recovery](docs/examples/auto-save-draft.md)** - Automatic draft saving

### Additional Resources

- 🗺️ **[Roadmap](docs/ROADMAP.md)** - Upcoming features and improvements
- 📝 **[Changelog](CHANGELOG.md)** - Version history
- 🤝 **[Contributing](CONTRIBUTING.md)** - How to contribute

## 📖 Quick Start

```typescript
import React from 'react';
import { View, Button } from 'react-native';
import { useSmartForm, FormProvider, SmartFormField, SmartOTPField } from 'react-native-fn-forms';

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

### � OTP Verification Example

```typescript
import { SmartOTPField } from 'react-native-fn-forms';

const OTPVerification = () => {
  const form = useSmartForm({
    fields: {
      email: { type: 'email', required: true },
      otp: { type: 'otp', required: true, length: 6 }
    }
  });

  return (
    <FormProvider value={form}>
      <View style={{ padding: 20 }}>
        <SmartFormField
          name="email"
          label="Email Address"
          placeholder="Enter your email"
        />

        <SmartOTPField
          name="otp"
          label="Verification Code"
          length={6}
          autoFocus={true}
          onComplete={(code) => console.log('OTP Complete:', code)}
        />

        <Button title="Verify" onPress={() => form.submitForm()} />
      </View>
    </FormProvider>
  );
};
```

### 🎨 Fields with Icons

```typescript
import Icon from 'react-native-vector-icons/MaterialIcons';

const LoginForm = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const form = useSmartForm({
    fields: {
      email: { type: 'email', required: true },
      password: { type: 'password', required: true }
    }
  });

  return (
    <FormProvider value={form}>
      <View style={{ padding: 20 }}>
        <SmartFormField
          name="email"
          label="Email"
          placeholder="Enter your email"
          leftIcon={<Icon name="email" size={20} color="#666" />}
        />

        <SmartFormField
          name="password"
          label="Password"
          placeholder="Enter password"
          secureTextEntry={!showPassword}
          leftIcon={<Icon name="lock" size={20} color="#666" />}
          rightIcon={
            <Icon
              name={showPassword ? 'visibility' : 'visibility-off'}
              size={20}
              color="#666"
            />
          }
          onRightIconPress={() => setShowPassword(!showPassword)}
        />

        <Button title="Login" onPress={() => form.submitForm()} />
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
| `otp`           | OTP codes (4/6/8 digits)                         | ❌ No formatting               | ✅ Numeric validation          |

## 🔥 Key Features

### Auto-save & Draft Recovery

Automatic draft saving with flexible storage adapters:

```typescript
import AsyncStorage from '@react-native-async-storage/async-storage';

const form = useSmartForm({
  fields: {
    email: { type: 'email', required: true },
    message: { type: 'text', required: true },
  },
  autoSave: {
    enabled: true,
    debounce: 1000,
    key: 'contact-form-draft',
    expirationDays: 7,
    storage: {
      save: async (key, data) => await AsyncStorage.setItem(key, data),
      load: async key => await AsyncStorage.getItem(key),
      remove: async key => await AsyncStorage.removeItem(key),
    },
  },
  onDraftFound: draft => {
    Alert.alert('Resume?', 'You have unsaved changes', [
      { text: 'Discard', onPress: () => form.clearDraft() },
      { text: 'Resume', onPress: () => form.loadDraft(draft) },
    ]);
  },
});
```

📖 **[See auto-save & draft recovery guide →](docs/examples/auto-save-draft.md)**

### Field Matching / Confirmation Fields

Built-in support for email and password confirmation:

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
  },
});
```

📖 **[See confirmation fields example →](docs/examples/confirmation-fields.md)**

### Validation Modes

Choose how and when validation happens:

```typescript
const form = useSmartForm({
  validation: {
    mode: 'onChange', // Validate as user types
    debounce: 300, // Wait 300ms after typing stops
    showErrorsOn: 'touched', // Show errors after field interaction
  },
  fields: {
    /* ... */
  },
});
```

### Custom Validation

Add your own validation logic, including async validation:

```typescript
username: {
  type: 'username',
  required: true,
  customValidation: async (value) => {
    const available = await checkAvailability(value);
    return available ? null : 'Username taken';
  }
}
```

📖 **[See advanced validation patterns →](docs/guides/validation.md)**

### Custom Styling & Components

Full control over appearance and behavior:

```typescript
<SmartFormField
  name="email"
  style={styles.field}
  inputStyle={styles.input}
  errorStyle={styles.error}
/>
```

📖 **[See styling guide →](docs/guides/styling.md)**

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🙏 Support

- ⭐ Star this repo if you find it helpful
- 🐛 [Report bugs](https://github.com/Fiyaz6772/react-native-fn-forms/issues)
- 💡 [Request features](https://github.com/Fiyaz6772/react-native-fn-forms/issues)
- 📖 [Read the docs](docs/)

---

Made with ❤️ for the React Native community
