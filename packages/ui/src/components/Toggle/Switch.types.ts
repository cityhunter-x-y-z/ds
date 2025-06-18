/* ===================================
   SWITCH TYPES - Figma Design System Implementation
   File: packages/ui/src/components/Toggle/Switch.types.ts
   Based on Figma Switch specifications (Node: 388-9960)
   16 variants: 4 states × 2 toggle options × 2 label options
   ================================== */

import React from 'react';

// Switch states from Figma
export type SwitchState = 'default' | 'hover' | 'focus' | 'disable';

// Switch toggle options from Figma (only OFF/ON)
export type SwitchToggle = 'off' | 'on';

// Base switch props
export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'type'> {
  /** Switch state - default, hover, focus, disable */
  state?: SwitchState;
  /** Switch toggle state - off, on */
  toggle?: SwitchToggle;
  /** Whether to show label text */
  label?: boolean;
  /** Label text content */
  labelText?: string;
  /** Subtitle text content */
  subtitleText?: string;
  /** Change handler */
  onChange?: (checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void;
  /** Custom class name */
  className?: string;
  /** Switch ID */
  id?: string;
  /** Switch name */
  name?: string;
  /** ARIA label */
  'aria-label'?: string;
  /** ARIA described by */
  'aria-describedby'?: string;
  /** Test ID for testing */
  'data-testid'?: string;
}

// Switch dimensions from Figma
export const SWITCH_DIMENSIONS = {
  // Switch only: 40px × 24px
  switchOnly: {
    width: '40px',
    height: '24px'
  },
  // With label: 369px × 42px
  withLabel: {
    width: '369px',
    height: '42px'
  },
  // Design specs
  border: '1px',
  cornerRadius: '12px', /* Pill-shaped */
  gap: '12px',
  // Thumb specs
  thumbSize: '20px',
  thumbOffset: '2px'
} as const;

// Switch colors from Figma (same color system)
export const SWITCH_COLORS = {
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
export const isSwitchChecked = (props: SwitchProps): boolean => {
  return props.toggle === 'on';
};

export const isSwitchDisabled = (props: SwitchProps): boolean => {
  return props.state === 'disable' || props.disabled;
};

export const getSwitchValue = (props: SwitchProps): boolean => {
  return props.toggle === 'on';
};