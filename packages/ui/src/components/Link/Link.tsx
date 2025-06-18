/* ===========================================
   LINK COMPONENT - Design System Implementation
   File: packages/ui/src/components/Link/Link.tsx
   Based on design tokens and accessibility best practices
   =========================================== */

import React, { forwardRef } from 'react';
import { LinkProps, isExternalLink, hasIcon } from './Link.types';
import { DynamicIcon, IconName, ICON_REGISTRY } from '../Icons/index';
import styles from './Link.module.css';

// Type guard to check if string is valid IconName
const isValidIconName = (icon: string): icon is IconName => {
  return Object.keys(ICON_REGISTRY).includes(icon);
};

// Helper function to get link classes
const getLinkClasses = (
  variant: string,
  size: string,
  underline: string,
  disabled: boolean,
  className?: string
): string => {
  const classes = [styles.link];
  
  // Add variant class
  if (variant === 'button') {
    classes.push(styles.button);
  } else {
    classes.push(styles.default);
  }
  
  // Add size class
  if (size === 'sm') {
    classes.push(styles.sm);
  } else if (size === 'lg') {
    classes.push(styles.lg);
  } else {
    classes.push(styles.md);
  }
  
  // Add underline class
  if (underline === 'always') {
    classes.push(styles.underlineAlways);
  } else if (underline === 'none') {
    classes.push(styles.underlineNone);
  } else {
    classes.push(styles.underlineHover);
  }
  
  // Add state classes
  if (disabled) {
    classes.push(styles.disabled);
  }
  
  // Add custom className
  if (className) {
    classes.push(className);
  }
  
  return classes.filter(Boolean).join(' ');
};

// Helper function to get icon size based on link size
const getIconSize = (size: string): 16 | 20 | 24 => {
  switch (size) {
    case 'sm':
      return 16;
    case 'lg':
      return 24;
    default:
      return 20;
  }
};

// Helper function to render icon
const renderIcon = (
  icon: React.ReactNode | IconName | undefined,
  size: 16 | 20 | 24,
  position: 'left' | 'right'
): React.ReactNode => {
  if (!icon) return null;

  const iconClasses = [styles.iconContainer];
  if (position === 'left') {
    iconClasses.push(styles.iconLeft);
  } else {
    iconClasses.push(styles.iconRight);
  }

  if (typeof icon === 'string') {
    if (isValidIconName(icon)) {
      return (
        <span className={iconClasses.join(' ')}>
          <DynamicIcon
            name={icon}
            size={size}
            stroke="currentColor"
            className=""
          />
        </span>
      );
    } else {
      console.warn(`Icon name "${icon}" not found in registry. Available icons:`, Object.keys(ICON_REGISTRY));
      return null;
    }
  }

  if (React.isValidElement(icon)) {
    return (
      <span className={iconClasses.join(' ')}>
        {React.cloneElement(icon as React.ReactElement<any>, {
          size,
          stroke: 'currentColor',
          'aria-hidden': true,
          ...(icon.props || {}),
        })}
      </span>
    );
  }

  return (
    <span className={iconClasses.join(' ')}>
      {icon}
    </span>
  );
};

// Helper function to get appropriate rel attribute for external links
const getRelAttribute = (props: LinkProps): string | undefined => {
  if (isExternalLink(props)) {
    const baseRel = props.target === '_blank' ? 'noopener noreferrer' : 'noopener';
    return props.rel ? `${baseRel} ${props.rel}` : baseRel;
  }
  return props.rel;
};

// Main Link Component
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  (props, ref) => {
    const {
      variant = 'default',
      size = 'md',
      disabled = false,
      children,
      href = '#',
      target,
      rel,
      onClick,
      icon,
      iconPosition = 'left',
      external = false,
      underline = 'hover',
      className,
      'aria-label': ariaLabel,
      'data-testid': dataTestId,
      id,
      ...restProps
    } = props;

    const isExternal = external || isExternalLink(props);
    const iconSize = getIconSize(size);
    const linkClasses = getLinkClasses(variant, size, underline, disabled, className);
    const relAttribute = getRelAttribute(props);
    
    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
      if (disabled) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      onClick?.(event);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLAnchorElement>) => {
      if (disabled) return;
      
      // Handle Enter and Space for link activation
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        const clickEvent = new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        });
        event.currentTarget.dispatchEvent(clickEvent);
      }
    };

    return (
      <a
        ref={ref}
        href={disabled ? undefined : href}
        target={isExternal ? target || '_blank' : target}
        rel={relAttribute}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={linkClasses}
        aria-label={ariaLabel}
        aria-disabled={disabled}
        data-testid={dataTestId}
        id={id}
        tabIndex={disabled ? -1 : 0}
        {...restProps}
      >
        {/* Leading Icon */}
        {hasIcon(props) && iconPosition === 'left' && renderIcon(icon, iconSize, 'left')}
        
        {/* Link Text */}
        <span>
          {children}
        </span>
        
        {/* Trailing Icon */}
        {hasIcon(props) && iconPosition === 'right' && renderIcon(icon, iconSize, 'right')}
        
        {/* External Link Indicator */}
        {isExternal && !hasIcon(props) && (
          <span className={styles.externalIcon} aria-hidden="true" />
        )}
      </a>
    );
  }
);

Link.displayName = 'Link';

export default Link;