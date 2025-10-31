# React Native Smart Forms - Example Usage

This directory contains example implementations of the react-native-smart-forms library.

## Basic Example

```typescript
import React from 'react';
import { View, Button } from 'react-native';
import { useSmartForm, FormProvider, SmartFormField } from 'react-native-smart-forms';

const ExampleForm = () => {
  const form = useSmartForm({
    fields: {
      name: {
        type: 'personName',
        required: true,
        minLength: 2,
        maxLength: 50,
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
      console.log('Form submitted:', form.values);
    }
  };

  return (
    <FormProvider value={form}>
      <View style={{ padding: 20 }}>
        <SmartFormField
          name="name"
          label="Full Name"
          placeholder="Enter your full name"
        />

        <SmartFormField
          name="email"
          label="Email Address"
          placeholder="Enter your email"
        />

        <SmartFormField
          name="phone"
          label="Phone Number (Optional)"
          placeholder="Enter your phone number"
        />

        <Button
          title="Submit"
          onPress={handleSubmit}
          disabled={form.isSubmitting}
        />
      </View>
    </FormProvider>
  );
};

export default ExampleForm;
```

## Running the Example

1. Install dependencies: `npm install`
2. Start the example app: `npm run example`

For a complete React Native app example, check the files in this directory.
