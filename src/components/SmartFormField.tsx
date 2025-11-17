import React, { ReactElement } from 'react';
import {
  TextInput,
  Text,
  View,
  StyleSheet,
  TextInputProps,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { useFormContext } from '../context/FormContext';

interface SmartFormFieldProps extends Omit<TextInputProps, 'value' | 'onChangeText' | 'onBlur'> {
  name: string;
  placeholder?: string;
  style?: any;
  errorStyle?: any;
  label?: string;
  labelStyle?: any;
  leftIcon?: ReactElement | (() => ReactElement);
  rightIcon?: ReactElement | (() => ReactElement);
  onLeftIconPress?: () => void;
  onRightIconPress?: () => void;
  leftIconStyle?: ViewStyle;
  rightIconStyle?: ViewStyle;
  inputContainerStyle?: ViewStyle;
}

export const SmartFormField: React.FC<SmartFormFieldProps> = ({
  name,
  placeholder,
  style,
  errorStyle,
  label,
  labelStyle,
  leftIcon,
  rightIcon,
  onLeftIconPress,
  onRightIconPress,
  leftIconStyle,
  rightIconStyle,
  inputContainerStyle,
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
