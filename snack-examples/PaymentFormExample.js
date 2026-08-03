import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { useSmartForm, FormProvider, SmartFormField } from 'react-native-fn-forms'

export default function PaymentFormExample() {
  const form = useSmartForm({
    fields: {
      cardholderName: {
        type: 'personName',
        required: true,
      },
      cardNumber: {
        type: 'creditCard',
        required: true,
      },
      expiryDate: {
        type: 'text',
        required: true,
        pattern: /^(0[1-9]|1[0-2])\/\d{2}$/,
      },
      cvv: {
        type: 'text',
        required: true,
        pattern: /^\d{3,4}$/,
        minLength: 3,
        maxLength: 4,
      },
      zipCode: {
        type: 'text',
        required: true,
        pattern: /^\d{5}$/,
      },
    },
  })

  const handlePayment = async () => {
    await form.submitForm()

    if (form.isValid) {
      Alert.alert('Success!', 'Payment processed successfully!')
    } else {
      Alert.alert('Error', 'Please fix all errors')
    }
  }

  return (
    <FormProvider value={form}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Payment Details</Text>
          <View style={styles.amountContainer}>
            <Text style={styles.amountLabel}>Total Amount</Text>
            <Text style={styles.amountValue}>$99.99</Text>
          </View>
        </View>

        <SmartFormField
          name="cardholderName"
          label="Cardholder Name"
          placeholder="John Doe"
          leftIcon={<MaterialIcons name="person" size={20} color="#666" />}
          style={styles.field}
        />

        <SmartFormField
          name="cardNumber"
          label="Card Number"
          placeholder="1234 5678 9012 3456"
          leftIcon={<MaterialIcons name="credit-card" size={20} color="#666" />}
          keyboardType="numeric"
          style={styles.field}
        />

        <View style={styles.row}>
          <View style={styles.halfField}>
            <SmartFormField
              name="expiryDate"
              label="Expiry Date"
              placeholder="MM/YY"
              leftIcon={<MaterialIcons name="calendar-today" size={18} color="#666" />}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.halfField}>
            <SmartFormField
              name="cvv"
              label="CVV"
              placeholder="123"
              leftIcon={<MaterialIcons name="lock" size={18} color="#666" />}
              keyboardType="numeric"
              secureTextEntry
            />
          </View>
        </View>

        <SmartFormField
          name="zipCode"
          label="Billing ZIP Code"
          placeholder="12345"
          leftIcon={<MaterialIcons name="location-on" size={20} color="#666" />}
          keyboardType="numeric"
          style={styles.field}
        />

        <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
          <MaterialIcons name="lock" size={20} color="#fff" style={styles.lockIcon} />
          <Text style={styles.payButtonText}>Pay $99.99</Text>
        </TouchableOpacity>

        <Text style={styles.secureText}>
          🔒 Your payment information is secure
        </Text>
      </ScrollView>
    </FormProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    marginTop: 20,
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  amountContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  amountLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  amountValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  field: {
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  halfField: {
    flex: 1,
  },
  payButton: {
    backgroundColor: '#34C759',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 12,
  },
  lockIcon: {
    marginRight: 8,
  },
  payButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  secureText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
})
