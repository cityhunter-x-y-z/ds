/* ===================================
   LABEL TYPES - Figma Design System Implementation
   File: packages/ui/src/components/Label/Label.types.ts
   Based on Figma Label 2.0 and 1.0 specifications
   ================================== */

import React from 'react';
import type { IconName } from '../Icons/index';

// Label sizes - based on Figma variants
export type LabelSize = 'md' | 'lg';

// Label layouts - based on Figma component types
export type LabelLayout = 'vertical' | 'horizontal';

// Label state - only default exists in Figma
export type LabelState = 'default';

// Base label props
export interface BaseLabelProps extends React.HTMLAttributes<HTMLElement> {
  /** Main label text */
  children: React.ReactNode;
  /** Size variant - MD (14px) or LG (16px) */
  size?: LabelSize;
  /** Whether the field is required */
  required?: boolean;
  /** Custom class name */
  className?: string;
  /** Test ID for testing */
  'data-testid'?: string;
}

// Standard label props - simplified to match Figma
export interface LabelProps extends BaseLabelProps {
  /** Whether to show subtitle */
  subtitle?: boolean;
}


// Label props type
export type AllLabelProps = LabelProps;

// Label size specifications (based on Figma)
export const LABEL_SIZES = {
  md: {
    fontSize: '14px',
    lineHeight: '1.0',
    letterSpacing: '-0.15px',
    subtitleSize: '14px'
  },
  lg: {
    fontSize: '16px', 
    lineHeight: '1.0',
    letterSpacing: '-0.31px',
    subtitleSize: '14px'
  }
} as const;

// Helper function to get label size specs
export const getLabelSizeSpecs = (size: LabelSize) => {
  return LABEL_SIZES[size];
};


// Type guard for required field
export const isRequiredField = (props: AllLabelProps): boolean => {
  return Boolean(props.required);
};

// Helper to determine if label has state styling
export const hasStateStyle = (state?: LabelState): boolean => {
  return false; // Only default state exists in Figma
};