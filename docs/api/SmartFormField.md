# SmartFormField Component

Pre-built form field component with built-in validation display and error handling.

---

## Import

```typescript
import { SmartFormField } from 'react-native-fn-forms';
```

## Description

`SmartFormField` is a ready-to-use form input component that automatically connects to your form state via `FormProvider`. It handles:

- ✅ Value binding
- ✅ Validation display
- ✅ Error messages
- ✅ Touch state management
- ✅ Accessibility features
- ✅ Platform-specific optimizations

---

## Props

| Prop          | Type        | Required | Default | Description                             |
| ------------- | ----------- | -------- | ------- | --------------------------------------- |
| `name`        | `string`    | Yes      | -       | Field name (must match field in config) |
| `label`       | `string`    | No       | -       | Label text displayed above input        |
| `placeholder` | `string`    | No       | -       | Placeholder text for input              |
| `style`       | `ViewStyle` | No       | -       | Custom style for input container        |
| `inputStyle`  | `TextStyle` | No       | -       | Custom style for TextInput              |
| `errorStyle`  | `TextStyle` | No       | -       | Custom style for error text             |
| `labelStyle`  | `TextStyle` | No       | -       | Custom style for label text             |

**Note:** `SmartFormField` accepts all standard React Native `TextInput` props (e.g., `secureTextEntry`, `keyboardType`, `autoCapitalize`, `maxLength`, `multiline`, etc.) in addition to the props listed above.

---

## Basic Usage

### Simple Field

```typescript
import { FormProvider, SmartFormField, useSmartForm } from 'react-native-fn-forms';

const MyForm = () => {
  const form = useSmartForm({
    fields: {
      email: {
        type: 'email',
        required: true,
      },
    },
  });

  return (
    <FormProvider value={form}>
      <SmartFormField
        name="email"
        label="Email Address"
        placeholder="Enter your email"
      />
    </FormProvider>
  );
};
```

### Multiple Fields

```typescript
const RegistrationForm = () => {
  const form = useSmartForm({
    fields: {
      fullName: { type: 'personName', required: true },
      email: { type: 'email', required: true },
      phone: { type: 'phone', required: true },
      password: { type: 'password', required: true, minLength: 8 },
    },
  });

  return (
    <FormProvider value={form}>
      <SmartFormField
        name="fullName"
        label="Full Name"
        placeholder="John Doe"
      />

      <SmartFormField
        name="email"
        label="Email Address"
        placeholder="john@example.com"
      />

      <SmartFormField
        name="phone"
        label="Phone Number"
        placeholder="(555) 123-4567"
      />

      <SmartFormField
        name="password"
        label="Password"
        placeholder="Min. 8 characters"
      />
    </FormProvider>
  );
};
```

---

## Custom Styling

### Individual Styles

```typescript
<SmartFormField
  name="email"
  label="Email"
  placeholder="you@example.com"
  style={styles.fieldContainer}
  labelStyle={styles.label}
  inputStyle={styles.input}
  errorStyle={styles.error}
/>

const styles = StyleSheet.create({
  fieldContainer: {
    marginBottom: 20,
    paddingHorizontal: 16,
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
});
```

### Themed Fields

```typescript
const ThemedFormField = ({ name, label, placeholder }) => {
  const isDark = useColorScheme() === 'dark';

  return (
    <SmartFormField
      name={name}
      label={label}
      placeholder={placeholder}
      style={{
        backgroundColor: isDark ? '#1a1a1a' : '#ffffff',
      }}
      inputStyle={{
        color: isDark ? '#ffffff' : '#000000',
        borderColor: isDark ? '#333' : '#ddd',
      }}
      labelStyle={{
        color: isDark ? '#ffffff' : '#000000',
      }}
      errorStyle={{
        color: isDark ? '#ff6b6b' : '#e74c3c',
      }}
    />
  );
};
```

---

## Advanced Usage

### With Icons

```typescript
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const EmailField = () => {
  return (
    <View style={styles.container}>
      <Icon name="mail-outline" size={20} style={styles.icon} />
      <SmartFormField
        name="email"
        label="Email"
        placeholder="you@example.com"
        style={styles.field}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
    color: '#666',
  },
  field: {
    flex: 1,
  },
});
```

### With Visibility Toggle (Password)

```typescript
import { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const PasswordField = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={{ position: 'relative' }}>
      <SmartFormField
        name="password"
        label="Password"
        placeholder="Enter password"
        secureTextEntry={!showPassword}
      />
      <TouchableOpacity
        style={styles.eyeIcon}
        onPress={() => setShowPassword(!showPassword)}
      >
        <Icon
          name={showPassword ? 'eye-off-outline' : 'eye-outline'}
          size={20}
        />
      </TouchableOpacity>
    </View>
  );
};
```

### Conditional Rendering

```typescript
const ConditionalFields = () => {
  const form = useFormContext();
  const accountType = form.values.accountType;

  return (
    <>
      <SmartFormField
        name="accountType"
        label="Account Type"
        placeholder="Select type"
      />

      {accountType === 'business' && (
        <>
          <SmartFormField
            name="companyName"
            label="Company Name"
            placeholder="Your company"
          />
          <SmartFormField
            name="taxId"
            label="Tax ID"
            placeholder="XX-XXXXXXX"
          />
        </>
      )}
    </>
  );
};
```

---

## Integration Examples

### With React Native Paper

```typescript
import { TextInput } from 'react-native-paper';
import { useFormContext } from 'react-native-fn-forms';

const PaperFormField = ({ name, label }) => {
  const form = useFormContext();
  const fieldProps = form.getFieldProps(name);

  return (
    <TextInput
      label={label}
      value={fieldProps.value}
      onChangeText={fieldProps.onChangeText}
      onBlur={fieldProps.onBlur}
      error={fieldProps.touched && !!fieldProps.error}
      mode="outlined"
    />
  );
};
```

### With Native Base

```typescript
import { FormControl, Input, WarningOutlineIcon } from 'native-base';
import { useFormContext } from 'react-native-fn-forms';

const NativeBaseField = ({ name, label }) => {
  const form = useFormContext();
  const fieldProps = form.getFieldProps(name);

  return (
    <FormControl isInvalid={fieldProps.touched && !!fieldProps.error}>
      <FormControl.Label>{label}</FormControl.Label>
      <Input
        value={fieldProps.value}
        onChangeText={fieldProps.onChangeText}
        onBlur={fieldProps.onBlur}
      />
      <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
        {fieldProps.error}
      </FormControl.ErrorMessage>
    </FormControl>
  );
};
```

---

## Default Behavior

### Automatic Features

When you use `SmartFormField`, it automatically:

1. **Connects to form state** - No manual wiring needed
2. **Shows validation errors** - Displays below input when field is touched
3. **Applies error styling** - Red border when field has error
4. **Handles accessibility** - Screen reader support included
5. **Platform optimizations** - iOS/Android specific keyboard types

### Default Styles

```typescript
// Default container style
{
  marginBottom: 16,
}

// Default input style
{
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 4,
  padding: 12,
  fontSize: 16,
}

// Default input style (error state)
{
  borderColor: '#e74c3c',
}

// Default label style
{
  fontSize: 14,
  marginBottom: 4,
  color: '#333',
}

// Default error style
{
  color: '#e74c3c',
  fontSize: 12,
  marginTop: 4,
}
```

---

## Accessibility

### Built-in Features

`SmartFormField` includes:

- ✅ **accessibilityLabel** - Generated from field name
- ✅ **accessibilityHint** - From field configuration
- ✅ **accessibilityRole** - Set to "text"
- ✅ **Error announcements** - Screen reader speaks errors
- ✅ **Required indicators** - Announced for required fields

### Custom Accessibility

```typescript
const form = useSmartForm({
  fields: {
    email: {
      type: 'email',
      required: true,
      accessibility: {
        label: 'Email address input',
        hint: 'Enter your email to continue',
        role: 'text',
      },
    },
  },
});
```

---

## Performance Tips

### Avoid Inline Styles

```typescript
// ❌ Bad - Creates new object on every render
<SmartFormField
  name="email"
  style={{ marginBottom: 20 }}
/>

// ✅ Good - Reuses same style object
const styles = StyleSheet.create({
  field: { marginBottom: 20 }
});

<SmartFormField
  name="email"
  style={styles.field}
/>
```

### Memoize Complex Fields

```typescript
import { memo } from 'react';

const EmailField = memo(() => (
  <SmartFormField
    name="email"
    label="Email Address"
    placeholder="you@example.com"
  />
));
```

---

## Common Patterns

### Form with Submit Button

```typescript
const LoginForm = () => {
  const form = useSmartForm({
    fields: {
      email: { type: 'email', required: true },
      password: { type: 'password', required: true, minLength: 8 },
    },
  });

  const handleLogin = async () => {
    await form.submitForm();
    if (form.isValid) {
      // Proceed with login
      loginUser(form.values);
    }
  };

  return (
    <FormProvider value={form}>
      <SmartFormField
        name="email"
        label="Email"
        placeholder="you@example.com"
      />

      <SmartFormField
        name="password"
        label="Password"
        placeholder="Enter password"
      />

      <Button
        title="Login"
        onPress={handleLogin}
        disabled={form.isSubmitting}
      />
    </FormProvider>
  );
};
```

### Form with Reset

```typescript
<View>
  <SmartFormField name="email" label="Email" />
  <SmartFormField name="password" label="Password" />

  <View style={styles.buttons}>
    <Button title="Submit" onPress={form.submitForm} />
    <Button title="Reset" onPress={form.resetForm} />
  </View>
</View>
```

---

## Related Documentation

- 🎯 [useSmartForm Hook](useSmartForm.md)
- 🔐 [SmartOTPField Component](SmartOTPField.md)
- ✅ [Validation Guide](../guides/validation.md)
- 🎨 [Styling Guide](../guides/styling.md)
- 📋 [Example Forms](../examples/)

---

**Version:** 1.1.1  
**Last Updated:** November 14, 2025
