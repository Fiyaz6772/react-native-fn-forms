import { useState, useCallback, useRef, useEffect } from 'react';
import { Keyboard } from 'react-native';
import { FormConfig, FormValues, FormErrors, FormTouched, SmartFormHook } from '../types';
import { validators } from '../validators';
import { formatters } from '../utils/formatters';

const DEFAULT_CONFIG: Partial<FormConfig> = {
  validation: {
    mode: 'onChange',
    debounce: 300,
    showErrorsOn: 'touched',
  },
  accessibility: {
    announceErrors: true,
    errorSummary: false,
    fieldLabeling: 'enhanced',
  },
  keyboardHandling: true,
  hapticFeedback: false,
};

export const useSmartForm = (config: FormConfig): SmartFormHook => {
  const mergedConfig = { ...DEFAULT_CONFIG, ...config };
  const debounceTimers = useRef<Record<string, any>>({});

  // Initialize form state
  const [values, setValues] = useState<FormValues>(() => {
    const initialValues: FormValues = {};
    Object.keys(config.fields).forEach(field => {
      initialValues[field] = '';
    });
    return initialValues;
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<FormTouched>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calculate if form is valid
  const isValid = Object.keys(errors).length === 0 && Object.keys(touched).length > 0;

  // Validate individual field
  const validateField = useCallback(
    async (fieldName: string): Promise<string | null> => {
      const fieldConfig = config.fields[fieldName];
      const value = values[fieldName];

      if (!fieldConfig) return null;

      // Check required validation
      if (fieldConfig.required) {
        const requiredError = validators.required(value);
        if (requiredError) {
          return requiredError.message;
        }
      }

      // Skip other validations if value is empty and not required
      if (!value && !fieldConfig.required) {
        return null;
      }

      // Check min/max length
      if (fieldConfig.minLength) {
        const minLengthError = validators.minLength(fieldConfig.minLength)(value);
        if (minLengthError) {
          return minLengthError.message;
        }
      }

      if (fieldConfig.maxLength) {
        const maxLengthError = validators.maxLength(fieldConfig.maxLength)(value);
        if (maxLengthError) {
          return maxLengthError.message;
        }
      }

      // Check pattern validation
      const patternError = validators.pattern(fieldConfig.type)(value);
      if (patternError) {
        return patternError.message;
      }

      // Special validations for specific field types
      if (fieldConfig.type === 'creditCard') {
        const luhnError = validators.creditCardLuhn(value);
        if (luhnError) {
          return luhnError.message;
        }
      }

      // Custom validation
      if (fieldConfig.customValidation) {
        const customError = fieldConfig.customValidation(value);
        if (customError) {
          return customError;
        }
      }

      return null;
    },
    [config.fields, values]
  );

  // Validate entire form
  const validateForm = useCallback(async (): Promise<FormErrors> => {
    const newErrors: FormErrors = {};

    for (const fieldName of Object.keys(config.fields)) {
      const error = await validateField(fieldName);
      if (error) {
        newErrors[fieldName] = error;
      }
    }

    return newErrors;
  }, [config.fields, validateField]);

  // Set field value with optional formatting and validation
  const setFieldValue = useCallback(
    (fieldName: string, value: any) => {
      const fieldConfig = config.fields[fieldName];
      let processedValue = value;

      // Apply formatting if available
      if (fieldConfig?.format) {
        processedValue = fieldConfig.format(value);
      } else if (fieldConfig?.transform) {
        processedValue = fieldConfig.transform(value);
      } else {
        // Auto-format based on field type
        processedValue = formatters.auto(value, fieldConfig?.type || 'text');
      }

      setValues(prev => ({ ...prev, [fieldName]: processedValue }));

      // Clear error when user starts typing
      if (errors[fieldName]) {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors[fieldName];
          return newErrors;
        });
      }

      // Debounced validation
      const shouldValidate =
        mergedConfig.validation?.mode === 'onChange' &&
        touched[fieldName] &&
        mergedConfig.validation?.showErrorsOn !== 'submit';

      if (shouldValidate) {
        const debounceTime = fieldConfig?.debounce || mergedConfig.validation?.debounce || 300;

        // Clear existing timer
        if (debounceTimers.current[fieldName]) {
          clearTimeout(debounceTimers.current[fieldName]);
        }

        // Set new timer
        debounceTimers.current[fieldName] = setTimeout(async () => {
          const error = await validateField(fieldName);
          if (error) {
            setErrors(prev => ({ ...prev, [fieldName]: error }));
          }
        }, debounceTime);
      }
    },
    [config.fields, errors, touched, mergedConfig, validateField]
  );

  // Set field error
  const setFieldError = useCallback((fieldName: string, error: string) => {
    setErrors(prev => ({ ...prev, [fieldName]: error }));
  }, []);

  // Set field touched
  const setFieldTouched = useCallback(
    (fieldName: string, isTouched: boolean) => {
      setTouched(prev => ({ ...prev, [fieldName]: isTouched }));

      // Validate on blur if configured
      if (isTouched && mergedConfig.validation?.mode === 'onBlur') {
        setTimeout(async () => {
          const error = await validateField(fieldName);
          if (error) {
            setErrors(prev => ({ ...prev, [fieldName]: error }));
          }
        }, 0);
      }
    },
    [mergedConfig, validateField]
  );

  // Reset form
  const resetForm = useCallback(() => {
    const initialValues: FormValues = {};
    Object.keys(config.fields).forEach(field => {
      initialValues[field] = '';
    });
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [config.fields]);

  // Submit form
  const submitForm = useCallback(async () => {
    setIsSubmitting(true);

    try {
      // Mark all fields as touched
      const allTouched: FormTouched = {};
      Object.keys(config.fields).forEach(field => {
        allTouched[field] = true;
      });
      setTouched(allTouched);

      // Validate all fields
      const formErrors = await validateForm();
      setErrors(formErrors);

      // If there are errors, don't submit
      if (Object.keys(formErrors).length > 0) {
        return;
      }

      // Form is valid, proceed with submission
      // This is where you would call your submit handler
    } finally {
      setIsSubmitting(false);
    }
  }, [config.fields, validateForm]);

  // Get props for a field (useful for connecting to input components)
  const getFieldProps = useCallback(
    (fieldName: string) => {
      const fieldConfig = config.fields[fieldName];

      return {
        value: values[fieldName] || '',
        onChangeText: (value: string) => setFieldValue(fieldName, value),
        onBlur: () => setFieldTouched(fieldName, true),
        error: touched[fieldName] ? errors[fieldName] : undefined,
        touched: touched[fieldName] || false,
        ...fieldConfig?.inputProps, // Merge any additional input props
      };
    },
    [values, errors, touched, config.fields, setFieldValue, setFieldTouched]
  );

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      Object.values(debounceTimers.current).forEach(timer => {
        if (timer) clearTimeout(timer);
      });
    };
  }, []);

  // Keyboard handling
  useEffect(() => {
    if (!mergedConfig.keyboardHandling) return;

    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      // Handle keyboard show if needed
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      // Handle keyboard hide if needed
    });

    return () => {
      keyboardDidShowListener?.remove();
      keyboardDidHideListener?.remove();
    };
  }, [mergedConfig.keyboardHandling]);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    isValid,
    setFieldValue,
    setFieldError,
    setFieldTouched,
    validateField,
    validateForm,
    resetForm,
    submitForm,
    getFieldProps,
  };
};
