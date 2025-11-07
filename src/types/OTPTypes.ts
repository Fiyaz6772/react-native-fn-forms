export interface SmartOTPFieldProps {
  name: string;
  length?: 4 | 6 | 8;
  placeholder?: string;
  autoFocus?: boolean;
  autoSubmit?: boolean;
  secureTextEntry?: boolean;

  // Styling props
  style?: any;
  inputStyle?: any;
  errorStyle?: any;
  labelStyle?: any;

  // Text and labels
  label?: string;

  // Callbacks
  onComplete?: (code: string) => void;
  onCodeChange?: (code: string) => void;
}

export interface OTPFieldConfig {
  type: 'otp';
  required?: boolean;
  length?: 4 | 6 | 8;
  autoSubmit?: boolean;
  customValidation?: (value: string) => string | null;
}
