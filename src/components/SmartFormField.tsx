import React, { ReactElement } from 'react';
import { TextInput, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useFormContext } from '../context/FormContext';
import { SmartFormFieldProps } from '../types';

const SmartFormFieldComponent: React.FC<SmartFormFieldProps> = ({
  name,
  placeholder,
  style,
  errorStyle,
  label,
  labelStyle,
  inputStyle,
  leftIcon,
  rightIcon,
  onLeftIconPress,
  onRightIconPress,
  leftIconStyle,
  rightIconStyle,
  inputContainerStyle,
  // Destructured only to exclude it from the TextInput spread below;
  // actual phone formatting is driven by FieldConfig.countryCode in useSmartForm.
  countryCode: _countryCode,
  ...textInputProps
}) => {
  const form = useFormContext();
  const fieldProps = form.getFieldProps(name);

  const renderIcon = (icon: ReactElement | (() => ReactElement) | undefined) => {
    if (!icon) return null;
    return typeof icon === 'function' ? icon() : icon;
  };

  return (
    <View style={styles.container}>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
      <View
        style={[
          styles.inputContainer,
          inputContainerStyle,
          fieldProps.error ? styles.inputContainerError : undefined,
        ]}
      >
        {leftIcon &&
          (onLeftIconPress ? (
            <TouchableOpacity
              onPress={onLeftIconPress}
              style={[styles.iconContainer, styles.leftIconContainer, leftIconStyle]}
            >
              {renderIcon(leftIcon)}
            </TouchableOpacity>
          ) : (
            <View style={[styles.iconContainer, styles.leftIconContainer, leftIconStyle]}>
              {renderIcon(leftIcon)}
            </View>
          ))}
        <TextInput
          {...fieldProps}
          {...textInputProps}
          placeholder={placeholder}
          style={[
            styles.input,
            leftIcon && styles.inputWithLeftIcon,
            rightIcon && styles.inputWithRightIcon,
            style,
            inputStyle,
          ]}
        />
        {rightIcon &&
          (onRightIconPress ? (
            <TouchableOpacity
              onPress={onRightIconPress}
              style={[styles.iconContainer, styles.rightIconContainer, rightIconStyle]}
            >
              {renderIcon(rightIcon)}
            </TouchableOpacity>
          ) : (
            <View style={[styles.iconContainer, styles.rightIconContainer, rightIconStyle]}>
              {renderIcon(rightIcon)}
            </View>
          ))}
      </View>
      {fieldProps.error && (
        <Text style={[styles.error, errorStyle]} accessibilityLiveRegion="polite">
          {fieldProps.error}
        </Text>
      )}
    </View>
  );
};

export const SmartFormField = React.memo(SmartFormFieldComponent);

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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  inputContainerError: {
    borderColor: '#e74c3c',
  },
  input: {
    flex: 1,
    padding: 12,
    fontSize: 16,
    color: '#000',
  },
  inputWithLeftIcon: {
    paddingLeft: 4,
  },
  inputWithRightIcon: {
    paddingRight: 4,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  leftIconContainer: {
    paddingLeft: 12,
  },
  rightIconContainer: {
    paddingRight: 12,
  },
  error: {
    color: '#e74c3c',
    fontSize: 12,
    marginTop: 4,
  },
});
