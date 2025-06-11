/* ===================================
   INPUT COMPONENT - Complete Figma Implementation
   File: packages/ui/src/components/Input/Input.tsx
   Supports all Figma input variants (1.0-5.0 series)
   ================================== */

import React, { forwardRef, useState, useCallback, useRef, useEffect } from 'react';
import {
  InputProps,
  TextInputProps,
  SearchInputProps,
  PasswordInputProps,
  CreditCardInputProps,
  VerificationInputProps,
  isSearchInput,
  isPasswordInput,
  isCreditCardInput,
  isNumberInput,
  isPhoneInput,
  isCurrencyInput,
  isSelectInput,
  isDatePickerInput,
  isVerificationInput,
  isTextareaInput,
  getInputType,
  isErrorState,
  isSuccessState,
} from './Input.types';
import { DynamicIcon, IconName, ICON_REGISTRY } from '../Icons/index';
import styles from './Input.module.css';

// Type guard to check if string is valid IconName
const isValidIconName = (icon: string): icon is IconName => {
  return Object.keys(ICON_REGISTRY).includes(icon);
};

// Helper function to get input classes
const getInputClasses = (
  variant: string,
  size: 'md' | 'lg' = 'lg',
  state: string = 'default',
  disabled: boolean = false,
  className?: string
): string => {
  const classes = [styles.input];
  
  // Base variant class
  classes.push(styles[variant.replace(/-/g, '')]);
  
  // Size class
  classes.push(size === 'lg' ? styles.inputLg : styles.inputMd);
  
  // State classes
  if (disabled || state === 'disabled') {
    classes.push(styles.disabled);
  } else {
    classes.push(styles[state]);
  }
  
  // Special layout classes for different input types
  if (isTextareaInput(variant as any)) {
    classes.push(styles.textarea);
  } else if (isSelectInput(variant as any)) {
    classes.push(styles.select);
  } else if (isVerificationInput(variant as any)) {
    classes.push(styles.verification);
  }
  
  if (className) {
    classes.push(className);
  }
  
  return classes.filter(Boolean).join(' ');
};

// Helper function to get container classes
const getContainerClasses = (
  variant: string,
  state: string = 'default',
  disabled: boolean = false,
  hasIcon: boolean = false,
  hasLabel: boolean = false
): string => {
  const classes = [styles.container];
  
  // Add variant-specific container classes
  classes.push(styles[`${variant.replace(/-/g, '')}Container`]);
  
  // Add state classes
  if (disabled || state === 'disabled') {
    classes.push(styles.containerDisabled);
  } else {
    classes.push(styles[`container${state.charAt(0).toUpperCase() + state.slice(1)}`]);
  }
  
  // Layout modifier classes
  if (hasIcon) {
    classes.push(styles.containerWithIcon);
  }
  
  if (hasLabel) {
    classes.push(styles.containerWithLabel);
  }
  
  return classes.filter(Boolean).join(' ');
};

// Icon rendering helper
const renderIcon = (
  icon: React.ReactNode | IconName | undefined,
  size: 16 | 20 | 24 = 20,
  className?: string
): React.ReactNode => {
  if (!icon) return null;

  if (typeof icon === 'string') {
    if (isValidIconName(icon)) {
      return (
        <DynamicIcon
          name={icon}
          size={size}
          className={className}
        />
      );
    } else {
      console.warn(`Icon name "${icon}" not found in registry.`);
      return null;
    }
  }

  if (React.isValidElement(icon)) {
    return React.cloneElement(icon as React.ReactElement<any>, {
      size,
      className,
      ...(icon.props || {}),
    });
  }

  return icon;
};

// Credit card formatting helper
const formatCreditCard = (value: string): string => {
  const digits = value.replace(/\D/g, '');
  const groups = digits.match(/.{1,4}/g) || [];
  return groups.join(' ');
};


// Text-based input component
const TextInput = forwardRef<HTMLInputElement | HTMLTextAreaElement, TextInputProps>(
  (props, ref) => {
    const {
      variant,
      size = 'lg',
      state = 'default',
      disabled = false,
      value,
      defaultValue,
      placeholder,
      onChange,
      onFocus,
      onBlur,
      onKeyDown,
      label,
      labelPosition = 'top',
      helperText,
      errorMessage,
      successMessage,
      icon,
      iconPosition = 'left',
      maxLength,
      minLength,
      pattern,
      rows = 4,
      cols,
      resize = 'vertical',
      showCharacterCount = false,
      className,
      style,
      'aria-label': ariaLabel,
      'data-testid': dataTestId,
      id,
      name,
      required,
      ...restProps
    } = props;

    const [internalValue, setInternalValue] = useState(value || defaultValue || '');
    const [isFocused, setIsFocused] = useState(false);
    const isTextarea = isTextareaInput(variant);
    const inputType = getInputType(variant);

    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const newValue = event.target.value;
      setInternalValue(newValue);
      onChange?.(event);
    }, [onChange]);

    const handleFocus = useCallback((event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setIsFocused(true);
      onFocus?.(event);
    }, [onFocus]);

    const handleBlur = useCallback((event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setIsFocused(false);
      onBlur?.(event);
    }, [onBlur]);

    const currentState = disabled ? 'disabled' : (isFocused ? 'focus' : state);
    const hasError = isErrorState(state);
    const hasSuccess = isSuccessState(state);
    
    const containerClasses = getContainerClasses(variant, currentState, disabled, !!icon, !!label);
    const inputClasses = getInputClasses(variant, size, currentState, disabled, className);

    const displayMessage = hasError ? errorMessage : hasSuccess ? successMessage : helperText;
    const messageClass = hasError ? styles.errorMessage : hasSuccess ? styles.successMessage : styles.helperText;

    const commonProps = {
      id,
      name,
      value: value !== undefined ? value : internalValue,
      placeholder,
      disabled,
      required,
      onChange: handleChange,
      onFocus: handleFocus,
      onBlur: handleBlur,
      onKeyDown,
      className: inputClasses,
      'aria-label': ariaLabel || label,
      'data-testid': dataTestId,
      'aria-invalid': hasError,
      'aria-describedby': displayMessage ? `${id}-message` : undefined,
      maxLength,
      minLength,
      pattern,
      ...restProps,
    };

    return (
      <div className={containerClasses} style={style}>
        {label && labelPosition === 'top' && (
          <label htmlFor={id} className={styles.label}>
            {label}
            {required && <span className={styles.required}>*</span>}
          </label>
        )}
        
        <div className={styles.inputWrapper}>
          {icon && iconPosition === 'left' && (
            <div className={styles.iconLeft}>
              {renderIcon(icon, size === 'md' ? 16 : 20, styles.icon)}
            </div>
          )}
          
          {label && labelPosition === 'floating' && (
            <label htmlFor={id} className={styles.floatingLabel}>
              {label}
              {required && <span className={styles.required}>*</span>}
            </label>
          )}
          
          {isTextarea ? (
            <textarea
              {...(commonProps as any)}
              ref={ref as React.Ref<HTMLTextAreaElement>}
              rows={rows}
              cols={cols}
              style={{ resize }}
            />
          ) : (
            <input
              {...(commonProps as any)}
              ref={ref as React.Ref<HTMLInputElement>}
              type={inputType}
            />
          )}
          
          {icon && iconPosition === 'right' && (
            <div className={styles.iconRight}>
              {renderIcon(icon, size === 'md' ? 16 : 20, styles.icon)}
            </div>
          )}
          
          {isTextarea && showCharacterCount && maxLength && (
            <div className={styles.characterCount}>
              {internalValue.length}/{maxLength}
            </div>
          )}
        </div>
        
        {displayMessage && (
          <div id={`${id}-message`} className={messageClass}>
            {displayMessage}
          </div>
        )}
      </div>
    );
  }
);

// Search input component
const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>((props, ref) => {
  const {
    onSearch,
    showClearButton = true,
    searchIcon = 'search',
    ...textProps
  } = props;

  const [internalValue, setInternalValue] = useState(props.value || props.defaultValue || '');

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newValue = event.target.value;
    setInternalValue(newValue);
    props.onChange?.(event);
  }, [props]);

  const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (event.key === 'Enter') {
      onSearch?.(internalValue);
    }
    props.onKeyDown?.(event);
  }, [onSearch, internalValue, props]);


  return (
    <TextInput
      {...textProps}
      ref={ref}
      value={props.value !== undefined ? props.value : internalValue}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      icon={searchIcon}
      iconPosition="left"
    />
  );
});

// Password input component
const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>((props, ref) => {
  const {
    showPasswordToggle = true,
    showPassword: controlledShowPassword,
    onPasswordToggle,
    strengthIndicator = false,
    ...textProps
  } = props;

  const [internalShowPassword, setInternalShowPassword] = useState(false);
  const showPassword = controlledShowPassword !== undefined ? controlledShowPassword : internalShowPassword;

  const handleTogglePassword = useCallback(() => {
    const newState = !showPassword;
    setInternalShowPassword(newState);
    onPasswordToggle?.(newState);
  }, [showPassword, onPasswordToggle]);

  const toggleIcon = showPassword ? 'eye-off' : 'eye';

  return (
    <div className={styles.passwordContainer}>
      <TextInput
        {...textProps}
        ref={ref}
        variant={showPassword ? 'text' : 'password'}
        icon={showPasswordToggle ? (
          <button
            type="button"
            onClick={handleTogglePassword}
            className={styles.passwordToggle}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {renderIcon(toggleIcon, 20)}
          </button>
        ) : undefined}
        iconPosition="right"
      />
    </div>
  );
});

// Credit card input component
const CreditCardInput = forwardRef<HTMLInputElement, CreditCardInputProps>((props, ref) => {
  const {
    acceptedCards = ['visa', 'mastercard', 'amex', 'discover'],
    showCardIcon = true,
    onCardTypeDetected,
    formatSpaces = true,
    value,
    defaultValue,
    onChange,
    ...textProps
  } = props;

  const [cardType, setCardType] = useState<string>('');
  const [internalValue, setInternalValue] = useState(() => {
    const initialValue = value || defaultValue || '';
    return formatSpaces ? formatCreditCard(initialValue) : initialValue;
  });

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let rawValue = event.target.value;
    let formattedValue = rawValue;
    
    if (formatSpaces) {
      formattedValue = formatCreditCard(rawValue);
    }
    
    // Update internal state
    setInternalValue(formattedValue);
    
    // Detect card type (simplified logic)
    const firstDigit = formattedValue.replace(/\s/g, '').charAt(0);
    let detectedType = '';
    if (firstDigit === '4') detectedType = 'visa';
    else if (firstDigit === '5') detectedType = 'mastercard';
    else if (firstDigit === '3') detectedType = 'amex';
    else if (firstDigit === '6') detectedType = 'discover';
    
    if (detectedType !== cardType) {
      setCardType(detectedType);
      onCardTypeDetected?.(detectedType);
    }

    // Create a new event with the formatted value
    const syntheticEvent = {
      ...event,
      target: { ...event.target, value: formattedValue },
    } as React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
    
    onChange?.(syntheticEvent);
  }, [formatSpaces, cardType, onCardTypeDetected, onChange]);

  // Use controlled value if provided, otherwise use internal state
  const currentValue = value !== undefined ? (formatSpaces ? formatCreditCard(value) : value) : internalValue;

  return (
    <TextInput
      {...textProps}
      ref={ref}
      value={currentValue}
      onChange={handleChange}
      icon={showCardIcon && cardType ? `card-${cardType}` : 'credit-card'}
      iconPosition="right"
      maxLength={formatSpaces ? 19 : 16}
    />
  );
});

// Verification input component
const VerificationInput = forwardRef<HTMLDivElement, VerificationInputProps>((props, ref) => {
  const {
    length = 6,
    value,
    defaultValue,
    onChange,
    onComplete,
    autoFocus = true,
    secure = false,
    separator = '',
    size = 'lg',
    state = 'default',
    disabled = false,
    className,
    'data-testid': dataTestId
  } = props;

  const [internalValue, setInternalValue] = useState(value || defaultValue || '');
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (autoFocus && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [autoFocus]);

  const handleChange = useCallback((index: number, newValue: string) => {
    const values = internalValue.split('');
    values[index] = newValue;
    const updatedValue = values.join('');
    
    setInternalValue(updatedValue);
    onChange?.(updatedValue);
    
    if (updatedValue.length === length) {
      onComplete?.(updatedValue);
    }
    
    // Move to next input
    if (newValue && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  }, [internalValue, length, onChange, onComplete]);

  const handleKeyDown = useCallback((index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace' && !internalValue[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }, [internalValue]);

  const containerClasses = getContainerClasses('verification', state, disabled);

  return (
    <div ref={ref} className={`${containerClasses} ${className || ''}`} data-testid={dataTestId}>
      <div className={styles.verificationInputs}>
        {Array.from({ length }).map((_, index) => (
          <React.Fragment key={index}>
            <input
              ref={(el) => (inputRefs.current[index] = el)}
              type={secure ? 'password' : 'text'}
              value={internalValue[index] || ''}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className={getInputClasses('verification', size, state, disabled)}
              maxLength={1}
              disabled={disabled}
              aria-label={`Verification code digit ${index + 1}`}
            />
            {separator && index < length - 1 && (
              <span className={styles.verificationSeparator}>{separator}</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
});

// Main Input component
export const Input = forwardRef<HTMLElement, InputProps>((props, ref) => {
  const { variant } = props;

  // Route to appropriate sub-component based on variant
  if (isSearchInput(variant)) {
    return <SearchInput {...(props as SearchInputProps)} ref={ref as React.Ref<HTMLInputElement>} />;
  }
  
  if (isPasswordInput(variant)) {
    return <PasswordInput {...(props as PasswordInputProps)} ref={ref as React.Ref<HTMLInputElement>} />;
  }
  
  if (isCreditCardInput(variant)) {
    return <CreditCardInput {...(props as CreditCardInputProps)} ref={ref as React.Ref<HTMLInputElement>} />;
  }
  
  if (isVerificationInput(variant)) {
    return <VerificationInput {...(props as VerificationInputProps)} ref={ref as React.Ref<HTMLDivElement>} />;
  }
  
  // For now, route complex inputs to TextInput as placeholder
  // TODO: Implement specialized components for number, phone, currency, select, date-picker
  if (isNumberInput(variant) || isPhoneInput(variant) || isCurrencyInput(variant) || 
      isSelectInput(variant) || isDatePickerInput(variant)) {
    console.warn(`Input variant "${variant}" is not fully implemented yet. Using text input as fallback.`);
    return <TextInput {...(props as TextInputProps)} ref={ref as React.Ref<HTMLInputElement>} />;
  }
  
  // Default to text-based input
  return <TextInput {...(props as TextInputProps)} ref={ref as React.Ref<HTMLInputElement | HTMLTextAreaElement>} />;
});

// Set display names
TextInput.displayName = 'TextInput';
SearchInput.displayName = 'SearchInput';
PasswordInput.displayName = 'PasswordInput';
CreditCardInput.displayName = 'CreditCardInput';
VerificationInput.displayName = 'VerificationInput';
Input.displayName = 'Input';

export default Input;