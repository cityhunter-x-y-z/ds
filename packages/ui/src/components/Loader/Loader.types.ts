/* ===================================
   LOADER TYPES - Figma Design System Implementation
   File: packages/ui/src/components/Loader/Loader.types.ts
   Based on Figma specs: XS(12px), SM(16px), MD(24px), LG(32px)
   ================================== */

import React from 'react';

// Loader sizes - matching exact Figma specifications
export type LoaderSize = 'xs' | 'sm' | 'md' | 'lg';

// Loader types - matching Figma component variants
export type LoaderType = 'indeterminate' | 'determinate';

// Base loader props following Figma design
export interface BaseLoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Size of the loader - XS(12px), SM(16px), MD(24px), LG(32px) */
  size?: LoaderSize;
  /** Show/hide label text */
  showLabel?: boolean;
  /** Custom label text (default: "Loading...") */
  labelText?: string;
  /** Custom class name */
  className?: string;
  /** Accessible label for screen readers */
  'aria-label'?: string;
  /** Test ID for testing */
  'data-testid'?: string;
}

// Indeterminate loader props (standard spinning loader)
export interface IndeterminateLoaderProps extends BaseLoaderProps {
  type?: 'indeterminate';
}

// Determinate loader props (progress loader)
export interface DeterminateLoaderProps extends BaseLoaderProps {
  type: 'determinate';
  /** Progress value (0-100) */
  value: number;
}

// Union type for all loader variants
export type LoaderProps = IndeterminateLoaderProps | DeterminateLoaderProps;

// Loader size mappings to pixel values (exact Figma specs)
export const LOADER_SIZES: Record<LoaderSize, number> = {
  xs: 12,
  sm: 16,
  md: 24,
  lg: 32
} as const;

// Helper function to get loader size
export const getLoaderSize = (size: LoaderSize): number => {
  return LOADER_SIZES[size];
};

// Type guard for loader size
export const isValidLoaderSize = (size: string): size is LoaderSize => {
  return Object.keys(LOADER_SIZES).includes(size);
};

// Type guard for determinate loader
export const isDeterminateLoader = (props: LoaderProps): props is DeterminateLoaderProps => {
  return props.type === 'determinate';
};

// Type guard for indeterminate loader
export const isIndeterminateLoader = (props: LoaderProps): props is IndeterminateLoaderProps => {
  return props.type !== 'determinate';
};