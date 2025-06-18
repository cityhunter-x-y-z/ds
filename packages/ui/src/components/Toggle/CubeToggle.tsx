/* ===========================================
   CUBE TOGGLE COMPONENT - Figma Design System Implementation
   File: packages/ui/src/components/Toggle/CubeToggle.tsx
   Based on Figma Cube/Toggle specifications (Node: 1206-89512)
   8 variants: 4 states × 2 toggle options
   =========================================== */

import { forwardRef, useId, useState } from 'react';
import { CubeToggleProps, isCubeToggleChecked, isCubeToggleDisabled } from './CubeToggle.types';
import styles from './CubeToggle.module.css';

// Helper function to get CSS classes
const getCubeToggleClasses = (
  toggle: CubeToggleProps['toggle'] = 'off',
  disabled: boolean = false,
  className?: string
): string => {
  const classes = [styles.cubeToggle];
  
  if (toggle === 'on') {
    classes.push(styles.checked);
  }
  
  if (disabled) {
    classes.push(styles.disabled);
  }
  
  if (className) {
    classes.push(className);
  }
  
  return classes.filter(Boolean).join(' ');
};

// Main Cube Toggle Component
export const CubeToggle = forwardRef<HTMLInputElement, CubeToggleProps>(
  (props, ref) => {
    const {
      state = 'default',
      toggle, // No default value - undefined means uncontrolled
      onChange,
      className,
      id,
      name,
      disabled,
      'aria-label': ariaLabel,
      'aria-describedby': ariaDescribedBy,
      'data-testid': dataTestId,
      children,
      ...rest
    } = props;

    // Generate unique ID for accessibility
    const cubeToggleId = useId();
    const inputId = id || cubeToggleId;

    // Internal state for uncontrolled mode
    const [internalToggle, setInternalToggle] = useState<CubeToggleProps['toggle']>('off');

    // Determine if component is controlled (toggle prop is explicitly provided)
    const isControlled = toggle !== undefined;
    
    // Use controlled or uncontrolled value
    const currentToggle = isControlled ? toggle : internalToggle;

    // Determine states
    const isChecked = currentToggle === 'on';
    const isDisabled = isCubeToggleDisabled(props) || disabled;

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

    // Handle click on label
    const handleClick = (event: React.MouseEvent<HTMLLabelElement>) => {
      if (isDisabled) {
        event.preventDefault();
        return;
      }
      
      // Prevent default to avoid double events
      event.preventDefault();
      
      // Toggle the state
      const newChecked = !isChecked;
      
      // Update internal state if uncontrolled
      if (!isControlled) {
        setInternalToggle(newChecked ? 'on' : 'off');
      }
      
      // Create synthetic event for onChange
      const syntheticEvent = {
        target: { checked: newChecked },
        currentTarget: { checked: newChecked }
      } as React.ChangeEvent<HTMLInputElement>;
      
      // Call onChange if provided
      onChange?.(newChecked, syntheticEvent);
    };

    // Handle keyboard interaction
    const handleKeyDown = (event: React.KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        if (!isDisabled) {
          // Trigger change
          const syntheticEvent = {
            target: { checked: !isChecked },
            currentTarget: { checked: !isChecked }
          } as React.ChangeEvent<HTMLInputElement>;
          handleChange(syntheticEvent);
        }
      }
    };

    // Get CSS classes
    const cubeToggleClasses = getCubeToggleClasses(currentToggle, isDisabled, className);

    // Default content based on toggle state
    const defaultContent = currentToggle === 'on' ? 'ON' : 'OFF';

    return (
      <label 
        className={cubeToggleClasses} 
        htmlFor={inputId}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={isDisabled ? -1 : 0}
        role="switch"
        aria-checked={isChecked}
        aria-disabled={isDisabled}
      >
        <input
          ref={ref}
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
          tabIndex={-1} /* Label handles focus */
          {...rest}
        />
        
        <div className={styles.cubeToggleContent}>
          {children || defaultContent}
        </div>
      </label>
    );
  }
);

CubeToggle.displayName = 'CubeToggle';

export default CubeToggle;