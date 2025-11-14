# Payment Form Example

Complete example of a payment/checkout form using React Native FN Forms with credit card validation.

---

## Overview

This example demonstrates:

- ✅ Credit card number validation (Luhn algorithm)
- ✅ Card expiry date validation
- ✅ CVV validation
- ✅ Billing address collection
- ✅ Card type detection (Visa, Mastercard, Amex, etc.)
- ✅ Auto-formatting for card inputs
- ✅ Secure input handling

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
  Image,
} from 'react-native';
import {
  useSmartForm,
  FormProvider,
  SmartFormField,
} from 'react-native-fn-forms';

const PaymentForm = ({ amount, onPaymentSuccess }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardType, setCardType] = useState(null);

  const form = useSmartForm({
    fields: {
      cardholderName: {
        type: 'personName',
        required: true,
        minLength: 2,
      },
      cardNumber: {
        type: 'creditCard',
        required: true,
        customValidation: (value) => {
          const digits = value.replace(/\s/g, '');
          if (digits.length < 13 || digits.length > 19) {
            return 'Invalid card number';
          }
          return null;
        },
      },
      expiryDate: {
        type: 'text',
        required: true,
        pattern: /^(0[1-9]|1[0-2])\/\d{2}$/,
        customValidation: (value) => {
          if (!value.match(/^(0[1-9]|1[0-2])\/\d{2}$/)) {
            return 'Format: MM/YY';
          }

          const [month, year] = value.split('/');
          const expiry = new Date(2000 + parseInt(year), parseInt(month) - 1);
          const now = new Date();

          if (expiry < now) {
            return 'Card has expired';
          }

          return null;
        },
        transform: (value) => {
          const digits = value.replace(/\D/g, '');
          if (digits.length >= 2) {
            return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
          }
          return digits;
        },
      },
      cvv: {
        type: 'number',
        required: true,
        minLength: 3,
        maxLength: 4,
        customValidation: (value) => {
          if (value.length < 3) {
            return 'CVV must be 3-4 digits';
          }
          return null;
        },
        inputProps: {
          secureTextEntry: true,
          keyboardType: 'number-pad',
        },
      },
      billingAddress: {
        type: 'streetAddress',
        required: true,
      },
      city: {
        type: 'text',
        required: true,
        minLength: 2,
      },
      state: {
        type: 'text',
        required: true,
        minLength: 2,
      },
      zipCode: {
        type: 'text',
        required: true,
        pattern: /^\d{5}(-\d{4})?$/,
        customValidation: (value) => {
          if (!value.match(/^\d{5}(-\d{4})?$/)) {
            return 'ZIP format: 12345 or 12345-6789';
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

  // Detect card type based on card number
  const detectCardType = (cardNumber: string) => {
    const digits = cardNumber.replace(/\s/g, '');

    if (/^4/.test(digits)) return 'visa';
    if (/^5[1-5]/.test(digits)) return 'mastercard';
    if (/^3[47]/.test(digits)) return 'amex';
    if (/^6(?:011|5)/.test(digits)) return 'discover';

    return null;
  };

  // Watch card number changes
  React.useEffect(() => {
    const type = detectCardType(form.values.cardNumber || '');
    setCardType(type);
  }, [form.values.cardNumber]);

  const handlePayment = async () => {
    await form.submitForm();

    if (!form.isValid) {
      Alert.alert('Error', 'Please fix all errors before continuing');
      return;
    }

    setIsProcessing(true);

    try {
      // Tokenize card details (use Stripe, Braintree, etc.)
      const token = await tokenizeCard({
        number: form.values.cardNumber,
        exp_month: form.values.expiryDate.split('/')[0],
        exp_year: `20${form.values.expiryDate.split('/')[1]}`,
        cvc: form.values.cvv,
      });

      // Process payment
      const response = await fetch('https://api.example.com/charge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: amount,
          token: token.id,
          billingAddress: {
            line1: form.values.billingAddress,
            city: form.values.city,
            state: form.values.state,
            postal_code: form.values.zipCode,
          },
        }),
      });

      const data = await response.json();

      if (response.ok) {
        onPaymentSuccess(data);
      } else {
        Alert.alert('Payment Failed', data.message || 'Please try again');
      }
    } catch (error) {
      Alert.alert('Error', 'Payment processing failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <FormProvider value={form}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.amountContainer}>
          <Text style={styles.amountLabel}>Total Amount</Text>
          <Text style={styles.amountValue}>${amount.toFixed(2)}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Card Information</Text>

          <SmartFormField
            name="cardholderName"
            label="Cardholder Name"
            placeholder="John Doe"
            style={styles.field}
            labelStyle={styles.label}
            inputStyle={styles.input}
          />

          <View style={styles.cardNumberContainer}>
            <SmartFormField
              name="cardNumber"
              label="Card Number"
              placeholder="1234 5678 9012 3456"
              style={[styles.field, styles.cardNumberField]}
              labelStyle={styles.label}
              inputStyle={styles.input}
            />
            {cardType && (
              <View style={styles.cardIcon}>
                <Text style={styles.cardTypeText}>{cardType.toUpperCase()}</Text>
              </View>
            )}
          </View>

          <View style={styles.row}>
            <SmartFormField
              name="expiryDate"
              label="Expiry Date"
              placeholder="MM/YY"
              style={[styles.field, styles.halfField]}
              labelStyle={styles.label}
              inputStyle={styles.input}
            />

            <SmartFormField
              name="cvv"
              label="CVV"
              placeholder="123"
              style={[styles.field, styles.halfField]}
              labelStyle={styles.label}
              inputStyle={styles.input}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Billing Address</Text>

          <SmartFormField
            name="billingAddress"
            label="Street Address"
            placeholder="123 Main St"
            style={styles.field}
            labelStyle={styles.label}
            inputStyle={styles.input}
          />

          <SmartFormField
            name="city"
            label="City"
            placeholder="New York"
            style={styles.field}
            labelStyle={styles.label}
            inputStyle={styles.input}
          />

          <View style={styles.row}>
            <SmartFormField
              name="state"
              label="State"
              placeholder="NY"
              style={[styles.field, styles.halfField]}
              labelStyle={styles.label}
              inputStyle={styles.input}
            />

            <SmartFormField
              name="zipCode"
              label="ZIP Code"
              placeholder="10001"
              style={[styles.field, styles.halfField]}
              labelStyle={styles.label}
              inputStyle={styles.input}
            />
          </View>
        </View>

        <View style={styles.securityNote}>
          <Text style={styles.securityIcon}>🔒</Text>
          <Text style={styles.securityText}>
            Your payment information is encrypted and secure
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.payButton, isProcessing && styles.payButtonDisabled]}
          onPress={handlePayment}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.payButtonText}>Pay ${amount.toFixed(2)}</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.disclaimer}>
          By completing this payment, you agree to our Terms of Service and
          Privacy Policy
        </Text>
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
  amountContainer: {
    backgroundColor: '#f8f9fa',
    padding: 20,
    borderRadius: 12,
    marginBottom: 24,
    alignItems: 'center',
  },
  amountLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  amountValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#000',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 16,
  },
  field: {
    marginBottom: 16,
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
  cardNumberContainer: {
    position: 'relative',
  },
  cardNumberField: {
    marginBottom: 0,
  },
  cardIcon: {
    position: 'absolute',
    right: 12,
    top: 42,
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  cardTypeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#666',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfField: {
    width: '48%',
  },
  securityNote: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e8f5e9',
    padding: 12,
    borderRadius: 8,
    marginBottom: 24,
  },
  securityIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  securityText: {
    flex: 1,
    fontSize: 12,
    color: '#2e7d32',
  },
  payButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  payButtonDisabled: {
    opacity: 0.6,
  },
  payButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  disclaimer: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    marginBottom: 40,
  },
});

export default PaymentForm;
```

---

## Key Features Explained

### 1. Credit Card Validation

```typescript
cardNumber: {
  type: 'creditCard',  // Built-in Luhn algorithm validation
  required: true,
  customValidation: (value) => {
    const digits = value.replace(/\s/g, '');
    if (digits.length < 13 || digits.length > 19) {
      return 'Invalid card number';
    }
    return null;
  }
}
```

### 2. Card Type Detection

```typescript
const detectCardType = (cardNumber: string) => {
  const digits = cardNumber.replace(/\s/g, '');

  if (/^4/.test(digits)) return 'visa'; // Starts with 4
  if (/^5[1-5]/.test(digits)) return 'mastercard'; // Starts with 51-55
  if (/^3[47]/.test(digits)) return 'amex'; // Starts with 34 or 37
  if (/^6(?:011|5)/.test(digits)) return 'discover'; // Starts with 6011 or 65

  return null;
};

// Watch for changes
React.useEffect(() => {
  const type = detectCardType(form.values.cardNumber || '');
  setCardType(type);
}, [form.values.cardNumber]);
```

### 3. Expiry Date Formatting & Validation

```typescript
expiryDate: {
  type: 'text',
  required: true,
  pattern: /^(0[1-9]|1[0-2])\/\d{2}$/,  // MM/YY format
  transform: (value) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length >= 2) {
      return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
    }
    return digits;
  },
  customValidation: (value) => {
    const [month, year] = value.split('/');
    const expiry = new Date(2000 + parseInt(year), parseInt(month) - 1);

    if (expiry < new Date()) {
      return 'Card has expired';
    }

    return null;
  }
}
```

### 4. Secure CVV Input

```typescript
cvv: {
  type: 'number',
  required: true,
  minLength: 3,
  maxLength: 4,
  inputProps: {
    secureTextEntry: true,      // Hide CVV
    keyboardType: 'number-pad'  // Numeric keyboard
  }
}
```

### 5. Payment Processing

```typescript
const handlePayment = async () => {
  // 1. Validate form
  await form.submitForm();
  if (!form.isValid) return;

  // 2. Tokenize card (use payment gateway SDK)
  const token = await tokenizeCard({
    number: form.values.cardNumber,
    exp_month: form.values.expiryDate.split('/')[0],
    exp_year: `20${form.values.expiryDate.split('/')[1]}`,
    cvc: form.values.cvv,
  });

  // 3. Process payment with token (never send raw card data)
  const response = await fetch('/charge', {
    method: 'POST',
    body: JSON.stringify({
      amount: amount,
      token: token.id,
      billingAddress: {
        /* ... */
      },
    }),
  });

  // 4. Handle response
  if (response.ok) {
    onPaymentSuccess();
  }
};
```

---

## Integration with Payment Gateways

### Stripe Integration

```typescript
import { CardField, useStripe } from '@stripe/stripe-react-native';

const PaymentForm = () => {
  const { confirmPayment } = useStripe();

  const handleStripePayment = async () => {
    const { error, paymentIntent } = await confirmPayment({
      paymentMethodType: 'Card',
      billingDetails: {
        name: form.values.cardholderName,
        address: {
          line1: form.values.billingAddress,
          city: form.values.city,
          state: form.values.state,
          postalCode: form.values.zipCode,
        },
      },
    });

    if (error) {
      Alert.alert('Payment failed', error.message);
    } else {
      onPaymentSuccess(paymentIntent);
    }
  };

  return (
    <View>
      <CardField
        postalCodeEnabled={true}
        onCardChange={(cardDetails) => {
          setCardComplete(cardDetails.complete);
        }}
        style={{ height: 50 }}
      />
      <Button title="Pay" onPress={handleStripePayment} />
    </View>
  );
};
```

### PayPal Integration

```typescript
import { PayPalButtons } from '@paypal/react-native-paypal';

const PayPalPayment = ({ amount, onSuccess }) => {
  return (
    <PayPalButtons
      createOrder={(data, actions) => {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: amount.toString(),
            },
          }],
        });
      }}
      onApprove={(data, actions) => {
        return actions.order.capture().then((details) => {
          onSuccess(details);
        });
      }}
    />
  );
};
```

### Braintree Integration

```typescript
import BraintreeDropIn from 'react-native-braintree-dropin-ui';

const handleBraintreePayment = async () => {
  try {
    const result = await BraintreeDropIn.show({
      clientToken: clientToken,
      vaultManager: true,
      googlePayFlow: 1,
      amount: amount.toString(),
    });

    if (result.nonce) {
      // Send nonce to server
      await processPayment(result.nonce);
    }
  } catch (error) {
    console.error(error);
  }
};
```

---

## Security Best Practices

### 1. Never Store Raw Card Data

```typescript
// ❌ Bad - Never do this
await saveToDatabase({
  cardNumber: form.values.cardNumber,
  cvv: form.values.cvv,
});

// ✅ Good - Use tokenization
const token = await tokenizeCard(cardDetails);
await saveToDatabase({
  paymentToken: token.id,
  last4: token.last4,
});
```

### 2. Use HTTPS Only

```typescript
// ✅ Always use HTTPS for payment endpoints
const response = await fetch('https://api.example.com/charge', {
  // ...
});
```

### 3. Implement PCI Compliance

```typescript
// Use certified payment SDKs
import { CardField } from '@stripe/stripe-react-native';
// OR
import BraintreeDropIn from 'react-native-braintree-dropin-ui';
```

### 4. Validate on Client AND Server

```typescript
// Client validation
await form.validateForm();

// Server validation
const serverResponse = await fetch('/charge', {
  method: 'POST',
  body: JSON.stringify(paymentData),
});

// Server should re-validate everything
```

---

## Testing

```typescript
import { render, fireEvent, waitFor } from '@testing-library/react-native';

describe('PaymentForm', () => {
  it('validates credit card number', async () => {
    const { getByPlaceholderText, getByText } = render(
      <PaymentForm amount={99.99} />
    );

    fireEvent.changeText(
      getByPlaceholderText('1234 5678 9012 3456'),
      '4111111111111111' // Valid test card
    );

    await waitFor(() => {
      expect(form.errors.cardNumber).toBeNull();
    });
  });

  it('detects expired card', async () => {
    const { getByPlaceholderText, getByText } = render(
      <PaymentForm amount={99.99} />
    );

    fireEvent.changeText(
      getByPlaceholderText('MM/YY'),
      '01/20' // Expired
    );

    await waitFor(() => {
      expect(getByText('Card has expired')).toBeTruthy();
    });
  });

  it('formats expiry date automatically', () => {
    const { getByPlaceholderText } = render(
      <PaymentForm amount={99.99} />
    );

    const input = getByPlaceholderText('MM/YY');
    fireEvent.changeText(input, '1225');

    expect(input.props.value).toBe('12/25');
  });
});
```

---

## Related Examples

- 🔐 [Login Form](login-form.md)
- 📝 [Signup Form](signup-form.md)

---

## Related Documentation

- 🎯 [useSmartForm Hook](../api/useSmartForm.md)
- 📦 [SmartFormField Component](../api/SmartFormField.md)
- 💳 [Credit Card Field Type](../guides/field-types.md#creditcard)
- ✅ [Validation Guide](../guides/validation.md)

---

**Version:** 1.1.1  
**Last Updated:** November 14, 2025
