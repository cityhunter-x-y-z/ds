/* ===================================
   INPUT TYPES - Complete Figma Implementation
   File: packages/ui/src/components/Input/Input.types.ts
   Based on all Figma input variants (1.0-5.0 series)
   ================================== */

import React from 'react';
import type { IconName } from '../Icons/index';

// Complete input variants from Figma analysis
export type InputVariant =
  // 1.0 Series - Basic Inputs
  | 'text'           // 1.0 Input Text
  | 'email'          // 1.1 Input Email
  | 'search'         // 1.2 Input Search
  | 'password'       // 1.3 Input Password
  | 'credit-card'    // 1.4 Input Credit Card
  | 'multi-text'     // 1.5 Input Multi Text
  | 'number'         // 1.6 Input Number
  // 2.0 Series - Label Variants
  | 'label'          // 2.0 Input Label
  | 'phone'          // 2.1 Input Phone Number
  | 'currency'       // 2.2 Input Currency
  // 3.0 Series - Selection Inputs
  | 'select'         // 3.0 Input Select
  | 'multi-select'   // 3.1 Input Multi Select
  | 'date-picker'    // 3.2 Input Date Picker
  // 4.0 Series - Extended Text
  | 'textarea'       // 4.0 Input Textarea
  // 5.0 Series - Verification
  | 'verification';  // 5.0 Input Verification

// Input states from Figma (all components support these)
export type InputState = 
  | 'default' 
  | 'warning' 
  | 'focus' 
  | 'hover' 
  | 'disabled' 
  | 'error' 
  | 'success';

// Input sizes based on design tokens
export type InputSize = 'md' | 'lg';

// Icon positioning
export type IconPosition = 'left' | 'right';

// Label positioning (for 2.0 series)
export type LabelPosition = 'top' | 'floating' | 'inline';

// Base input props shared by all variants
export interface BaseInputProps {
  variant: InputVariant;
  size?: InputSize;
  state?: InputState;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  'aria-label'?: string;
  'data-testid'?: string;
  id?: string;
  name?: string;
}

// Standard text-based input props (1.0 series, 2.0 label, 4.0 textarea)
export interface TextInputProps extends BaseInputProps {
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  
  // Label props (enhanced for 2.0 series)
  label?: string;
  labelPosition?: LabelPosition;
  
  // Helper text and validation
  helperText?: string;
  errorMessage?: string;
  successMessage?: string;
  
  // Icon support
  icon?: React.ReactNode | IconName;
  iconPosition?: IconPosition;
  
  // Input constraints
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  
  // Textarea specific (4.0 series)
  rows?: number;
  cols?: number;
  resize?: 'none' | 'both' | 'horizontal' | 'vertical';
  showCharacterCount?: boolean;
}

// Search input specific props (1.2)
export interface SearchInputProps extends Omit<TextInputProps, 'variant'> {
  variant: 'search';
  onSearch?: (query: string) => void;
  showClearButton?: boolean;
  searchIcon?: React.ReactNode | IconName;
}

// Password input specific props (1.3)
export interface PasswordInputProps extends Omit<TextInputProps, 'variant'> {
  variant: 'password';
  showPasswordToggle?: boolean;
  showPassword?: boolean;
  onPasswordToggle?: (visible: boolean) => void;
  strengthIndicator?: boolean;
}

// Credit card input specific props (1.4)
export interface CreditCardInputProps extends Omit<TextInputProps, 'variant'> {
  variant: 'credit-card';
  acceptedCards?: ('visa' | 'mastercard' | 'amex' | 'discover')[];
  showCardIcon?: boolean;
  onCardTypeDetected?: (type: string) => void;
  formatSpaces?: boolean;
}

// Number input specific props (1.6)
export interface NumberInputProps extends Omit<TextInputProps, 'variant' | 'onChange' | 'value' | 'defaultValue'> {
  variant: 'number';
  value?: number;
  defaultValue?: number;
  onChange?: (value: number | undefined) => void;
  min?: number;
  max?: number;
  step?: number;
  showControls?: boolean;
  allowDecimals?: boolean;
  decimalPlaces?: number;
}

// Phone input specific props (2.1)
export interface PhoneInputProps extends Omit<TextInputProps, 'variant'> {
  variant: 'phone';
  countryCode?: string;
  showCountrySelector?: boolean;
  formatDisplay?: boolean;
  onCountryChange?: (country: string) => void;
}

// Currency input specific props (2.2)
export interface CurrencyInputProps extends Omit<TextInputProps, 'variant' | 'onChange' | 'value' | 'defaultValue'> {
  variant: 'currency';
  value?: number;
  defaultValue?: number;
  onChange?: (value: number | undefined) => void;
  currency?: string;
  locale?: string;
  showCurrencySymbol?: boolean;
  allowNegative?: boolean;
}

// Select option type
export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
  icon?: React.ReactNode | IconName;
}

// Select input specific props (3.0)
export interface SelectInputProps extends Omit<TextInputProps, 'variant' | 'onChange' | 'value' | 'defaultValue'> {
  variant: 'select';
  options: SelectOption[];
  value?: string | number;
  defaultValue?: string | number;
  onChange?: (value: string | number | undefined) => void;
  placeholder?: string;
  searchable?: boolean;
  clearable?: boolean;
  loading?: boolean;
}

// Multi-select input specific props (3.1)
export interface MultiSelectInputProps extends Omit<SelectInputProps, 'variant' | 'value' | 'defaultValue' | 'onChange'> {
  variant: 'multi-select';
  value?: (string | number)[];
  defaultValue?: (string | number)[];
  onChange?: (values: (string | number)[]) => void;
  maxSelections?: number;
  showSelectedCount?: boolean;
}

// Date picker input specific props (3.2)
export interface DatePickerInputProps extends Omit<TextInputProps, 'variant' | 'onChange' | 'value' | 'defaultValue'> {
  variant: 'date-picker';
  value?: Date;
  defaultValue?: Date;
  onChange?: (date: Date | undefined) => void;
  minDate?: Date;
  maxDate?: Date;
  dateFormat?: string;
  showCalendar?: boolean;
  allowClear?: boolean;
}

// Verification input specific props (5.0)
export interface VerificationInputProps extends Omit<TextInputProps, 'variant' | 'onChange'> {
  variant: 'verification';
  length?: number;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
  autoFocus?: boolean;
  secure?: boolean;
  separator?: string;
}

// Union type for all input props
export type InputProps = 
  | TextInputProps
  | SearchInputProps
  | PasswordInputProps
  | CreditCardInputProps
  | NumberInputProps
  | PhoneInputProps
  | CurrencyInputProps
  | SelectInputProps
  | MultiSelectInputProps
  | DatePickerInputProps
  | VerificationInputProps;

// Type guards to determine input variant
export const isTextBasedInput = (variant: InputVariant): boolean => {
  return ['text', 'email', 'label', 'multi-text', 'textarea'].includes(variant);
};

export const isSearchInput = (variant: InputVariant): variant is 'search' => {
  return variant === 'search';
};

export const isPasswordInput = (variant: InputVariant): variant is 'password' => {
  return variant === 'password';
};

export const isCreditCardInput = (variant: InputVariant): variant is 'credit-card' => {
  return variant === 'credit-card';
};

export const isNumberInput = (variant: InputVariant): variant is 'number' => {
  return variant === 'number';
};

export const isPhoneInput = (variant: InputVariant): variant is 'phone' => {
  return variant === 'phone';
};

export const isCurrencyInput = (variant: InputVariant): variant is 'currency' => {
  return variant === 'currency';
};

export const isSelectInput = (variant: InputVariant): boolean => {
  return ['select', 'multi-select'].includes(variant);
};

export const isDatePickerInput = (variant: InputVariant): variant is 'date-picker' => {
  return variant === 'date-picker';
};

export const isVerificationInput = (variant: InputVariant): variant is 'verification' => {
  return variant === 'verification';
};

export const isTextareaInput = (variant: InputVariant): variant is 'textarea' => {
  return variant === 'textarea';
};

// Helper functions
export const getInputType = (variant: InputVariant): string => {
  switch (variant) {
    case 'email':
      return 'email';
    case 'password':
      return 'password';
    case 'number':
      return 'number';
    case 'phone':
      return 'tel';
    case 'search':
      return 'search';
    default:
      return 'text';
  }
};

// Input state utilities
export const INPUT_STATES: InputState[] = ['default', 'warning', 'focus', 'hover', 'disabled', 'error', 'success'];

export const isErrorState = (state: InputState): boolean => {
  return state === 'error';
};

export const isSuccessState = (state: InputState): boolean => {
  return state === 'success';
};

export const isWarningState = (state: InputState): boolean => {
  return state === 'warning';
};

export const isDisabledState = (state: InputState): boolean => {
  return state === 'disabled';
};

// Available input variants organized by series
export const INPUT_VARIANTS = {
  BASIC: ['text', 'email', 'search', 'password', 'credit-card', 'multi-text', 'number'] as const,
  LABEL: ['label', 'phone', 'currency'] as const,
  SELECTION: ['select', 'multi-select', 'date-picker'] as const,
  EXTENDED: ['textarea'] as const,
  VERIFICATION: ['verification'] as const,
} as const;

// Re-export icon type for convenience
export type { IconName } from '../Icons/index';