/* ===================================
   RADIO TYPES - Figma Design System Implementation
   File: packages/ui/src/components/Toggle/Radio.types.ts
   Based on Figma Radio specifications (Node: 392-10690)
   16 variants: 4 states × 2 toggle options × 2 label options
   ================================== */

import React from 'react';

// Radio states from Figma
export type RadioState = 'default' | 'hover' | 'focus' | 'disable';

// Radio toggle options from Figma (only OFF/ON, no indeterminate)
export type RadioToggle = 'off' | 'on';

// Base radio props
export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'type'> {
  /** Radio state - default, hover, focus, disable */
  state?: RadioState;
  /** Radio toggle state - off, on */
  toggle?: RadioToggle;
  /** Whether to show label text */
  label?: boolean;
  /** Label text content */
  labelText?: string;
  /** Change handler */
  onChange?: (checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void;
  /** Radio group value */
  value?: string;
  /** Custom class name */
  className?: string;
  /** Radio ID */
  id?: string;
  /** Radio name (required for radio groups) */
  name?: string;
  /** ARIA label */
  'aria-label'?: string;
  /** ARIA described by */
  'aria-describedby'?: string;
  /** Test ID for testing */
  'data-testid'?: string;
}

// Radio group props for managing multiple radios
export interface RadioGroupProps {
  /** Radio group name */
  name: string;
  /** Selected value */
  value?: string;
  /** Change handler */
  onChange?: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void;
  /** Radio options */
  options: Array<{
    value: string;
    label: string;
    disabled?: boolean;
  }>;
  /** Whether the group is disabled */
  disabled?: boolean;
  /** Custom class name */
  className?: string;
}

// Radio dimensions from Figma (same as checkbox)
export const RADIO_DIMENSIONS = {
  // Radio only: 16px × 16px
  radioOnly: {
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
  gap: '12px',
  // Radio specific - circular design
  borderRadius: '50%'
} as const;

// Radio colors from Figma (same color system as checkbox)
export const RADIO_COLORS = {
  // Primary colors
  primary: '#1d2939',
  secondary: '#667085',
  background: '#ffffff',
  lightGray: '#eaecf0',
  focus: '#2e90fa',
  disabledBorder: '#d5d7da',
  
  // Focus ring colors (complex multi-layer system)
  focusRing: 'rgba(46, 144, 250, 1)',
  focusShadow: 'rgba(233, 235, 237, 1)'
} as const;

// Helper functions
export const isRadioChecked = (props: RadioProps): boolean => {
  return props.toggle === 'on';
};

export const isRadioDisabled = (props: RadioProps): boolean => {
  return props.state === 'disable' || props.disabled;
};

export const getRadioValue = (props: RadioProps): boolean => {
  return props.toggle === 'on';
};