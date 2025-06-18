/* ===========================================
   LOADER COMPONENT - Figma Design System Implementation
   File: packages/ui/src/components/Loader/Loader.tsx
   Based on Figma: SVG-based loader with indeterminate/determinate variants
   =========================================== */

import { forwardRef, useMemo } from 'react';
import { LoaderProps, getLoaderSize, isDeterminateLoader } from './Loader.types';
import styles from './Loader.module.css';

// Helper function to get CSS classes
const getLoaderClasses = (className?: string): string => {
  const classes = [styles.loader];
  
  if (className) {
    classes.push(className);
  }
  
  return classes.join(' ');
};

// Helper function to get SVG container classes
const getSvgContainerClasses = (
  size: LoaderProps['size'] = 'md',
  type: LoaderProps['type'] = 'indeterminate'
): string => {
  const classes = [styles.svgContainer];
  
  // Add size class
  classes.push(styles[size]);
  
  // Add type class
  classes.push(styles[type]);
  
  return classes.join(' ');
};

// Helper function to calculate circle circumference
const getCircleCircumference = (radius: number): number => {
  return 2 * Math.PI * radius;
};

// Helper function to calculate stroke dash array for determinate loader
const getStrokeDashArray = (percentage: number, circumference: number): string => {
  const progress = Math.max(0, Math.min(100, percentage));
  const strokeLength = (progress / 100) * circumference;
  const gapLength = circumference - strokeLength;
  return `${strokeLength} ${gapLength}`;
};

// Main Loader Component
export const Loader = forwardRef<HTMLDivElement, LoaderProps>(
  (props, ref) => {
    const {
      size = 'md',
      type = 'indeterminate',
      showLabel = false,
      labelText = 'Loading...',
      className,
      'aria-label': ariaLabel,
      'data-testid': dataTestId,
      ...restProps
    } = props;

    // Get size in pixels
    const sizeInPixels = getLoaderSize(size);
    
    // Calculate circle properties
    const radius = (sizeInPixels - 4) / 2; // Account for stroke width
    const circumference = getCircleCircumference(radius);
    const center = sizeInPixels / 2;
    
    // Calculate progress for determinate loader
    const progressValue = isDeterminateLoader(props) ? props.value : 0;
    const strokeDashArray = useMemo(() => {
      if (isDeterminateLoader(props)) {
        return getStrokeDashArray(progressValue, circumference);
      }
      return undefined;
    }, [progressValue, circumference, props]);

    const loaderClasses = getLoaderClasses(className);
    const svgContainerClasses = getSvgContainerClasses(size, type);
    
    // Determine label text based on type
    const displayLabel = useMemo(() => {
      if (!showLabel) return null;
      
      if (isDeterminateLoader(props)) {
        return `${Math.round(progressValue)}%`;
      }
      
      return labelText;
    }, [showLabel, props, progressValue, labelText]);

    // Determine ARIA label
    const accessibilityLabel = useMemo(() => {
      if (ariaLabel) return ariaLabel;
      
      if (isDeterminateLoader(props)) {
        return `Loading progress: ${Math.round(progressValue)}%`;
      }
      
      return 'Loading';
    }, [ariaLabel, props, progressValue]);

    return (
      <div
        ref={ref}
        className={loaderClasses}
        role="status"
        aria-label={accessibilityLabel}
        aria-live="polite"
        aria-valuemin={isDeterminateLoader(props) ? 0 : undefined}
        aria-valuemax={isDeterminateLoader(props) ? 100 : undefined}
        aria-valuenow={isDeterminateLoader(props) ? Math.round(progressValue) : undefined}
        data-testid={dataTestId}
        {...restProps}
      >
        <div className={svgContainerClasses}>
          <svg
            className={styles.svg}
            viewBox={`0 0 ${sizeInPixels} ${sizeInPixels}`}
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            {/* Background circle */}
            <circle
              className={styles.backgroundCircle}
              cx={center}
              cy={center}
              r={radius}
            />
            
            {/* Progress/spinner circle */}
            <circle
              className={styles.progressCircle}
              cx={center}
              cy={center}
              r={radius}
              style={
                isDeterminateLoader(props)
                  ? {
                      strokeDasharray: strokeDashArray,
                      transform: 'rotate(-90deg)',
                      transformOrigin: 'center'
                    }
                  : undefined
              }
            />
          </svg>
        </div>
        
        {/* Label text */}
        {displayLabel && (
          <span className={styles.label}>
            {displayLabel}
          </span>
        )}
        
        {/* Hidden text for screen readers when no visible label */}
        {!displayLabel && (
          <span className={styles.visuallyHidden}>
            {accessibilityLabel}
          </span>
        )}
      </div>
    );
  }
);

Loader.displayName = 'Loader';

export default Loader;