import React, { createContext, useContext, ReactNode } from 'react';
import { FormState, FormErrors } from '../types';

interface FormContextValue extends FormState {
  setFieldValue: (field: string, value: any) => void;
  setFieldError: (field: string, error: string) => void;
  setFieldTouched: (field: string, touched: boolean) => void;
  validateField: (field: string) => Promise<string | null>;
  validateForm: () => Promise<FormErrors>;
  resetForm: () => void;
  submitForm: () => Promise<void>;
  getFieldProps: (field: string) => {
    value: any;
    onChangeText: (value: string) => void;
    onBlur: () => void;
    error: string | undefined;
    touched: boolean;
  };
}

const FormContext = createContext<FormContextValue | null>(null);

export const useFormContext = (): FormContextValue => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};

interface FormProviderProps {
  children: ReactNode;
  value: FormContextValue;
}

export const FormProvider: React.FC<FormProviderProps> = ({ children, value }) => {
  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};
