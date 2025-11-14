# Auto-save & Draft Recovery Example

Complete example of using auto-save and draft recovery features.

---

## Overview

This example demonstrates how to implement automatic form draft saving and recovery, preventing users from losing their progress.

---

## Complete Example with AsyncStorage

```typescript
import React, { useEffect } from 'react';
import { View, Button, StyleSheet, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSmartForm, FormProvider, SmartFormField } from 'react-native-fn-forms';

const AutoSaveExample = () => {
  const form = useSmartForm({
    fields: {
      fullName: { type: 'personName', required: true },
      email: { type: 'email', required: true },
      phone: { type: 'phone', required: true },
      address: { type: 'streetAddress', required: false },
    },
    autoSave: {
      enabled: true,
      debounce: 1000,
      key: 'registration-form-draft',
      expirationDays: 7,
      storage: {
        save: async (key, data) => {
          await AsyncStorage.setItem(key, data);
        },
        load: async (key) => {
          return await AsyncStorage.getItem(key);
        },
        remove: async (key) => {
          await AsyncStorage.removeItem(key);
        },
      },
    },
    onDraftFound: (draft) => {
      Alert.alert(
        'Resume your form?',
        `You have unsaved changes from ${new Date(draft.timestamp).toLocaleDateString()}`,
        [
          {
            text: 'Discard',
            style: 'destructive',
            onPress: () => form.clearDraft(),
          },
          {
            text: 'Resume',
            onPress: () => form.loadDraft(draft),
          },
        ]
      );
    },
    onAutoSave: (data) => {
      console.log('Form auto-saved at:', new Date(data.timestamp).toLocaleTimeString());
    },
  });

  const handleSubmit = async () => {
    await form.submitForm();
    if (form.isValid) {
      console.log('Form submitted:', form.values);
      // Clear draft after successful submission
      await form.clearDraft();
    }
  };

  return (
    <ScrollView style={styles.container}>
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
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <SmartFormField
          name="phone"
          label="Phone Number"
          placeholder="(555) 123-4567"
          keyboardType="phone-pad"
        />

        <SmartFormField
          name="address"
          label="Address (Optional)"
          placeholder="123 Main St"
        />

        <View style={styles.buttonContainer}>
          <Button title="Submit" onPress={handleSubmit} disabled={form.isSubmitting} />
          <Button
            title="Clear Draft"
            onPress={() => form.clearDraft()}
            color="#666"
          />
        </View>
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
  buttonContainer: {
    marginTop: 20,
    gap: 10,
  },
});

export default AutoSaveExample;
```

---

## Example with MMKV Storage

```typescript
import { MMKV } from 'react-native-mmkv';

const storage = new MMKV();

const form = useSmartForm({
  fields: {
    // ... your fields
  },
  autoSave: {
    enabled: true,
    debounce: 500,
    key: 'my-form-draft',
    storage: {
      save: async (key, data) => {
        storage.set(key, data);
      },
      load: async key => {
        return storage.getString(key) || null;
      },
      remove: async key => {
        storage.delete(key);
      },
    },
  },
});
```

---

## Example with Secure Storage (Sensitive Data)

```typescript
import * as SecureStore from 'expo-secure-store';

const form = useSmartForm({
  fields: {
    ssn: { type: 'text', required: true },
    creditCard: { type: 'creditCard', required: true },
  },
  autoSave: {
    enabled: true,
    debounce: 1000,
    key: 'sensitive-form-draft',
    expirationDays: 1, // Expire after 1 day for security
    storage: {
      save: async (key, data) => {
        await SecureStore.setItemAsync(key, data);
      },
      load: async key => {
        return await SecureStore.getItemAsync(key);
      },
      remove: async key => {
        await SecureStore.deleteItemAsync(key);
      },
    },
  },
});
```

---

## Manual Draft Management

```typescript
const MyForm = () => {
  const form = useSmartForm({
    fields: { /* ... */ },
    autoSave: {
      enabled: true,
      storage: { /* ... */ },
      key: 'my-form',
    },
  });

  // Save draft manually
  const handleSaveDraft = async () => {
    await form.saveDraft();
    Alert.alert('Success', 'Your progress has been saved');
  };

  // Check if draft exists
  const checkDraft = async () => {
    const exists = await form.hasDraft();
    console.log('Draft exists:', exists);
  };

  // Load draft manually
  const handleLoadDraft = async () => {
    const data = await form.storage.load('my-form');
    if (data) {
      const draft = JSON.parse(data);
      form.loadDraft(draft);
    }
  };

  return (
    <View>
      <Button title="Save Draft" onPress={handleSaveDraft} />
      <Button title="Check Draft" onPress={checkDraft} />
      <Button title="Load Draft" onPress={handleLoadDraft} />
      <Button title="Clear Draft" onPress={() => form.clearDraft()} />
    </View>
  );
};
```

---

## Configuration Options

### `autoSave.enabled`

Enable or disable auto-save functionality.

```typescript
autoSave: {
  enabled: true, // default: false
}
```

### `autoSave.debounce`

Delay in milliseconds before saving after user stops typing.

```typescript
autoSave: {
  enabled: true,
  debounce: 1000, // default: 1000ms
}
```

### `autoSave.key`

Unique key for storing the draft. Use different keys for different forms.

```typescript
autoSave: {
  enabled: true,
  key: 'registration-form-draft',
}
```

### `autoSave.expirationDays`

Number of days before draft expires and is automatically discarded.

```typescript
autoSave: {
  enabled: true,
  expirationDays: 7, // default: no expiration
}
```

### `autoSave.storage`

Storage adapter implementing the `StorageAdapter` interface.

```typescript
interface StorageAdapter {
  save: (key: string, data: string) => Promise<void>;
  load: (key: string) => Promise<string | null>;
  remove: (key: string) => Promise<void>;
}
```

---

## Callbacks

### `onDraftFound`

Called when a draft is found on mount. Use this to prompt user to restore.

```typescript
onDraftFound: draft => {
  Alert.alert('Resume?', 'You have unsaved changes', [
    { text: 'Discard', onPress: () => form.clearDraft() },
    { text: 'Resume', onPress: () => form.loadDraft(draft) },
  ]);
};
```

### `onAutoSave`

Called every time form is auto-saved.

```typescript
onAutoSave: data => {
  console.log('Saved at:', new Date(data.timestamp));
  showToast('Progress saved');
};
```

---

## API Methods

### `saveDraft()`

Manually save current form state.

```typescript
await form.saveDraft();
```

### `loadDraft(draft?)`

Load a draft into the form. If no draft is provided, loads from storage.

```typescript
form.loadDraft(draft);
```

### `clearDraft()`

Remove saved draft from storage.

```typescript
await form.clearDraft();
```

### `hasDraft()`

Check if a draft exists in storage.

```typescript
const exists = await form.hasDraft();
if (exists) {
  // Show restore option
}
```

---

## Storage Adapters

### AsyncStorage

```typescript
import AsyncStorage from '@react-native-async-storage/async-storage';

storage: {
  save: async (key, data) => await AsyncStorage.setItem(key, data),
  load: async (key) => await AsyncStorage.getItem(key),
  remove: async (key) => await AsyncStorage.removeItem(key),
}
```

### MMKV (Fast)

```typescript
import { MMKV } from 'react-native-mmkv';

const mmkv = new MMKV();

storage: {
  save: async (key, data) => mmkv.set(key, data),
  load: async (key) => mmkv.getString(key) || null,
  remove: async (key) => mmkv.delete(key),
}
```

### Expo SecureStore

```typescript
import * as SecureStore from 'expo-secure-store';

storage: {
  save: async (key, data) => await SecureStore.setItemAsync(key, data),
  load: async (key) => await SecureStore.getItemAsync(key),
  remove: async (key) => await SecureStore.deleteItemAsync(key),
}
```

### React Native Encrypted Storage

```typescript
import EncryptedStorage from 'react-native-encrypted-storage';

storage: {
  save: async (key, data) => await EncryptedStorage.setItem(key, data),
  load: async (key) => await EncryptedStorage.getItem(key),
  remove: async (key) => await EncryptedStorage.removeItem(key),
}
```

### Web localStorage

```typescript
storage: {
  save: async (key, data) => {
    localStorage.setItem(key, data);
  },
  load: async (key) => {
    return localStorage.getItem(key);
  },
  remove: async (key) => {
    localStorage.removeItem(key);
  },
}
```

---

## Best Practices

### 1. Use Unique Keys

Different forms should have different storage keys:

```typescript
// Registration form
autoSave: {
  key: 'registration-form-draft';
}

// Profile edit form
autoSave: {
  key: 'profile-edit-draft';
}

// Payment form
autoSave: {
  key: 'payment-form-draft';
}
```

### 2. Set Appropriate Debounce

Balance between saving frequently and performance:

```typescript
// Long forms - save less frequently
autoSave: {
  debounce: 2000;
}

// Short forms - save more frequently
autoSave: {
  debounce: 500;
}
```

### 3. Use Expiration for Sensitive Data

```typescript
autoSave: {
  expirationDays: 1, // 24 hours for sensitive forms
}
```

### 4. Clear Draft After Submission

```typescript
const handleSubmit = async () => {
  await form.submitForm();
  if (form.isValid) {
    await form.clearDraft(); // ✅ Clean up
  }
};
```

### 5. Use Secure Storage for Sensitive Forms

```typescript
// ✅ Use SecureStore/EncryptedStorage for:
// - Credit card forms
// - SSN/Tax forms
// - Password/security forms

// ✅ Use AsyncStorage/MMKV for:
// - Contact forms
// - Registration forms
// - Profile updates
```

---

## Common Patterns

### Auto-save with Visual Indicator

```typescript
const [lastSaved, setLastSaved] = useState<Date | null>(null);

const form = useSmartForm({
  // ...
  onAutoSave: (data) => {
    setLastSaved(new Date(data.timestamp));
  },
});

return (
  <View>
    {lastSaved && (
      <Text>Last saved: {lastSaved.toLocaleTimeString()}</Text>
    )}
    {/* Form fields */}
  </View>
);
```

### Prompt Before Discard

```typescript
onDraftFound: draft => {
  const age = Date.now() - draft.timestamp;
  const hours = Math.floor(age / (1000 * 60 * 60));

  Alert.alert('Resume your form?', `You have unsaved changes from ${hours} hours ago`, [
    { text: 'Start Fresh', onPress: () => form.clearDraft() },
    { text: 'Resume', onPress: () => form.loadDraft(draft) },
  ]);
};
```

### Multiple Drafts (User-specific)

```typescript
const userId = await getUserId();

autoSave: {
  enabled: true,
  key: `form-draft-${userId}`, // User-specific draft
  storage: { /* ... */ },
}
```

---

## Troubleshooting

### Draft Not Loading

Ensure `onDraftFound` callback either calls `loadDraft()` or handles the draft:

```typescript
onDraftFound: draft => {
  form.loadDraft(draft); // ✅ Load it
  // OR show alert with option to load
};
```

### Draft Not Saving

Check storage adapter is properly configured and async:

```typescript
storage: {
  save: async (key, data) => { // ✅ Async
    await AsyncStorage.setItem(key, data);
  },
  // ...
}
```

### Expired Draft Still Showing

Ensure expiration check is working:

```typescript
autoSave: {
  expirationDays: 7,
  // Draft older than 7 days will be automatically discarded
}
```

---

## See Also

- [useSmartForm Hook](../api/useSmartForm.md) - Full API reference
- [Field Types Guide](../guides/field-types.md) - All available field types
- [Login Form Example](./login-form.md) - Simple form example
- [Signup Form Example](./signup-form.md) - Registration form
