/* ===================================
   BUTTON TYPES - Complete Implementation
   File: packages/ui/src/components/Button/Button.types.ts
   ================================== */

import React from 'react';
import type { IconName } from '../Icons/index';

// Base button props shared by all button variants
export interface BaseButtonProps {
  variant: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  'aria-label'?: string;
  'data-testid'?: string;
}

// Complete button variants - matches your Figma design system
export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'transparent'
  | 'neutral'
  | 'semantic'
  | 'danger-transparent'
  | 'ellipse-transparent'
  | 'icon-neutral'
  | 'icon-outline'
  | 'icon-transparent';

// Danger variant subset (if you need to identify danger variants)
export type DangerVariant = 'danger-transparent';

// Button sizes
export type ButtonSize = 'md' | 'lg';

// Icon positioning for text buttons
export type IconPosition = 'left' | 'right';

// Icon sizes
export type IconSize = 16 | 20 | 24;

// Text button specific props
export interface TextButtonProps extends BaseButtonProps {
  children: React.ReactNode;
  icon?: React.ReactNode | IconName;
  iconPosition?: IconPosition;
}

// Icon button specific props
export interface IconButtonProps extends BaseButtonProps {
  icon?: React.ReactNode;
  iconName?: IconName;
  iconSize?: IconSize;
  iconStroke?: string;
  'aria-label': string; // Required for icon buttons
}

// Union type for all button variants
export type ButtonProps = TextButtonProps | IconButtonProps;

// Type guard to determine if variant is an icon button
export const isIconButton = (variant: ButtonVariant): boolean => {
  return variant.startsWith('icon-');
};

// Type guard to determine if props are for icon button
export const isIconButtonProps = (props: ButtonProps): props is IconButtonProps => {
  return isIconButton(props.variant);
};

// Type guard to determine if props are for text button
export const isTextButtonProps = (props: ButtonProps): props is TextButtonProps => {
  return !isIconButton(props.variant);
};

// Helper function to get icon size (if needed for backward compatibility)
export const getIconSize = (size: ButtonSize, customSize?: IconSize): IconSize => {
  if (customSize) return customSize;
  return size === 'md' ? 16 : 24;
};

// Danger variant utilities
export const DANGER_VARIANTS: DangerVariant[] = ['danger-transparent'];

export const isDangerVariant = (variant: ButtonVariant): variant is DangerVariant => {
  return DANGER_VARIANTS.includes(variant as DangerVariant);
};

// Available icon names for IntelliSense (re-export from Icon system)
export type { IconName } from '../Icons/index';