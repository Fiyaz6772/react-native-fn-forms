# SmartOTPField Component

Specialized OTP (One-Time Password) input component with SMS auto-fill, mobile optimizations, and accessibility features.

---

## Import

```typescript
import { SmartOTPField } from 'react-native-fn-forms';
```

## Description

`SmartOTPField` is a purpose-built component for OTP verification that provides:

- ✅ **SMS Auto-fill** - Automatic code detection from SMS (iOS/Android)
- ✅ **Auto-advance** - Moves to next cell automatically
- ✅ **Backspace handling** - Smart deletion and navigation
- ✅ **Paste support** - Paste full OTP code from clipboard
- ✅ **Mobile keyboard** - Optimized numeric keyboard
- ✅ **Accessibility** - Screen reader support
- ✅ **Customizable** - Full styling control

---

## Props

| Prop              | Type                     | Required | Default | Description                         |
| ----------------- | ------------------------ | -------- | ------- | ----------------------------------- |
| `name`            | `string`                 | Yes      | -       | Field name (must match form config) |
| `length`          | `4 \| 6 \| 8`            | No       | `6`     | Number of OTP digits                |
| `label`           | `string`                 | No       | -       | Label text above OTP inputs         |
| `placeholder`     | `string`                 | No       | `'●'`   | Placeholder for empty cells         |
| `autoFocus`       | `boolean`                | No       | `true`  | Auto-focus first input on mount     |
| `autoSubmit`      | `boolean`                | No       | `false` | Auto-submit when OTP is complete    |
| `secureTextEntry` | `boolean`                | No       | `false` | Hide OTP digits (show dots)         |
| `style`           | `ViewStyle`              | No       | -       | Container style                     |
| `inputStyle`      | `ViewStyle \| TextStyle` | No       | -       | Individual cell style               |
| `labelStyle`      | `TextStyle`              | No       | -       | Label text style                    |
| `errorStyle`      | `TextStyle`              | No       | -       | Error text style                    |
| `onComplete`      | `(code: string) => void` | No       | -       | Callback when OTP is complete       |
| `onCodeChange`    | `(code: string) => void` | No       | -       | Callback on every digit change      |

---

## Basic Usage

### Simple OTP Field

```typescript
import { FormProvider, SmartOTPField, useSmartForm } from 'react-native-fn-forms';

const VerifyScreen = () => {
  const form = useSmartForm({
    fields: {
      otp: {
        type: 'otp',
        required: true,
        length: 6,
      },
    },
  });

  return (
    <FormProvider value={form}>
      <SmartOTPField
        name="otp"
        label="Enter verification code"
        length={6}
      />
    </FormProvider>
  );
};
```

### With Auto-Submit

```typescript
const VerifyOTP = () => {
  const form = useSmartForm({
    fields: {
      otp: { type: 'otp', required: true, length: 6 },
    },
  });

  const handleVerify = async (code: string) => {
    try {
      const result = await verifyOTPCode(code);
      if (result.success) {
        navigation.navigate('Success');
      }
    } catch (error) {
      form.setFieldError('otp', 'Invalid code. Please try again.');
    }
  };

  return (
    <FormProvider value={form}>
      <SmartOTPField
        name="otp"
        label="Verification Code"
        length={6}
        autoFocus={true}
        autoSubmit={true}
        onComplete={handleVerify}
      />
    </FormProvider>
  );
};
```

### 4-Digit PIN

```typescript
<SmartOTPField
  name="pin"
  label="Enter PIN"
  length={4}
  secureTextEntry={true}
  placeholder="•"
/>
```

---

## Styling

### Custom Colors

```typescript
<SmartOTPField
  name="otp"
  length={6}
  inputStyle={{
    borderColor: '#007AFF',
    borderWidth: 2,
    borderRadius: 12,
    fontSize: 24,
    fontWeight: 'bold',
  }}
  labelStyle={{
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  }}
  errorStyle={{
    color: '#FF3B30',
    fontSize: 14,
  }}
/>
```

### Dark Mode

```typescript
import { useColorScheme } from 'react-native';

const OTPInput = () => {
  const isDark = useColorScheme() === 'dark';

  return (
    <SmartOTPField
      name="otp"
      length={6}
      style={{
        backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF',
      }}
      inputStyle={{
        backgroundColor: isDark ? '#2C2C2E' : '#F2F2F7',
        borderColor: isDark ? '#48484A' : '#D1D1D6',
        color: isDark ? '#FFFFFF' : '#000000',
      }}
      labelStyle={{
        color: isDark ? '#FFFFFF' : '#000000',
      }}
    />
  );
};
```

### Material Design Style

```typescript
<SmartOTPField
  name="otp"
  label="Verification Code"
  length={6}
  inputStyle={{
    borderBottomWidth: 2,
    borderBottomColor: '#6200EE',
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderRadius: 0,
    fontSize: 24,
    textAlign: 'center',
    paddingVertical: 8,
  }}
  style={{
    gap: 12,
  }}
/>
```

### iOS Style

```typescript
<SmartOTPField
  name="otp"
  length={6}
  inputStyle={{
    backgroundColor: '#F2F2F7',
    borderRadius: 12,
    borderWidth: 0,
    fontSize: 28,
    fontWeight: '600',
    textAlign: 'center',
    width: 48,
    height: 56,
  }}
  style={{
    gap: 8,
    paddingHorizontal: 16,
  }}
/>
```

---

## Advanced Usage

### With Timer

```typescript
import { useState, useEffect } from 'react';

const OTPWithTimer = () => {
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleResend = async () => {
    await resendOTP();
    setTimer(60);
    setCanResend(false);
  };

  return (
    <View>
      <SmartOTPField
        name="otp"
        label="Enter verification code"
        length={6}
      />

      <View style={styles.timerContainer}>
        {canResend ? (
          <TouchableOpacity onPress={handleResend}>
            <Text style={styles.resendText}>Resend Code</Text>
          </TouchableOpacity>
        ) : (
          <Text style={styles.timerText}>
            Resend in {timer}s
          </Text>
        )}
      </View>
    </View>
  );
};
```

### With Loading State

```typescript
const VerifyOTP = () => {
  const [isVerifying, setIsVerifying] = useState(false);
  const form = useSmartForm({
    fields: { otp: { type: 'otp', length: 6 } },
  });

  const handleVerify = async (code: string) => {
    setIsVerifying(true);
    try {
      await verifyCode(code);
      navigation.navigate('Success');
    } catch (error) {
      form.setFieldError('otp', 'Invalid code');
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <FormProvider value={form}>
      <SmartOTPField
        name="otp"
        length={6}
        autoSubmit={true}
        onComplete={handleVerify}
      />

      {isVerifying && (
        <ActivityIndicator size="large" color="#007AFF" />
      )}
    </FormProvider>
  );
};
```

### With Success Indicator

```typescript
const [isValid, setIsValid] = useState<boolean | null>(null);

const handleVerify = async (code: string) => {
  const result = await verifyOTP(code);
  setIsValid(result.valid);
};

return (
  <View>
    <SmartOTPField
      name="otp"
      length={6}
      onComplete={handleVerify}
      inputStyle={{
        borderColor: isValid === null ? '#ddd' : isValid ? '#4CAF50' : '#F44336',
      }}
    />

    {isValid === true && (
      <View style={styles.success}>
        <Icon name="check-circle" size={24} color="#4CAF50" />
        <Text>Code verified!</Text>
      </View>
    )}

    {isValid === false && (
      <View style={styles.error}>
        <Icon name="error" size={24} color="#F44336" />
        <Text>Invalid code</Text>
      </View>
    )}
  </View>
);
```

---

## SMS Auto-fill Setup

### iOS Setup

Add to your `Info.plist`:

```xml
<key>NSUserTrackingUsageDescription</key>
<string>We need to read SMS to auto-fill verification codes</string>
```

### Android Setup

Add to `AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.RECEIVE_SMS" />
<uses-permission android:name="android.permission.READ_SMS" />

<application>
  <!-- Add SMS Retriever API -->
  <receiver
    android:name="com.google.android.gms.auth.api.phone.SmsRetriever"
    android:exported="true">
    <intent-filter>
      <action android:name="com.google.android.gms.auth.api.phone.SMS_RETRIEVED" />
    </intent-filter>
  </receiver>
</application>
```

### SMS Format

For auto-fill to work, SMS should follow this format:

```
Your verification code is: 123456

@yourapp.com #123456
```

---

## Keyboard Handling

### Auto-focus Management

```typescript
// Auto-focus first cell on mount
<SmartOTPField
  name="otp"
  length={6}
  autoFocus={true}
/>

// Manual focus control
const otpRef = useRef(null);

const focusOTP = () => {
  otpRef.current?.focus();
};

<SmartOTPField
  name="otp"
  length={6}
  autoFocus={false}
  ref={otpRef}
/>
```

### Dismiss Keyboard

```typescript
import { Keyboard } from 'react-native';

<SmartOTPField
  name="otp"
  length={6}
  onComplete={(code) => {
    Keyboard.dismiss();
    verifyCode(code);
  }}
/>
```

---

## Validation

### Basic Validation

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

### Custom Validation

```typescript
const form = useSmartForm({
  fields: {
    otp: {
      type: 'otp',
      required: true,
      length: 6,
      customValidation: async value => {
        if (value.length !== 6) {
          return 'Please enter all 6 digits';
        }

        // Verify with backend
        const isValid = await verifyOTPWithServer(value);
        return isValid ? null : 'Invalid verification code';
      },
    },
  },
});
```

---

## Accessibility

### Screen Reader Support

```typescript
const form = useSmartForm({
  fields: {
    otp: {
      type: 'otp',
      length: 6,
      accessibility: {
        label: 'One-time password input',
        hint: 'Enter the 6-digit code sent to your phone',
        role: 'text',
      },
    },
  },
});
```

### Announcements

```typescript
<SmartOTPField
  name="otp"
  length={6}
  onComplete={(code) => {
    AccessibilityInfo.announceForAccessibility(
      'Verification code entered. Verifying...'
    );
    verifyCode(code);
  }}
/>
```

---

## Complete Examples

### Full Verification Flow

```typescript
import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { FormProvider, SmartOTPField, useSmartForm } from 'react-native-fn-forms';

const OTPVerification = ({ phoneNumber, onSuccess }) => {
  const [timer, setTimer] = useState(60);
  const [isVerifying, setIsVerifying] = useState(false);
  const [canResend, setCanResend] = useState(false);

  const form = useSmartForm({
    fields: {
      otp: {
        type: 'otp',
        required: true,
        length: 6,
      },
    },
  });

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleVerify = async (code: string) => {
    setIsVerifying(true);
    try {
      const result = await verifyOTP(phoneNumber, code);
      if (result.success) {
        onSuccess();
      } else {
        form.setFieldError('otp', 'Invalid code. Please try again.');
      }
    } catch (error) {
      form.setFieldError('otp', 'Verification failed. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    await resendOTP(phoneNumber);
    form.resetForm();
    setTimer(60);
    setCanResend(false);
  };

  return (
    <FormProvider value={form}>
      <View style={styles.container}>
        <Text style={styles.title}>Verify Your Phone</Text>
        <Text style={styles.subtitle}>
          Enter the code sent to {phoneNumber}
        </Text>

        <SmartOTPField
          name="otp"
          length={6}
          autoFocus={true}
          autoSubmit={true}
          onComplete={handleVerify}
          inputStyle={styles.otpInput}
          style={styles.otpContainer}
        />

        {isVerifying && (
          <ActivityIndicator size="large" color="#007AFF" />
        )}

        <View style={styles.footer}>
          {canResend ? (
            <TouchableOpacity onPress={handleResend}>
              <Text style={styles.resendText}>Resend Code</Text>
            </TouchableOpacity>
          ) : (
            <Text style={styles.timerText}>
              Resend code in {timer}s
            </Text>
          )}
        </View>
      </View>
    </FormProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
  },
  otpContainer: {
    marginBottom: 24,
  },
  otpInput: {
    borderWidth: 2,
    borderColor: '#007AFF',
    borderRadius: 12,
    fontSize: 24,
    fontWeight: 'bold',
  },
  footer: {
    alignItems: 'center',
    marginTop: 16,
  },
  resendText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
  timerText: {
    color: '#666',
    fontSize: 14,
  },
});
```

---

## Best Practices

### 1. Use Auto-Submit for Better UX

```typescript
// ✅ Good - Auto-submits when complete
<SmartOTPField
  name="otp"
  length={6}
  autoSubmit={true}
  onComplete={handleVerify}
/>
```

### 2. Provide Clear Instructions

```typescript
<Text>Enter the 6-digit code sent to {phoneNumber}</Text>
<SmartOTPField name="otp" length={6} />
```

### 3. Add Resend Option

```typescript
{canResend && (
  <TouchableOpacity onPress={handleResend}>
    <Text>Didn't receive code? Resend</Text>
  </TouchableOpacity>
)}
```

### 4. Handle Errors Gracefully

```typescript
const handleVerify = async (code: string) => {
  try {
    await verifyOTP(code);
  } catch (error) {
    form.setFieldError('otp', 'Invalid code. Please try again.');
    form.resetForm(); // Clear OTP for retry
  }
};
```

### 5. Show Loading State

```typescript
{isVerifying && <ActivityIndicator />}
```

---

## Related Documentation

- 🎯 [useSmartForm Hook](useSmartForm.md)
- 📦 [SmartFormField Component](SmartFormField.md)
- 🔐 [OTP Guide](../guides/otp.md)
- 📋 [Example Forms](../examples/)

---

**Version:** 1.1.1  
**Last Updated:** November 14, 2025
