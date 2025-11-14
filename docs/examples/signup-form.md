# Signup Form Example

Complete example of a registration/signup form using React Native FN Forms.

---

## Overview

This example demonstrates:

- ✅ Multi-field validation (name, email, phone, password)
- ✅ Password confirmation matching
- ✅ Terms and conditions checkbox
- ✅ Password strength indicator
- ✅ Complex validation rules
- ✅ Form submission handling

---

## Complete Code

```typescript
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
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

const SignupForm = ({ onSignupSuccess }) => {
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useSmartForm({
    fields: {
      fullName: {
        type: 'personName',
        required: true,
        minLength: 2,
        maxLength: 50,
      },
      email: {
        type: 'email',
        required: true,
        maxLength: 100,
        customValidation: async (value) => {
          // Check if email already exists
          try {
            const response = await fetch(
              `https://api.example.com/check-email?email=${value}`
            );
            const data = await response.json();
            return data.exists ? 'Email already registered' : null;
          } catch (error) {
            return null; // Allow on error
          }
        },
        debounce: 600,
      },
      phone: {
        type: 'phone',
        required: true,
      },
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
        },
      },
      confirmPassword: {
        type: 'password',
        required: true,
        customValidation: (value) => {
          if (value !== form.values.password) {
            return 'Passwords must match';
          }
          return null;
        },
      },
    },
    validation: {
      mode: 'onChange',
      debounce: 300,
      showErrorsOn: 'touched',
    },
  });

  const getPasswordStrength = () => {
    const password = form.values.password || '';
    let strength = 0;

    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    return strength;
  };

  const getStrengthColor = () => {
    const strength = getPasswordStrength();
    if (strength <= 2) return '#e74c3c';
    if (strength <= 3) return '#f39c12';
    return '#2ecc71';
  };

  const getStrengthText = () => {
    const strength = getPasswordStrength();
    if (strength <= 2) return 'Weak';
    if (strength <= 3) return 'Medium';
    return 'Strong';
  };

  const handleSignup = async () => {
    if (!acceptedTerms) {
      Alert.alert('Error', 'Please accept the terms and conditions');
      return;
    }

    await form.submitForm();

    if (!form.isValid) {
      Alert.alert('Error', 'Please fix all errors before continuing');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('https://api.example.com/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: form.values.fullName,
          email: form.values.email,
          phone: form.values.phone,
          password: form.values.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        onSignupSuccess(data);
      } else {
        Alert.alert('Error', data.message || 'Signup failed');
      }
    } catch (error) {
      Alert.alert('Error', 'Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormProvider value={form}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Sign up to get started</Text>

        <SmartFormField
          name="fullName"
          label="Full Name"
          placeholder="John Doe"
          style={styles.field}
          labelStyle={styles.label}
          inputStyle={styles.input}
        />

        <SmartFormField
          name="email"
          label="Email Address"
          placeholder="you@example.com"
          style={styles.field}
          labelStyle={styles.label}
          inputStyle={styles.input}
        />

        <SmartFormField
          name="phone"
          label="Phone Number"
          placeholder="(555) 123-4567"
          style={styles.field}
          labelStyle={styles.label}
          inputStyle={styles.input}
        />

        <SmartFormField
          name="password"
          label="Password"
          placeholder="Min. 8 characters"
          style={styles.field}
          labelStyle={styles.label}
          inputStyle={styles.input}
        />

        {form.values.password && (
          <View style={styles.strengthContainer}>
            <Text style={styles.strengthLabel}>Password Strength:</Text>
            <View style={styles.strengthBar}>
              <View
                style={[
                  styles.strengthFill,
                  {
                    width: `${(getPasswordStrength() / 5) * 100}%`,
                    backgroundColor: getStrengthColor(),
                  },
                ]}
              />
            </View>
            <Text style={[styles.strengthText, { color: getStrengthColor() }]}>
              {getStrengthText()}
            </Text>
          </View>
        )}

        <SmartFormField
          name="confirmPassword"
          label="Confirm Password"
          placeholder="Re-enter password"
          style={styles.field}
          labelStyle={styles.label}
          inputStyle={styles.input}
        />

        <TouchableOpacity
          style={styles.termsContainer}
          onPress={() => setAcceptedTerms(!acceptedTerms)}
        >
          <View
            style={[
              styles.checkbox,
              acceptedTerms && styles.checkboxChecked,
            ]}
          >
            {acceptedTerms && <Text style={styles.checkmark}>✓</Text>}
          </View>
          <Text style={styles.termsText}>
            I agree to the{' '}
            <Text style={styles.termsLink}>Terms and Conditions</Text> and{' '}
            <Text style={styles.termsLink}>Privacy Policy</Text>
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.signupButton, isLoading && styles.signupButtonDisabled]}
          onPress={handleSignup}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.signupButtonText}>Sign Up</Text>
          )}
        </TouchableOpacity>

        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <TouchableOpacity>
            <Text style={styles.loginLink}>Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </FormProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
    marginTop: 40,
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
  strengthContainer: {
    marginBottom: 20,
  },
  strengthLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  strengthBar: {
    height: 4,
    backgroundColor: '#e0e0e0',
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 4,
  },
  strengthFill: {
    height: '100%',
    borderRadius: 2,
  },
  strengthText: {
    fontSize: 12,
    fontWeight: '600',
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 4,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  checkboxChecked: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  checkmark: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  termsText: {
    flex: 1,
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  termsLink: {
    color: '#007AFF',
    fontWeight: '600',
  },
  signupButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  signupButtonDisabled: {
    opacity: 0.6,
  },
  signupButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  loginText: {
    fontSize: 14,
    color: '#666',
  },
  loginLink: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
  },
});

export default SignupForm;
```

---

## Key Features Explained

### 1. Password Confirmation

```typescript
confirmPassword: {
  type: 'password',
  required: true,
  customValidation: (value) => {
    // Access other field values through form.values
    if (value !== form.values.password) {
      return 'Passwords must match';
    }
    return null;
  }
}
```

### 2. Password Strength Indicator

```typescript
const getPasswordStrength = () => {
  const password = form.values.password || '';
  let strength = 0;

  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^a-zA-Z0-9]/.test(password)) strength++;

  return strength; // 0-5
};

// Visual indicator
<View style={styles.strengthBar}>
  <View
    style={{
      width: `${(getPasswordStrength() / 5) * 100}%`,
      backgroundColor: getStrengthColor(),
    }}
  />
</View>
```

### 3. Async Email Validation

```typescript
email: {
  type: 'email',
  required: true,
  customValidation: async (value) => {
    // Check if email exists in database
    const response = await fetch(`/check-email?email=${value}`);
    const data = await response.json();
    return data.exists ? 'Email already registered' : null;
  },
  debounce: 600 // Wait 600ms before checking
}
```

### 4. Complex Password Validation

```typescript
password: {
  type: 'password',
  required: true,
  minLength: 8,
  customValidation: (value) => {
    const errors = [];

    if (!/[A-Z]/.test(value)) errors.push('one uppercase letter');
    if (!/[a-z]/.test(value)) errors.push('one lowercase letter');
    if (!/[0-9]/.test(value)) errors.push('one number');
    if (!/[^a-zA-Z0-9]/.test(value)) errors.push('one special character');

    if (errors.length > 0) {
      return `Password must contain ${errors.join(', ')}`;
    }

    return null;
  }
}
```

### 5. Terms Acceptance Check

```typescript
const handleSignup = async () => {
  if (!acceptedTerms) {
    Alert.alert('Error', 'Please accept the terms and conditions');
    return;
  }

  await form.submitForm();
  // ...
};
```

---

## Variations

### With Profile Picture Upload

```typescript
import ImagePicker from 'react-native-image-picker';

const [profileImage, setProfileImage] = useState(null);

const selectImage = () => {
  ImagePicker.launchImageLibrary({}, (response) => {
    if (response.uri) {
      setProfileImage(response.uri);
    }
  });
};

<TouchableOpacity style={styles.imageUpload} onPress={selectImage}>
  {profileImage ? (
    <Image source={{ uri: profileImage }} style={styles.profileImage} />
  ) : (
    <View style={styles.imagePlaceholder}>
      <Icon name="camera" size={40} />
      <Text>Add Photo</Text>
    </View>
  )}
</TouchableOpacity>
```

### With Date of Birth

```typescript
import DateTimePicker from '@react-native-community/datetimepicker';

const form = useSmartForm({
  fields: {
    // ... other fields
    birthDate: {
      type: 'date',
      required: true,
      customValidation: value => {
        const birth = new Date(value);
        const age = new Date().getFullYear() - birth.getFullYear();

        if (age < 18) {
          return 'You must be 18 or older to register';
        }
        return null;
      },
    },
  },
});
```

### With Social Signup

```typescript
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';

const handleGoogleSignup = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    // Pre-fill form with Google data
    form.setFieldValue('fullName', userInfo.user.name);
    form.setFieldValue('email', userInfo.user.email);
  } catch (error) {
    console.error(error);
  }
};

const handleFacebookSignup = async () => {
  try {
    const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
    if (!result.isCancelled) {
      const data = await AccessToken.getCurrentAccessToken();
      // Pre-fill form with Facebook data
    }
  } catch (error) {
    console.error(error);
  }
};
```

### Multi-Step Signup

```typescript
const [step, setStep] = useState(1);

const renderStep = () => {
  switch (step) {
    case 1:
      return (
        <>
          <SmartFormField name="fullName" label="Full Name" />
          <SmartFormField name="email" label="Email" />
          <Button title="Next" onPress={() => setStep(2)} />
        </>
      );
    case 2:
      return (
        <>
          <SmartFormField name="phone" label="Phone" />
          <SmartFormField name="password" label="Password" />
          <Button title="Back" onPress={() => setStep(1)} />
          <Button title="Next" onPress={() => setStep(3)} />
        </>
      );
    case 3:
      return (
        <>
          <SmartOTPField name="otp" label="Verification Code" />
          <Button title="Back" onPress={() => setStep(2)} />
          <Button title="Complete" onPress={handleSignup} />
        </>
      );
  }
};
```

---

## Testing

```typescript
import { render, fireEvent, waitFor } from '@testing-library/react-native';

describe('SignupForm', () => {
  it('validates password confirmation', async () => {
    const { getByPlaceholderText, getByText } = render(<SignupForm />);

    fireEvent.changeText(
      getByPlaceholderText('Min. 8 characters'),
      'Password123!'
    );
    fireEvent.changeText(
      getByPlaceholderText('Re-enter password'),
      'DifferentPass123!'
    );

    await waitFor(() => {
      expect(getByText('Passwords must match')).toBeTruthy();
    });
  });

  it('checks email availability', async () => {
    const mockFetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ exists: true }),
      })
    );
    global.fetch = mockFetch;

    const { getByPlaceholderText, getByText } = render(<SignupForm />);

    fireEvent.changeText(
      getByPlaceholderText('you@example.com'),
      'existing@example.com'
    );

    await waitFor(() => {
      expect(getByText('Email already registered')).toBeTruthy();
    });
  });

  it('requires terms acceptance', async () => {
    const { getByText } = render(<SignupForm />);

    fireEvent.press(getByText('Sign Up'));

    await waitFor(() => {
      expect(getByText('Please accept the terms and conditions')).toBeTruthy();
    });
  });
});
```

---

## Related Examples

- 🔐 [Login Form](login-form.md)
- 💳 [Payment Form](payment-form.md)
- 📱 [OTP Verification](../guides/otp.md)

---

## Related Documentation

- 🎯 [useSmartForm Hook](../api/useSmartForm.md)
- 📦 [SmartFormField Component](../api/SmartFormField.md)
- ✅ [Validation Guide](../guides/validation.md)

---

**Version:** 1.1.1  
**Last Updated:** November 14, 2025
