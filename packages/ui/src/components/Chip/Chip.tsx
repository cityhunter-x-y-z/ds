/* ===========================================
   CHIP COMPONENT - Figma Design System Implementation
   File: packages/ui/src/components/Chip/Chip.tsx
   Based on Figma "1.0 Chip" component specifications
   =========================================== */

import React, { forwardRef } from 'react';
import { ChipProps, isClickableChip, isDismissibleChip, hasIcon, hasAvatar, hasDot } from './Chip.types';
import { DynamicIcon, IconName, ICON_REGISTRY } from '../Icons/index';
import styles from './Chip.module.css';

// Type guard to check if string is valid IconName
const isValidIconName = (icon: string): icon is IconName => {
  return Object.keys(ICON_REGISTRY).includes(icon);
};

// Helper function to get chip classes
const getChipClasses = (
  disabled: boolean,
  clickable: boolean,
  className?: string
): string => {
  const classes = [styles.chip];
  
  if (disabled) {
    classes.push(styles.disabled);
  }
  
  if (clickable) {
    classes.push(styles.clickable);
  }
  
  if (className) {
    classes.push(className);
  }
  
  return classes.filter(Boolean).join(' ');
};

// Helper function to get icon stroke color based on chip state
const getIconStroke = (disabled: boolean): string => {
  if (disabled) {
    return 'var(--chip-disabled-icon)';
  }
  return 'var(--chip-default-icon)';
};

// Helper function to render icon (12x12px from Figma)
const renderIcon = (
  icon: React.ReactNode | IconName | undefined,
  stroke: string,
  size: 16 | 20 | 24 = 16
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

// Helper function to render avatar (16x16px from Figma)
const renderAvatar = (avatar: React.ReactNode | undefined): React.ReactNode => {
  if (!avatar) return null;

  if (React.isValidElement(avatar)) {
    return React.cloneElement(avatar as React.ReactElement<any>, {
      className: styles.avatar,
      ...(avatar.props || {}),
    });
  }

  return <div className={styles.avatar}>{avatar}</div>;
};

// Main Chip Component
export const Chip = forwardRef<HTMLDivElement, ChipProps>(
  (props, ref) => {
    const {
      disabled = false,
      children,
      onClick,
      onRemove,
      icon,
      dismissible = false,
      showDot = false,
      avatar,
      removeIcon,
      removeButtonProps = {},
      className,
      'aria-label': ariaLabel,
      'data-testid': dataTestId,
      id,
      ...restProps
    } = props;

    const clickable = isClickableChip(props);
    const dismissibleChip = isDismissibleChip(props);
    const iconStroke = getIconStroke(disabled);
    const chipClasses = getChipClasses(disabled, clickable, className);
    
    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
      if (disabled) return;
      onClick?.(event);
    };
    
    const handleRemove = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation(); // Prevent chip click when removing
      if (disabled) return;
      onRemove?.(event);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (disabled) return;
      
      // Handle Enter and Space for clickable chips
      if (clickable && (event.key === 'Enter' || event.key === ' ')) {
        event.preventDefault();
        onClick?.(event as any);
      }
    };

    const handleRemoveKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (disabled) return;
      
      // Handle Enter and Space for remove button
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        event.stopPropagation();
        onRemove?.(event as any);
      }
    };

    // Determine the component props based on interactivity
    const componentProps = {
      ref,
      id,
      className: chipClasses,
      'aria-label': ariaLabel,
      'data-testid': dataTestId,
      ...restProps,
    };

    // Add interactive props if clickable
    if (clickable) {
      Object.assign(componentProps, {
        onClick: handleClick,
        onKeyDown: handleKeyDown,
        tabIndex: disabled ? -1 : 0,
        role: 'button',
        'aria-disabled': disabled,
      });
    }

    return (
      <div {...componentProps}>
        {/* Status Dot - 4x4px from Figma "Dot#293:0" */}
        {hasDot(props) && (
          <div className={styles.dot} aria-hidden="true" />
        )}
        
        {/* Avatar - 16x16px from Figma "Avatar#293:6" */}
        {hasAvatar(props) && renderAvatar(avatar)}
        
        {/* Leading Icon - 12x12px from Figma "Icon#94:0" */}
        {hasIcon(props) && (
          <div className={styles.iconContainer}>
            {renderIcon(icon, iconStroke, 16)}
          </div>
        )}
        
        {/* Chip Label - Typography from Figma "✏️ Label#293:24" */}
        <span className={styles.label}>
          {children}
        </span>
        
        {/* Remove Button - 12x12px from Figma "Close-icon#94:4" */}
        {dismissibleChip && (
          <button
            type="button"
            className={styles.removeButton}
            onClick={handleRemove}
            onKeyDown={handleRemoveKeyDown}
            disabled={disabled}
            aria-label={removeButtonProps['aria-label'] || 'Remove'}
            data-testid={removeButtonProps['data-testid']}
            tabIndex={disabled ? -1 : 0}
          >
            <div className={styles.iconContainer}>
              {removeIcon ? (
                renderIcon(removeIcon, iconStroke, 16)
              ) : (
                <DynamicIcon
                  name="x"
                  size={16}
                  stroke={iconStroke}
                  className=""
                />
              )}
            </div>
          </button>
        )}
      </div>
    );
  }
);

Chip.displayName = 'Chip';

export default Chip;