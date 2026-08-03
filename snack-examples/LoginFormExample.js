import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { useSmartForm, FormProvider, SmartFormField } from 'react-native-fn-forms'

export default function LoginFormExample() {
  const [showPassword, setShowPassword] = useState(false)

  const form = useSmartForm({
    fields: {
      email: {
        type: 'email',
        required: true,
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
        },
      },
    },
  })

  const handleLogin = async () => {
    await form.submitForm()

    if (form.isValid) {
      Alert.alert(
        'Success!',
        `Email: ${form.values.email}\nPassword: ${form.values.password}`
      )
    } else {
      Alert.alert('Error', 'Please fix the errors')
    }
  }

  return (
    <FormProvider value={form}>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Sign in to continue</Text>

        <SmartFormField
          name="email"
          label="Email Address"
          placeholder="you@example.com"
          leftIcon={<MaterialIcons name="email" size={20} color="#666" />}
          rightIcon={
            form.values.email ? (
              <MaterialIcons name="clear" size={20} color="#999" />
            ) : null
          }
          onRightIconPress={() => form.setFieldValue('email', '')}
          style={styles.field}
        />

        <SmartFormField
          name="password"
          label="Password"
          placeholder="Enter your password"
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

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        <Text style={styles.infoText}>
          Try entering an email and password to see validation in action!
        </Text>
      </View>
    </FormProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
    textAlign: 'center',
  },
  field: {
    marginBottom: 16,
  },
  loginButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
  },
})
