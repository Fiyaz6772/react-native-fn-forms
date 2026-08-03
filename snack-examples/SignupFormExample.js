import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { useSmartForm, FormProvider, SmartFormField } from 'react-native-fn-forms'

export default function SignupFormExample() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const form = useSmartForm({
    fields: {
      fullName: {
        type: 'personName',
        required: true,
        minLength: 2,
      },
      email: {
        type: 'email',
        required: true,
      },
      phone: {
        type: 'phone',
        required: true,
      },
      password: {
        type: 'password',
        required: true,
        minLength: 8,
      },
      confirmPassword: {
        type: 'password',
        required: true,
        matchField: 'password',
        matchErrorMessage: 'Passwords must match',
      },
    },
  })

  const handleSignup = async () => {
    await form.submitForm()

    if (form.isValid) {
      Alert.alert('Success!', 'Account created successfully!')
    } else {
      Alert.alert('Error', 'Please fix all errors')
    }
  }

  return (
    <FormProvider value={form}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Sign up to get started</Text>

        <SmartFormField
          name="fullName"
          label="Full Name"
          placeholder="John Doe"
          leftIcon={<MaterialIcons name="person" size={20} color="#666" />}
          style={styles.field}
        />

        <SmartFormField
          name="email"
          label="Email Address"
          placeholder="you@example.com"
          leftIcon={<MaterialIcons name="email" size={20} color="#666" />}
          rightIcon={
            form.touched.email && !form.errors.email && form.values.email ? (
              <MaterialIcons name="check-circle" size={20} color="green" />
            ) : null
          }
          style={styles.field}
        />

        <SmartFormField
          name="phone"
          label="Phone Number"
          placeholder="(123) 456-7890"
          leftIcon={<MaterialIcons name="phone" size={20} color="#666" />}
          style={styles.field}
        />

        <SmartFormField
          name="password"
          label="Password"
          placeholder="Create a strong password"
          secureTextEntry={!showPassword}
          leftIcon={<MaterialIcons name="lock" size={20} color="#666" />}
          rightIcon={
            <MaterialIcons
              name={showPassword ? 'visibility' : 'visibility-off'}
              size={20}
              color="#666"
            />
          }
          onRightIconPress={() => setShowPassword(!showPassword)}
          style={styles.field}
        />

        <SmartFormField
          name="confirmPassword"
          label="Confirm Password"
          placeholder="Re-enter your password"
          secureTextEntry={!showConfirmPassword}
          leftIcon={<MaterialIcons name="lock-outline" size={20} color="#666" />}
          rightIcon={
            <MaterialIcons
              name={showConfirmPassword ? 'visibility' : 'visibility-off'}
              size={20}
              color="#666"
            />
          }
          onRightIconPress={() => setShowConfirmPassword(!showConfirmPassword)}
          style={styles.field}
        />

        <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
          <Text style={styles.signupButtonText}>Create Account</Text>
        </TouchableOpacity>

        <Text style={styles.infoText}>
          Features: Field matching, password toggle, validation checkmarks
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    marginTop: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
    textAlign: 'center',
  },
  field: {
    marginBottom: 16,
  },
  signupButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  signupButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 20,
  },
})
