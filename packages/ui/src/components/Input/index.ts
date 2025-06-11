/* ===================================
   INPUT EXPORTS - Complete Implementation
   File: packages/ui/src/components/Input/index.ts
   ================================== */

// Main Input component
export { Input } from './Input';

// Type exports - All input props types
export type { 
  InputProps,
  BaseInputProps,
  TextInputProps,
  SearchInputProps,
  PasswordInputProps,
  CreditCardInputProps,
  NumberInputProps,
  PhoneInputProps,
  CurrencyInputProps,
  SelectInputProps,
  MultiSelectInputProps,
  DatePickerInputProps,
  VerificationInputProps,
  SelectOption
} from './Input.types';

// Enum and utility type exports
export type {
  InputVariant,
  InputState,
  InputSize,
  IconPosition,
  LabelPosition
} from './Input.types';

// Type guard function exports
export { 
  isTextBasedInput,
  isSearchInput,
  isPasswordInput,
  isCreditCardInput,
  isNumberInput,
  isPhoneInput,
  isCurrencyInput,
  isSelectInput,
  isDatePickerInput,
  isVerificationInput,
  isTextareaInput
} from './Input.types';

// Helper function exports
export {
  getInputType,
  isErrorState,
  isSuccessState,
  isWarningState,
  isDisabledState
} from './Input.types';

// Constants exports
export {
  INPUT_STATES,
  INPUT_VARIANTS
} from './Input.types';

// Re-export IconName for convenience
export type { IconName } from '../Icons/index';