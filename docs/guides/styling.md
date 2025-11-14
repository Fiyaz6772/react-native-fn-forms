# SmartFormField Styling Guide

This guide shows your development team how to apply custom styling to `SmartFormField` components in the `react-native-fn-forms` library.

## Available Style Props

The `SmartFormField` component accepts three styling props:

- `style` - Custom styles for the TextInput
- `labelStyle` - Custom styles for the field label
- `errorStyle` - Custom styles for error text

## Basic Usage

```jsx
import { SmartFormField } from 'react-native-fn-forms';

<SmartFormField
  name="email"
  label="Email Address"
  placeholder="Enter your email"
  style={styles.customInput}
  labelStyle={styles.customLabel}
  errorStyle={styles.customError}
/>;
```

## Styling Examples

### 1. Basic Custom Input Style (LoginScreen.js)

```jsx
const styles = StyleSheet.create({
  customInput: {
    borderWidth: 2,
    borderColor: '#e0e6ed',
    borderRadius: 10,
    padding: 16,
    fontSize: 16,
    backgroundColor: '#f8f9fa',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  customLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 8,
  },
  customError: {
    color: '#e74c3c',
    fontSize: 14,
    fontWeight: '500',
    marginTop: 6,
    fontStyle: 'italic',
  },
});
```

### 2. Premium Business Style (SignupScreen.js)

```jsx
const styles = StyleSheet.create({
  premiumInput: {
    borderWidth: 1.5,
    borderColor: '#d6dae5',
    borderRadius: 12,
    padding: 18,
    fontSize: 16,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  premiumLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#34495e',
    marginBottom: 10,
    letterSpacing: 0.5,
  },
  premiumError: {
    color: '#e74c3c',
    fontSize: 13,
    fontWeight: '500',
    marginTop: 8,
    paddingLeft: 4,
  },
});
```

### 3. Special Highlight Style (for important fields)

```jsx
const styles = StyleSheet.create({
  specialInput: {
    borderWidth: 2,
    borderColor: '#3498db',
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    backgroundColor: '#f8fbff',
  },
  specialLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2980b9',
    marginBottom: 8,
  },
  specialError: {
    color: '#e67e22',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 6,
    backgroundColor: '#fef5e7',
    padding: 8,
    borderRadius: 4,
  },
});
```

### 4. Password Field Style

```jsx
const styles = StyleSheet.create({
  passwordInput: {
    borderWidth: 2,
    borderColor: '#9b59b6',
    borderRadius: 10,
    padding: 16,
    fontSize: 16,
    backgroundColor: '#faf5ff',
  },
  passwordLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8e44ad',
    marginBottom: 8,
  },
  passwordError: {
    color: '#c0392b',
    fontSize: 13,
    fontWeight: '500',
    marginTop: 6,
    backgroundColor: '#fadbd8',
    padding: 6,
    borderRadius: 4,
    borderLeftWidth: 3,
    borderLeftColor: '#e74c3c',
    paddingLeft: 10,
  },
});
```

## Implementation Examples

### Basic Form (from LoginScreen.js)

```jsx
<SmartFormField
  name="email"
  label="Email Address"
  placeholder="Enter your email"
  style={styles.customInput}
  labelStyle={styles.customLabel}
  errorStyle={styles.customError}
/>

<SmartFormField
  name="password"
  label="Password"
  placeholder="Enter your password"
  style={styles.customInput}
  labelStyle={styles.customLabel}
  errorStyle={styles.customError}
/>
```

### Advanced Form with Different Styles (from SignupScreen.js)

```jsx
// Regular fields with premium style
<SmartFormField
  name="fullName"
  label="Full Name *"
  placeholder="Enter your full name"
  style={styles.premiumInput}
  labelStyle={styles.premiumLabel}
  errorStyle={styles.premiumError}
/>

// Special field with highlight
<SmartFormField
  name="username"
  label="Username *"
  placeholder="Choose a username"
  style={styles.specialInput}
  labelStyle={styles.specialLabel}
  errorStyle={styles.specialError}
/>

// Password fields with security styling
<SmartFormField
  name="password"
  label="Password *"
  placeholder="Create a strong password"
  style={styles.passwordInput}
  labelStyle={styles.passwordLabel}
  errorStyle={styles.passwordError}
/>
```

## Key Features

1. **Automatic Error States**: The library automatically applies error styling when validation fails
2. **Built-in Validation**: Smart validation based on field type (email, phone, password, etc.)
3. **Custom Styling**: Full control over input, label, and error text appearance
4. **Cross-Platform**: Works on both iOS and Android
5. **Accessibility**: Proper accessibility labels and hints are automatically applied

## Best Practices

1. **Consistent Styling**: Use similar styling patterns across your app for better UX
2. **Error Visibility**: Make error messages clearly visible with contrasting colors
3. **Focus States**: Consider adding focus state styling for better interaction feedback
4. **Platform Differences**: Test styling on both iOS and Android for consistency

## Default Styling Override

The library provides sensible defaults, but your custom styles will override them:

```jsx
// Default styles are merged with your custom styles
style={[defaultStyles.input, yourCustomStyle, errorState && errorStyles]}
```

This gives you complete control while maintaining functionality.
