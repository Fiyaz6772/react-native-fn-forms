export type FieldType =
  | 'text'
  | 'email'
  | 'phone'
  | 'personName'
  | 'businessName'
  | 'streetAddress'
  | 'creditCard'
  | 'currency'
  | 'password'
  | 'username'
  | 'url'
  | 'date'
  | 'number'
  | 'otp';

export interface ValidationRule {
  type: string;
  message: string;
  validate: (value: any) => boolean;
  suggestion?: string;
}

export interface FieldConfig {
  type: FieldType;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  customValidation?: (value: any) => string | null;
  transform?: (value: string) => string;
  format?: (value: string) => string;
  debounce?: number;
  validateOn?: 'change' | 'blur' | 'submit';
  inputProps?: Record<string, any>;
  suggestions?: boolean;
  accessibility?: {
    label?: string;
    hint?: string;
    role?: string;
  };
  // OTP-specific properties
  length?: 4 | 6 | 8;
  autoSubmit?: boolean;
  // Field matching for confirmation fields
  matchField?: string;
  matchErrorMessage?: string;
}

export interface StorageAdapter {
  save: (key: string, data: string) => Promise<void>;
  load: (key: string) => Promise<string | null>;
  remove: (key: string) => Promise<void>;
}

export interface DraftData {
  values: FormValues;
  touched: FormTouched;
  timestamp: number;
}

export interface FormConfig {
  fields: Record<string, FieldConfig>;
  validation?: {
    mode?: 'onChange' | 'onBlur' | 'onSubmit';
    debounce?: number;
    showErrorsOn?: 'immediate' | 'touched' | 'submit';
  };
  accessibility?: {
    announceErrors?: boolean;
    errorSummary?: boolean;
    fieldLabeling?: 'basic' | 'enhanced';
  };
  keyboardHandling?: boolean;
  hapticFeedback?: boolean;
  platform?: {
    ios?: Record<string, any>;
    android?: Record<string, any>;
  };
  autoSave?: {
    enabled: boolean;
    debounce?: number;
    storage: StorageAdapter;
    key: string;
    expirationDays?: number;
  };
  onDraftFound?: (draft: DraftData) => void;
  onAutoSave?: (data: DraftData) => void;
}

export type FormValues = Record<string, any>;
export type FormErrors = Record<string, string>;
export type FormTouched = Record<string, boolean>;

export interface FormState {
  values: FormValues;
  errors: FormErrors;
  touched: FormTouched;
  isSubmitting: boolean;
  isValid: boolean;
}

export interface SmartFormHook {
  values: FormValues;
  errors: FormErrors;
  touched: FormTouched;
  isSubmitting: boolean;
  isValid: boolean;
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
  saveDraft: () => Promise<void>;
  loadDraft: (draft?: DraftData) => void;
  clearDraft: () => Promise<void>;
  hasDraft: () => Promise<boolean>;
}
