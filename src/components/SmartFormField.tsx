import React from 'react';
import { TextInput, Text, View, StyleSheet } from 'react-native';
import { useFormContext } from '../context/FormContext';

interface SmartFormFieldProps {
  name: string;
  placeholder?: string;
  style?: any;
  errorStyle?: any;
  label?: string;
  labelStyle?: any;
}

export const SmartFormField: React.FC<SmartFormFieldProps> = ({
  name,
  placeholder,
  style,
  errorStyle,
  label,
  labelStyle,
}) => {
  const form = useFormContext();
  const fieldProps = form.getFieldProps(name);

  return (
    <View style={styles.container}>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
      <TextInput
        {...fieldProps}
        placeholder={placeholder}
        style={[styles.input, style, fieldProps.error && styles.inputError]}
      />
      {fieldProps.error && <Text style={[styles.error, errorStyle]}>{fieldProps.error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  inputError: {
    borderColor: '#e74c3c',
  },
  error: {
    color: '#e74c3c',
    fontSize: 12,
    marginTop: 4,
  },
});
