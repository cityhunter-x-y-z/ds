/* ===================================
   ICON TYPES - Complete Type Definitions
   File: packages/ui/src/components/Icons/Icons.types.ts
   ================================== */

import React from 'react';

// Base icon props interface
export interface BaseIconProps {
  size?: 16 | 20 | 24;
  stroke?: string;
  fill?: string;
  className?: string;
  'aria-hidden'?: boolean;
  role?: string;
}

// Icon component type
export type IconComponent = React.FC<BaseIconProps>;

// Icon registry type
export interface IconRegistry {
  readonly [key: string]: IconComponent;
}

// Dynamic Icon component props
export interface DynamicIconProps {
  name: string;
  size?: 16 | 20 | 24;
  stroke?: string;
  fill?: string;
  className?: string;
}

// Icon wrapper props
export interface IconWrapperProps extends BaseIconProps {
  children: React.ReactNode;
}

// Available icon sizes
export type IconSize = 16 | 20 | 24;

// Available icon names (will be generated from registry)
export type IconName = string;

// Icon utilities type
export interface IconUtils {
  getIconByName: (name: string) => IconComponent | null;
  getAvailableIcons: () => string[];
}