import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { useSmartForm, FormProvider, SmartOTPField } from 'react-native-fn-forms'

export default function OTPVerificationExample() {
  const form = useSmartForm({
    fields: {
      otp: {
        type: 'otp',
        required: true,
        length: 6,
      },
    },
  })

  const handleVerify = async () => {
    await form.submitForm()

    if (form.isValid) {
      Alert.alert('Success!', `OTP verified: ${form.values.otp}`)
    } else {
      Alert.alert('Error', 'Please enter a valid 6-digit OTP')
    }
  }

  const handleResendOTP = () => {
    Alert.alert('OTP Sent', 'A new OTP has been sent to your phone')
    form.resetForm()
  }

  return (
    <FormProvider value={form}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Verify Your Phone</Text>
          <Text style={styles.subtitle}>
            Enter the 6-digit code sent to{'\n'}+1 (555) 123-4567
          </Text>
        </View>

        <View style={styles.otpContainer}>
          <SmartOTPField
            name="otp"
            length={6}
            autoFocus={true}
            onComplete={(code) => {
              console.log('OTP Complete:', code)
            }}
          />
        </View>

        <TouchableOpacity style={styles.verifyButton} onPress={handleVerify}>
          <Text style={styles.verifyButtonText}>Verify OTP</Text>
        </TouchableOpacity>

        <View style={styles.resendContainer}>
          <Text style={styles.resendText}>Didn't receive the code? </Text>
          <TouchableOpacity onPress={handleResendOTP}>
            <Text style={styles.resendLink}>Resend OTP</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.infoText}>
          Features: Auto-advance, paste support, backspace handling
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
  header: {
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
  otpContainer: {
    marginBottom: 32,
  },
  verifyButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  verifyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  resendText: {
    fontSize: 14,
    color: '#666',
  },
  resendLink: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
  },
})
