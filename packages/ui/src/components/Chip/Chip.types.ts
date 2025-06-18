/* ===================================
   CHIP TYPES - Figma Design System Implementation
   File: packages/ui/src/components/Chip/Chip.types.ts
   Based on Figma "1.0 Chip" component specifications
   ================================== */

import React from 'react';
import type { IconName } from '../Icons/index';

// Chip states from Figma design
export type ChipState = 
  | 'default' 
  | 'hover' 
  | 'focus' 
  | 'active' 
  | 'disable' 
  | 'active-focus';

// Base chip props
export interface BaseChipProps {
  disabled?: boolean;
  className?: string;
  'aria-label'?: string;
  'data-testid'?: string;
  id?: string;
}

// Chip props based on Figma component properties
export interface ChipProps extends BaseChipProps {
  children: React.ReactNode;
  
  // Figma component properties
  icon?: React.ReactNode | IconName;          // Icon#94:0 (boolean)
  dismissible?: boolean;                      // Close-icon#94:4 (boolean) 
  showDot?: boolean;                         // Dot#293:0 (boolean)
  avatar?: React.ReactNode;                  // Avatar#293:6 (boolean)
  
  // Interaction handlers
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  onRemove?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  
  // Remove button customization
  removeIcon?: React.ReactNode | IconName;
  removeButtonProps?: {
    'aria-label'?: string;
    'data-testid'?: string;
  };
}

// Type guards
export const isClickableChip = (props: ChipProps): boolean => {
  return Boolean(props.onClick && !props.disabled);
};

export const isDismissibleChip = (props: ChipProps): boolean => {
  return Boolean(props.dismissible && props.onRemove && !props.disabled);
};

export const hasIcon = (props: ChipProps): boolean => {
  return Boolean(props.icon);
};

export const hasAvatar = (props: ChipProps): boolean => {
  return Boolean(props.avatar);
};

export const hasDot = (props: ChipProps): boolean => {
  return Boolean(props.showDot);
};

// Available chip states
export const CHIP_STATES: ChipState[] = [
  'default', 
  'hover', 
  'focus', 
  'active', 
  'disable', 
  'active-focus'
];

// Re-export IconName for convenience
export type { IconName } from '../Icons/index';