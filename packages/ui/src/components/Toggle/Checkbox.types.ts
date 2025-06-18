/* ===================================
   CHECKBOX TYPES - Figma Design System Implementation
   File: packages/ui/src/components/Toggle/Checkbox.types.ts
   Based on Figma Checkbox specifications (Node: 396-13807)
   24 variants: 4 states × 3 toggle options × 2 label options
   ================================== */

import React from 'react';

// Checkbox states from Figma
export type CheckboxState = 'default' | 'hover' | 'focus' | 'disable';

// Checkbox toggle options from Figma
export type CheckboxToggle = 'off' | 'on' | 'indeterminate';

// Base checkbox props
export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  /** Checkbox state - default, hover, focus, disable */
  state?: CheckboxState;
  /** Checkbox toggle state - off, on, indeterminate */
  toggle?: CheckboxToggle;
  /** Whether to show label text */
  label?: boolean;
  /** Label text content */
  labelText?: string;
  /** Subtitle text content */
  subtitleText?: string;
  /** Change handler */
  onChange?: (checked: boolean | 'indeterminate', event: React.ChangeEvent<HTMLInputElement>) => void;
  /** Custom class name */
  className?: string;
  /** Checkbox ID */
  id?: string;
  /** Checkbox name */
  name?: string;
  /** ARIA label */
  'aria-label'?: string;
  /** ARIA described by */
  'aria-describedby'?: string;
  /** Test ID for testing */
  'data-testid'?: string;
}

// Checkbox dimensions from Figma
export const CHECKBOX_DIMENSIONS = {
  // Checkbox only: 16px × 16px
  checkboxOnly: {
    width: '16px',
    height: '16px'
  },
  // With label: 369px × 42px
  withLabel: {
    width: '369px',
    height: '42px'
  },
  // Design specs
  border: '1px',
  cornerRadius: '4px',
  gap: '12px'
} as const;

// Checkbox colors from Figma
export const CHECKBOX_COLORS = {
  // Primary colors
  primary: '#1d2939',
  secondary: '#667085',
  background: '#ffffff',
  lightGray: '#eaecf0',
  focus: '#2e90fa',
  disabledBorder: '#d5d7da',
  
  // Focus ring colors
  focusRing: 'rgba(46, 144, 250, 1)',
  focusShadow: 'rgba(233, 235, 237, 1)'
} as const;

// Helper functions
export const isCheckboxChecked = (props: CheckboxProps): boolean => {
  return props.toggle === 'on';
};

export const isCheckboxIndeterminate = (props: CheckboxProps): boolean => {
  return props.toggle === 'indeterminate';
};

export const isCheckboxDisabled = (props: CheckboxProps): boolean => {
  return props.state === 'disable' || props.disabled;
};

export const getCheckboxValue = (props: CheckboxProps): boolean | 'indeterminate' => {
  if (props.toggle === 'indeterminate') return 'indeterminate';
  return props.toggle === 'on';
};