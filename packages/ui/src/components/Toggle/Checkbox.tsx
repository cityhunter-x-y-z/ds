/* ===========================================
   CHECKBOX COMPONENT - Figma Design System Implementation
   File: packages/ui/src/components/Toggle/Checkbox.tsx
   Based on Figma Checkbox specifications (Node: 396-13807)
   24 variants: 4 states × 3 toggle options × 2 label options
   =========================================== */

import { forwardRef, useId, useEffect, useRef, useState } from 'react';
import { CheckboxProps, isCheckboxChecked, isCheckboxIndeterminate, isCheckboxDisabled } from './Checkbox.types';
import { Label } from '../Label';
import styles from './Checkbox.module.css';

// Helper function to get CSS classes
const getCheckboxClasses = (
  state: CheckboxProps['state'] = 'default',
  toggle: CheckboxProps['toggle'] = 'off',
  label: boolean = false,
  className?: string
): string => {
  const classes = [styles.checkbox];
  
  // State
  if (state === 'disable') {
    classes.push(styles.disabled);
  }
  
  // Size variant based on label
  if (label) {
    classes.push(styles.withLabel);
  } else {
    classes.push(styles.checkboxOnly);
  }
  
  if (className) {
    classes.push(className);
  }
  
  return classes.filter(Boolean).join(' ');
};

// Helper function to get checkbox input classes
const getCheckboxInputClasses = (
  toggle: CheckboxProps['toggle'] = 'off',
  disabled: boolean = false
): string => {
  const classes = [styles.checkboxInput];
  
  if (toggle === 'on') {
    classes.push(styles.checked);
  } else if (toggle === 'indeterminate') {
    classes.push(styles.indeterminate);
  }
  
  if (disabled) {
    classes.push(styles.disabled);
  }
  
  return classes.join(' ');
};

// Checkmark SVG Icon
const CheckmarkIcon = () => (
  <svg 
    className={styles.checkmark}
    viewBox="0 0 12 12" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M10 3L4.5 8.5L2 6" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

// Main Checkbox Component
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (props, ref) => {
    const {
      state = 'default',
      toggle, // No default value - undefined means uncontrolled
      label = false,
      labelText = 'Checkbox Label',
      subtitleText = 'Supporting text',
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
    const checkboxId = useId();
    const inputId = id || checkboxId;
    const labelId = `${inputId}-label`;

    // Ref for handling indeterminate state
    const inputRef = useRef<HTMLInputElement>(null);

    // Internal state for uncontrolled mode
    const [internalToggle, setInternalToggle] = useState<CheckboxProps['toggle']>('off');

    // Determine if component is controlled (toggle prop is explicitly provided)
    const isControlled = toggle !== undefined;
    
    // Use controlled or uncontrolled value
    const currentToggle = isControlled ? toggle : internalToggle;

    // Determine states
    const isChecked = currentToggle === 'on';
    const isIndeterminate = currentToggle === 'indeterminate';
    const isDisabled = isCheckboxDisabled(props) || disabled;

    // Handle indeterminate state
    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.indeterminate = isIndeterminate;
      }
    }, [isIndeterminate]);

    // Combine refs
    const combinedRef = (element: HTMLInputElement | null) => {
      inputRef.current = element;
      if (typeof ref === 'function') {
        ref(element);
      } else if (ref) {
        ref.current = element;
      }
    };

    // Handle change event
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (isDisabled) return;
      
      let newValue: boolean | 'indeterminate';
      
      if (isIndeterminate) {
        // From indeterminate to checked
        newValue = true;
      } else {
        // Use the actual input checked state
        newValue = event.target.checked;
      }
      
      // Update internal state if uncontrolled
      if (!isControlled) {
        setInternalToggle(newValue === true ? 'on' : 'off');
      }
      
      // Call onChange if provided
      onChange?.(newValue, event);
    };

    // Handle label click
    const handleLabelClick = (event: React.MouseEvent<HTMLLabelElement>) => {
      if (isDisabled) {
        event.preventDefault();
        return;
      }
      // Label will naturally trigger the input change
    };

    // Get CSS classes
    const checkboxClasses = getCheckboxClasses(state, currentToggle, label, className);
    const inputClasses = getCheckboxInputClasses(currentToggle, isDisabled);

    const content = (
      <>
        <input
          ref={combinedRef}
          type="checkbox"
          id={inputId}
          name={name}
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
          {currentToggle === 'on' && <CheckmarkIcon />}
          {currentToggle === 'indeterminate' && <div className={styles.indeterminateIcon} />}
        </div>
        
        {label && (
          <div className={styles.textContainer}>
            <Label size="md" className={styles.labelText}>
              {labelText}
            </Label>
            <span className={styles.subtitle}>
              {subtitleText}
            </span>
          </div>
        )}
      </>
    );

    return (
      <label 
        className={checkboxClasses} 
        htmlFor={inputId}
        onClick={handleLabelClick}
      >
        {content}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;