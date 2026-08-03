import React, { useRef, useEffect, useState } from 'react';
import { View, TextInput, Text, StyleSheet, Platform } from 'react-native';
import { useFormContext } from '../context/FormContext';
import type { SmartOTPFieldProps } from '../types/OTPTypes';

const SmartOTPFieldComponent: React.FC<SmartOTPFieldProps> = ({
  name,
  length = 6,
  placeholder = '●',
  autoFocus = true,
  autoSubmit = false,
  secureTextEntry = false,
  style,
  inputStyle,
  errorStyle,
  labelStyle,
  label,
  onComplete,
  onCodeChange,
}) => {
  const form = useFormContext();
  const inputRefs = useRef<(TextInput | null)[]>([]);
  const [otpValues, setOtpValues] = useState<string[]>(new Array(length).fill(''));
  const [focusedIndex, setFocusedIndex] = useState<number>(autoFocus ? 0 : -1);

  const fieldProps = form.getFieldProps(name);

  // Initialize refs array
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, length);
  }, [length]);

  // Auto-focus first input
  useEffect(() => {
    if (autoFocus && inputRefs.current[0]) {
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 100);
    }
  }, [autoFocus]);

  // Update form value when OTP changes
  useEffect(() => {
    const completeValue = otpValues.join('');
    fieldProps.onChangeText(completeValue);
    onCodeChange?.(completeValue);

    // Auto-submit when complete
    if (completeValue.length === length) {
      onComplete?.(completeValue);
      if (autoSubmit) {
        setTimeout(() => {
          form.submitForm();
        }, 100);
      }
    }
  }, [otpValues, length, autoSubmit, onComplete, onCodeChange]);

  const handleTextChange = (text: string, index: number) => {
    // Handle paste operation
    if (text.length > 1) {
      const pastedCode = text.replace(/[^0-9]/g, '').slice(0, length);
      const newValues = [...otpValues];

      for (let i = 0; i < length; i++) {
        newValues[i] = pastedCode[i] || '';
      }

      setOtpValues(newValues);

      // Focus last filled input or next empty input
      const nextIndex = Math.min(pastedCode.length, length - 1);
      setTimeout(() => {
        inputRefs.current[nextIndex]?.focus();
      }, 10);

      return;
    }

    // Handle single digit input
    const sanitizedText = text.replace(/[^0-9]/g, '').slice(0, 1);
    const newValues = [...otpValues];

    // If user is replacing existing digit
    if (sanitizedText) {
      newValues[index] = sanitizedText;
      setOtpValues(newValues);

      // Auto-advance to next input
      if (index < length - 1) {
        setTimeout(() => {
          inputRefs.current[index + 1]?.focus();
        }, 10);
      }
    } else {
      // If text is empty (backspace was pressed)
      newValues[index] = '';
      setOtpValues(newValues);
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    // Handle backspace
    if (e.nativeEvent.key === 'Backspace') {
      const newValues = [...otpValues];

      if (otpValues[index]) {
        // Clear current cell
        newValues[index] = '';
        setOtpValues(newValues);
      } else if (index > 0) {
        // If current cell is empty, move to previous and clear it
        newValues[index - 1] = '';
        setOtpValues(newValues);
        setTimeout(() => {
          inputRefs.current[index - 1]?.focus();
        }, 10);
      }
    }
  };

  const handleFocus = (index: number) => {
    setFocusedIndex(index);
  };

  const handleBlur = () => {
    setFocusedIndex(-1);
  };

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}

      <View style={styles.otpContainer}>
        {Array.from({ length }, (_, index) => (
          <TextInput
            key={index}
            ref={ref => (inputRefs.current[index] = ref)}
            style={[
              styles.otpInput,
              inputStyle,
              focusedIndex === index && styles.focusedInput,
              fieldProps.error && styles.errorInput,
            ]}
            value={secureTextEntry ? (otpValues[index] ? placeholder : '') : otpValues[index]}
            onChangeText={text => handleTextChange(text, index)}
            onKeyPress={e => handleKeyPress(e, index)}
            onFocus={() => handleFocus(index)}
            onBlur={handleBlur}
            maxLength={1}
            keyboardType="number-pad"
            returnKeyType="next"
            autoComplete={index === 0 ? 'sms-otp' : 'off'}
            textContentType={index === 0 ? 'oneTimeCode' : 'none'}
            selectTextOnFocus
            contextMenuHidden={false}
            accessibilityLabel={`Digit ${index + 1} of ${length}`}
            {...(Platform.OS === 'android' && {
              underlineColorAndroid: 'transparent',
            })}
          />
        ))}
      </View>

      {fieldProps.error && (
        <Text style={[styles.errorText, errorStyle]} accessibilityLiveRegion="polite">
          {fieldProps.error}
        </Text>
      )}
    </View>
  );
};

export const SmartOTPField = React.memo(SmartOTPFieldComponent);

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  otpInput: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginHorizontal: 4,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    backgroundColor: '#fff',
    color: '#333',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  focusedInput: {
    borderColor: '#007AFF',
    borderWidth: 2,
    ...Platform.select({
      ios: {
        shadowColor: '#007AFF',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
    }),
  },
  errorInput: {
    borderColor: '#e74c3c',
    backgroundColor: '#fff5f5',
  },
  errorText: {
    color: '#e74c3c',
    fontSize: 12,
    marginTop: 8,
    textAlign: 'center',
  },
});
