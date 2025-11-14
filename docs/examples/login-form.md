# Login Form Example

Complete example of a login form using React Native FN Forms.

---

## Overview

This example demonstrates:

- ✅ Email and password validation
- ✅ "Remember me" checkbox
- ✅ Form submission handling
- ✅ Error display
- ✅ Loading states
- ✅ Custom styling

---

## Complete Code

```typescript
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {
  useSmartForm,
  FormProvider,
  SmartFormField,
} from 'react-native-fn-forms';

const LoginForm = ({ onLoginSuccess }) => {
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useSmartForm({
    fields: {
      email: {
        type: 'email',
        required: true,
        maxLength: 100,
        inputProps: {
          autoCapitalize: 'none',
          autoComplete: 'email',
          keyboardType: 'email-address',
        },
      },
      password: {
        type: 'password',
        required: true,
        minLength: 8,
        inputProps: {
          autoCapitalize: 'none',
          autoComplete: 'password',
          secureTextEntry: true,
        },
      },
    },
    validation: {
      mode: 'onChange',
      debounce: 300,
      showErrorsOn: 'touched',
    },
  });

  const handleLogin = async () => {
    await form.submitForm();

    if (!form.isValid) {
      Alert.alert('Error', 'Please fix the errors before continuing');
      return;
    }

    setIsLoading(true);

    try {
      // API call to login
      const response = await fetch('https://api.example.com/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: form.values.email,
          password: form.values.password,
          rememberMe,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Login successful
        onLoginSuccess(data);
      } else {
        // Login failed
        form.setFieldError('email', data.message || 'Invalid credentials');
      }
    } catch (error) {
      Alert.alert('Error', 'Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormProvider value={form}>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Sign in to continue</Text>

        <SmartFormField
          name="email"
          label="Email Address"
          placeholder="you@example.com"
          style={styles.field}
          labelStyle={styles.label}
          inputStyle={styles.input}
          errorStyle={styles.error}
        />

        <SmartFormField
          name="password"
          label="Password"
          placeholder="Enter your password"
          style={styles.field}
          labelStyle={styles.label}
          inputStyle={styles.input}
          errorStyle={styles.error}
        />

        <View style={styles.rememberMeContainer}>
          <TouchableOpacity
            style={styles.checkbox}
            onPress={() => setRememberMe(!rememberMe)}
          >
            <View
              style={[
                styles.checkboxBox,
                rememberMe && styles.checkboxBoxChecked,
              ]}
            >
              {rememberMe && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={styles.checkboxLabel}>Remember me</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
          onPress={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.loginButtonText}>Login</Text>
          )}
        </TouchableOpacity>

        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don't have an account? </Text>
          <TouchableOpacity>
            <Text style={styles.signupLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </FormProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
  },
  field: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  error: {
    color: '#e74c3c',
    fontSize: 12,
    marginTop: 4,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxBox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 4,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxBoxChecked: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  checkmark: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#333',
  },
  forgotPassword: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
  },
  loginButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  loginButtonDisabled: {
    opacity: 0.6,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupText: {
    fontSize: 14,
    color: '#666',
  },
  signupLink: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
  },
});

export default LoginForm;
```

---

## Key Features Explained

### 1. Email Validation

```typescript
email: {
  type: 'email',          // Automatic email validation
  required: true,         // Cannot be empty
  maxLength: 100,         // Prevent excessively long inputs
  inputProps: {
    autoCapitalize: 'none',      // No auto-capitalization
    autoComplete: 'email',       // Browser/OS autofill
    keyboardType: 'email-address' // Email keyboard
  }
}
```

### 2. Password Security

```typescript
password: {
  type: 'password',
  required: true,
  minLength: 8,           // Enforce minimum length
  inputProps: {
    autoCapitalize: 'none',
    autoComplete: 'password',
    secureTextEntry: true  // Hide password
  }
}
```

### 3. Form Submission

```typescript
const handleLogin = async () => {
  // Validate all fields
  await form.submitForm();

  // Check if form is valid
  if (!form.isValid) {
    Alert.alert('Error', 'Please fix the errors');
    return;
  }

  // Access form values
  console.log(form.values.email);
  console.log(form.values.password);

  // Make API call
  // ...
};
```

### 4. Loading State

```typescript
const [isLoading, setIsLoading] = useState(false);

// During API call
setIsLoading(true);
try {
  await loginAPI();
} finally {
  setIsLoading(false);
}

// In button
<TouchableOpacity disabled={isLoading}>
  {isLoading ? <ActivityIndicator /> : <Text>Login</Text>}
</TouchableOpacity>
```

### 5. Server-side Error Handling

```typescript
try {
  const response = await fetch('/login', {
    /* ... */
  });
  const data = await response.json();

  if (!response.ok) {
    // Set error on specific field
    form.setFieldError('email', data.message);
  }
} catch (error) {
  // Handle network error
  Alert.alert('Error', 'Network error');
}
```

---

## Variations

### With Password Visibility Toggle

```typescript
const [showPassword, setShowPassword] = useState(false);

<View style={styles.passwordContainer}>
  <SmartFormField
    name="password"
    label="Password"
    placeholder="Enter password"
    inputProps={{ secureTextEntry: !showPassword }}
  />
  <TouchableOpacity
    style={styles.eyeIcon}
    onPress={() => setShowPassword(!showPassword)}
  >
    <Icon name={showPassword ? 'eye-off' : 'eye'} size={20} />
  </TouchableOpacity>
</View>
```

### With Social Login

```typescript
<View style={styles.socialContainer}>
  <TouchableOpacity style={styles.socialButton}>
    <Icon name="google" size={20} />
    <Text>Google</Text>
  </TouchableOpacity>

  <TouchableOpacity style={styles.socialButton}>
    <Icon name="facebook" size={20} />
    <Text>Facebook</Text>
  </TouchableOpacity>
</View>

<View style={styles.divider}>
  <View style={styles.dividerLine} />
  <Text style={styles.dividerText}>OR</Text>
  <View style={styles.dividerLine} />
</View>
```

### With Biometric Login

```typescript
import TouchID from 'react-native-touch-id';

const handleBiometricLogin = async () => {
  try {
    await TouchID.authenticate('Login with biometrics');
    // Proceed with saved credentials
  } catch (error) {
    console.log('Biometric authentication failed');
  }
};

<TouchableOpacity onPress={handleBiometricLogin}>
  <Icon name="fingerprint" size={40} />
  <Text>Use Biometrics</Text>
</TouchableOpacity>
```

---

## Testing

```typescript
import { render, fireEvent, waitFor } from '@testing-library/react-native';

describe('LoginForm', () => {
  it('shows validation errors for empty fields', async () => {
    const { getByText, getByPlaceholderText } = render(<LoginForm />);

    const loginButton = getByText('Login');
    fireEvent.press(loginButton);

    await waitFor(() => {
      expect(getByText('This field is required')).toBeTruthy();
    });
  });

  it('shows error for invalid email', async () => {
    const { getByPlaceholderText, getByText } = render(<LoginForm />);

    const emailInput = getByPlaceholderText('you@example.com');
    fireEvent.changeText(emailInput, 'invalid-email');

    await waitFor(() => {
      expect(getByText('Please enter a valid email')).toBeTruthy();
    });
  });

  it('calls onLoginSuccess with correct data', async () => {
    const mockLogin = jest.fn();
    const { getByPlaceholderText, getByText } = render(
      <LoginForm onLoginSuccess={mockLogin} />
    );

    fireEvent.changeText(
      getByPlaceholderText('you@example.com'),
      'test@example.com'
    );
    fireEvent.changeText(
      getByPlaceholderText('Enter your password'),
      'password123'
    );

    fireEvent.press(getByText('Login'));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalled();
    });
  });
});
```

---

## Related Examples

- 📝 [Signup Form](signup-form.md)
- 💳 [Payment Form](payment-form.md)
- 🔐 [OTP Verification](../guides/otp.md)

---

## Related Documentation

- 🎯 [useSmartForm Hook](../api/useSmartForm.md)
- 📦 [SmartFormField Component](../api/SmartFormField.md)
- ✅ [Validation Guide](../guides/validation.md)

---

**Version:** 1.1.1  
**Last Updated:** November 14, 2025
