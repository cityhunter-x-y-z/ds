/* ===========================================
   SWITCH COMPONENT - Figma Design System Implementation
   File: packages/ui/src/components/Toggle/Switch.tsx
   Based on Figma Switch specifications (Node: 388-9960)
   16 variants: 4 states × 2 toggle options × 2 label options
   =========================================== */

import { forwardRef, useId, useState } from 'react';
import { SwitchProps, isSwitchChecked, isSwitchDisabled } from './Switch.types';
import { Label } from '../Label';
import styles from './Switch.module.css';

// Helper function to get CSS classes
const getSwitchClasses = (
  state: SwitchProps['state'] = 'default',
  toggle: SwitchProps['toggle'] = 'off',
  label: boolean = false,
  className?: string
): string => {
  const classes = [styles.switch];
  
  // State
  if (state === 'disable') {
    classes.push(styles.disabled);
  }
  
  // Size variant based on label
  if (label) {
    classes.push(styles.withLabel);
  } else {
    classes.push(styles.switchOnly);
  }
  
  if (className) {
    classes.push(className);
  }
  
  return classes.filter(Boolean).join(' ');
};

// Helper function to get switch track classes
const getSwitchTrackClasses = (
  toggle: SwitchProps['toggle'] = 'off',
  disabled: boolean = false
): string => {
  const classes = [styles.switchTrack];
  
  if (toggle === 'on') {
    classes.push(styles.checked);
  }
  
  if (disabled) {
    classes.push(styles.disabled);
  }
  
  return classes.join(' ');
};

// Main Switch Component
export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  (props, ref) => {
    const {
      state = 'default',
      toggle, // No default value - undefined means uncontrolled
      label = false,
      labelText = 'Switch Label',
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
    const switchId = useId();
    const inputId = id || switchId;
    const labelId = `${inputId}-label`;

    // Internal state for uncontrolled mode
    const [internalToggle, setInternalToggle] = useState<SwitchProps['toggle']>('off');

    // Determine if component is controlled (toggle prop is explicitly provided)
    const isControlled = toggle !== undefined;
    
    // Use controlled or uncontrolled value
    const currentToggle = isControlled ? toggle : internalToggle;

    // Determine states
    const isChecked = currentToggle === 'on';
    const isDisabled = isSwitchDisabled(props) || disabled;

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

    // Get CSS classes
    const switchClasses = getSwitchClasses(state, currentToggle, label, className);
    const trackClasses = getSwitchTrackClasses(currentToggle, isDisabled);

    const content = (
      <>
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
          role="switch"
          aria-checked={isChecked}
          {...rest}
        />
        
        <div className={trackClasses}>
          <div className={styles.switchThumb} />
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
      <label className={switchClasses} htmlFor={inputId}>
        {content}
      </label>
    );
  }
);

Switch.displayName = 'Switch';

export default Switch;