/* ===========================================
   RADIO COMPONENT - Figma Design System Implementation
   File: packages/ui/src/components/Toggle/Radio.tsx
   Based on Figma Radio specifications (Node: 392-10690)
   16 variants: 4 states × 2 toggle options × 2 label options
   =========================================== */

import { forwardRef, useId, useState } from 'react';
import { RadioProps, RadioGroupProps, isRadioChecked, isRadioDisabled } from './Radio.types';
import { Label } from '../Label';
import styles from './Radio.module.css';

// Helper function to get CSS classes
const getRadioClasses = (
  state: RadioProps['state'] = 'default',
  toggle: RadioProps['toggle'] = 'off',
  label: boolean = false,
  className?: string
): string => {
  const classes = [styles.radio];
  
  // State
  if (state === 'disable') {
    classes.push(styles.disabled);
  }
  
  // Size variant based on label
  if (label) {
    classes.push(styles.withLabel);
  } else {
    classes.push(styles.radioOnly);
  }
  
  if (className) {
    classes.push(className);
  }
  
  return classes.filter(Boolean).join(' ');
};

// Helper function to get radio input classes
const getRadioInputClasses = (
  toggle: RadioProps['toggle'] = 'off',
  disabled: boolean = false
): string => {
  const classes = [styles.radioInput];
  
  if (toggle === 'on') {
    classes.push(styles.checked);
  }
  
  if (disabled) {
    classes.push(styles.disabled);
  }
  
  return classes.join(' ');
};

// Main Radio Component
export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (props, ref) => {
    const {
      state = 'default',
      toggle, // No default value - undefined means uncontrolled
      label = false,
      labelText = 'Radio Label',
      value,
      onChange,
      className,
      id,
      name,
      disabled,
      'aria-label': ariaLabel,
      'aria-describedby': ariaDescribedBy,
      'data-testid': dataTestId,
      ...rest
    } = props;

    // Generate unique ID for accessibility
    const radioId = useId();
    const inputId = id || radioId;
    const labelId = `${inputId}-label`;

    // Internal state for uncontrolled mode
    const [internalToggle, setInternalToggle] = useState<RadioProps['toggle']>('off');

    // Determine if component is controlled (toggle prop is explicitly provided)
    const isControlled = toggle !== undefined;
    
    // Use controlled or uncontrolled value
    const currentToggle = isControlled ? toggle : internalToggle;

    // Determine states
    const isChecked = currentToggle === 'on';
    const isDisabled = isRadioDisabled(props) || disabled;

    // Handle change event
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (isDisabled) return;
      
      const newChecked = event.target.checked;
      
      // Update internal state if uncontrolled
      if (!isControlled) {
        setInternalToggle(newChecked ? 'on' : 'off');
      }
      
      // Call onChange if provided
      onChange?.(newChecked, event);
    };

    // Handle label click for single radio toggle behavior
    const handleLabelClick = (event: React.MouseEvent<HTMLLabelElement>) => {
      if (isDisabled) {
        event.preventDefault();
        return;
      }
      
      // For single radio buttons (no group), allow toggle off behavior
      if (!name || !isControlled) {
        // If already checked and it's a single radio, toggle it off
        if (isChecked) {
          event.preventDefault();
          
          // Update internal state if uncontrolled
          if (!isControlled) {
            setInternalToggle('off');
          }
          
          // Create synthetic event for onChange
          const syntheticEvent = {
            target: { checked: false },
            currentTarget: { checked: false }
          } as React.ChangeEvent<HTMLInputElement>;
          
          onChange?.(false, syntheticEvent);
        }
      }
    };

    // Get CSS classes
    const radioClasses = getRadioClasses(state, currentToggle, label, className);
    const inputClasses = getRadioInputClasses(currentToggle, isDisabled);

    const content = (
      <>
        <input
          ref={ref}
          type="radio"
          id={inputId}
          name={name}
          value={value}
          checked={isChecked}
          disabled={isDisabled}
          onChange={handleChange}
          className={styles.input}
          aria-label={ariaLabel}
          aria-describedby={ariaDescribedBy}
          data-testid={dataTestId}
          {...rest}
        />
        
        <div className={inputClasses}>
          <div className={styles.radioDot} />
        </div>
        
        {label && (
          <div className={styles.textContainer}>
            <Label size="md" className={styles.labelText}>
              {labelText}
            </Label>
            <span className={styles.subtitle}>
              Supporting text
            </span>
          </div>
        )}
      </>
    );

    return (
      <label className={radioClasses} htmlFor={inputId} onClick={handleLabelClick}>
        {content}
      </label>
    );
  }
);

Radio.displayName = 'Radio';

// Radio Group Component for managing multiple radio buttons
export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  (props, ref) => {
    const {
      name,
      value,
      onChange,
      options,
      disabled = false,
      className,
      ...rest
    } = props;

    const handleRadioChange = (optionValue: string, event: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(optionValue, event);
    };

    return (
      <div 
        ref={ref}
        className={`${styles.radioGroup} ${className || ''}`}
        role="radiogroup"
        {...rest}
      >
        {options.map((option, index) => (
          <Radio
            key={option.value}
            name={name}
            value={option.value}
            toggle={value === option.value ? 'on' : 'off'}
            label={true}
            labelText={option.label}
            disabled={disabled || option.disabled}
            onChange={(checked, event) => {
              if (checked) {
                handleRadioChange(option.value, event);
              }
            }}
          />
        ))}
      </div>
    );
  }
);

RadioGroup.displayName = 'RadioGroup';

export default Radio;