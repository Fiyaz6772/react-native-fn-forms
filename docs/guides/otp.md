# SmartOTPField Component Guide

The `SmartOTPField` is a powerful OTP (One-Time Password) input component that seamlessly integrates with the `react-native-fn-forms` validation system.

## ✨ Key Features Implemented

### ✅ Core Features

- **Auto-advance**: Automatically moves to the next input when a digit is entered
- **Backspace Support**: Deletes current digit and moves to previous input
- **Paste Support**: Handles pasted OTP codes from clipboard
- **Auto-submit**: Optionally submits form when OTP is complete
- **Auto-focus**: Smart focus management with proper input selection
- **Dynamic Length**: Supports 4, 6, or 8 digit OTP codes

### 🎨 Styling Features

- **Custom Styling**: Full control over container, input, label, and error styles
- **Focus States**: Visual feedback when inputs are focused
- **Error States**: Automatic error styling when validation fails
- **Platform Optimization**: iOS and Android specific optimizations

### 📱 Mobile Optimizations

- **SMS Auto-detection**: iOS and Android SMS OTP auto-fill support
- **Number Keyboard**: Optimized keyboard type for OTP entry
- **Text Selection**: Proper text selection for easy digit replacement
- **Cross-platform**: Consistent behavior across iOS and Android

## 🚀 Basic Usage

```jsx
import { SmartOTPField, useSmartForm, FormProvider } from 'react-native-fn-forms';

const MyComponent = () => {
  const form = useSmartForm({
    fields: {
      otp: {
        type: 'otp',
        required: true,
        length: 6,
        autoSubmit: false,
      },
    },
  });

  return (
    <FormProvider value={form}>
      <SmartOTPField
        name="otp"
        label="Verification Code"
        length={6}
        autoFocus={true}
        onComplete={code => console.log('OTP Complete:', code)}
      />
    </FormProvider>
  );
};
```

## 📋 Props Reference

### Required Props

| Prop   | Type     | Description                     |
| ------ | -------- | ------------------------------- |
| `name` | `string` | Field name for form integration |

### Optional Props

| Prop              | Type          | Default | Description                            |
| ----------------- | ------------- | ------- | -------------------------------------- |
| `length`          | `4 \| 6 \| 8` | `6`     | Number of OTP digits                   |
| `placeholder`     | `string`      | `'●'`   | Placeholder character for empty inputs |
| `autoFocus`       | `boolean`     | `true`  | Auto-focus first input on mount        |
| `autoSubmit`      | `boolean`     | `false` | Auto-submit form when OTP complete     |
| `secureTextEntry` | `boolean`     | `false` | Hide entered digits (show placeholder) |
| `label`           | `string`      | -       | Field label text                       |

### Styling Props

| Prop         | Type                   | Description            |
| ------------ | ---------------------- | ---------------------- |
| `style`      | `StyleProp<ViewStyle>` | Container style        |
| `inputStyle` | `StyleProp<TextStyle>` | Individual input style |
| `labelStyle` | `StyleProp<TextStyle>` | Label text style       |
| `errorStyle` | `StyleProp<TextStyle>` | Error message style    |

### Callback Props

| Prop           | Type                     | Description                      |
| -------------- | ------------------------ | -------------------------------- |
| `onComplete`   | `(code: string) => void` | Called when OTP is fully entered |
| `onCodeChange` | `(code: string) => void` | Called on every code change      |

## 🎨 Styling Examples

### 1. Standard OTP Field

```jsx
<SmartOTPField
  name="otp"
  label="6-Digit Code"
  length={6}
  style={styles.otpContainer}
  inputStyle={styles.standardInput}
  labelStyle={styles.standardLabel}
  errorStyle={styles.standardError}
/>;

const styles = StyleSheet.create({
  otpContainer: {
    marginVertical: 20,
  },
  standardInput: {
    borderWidth: 2,
    borderColor: '#e0e6ed',
    borderRadius: 12,
    backgroundColor: '#ffffff',
    fontSize: 20,
    fontWeight: '700',
    height: 55,
  },
  standardLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 12,
    textAlign: 'center',
  },
  standardError: {
    color: '#e74c3c',
    fontSize: 14,
    textAlign: 'center',
  },
});
```

### 2. Compact 4-Digit OTP

```jsx
<SmartOTPField
  name="otp"
  label="PIN"
  length={4}
  inputStyle={styles.compactInput}
  autoSubmit={true}
/>;

const styles = StyleSheet.create({
  compactInput: {
    height: 45,
    fontSize: 18,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
});
```

### 3. Secure OTP (Hidden Digits)

```jsx
<SmartOTPField
  name="otp"
  label="Secure Code"
  length={6}
  secureTextEntry={true}
  placeholder="●"
  inputStyle={styles.secureInput}
/>;

const styles = StyleSheet.create({
  secureInput: {
    backgroundColor: '#f8f9fa',
    borderColor: '#9b59b6',
    borderWidth: 2,
    borderRadius: 10,
  },
});
```

## 🔧 Form Configuration

### Basic Form Setup

```jsx
const form = useSmartForm({
  fields: {
    otp: {
      type: 'otp',
      required: true,
      length: 6, // Match component length
      autoSubmit: false, // Control auto-submission
      customValidation: value => {
        if (value.length !== 6) {
          return 'OTP must be 6 digits';
        }
        return null;
      },
    },
  },
  validation: {
    mode: 'onChange',
    debounce: 100, // Quick feedback for OTP
    showErrorsOn: 'touched',
  },
});
```

### Advanced Form Integration

```jsx
const form = useSmartForm({
  fields: {
    email: { type: 'email', required: true },
    otp: {
      type: 'otp',
      required: true,
      length: 6,
      autoSubmit: true, // Auto-submit when complete
    },
  },
});

// Handle auto-submission
const handleOTPComplete = async code => {
  console.log('OTP Complete:', code);
  // Form will auto-submit if autoSubmit: true
  // Or manually trigger: await form.submitForm()
};
```

## 📱 Platform-Specific Features

### iOS SMS Auto-fill

The component automatically sets up iOS SMS OTP detection:

```jsx
// Automatically applied to first input
autoComplete = 'sms-otp';
textContentType = 'oneTimeCode';
```

### Android SMS Auto-fill

Android SMS detection is supported through the standard autoComplete:

```jsx
// Automatically applied
autoComplete = 'sms-otp';
```

## 🎯 Usage Patterns

### 1. Email + OTP Verification Flow

```jsx
const VerificationScreen = () => {
  const [step, setStep] = useState('email'); // 'email' or 'otp'

  const form = useSmartForm({
    fields: {
      email: { type: 'email', required: true },
      otp: { type: 'otp', required: true, length: 6 },
    },
  });

  const sendOTP = async () => {
    if (form.errors.email) return;
    // Send OTP API call
    setStep('otp');
  };

  const verifyOTP = async () => {
    await form.submitForm();
    if (form.isValid) {
      // Verify OTP API call
      console.log('Verification successful');
    }
  };

  return (
    <FormProvider value={form}>
      {step === 'email' ? (
        <>
          <SmartFormField name="email" />
          <Button onPress={sendOTP} title="Send Code" />
        </>
      ) : (
        <>
          <SmartOTPField name="otp" onComplete={verifyOTP} autoSubmit={true} />
          <Button onPress={sendOTP} title="Resend Code" />
        </>
      )}
    </FormProvider>
  );
};
```

### 2. Two-Factor Authentication

```jsx
const TwoFactorScreen = () => {
  const form = useSmartForm({
    fields: {
      username: { type: 'text', required: true },
      password: { type: 'password', required: true },
      twoFactorCode: { type: 'otp', required: true, length: 6 },
    },
  });

  return (
    <FormProvider value={form}>
      <SmartFormField name="username" />
      <SmartFormField name="password" />
      <SmartOTPField
        name="twoFactorCode"
        label="Authentication Code"
        placeholder="-"
        onComplete={code => console.log('2FA Code:', code)}
      />
    </FormProvider>
  );
};
```

## 🔍 Troubleshooting

### Common Issues

1. **OTP not auto-advancing**
   - Ensure `length` prop matches the expected digits
   - Check that only numeric input is being entered

2. **SMS auto-fill not working**
   - Verify SMS format includes the OTP code
   - Ensure proper `autoComplete` and `textContentType` props

3. **Focus issues**
   - Use `autoFocus={true}` for initial focus
   - Ensure proper ref handling in parent components

4. **Styling not applying**
   - Check prop names: `style`, `inputStyle`, `labelStyle`, `errorStyle`
   - Ensure styles are properly defined in StyleSheet

## 🚀 Best Practices

1. **Length Configuration**: Always match component `length` with form field `length`
2. **Error Handling**: Provide clear error messages for invalid OTP formats
3. **User Experience**: Use auto-submit sparingly, prefer manual verification buttons
4. **Security**: Consider `secureTextEntry` for sensitive OTP scenarios
5. **Accessibility**: Provide proper labels and error messages for screen readers
6. **Performance**: Use appropriate debounce values for real-time validation

## 🔗 Integration with Existing Components

The `SmartOTPField` works seamlessly with existing `SmartFormField` components:

```jsx
<FormProvider value={form}>
  <SmartFormField name="phone" type="phone" />
  <SmartOTPField name="smsCode" length={6} />
  <SmartFormField name="email" type="email" />
  <SmartOTPField name="emailCode" length={4} />
</FormProvider>
```

This creates a complete verification flow with consistent validation and styling across all input types.
