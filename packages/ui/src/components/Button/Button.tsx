/* ===========================================
   BUTTON COMPONENT - TypeScript Fixed Implementation
   File: packages/ui/src/components/Button/Button.tsx
   =========================================== */

import React, { forwardRef } from 'react';
import { ButtonProps, TextButtonProps, IconButtonProps, isIconButton } from './Button.types';
import { DynamicIcon, IconName, ICON_REGISTRY } from '../Icons/index';
import styles from './Button.module.css';

// Type guard to check if string is valid IconName
const isValidIconName = (icon: string): icon is IconName => {
  return Object.keys(ICON_REGISTRY).includes(icon);
};

// Helper function to get button classes
const getButtonClasses = (
  variant: string,
  size: 'md' | 'lg',
  disabled: boolean,
  loading: boolean,
  className?: string
): string => {
  const classes = [styles.button];
  
  if (isIconButton(variant as any)) {
    classes.push(styles.iconButton);
    
    if (variant === 'icon-outline') {
      classes.push(size === 'lg' ? styles.iconButtonOutlineLg : styles.iconButtonOutlineMd);
    } else {
      classes.push(size === 'lg' ? styles.iconButtonLg : styles.iconButtonMd);
    }
  } else {
    classes.push(styles.textButton);
    classes.push(size === 'lg' ? styles.textButtonLg : styles.textButtonMd);
  }
  
  const variantClass = variant.replace(/-/g, '');
  classes.push(styles[variantClass]);
  
  if (size === 'md') {
    classes.push(styles[`${variantClass}Md`]);
  }
  
  if (disabled) {
    classes.push(styles.disabled);
  }
  
  if (loading) {
    classes.push(styles.loading);
  }
  
  if (className) {
    classes.push(className);
  }
  
  return classes.filter(Boolean).join(' ');
};

// Helper function to get icon stroke color
const getIconStroke = (variant: string, disabled: boolean): string => {
  if (disabled) return '#A4A7AE';
  
  switch (variant) {
    case 'primary':
    case 'secondary':
    case 'neutral':
    case 'semantic':
    case 'icon-neutral':
      return '#FFF';
    case 'outline':
    case 'transparent':
    case 'ellipse-transparent':
    case 'icon-outline':
    case 'icon-transparent':
      return '#101828';
    case 'danger-transparent':
      return 'var(--button-Danger-Default-text)';
    default:
      return '#101828';
  }
};

// Helper function to get icon size
const getIconSizeForButton = (size: 'md' | 'lg', customSize?: 16 | 20 | 24): 16 | 20 | 24 => {
  if (customSize) return customSize;
  return size === 'md' ? 16 : 24;
};

// FIXED: Type-safe icon rendering
const renderIcon = (
  icon: React.ReactNode | IconName | undefined,
  size: 16 | 20 | 24,
  stroke: string,
  disabled: boolean
): React.ReactNode => {
  if (!icon) return null;

  if (typeof icon === 'string') {
    if (isValidIconName(icon)) {
      return (
        <DynamicIcon
          name={icon}
          size={size}
          stroke={stroke}
          className=""
        />
      );
    } else {
      console.warn(`Icon name "${icon}" not found in registry. Available icons:`, Object.keys(ICON_REGISTRY));
      return null;
    }
  }

  if (React.isValidElement(icon)) {
    return React.cloneElement(icon as React.ReactElement<any>, {
      size,
      stroke,
      'aria-hidden': true,
      ...(icon.props || {}),
    });
  }

  return icon;
};

// Loading spinner component
const LoadingSpinner: React.FC<{ size: number; stroke: string }> = ({ size, stroke }) => (
  <DynamicIcon
    name="loading"
    size={size as 16 | 20 | 24}
    stroke={stroke}
    className={styles.loadingSpinner}
  />
);

// Helper function to filter out component-specific props
const getValidDOMProps = (props: any) => {
  const {
    variant,
    size,
    loading,
    icon,
    iconName,
    iconSize,
    iconStroke,
    iconPosition,
    children,
    ...domProps
  } = props;
  
  return domProps;
};

// Main Button Component
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const {
      variant,
      size = 'lg',
      disabled = false,
      loading = false,
      onClick,
      className,
      type = 'button',
      'aria-label': ariaLabel,
      'data-testid': dataTestId,
      ...restProps
    } = props;

    const buttonClasses = getButtonClasses(variant, size, disabled, loading, className);
    const iconStroke = getIconStroke(variant, disabled);
    
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled || loading) return;
      onClick?.(event);
    };

    // Get valid DOM props (excluding component-specific props)
    const validDOMProps = getValidDOMProps(restProps);

    // Icon Button Rendering
    if (isIconButton(variant)) {
      const iconProps = props as IconButtonProps;
      const iconSize = getIconSizeForButton(size, iconProps.iconSize);
      
      const iconElement = loading 
        ? <LoadingSpinner size={iconSize} stroke={iconStroke} />
        : renderIcon(
            iconProps.icon || iconProps.iconName,
            iconSize,
            iconProps.iconStroke || iconStroke,
            disabled
          );

      return (
        <button
          ref={ref}
          type={type}
          className={buttonClasses}
          disabled={disabled || loading}
          onClick={handleClick}
          aria-label={ariaLabel}
          aria-busy={loading}
          data-testid={dataTestId}
          {...validDOMProps}
        >
          <div className={iconSize === 16 ? styles.iconContainer16 : styles.iconContainer24}>
            {iconElement}
          </div>
        </button>
      );
    }

    // Text Button Rendering
    const textProps = props as TextButtonProps;
    const iconSize = size === 'md' ? 16 : 20;
    
    return (
      <button
        ref={ref}
        type={type}
        className={buttonClasses}
        disabled={disabled || loading}
        onClick={handleClick}
        aria-label={ariaLabel}
        aria-busy={loading}
        data-testid={dataTestId}
        {...validDOMProps}
      >
        {/* Left Icon */}
        {textProps.icon && textProps.iconPosition === 'left' && !loading && (
          <div className={styles.iconContainer16}>
            {renderIcon(
              textProps.icon,
              iconSize,
              iconStroke,
              disabled
            )}
          </div>
        )}
        
        {/* Loading Spinner */}
        {loading && (
          <div className={styles.iconContainer16}>
            <LoadingSpinner size={iconSize} stroke={iconStroke} />
          </div>
        )}
        
        {/* Button Text */}
        {!loading && textProps.children}
        
        {/* Right Icon */}
        {textProps.icon && textProps.iconPosition === 'right' && !loading && (
          <div className={styles.iconContainer16}>
            {renderIcon(
              textProps.icon,
              iconSize,
              iconStroke,
              disabled
            )}
          </div>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;