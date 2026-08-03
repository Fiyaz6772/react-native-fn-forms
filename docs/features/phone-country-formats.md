# Multi-Country Phone Number Formatting

The SmartFormField component supports automatic phone number formatting for 14+ countries. This feature allows you to format phone numbers according to country-specific standards while preserving user input flexibility.

## Features

- **14 Countries Supported**: US, CA, GB, DE, FR, ES, IT, IN, CN, JP, PK, AE, AU, BR, MX, ZA
- **Optional Formatting**: Only formats when `countryCode` prop is provided
- **Preserves User Input**: Without country code, input remains unchanged
- **Auto-formats on Type**: Formatting applies as the user types
- **Handles Partial Input**: Works with incomplete phone numbers

## Usage

### Basic Example (No Formatting)

```tsx
import { SmartFormField } from 'react-native-fn-forms';

<SmartFormField name="phone" placeholder="Enter phone number" />;
// User types: "5551234567" → Displays: "5551234567" (no formatting)
```

### With Country Code (Auto-Formatting)

```tsx
import { SmartFormField } from 'react-native-fn-forms';

<SmartFormField name="phone" placeholder="Enter phone number" countryCode="US" />;
// User types: "5551234567" → Displays: "(555) 123-4567"
```

### Using Field Config (Recommended)

```tsx
import { useSmartForm, SmartFormField } from 'react-native-fn-forms';

const form = useSmartForm({
  fields: {
    phone: {
      type: 'phone',
      required: true,
      countryCode: 'US', // Set country code in config
    },
  },
});

<SmartFormField name="phone" placeholder="(555) 123-4567" />;
```

### Dynamic Country Selection

```tsx
const [selectedCountry, setSelectedCountry] = useState<CountryCode>('US');

const form = useSmartForm({
  fields: {
    phone: {
      type: 'phone',
      required: true,
      countryCode: selectedCountry, // Dynamic country code
    },
  },
});

<View>
  <Picker selectedValue={selectedCountry} onValueChange={setSelectedCountry}>
    <Picker.Item label="United States" value="US" />
    <Picker.Item label="United Kingdom" value="GB" />
    <Picker.Item label="India" value="IN" />
    <Picker.Item label="Australia" value="AU" />
  </Picker>

  <SmartFormField name="phone" placeholder="Enter phone number" />
</View>;
```

## Supported Countries

### North America

- **US** (United States): `(555) 123-4567` or `+1 (555) 123-4567`
- **CA** (Canada): `(416) 555-1234` or `+1 (416) 555-1234`

### Europe

- **GB** (United Kingdom): `+44 7911 123 456`
- **DE** (Germany): `+49 301 2345678`
- **FR** (France): `+33 1 23 45 67 89`
- **ES** (Spain): `+34 912 34 56 78`
- **IT** (Italy): `+39 06 1234 5678`

### Asia

- **IN** (India): `+91 98765 43210`
- **CN** (China): `+86 138 0013 8000`
- **JP** (Japan): `+81 90 1234 5678`
- **PK** (Pakistan): `+92 300 1234567`
- **AE** (UAE): `+971 50 123 4567`

### Other Regions

- **AU** (Australia): `+61 412 345 678`
- **BR** (Brazil): `+55 11 98765-4321`
- **MX** (Mexico): `+52 55 1234 5678`
- **ZA** (South Africa): `+27 82 123 4567`

## Complete Example

```tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSmartForm, SmartFormField, CountryCode } from 'react-native-fn-forms';
import { Picker } from '@react-native-picker/picker';

const InternationalPhoneForm = () => {
  const [country, setCountry] = useState<CountryCode>('US');

  const form = useSmartForm({
    fields: {
      phone: {
        type: 'phone',
        required: true,
        countryCode: country,
      },
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Country</Text>
      <Picker
        selectedValue={country}
        onValueChange={value => setCountry(value as CountryCode)}
        style={styles.picker}
      >
        <Picker.Item label="🇺🇸 United States" value="US" />
        <Picker.Item label="🇬🇧 United Kingdom" value="GB" />
        <Picker.Item label="🇮🇳 India" value="IN" />
        <Picker.Item label="🇦🇺 Australia" value="AU" />
        <Picker.Item label="🇩🇪 Germany" value="DE" />
        <Picker.Item label="🇫🇷 France" value="FR" />
        <Picker.Item label="🇧🇷 Brazil" value="BR" />
        <Picker.Item label="🇨🇳 China" value="CN" />
      </Picker>

      <SmartFormField name="phone" placeholder="Enter phone number" keyboardType="phone-pad" />

      <Text style={styles.preview}>Formatted: {form.values.phone || 'Not entered'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  picker: {
    marginBottom: 16,
  },
  preview: {
    marginTop: 16,
    fontSize: 14,
    color: '#666',
  },
});

export default InternationalPhoneForm;
```

## API Reference

### SmartFormField Props

```tsx
interface SmartFormFieldProps {
  name: string;
  countryCode?: CountryCode; // Optional country code for phone formatting
  // ... other props
}
```

### FieldConfig Type

```tsx
interface FieldConfig {
  type: 'phone';
  countryCode?: CountryCode; // Optional country code for phone formatting
  // ... other config options
}
```

### CountryCode Type

```tsx
type CountryCode =
  | 'US'
  | 'CA' // North America
  | 'GB'
  | 'DE'
  | 'FR'
  | 'ES'
  | 'IT' // Europe
  | 'IN'
  | 'CN'
  | 'JP'
  | 'PK'
  | 'AE' // Asia
  | 'AU'
  | 'BR'
  | 'MX'
  | 'ZA'; // Other
```

## Behavior

### With Country Code

- Automatically formats as user types
- Removes non-digit characters
- Applies country-specific formatting
- Example: `5551234567` → `(555) 123-4567` (US)

### Without Country Code

- Preserves exact user input
- No automatic formatting
- Allows any characters
- Example: `555-123-4567` → `555-123-4567`

## Validation

Phone validation works seamlessly with formatting:

```tsx
const form = useSmartForm({
  fields: {
    phone: {
      type: 'phone',
      required: true,
      countryCode: 'US',
      minLength: 10,
    },
  },
});
```

The validator automatically strips formatting before validation, so both formatted and unformatted numbers validate correctly.

## Best Practices

1. **Set country code in field config** for consistent formatting
2. **Provide country selector** for international forms
3. **Use appropriate placeholder** showing the expected format
4. **Set keyboardType="phone-pad"** for better UX
5. **Handle country code changes** by updating field config

## Notes

- Formatting only applies when `countryCode` is explicitly provided
- Partial numbers are preserved as-is until they match expected length
- Validation strips formatting characters before checking patterns
- All formatters handle existing formatting gracefully
