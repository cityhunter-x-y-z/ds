/* ===========================================
   LABEL COMPONENT - Figma Design System Implementation
   File: packages/ui/src/components/Label/Label.tsx
   Based on Figma Label 2.0 specifications
   =========================================== */

import { forwardRef, useId } from 'react';
import { LabelProps, isRequiredField } from './Label.types';
import styles from './Label.module.css';


// Helper function to get CSS classes
const getLabelClasses = (
  size: LabelProps['size'] = 'lg',
  className?: string
): string => {
  const classes = [styles.label];
  
  // Size
  classes.push(styles[`size${size.charAt(0).toUpperCase() + size.slice(1)}`]);
  
  if (className) {
    classes.push(className);
  }
  
  return classes.filter(Boolean).join(' ');
};


// Main Label Component
export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  (props, ref) => {
    const {
      children,
      size = 'lg',
      className,
      'data-testid': dataTestId
    } = props;
    
    // Generate unique ID for accessibility
    const labelId = useId();

    const labelClasses = getLabelClasses(size, className);
    
    const labelProps = {
      className: labelClasses
    };



    const content = (
      <>
        <span className={`${styles.mainText} ${isRequiredField(props) ? styles.required : ''}`}>
          {children}
        </span>
        
        {props.subtitle && (
          <span className={styles.subtitle}>
            This is supporting text
          </span>
        )}
      </>
    );

    return (
      <label
        ref={ref}
        id={labelId}
        data-testid={dataTestId}
        {...labelProps}
      >
        {content}
      </label>
    );
  }
);

Label.displayName = 'Label';

export default Label;