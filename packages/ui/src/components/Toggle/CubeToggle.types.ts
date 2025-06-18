/* ===================================
   CUBE TOGGLE TYPES - Figma Design System Implementation
   File: packages/ui/src/components/Toggle/CubeToggle.types.ts
   Based on Figma Cube/Toggle specifications (Node: 1206-89512)
   8 variants: 4 states × 2 toggle options
   ================================== */

import React from 'react';

// Cube toggle states from Figma
export type CubeToggleState = 'default' | 'hover' | 'focus' | 'disable';

// Cube toggle options from Figma (only OFF/ON)
export type CubeToggleToggle = 'off' | 'on';

// Base cube toggle props
export interface CubeToggleProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'type'> {
  /** Cube toggle state - default, hover, focus, disable */
  state?: CubeToggleState;
  /** Cube toggle state - off, on */
  toggle?: CubeToggleToggle;
  /** Change handler */
  onChange?: (checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void;
  /** Custom class name */
  className?: string;
  /** Cube toggle ID */
  id?: string;
  /** Cube toggle name */
  name?: string;
  /** ARIA label */
  'aria-label'?: string;
  /** ARIA described by */
  'aria-describedby'?: string;
  /** Test ID for testing */
  'data-testid'?: string;
}

// Cube toggle dimensions from Figma
export const CUBE_TOGGLE_DIMENSIONS = {
  // Fixed dimensions: 68px × 32px
  width: '68px',
  height: '32px',
  // Design specs
  border: '1px',
  cornerRadius: '4px' /* Assuming standard border radius */
} as const;

// Cube toggle colors from Figma
export const CUBE_TOGGLE_COLORS = {
  // OFF state colors
  off: {
    background: '#ffffff', /* White background */
    border: '#1d2939', /* Dark border */
    text: '#1d2939' /* Dark text */
  },
  // ON state colors  
  on: {
    background: '#1d2939', /* Dark background */
    border: '#1d2939', /* Dark border */
    text: '#ffffff' /* White text */
  },
  // Hover state colors
  hover: {
    backgroundOff: '#eaecf0', /* Light gray */
    backgroundOn: '#667085', /* Medium gray */
    borderOff: '#667085', /* Medium gray border */
    borderOn: '#667085' /* Medium gray border */
  },
  // Disabled state colors
  disabled: {
    background: '#eaecf0', /* Light gray background */
    border: '#d5d7da', /* Light gray border */
    text: '#667085' /* Muted text */
  },
  // Focus state
  focus: '#2e90fa' /* Blue focus ring */
} as const;

// Helper functions
export const isCubeToggleChecked = (props: CubeToggleProps): boolean => {
  return props.toggle === 'on';
};

export const isCubeToggleDisabled = (props: CubeToggleProps): boolean => {
  return props.state === 'disable' || props.disabled;
};

export const getCubeToggleValue = (props: CubeToggleProps): boolean => {
  return props.toggle === 'on';
};