/* ===================================
   BUTTON TYPES - TypeScript Definitions
   File: packages/components/src/Button/Button.types.ts
   ================================== */

import { ReactNode } from 'react';

export type ButtonVariant = 
  | 'primary'
  | 'secondary' 
  | 'neutral'
  | 'outline'
  | 'transparent'
  | 'danger-transparent'
  | 'semantic'
  | 'icon-neutral'
  | 'icon-outline'
  | 'icon-transparent'
  | 'ellipse-transparent';

export type ButtonSize = 'md' | 'lg';

export type ButtonState = 
  | 'default'
  | 'hover'
  | 'focus'
  | 'loading'
  | 'action'
  | 'disabled';

export interface BaseButtonProps {
  /** Button variant type */
  variant: ButtonVariant;
  
  /** Button size */
  size?: ButtonSize;
  
  /** Button disabled state */
  disabled?: boolean;
  
  /** Button loading state */
  loading?: boolean;
  
  /** Button click handler */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  
  /** Additional CSS classes */
  className?: string;
  
  /** Button type attribute */
  type?: 'button' | 'submit' | 'reset';
  
  /** ARIA label for accessibility */
  'aria-label'?: string;
  
  /** Test ID for testing */
  'data-testid'?: string;
}

export interface TextButtonProps extends BaseButtonProps {
  /** Button text content */
  children: ReactNode;
  
  /** Icon component (for text buttons with icons) */
  icon?: ReactNode;
  
  /** Icon position */
  iconPosition?: 'left' | 'right';
}

export interface IconButtonProps extends BaseButtonProps {
  /** Icon component */
  icon: ReactNode;
  
  /** Icon size (16px for neutral, 24px for outline/transparent) */
  iconSize?: 16 | 24;
  
  /** Icon stroke color for different states */
  iconStroke?: string;
}

export type ButtonProps = TextButtonProps | IconButtonProps;

// Type guards
export const isIconButton = (variant: ButtonVariant): boolean => {
  return variant.startsWith('icon-');
};

export const isTextButton = (variant: ButtonVariant): boolean => {
  return !variant.startsWith('icon-');
};

// Button state classes mapping
export const getStateClass = (state: ButtonState): string => {
  switch (state) {
    case 'hover':
      return 'hover';
    case 'focus':
      return 'focus';
    case 'loading':
      return 'loading';
    case 'action':
      return 'action';
    case 'disabled':
      return 'disabled';
    default:
      return '';
  }
};

// Icon size mapping
export const getIconSize = (variant: ButtonVariant): 16 | 24 => {
  if (variant === 'icon-neutral') return 16;
  if (variant === 'icon-outline' || variant === 'icon-transparent') return 24;
  return 24; // default
};