/* ===================================
   LINK TYPES - Design System Implementation
   File: packages/ui/src/components/Link/Link.types.ts
   Based on design tokens and link component patterns
   ================================== */

import React from 'react';
import type { IconName } from '../Icons/index';

// Link variants based on design tokens
export type LinkVariant = 
  | 'default'
  | 'button';

// Link states from design tokens
export type LinkState = 
  | 'default' 
  | 'hover' 
  | 'active' 
  | 'disabled';

// Link sizes
export type LinkSize = 'sm' | 'md' | 'lg';

// Base link props
export interface BaseLinkProps {
  variant?: LinkVariant;
  size?: LinkSize;
  disabled?: boolean;
  className?: string;
  'aria-label'?: string;
  'data-testid'?: string;
  id?: string;
}

// Standard link props
export interface LinkProps extends BaseLinkProps {
  children: React.ReactNode;
  href?: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
  rel?: string;
  
  // Icon support
  icon?: React.ReactNode | IconName;
  iconPosition?: 'left' | 'right';
  
  // Interaction handlers
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  
  // External link handling
  external?: boolean;
  
  // Underline control
  underline?: 'always' | 'hover' | 'none';
}

// Internal link props (for React Router integration)
export interface InternalLinkProps extends Omit<LinkProps, 'href'> {
  to: string;
  replace?: boolean;
}

// Union type for all link variants
export type AllLinkProps = LinkProps | InternalLinkProps;

// Type guards
export const isInternalLink = (props: AllLinkProps): props is InternalLinkProps => {
  return 'to' in props;
};

export const isExternalLink = (props: LinkProps): boolean => {
  return Boolean(props.external || (props.href && (props.href.startsWith('http') || props.href.startsWith('//'))));
};

export const hasIcon = (props: LinkProps): boolean => {
  return Boolean(props.icon);
};

// Available link variants
export const LINK_VARIANTS: LinkVariant[] = ['default', 'button'];

// Available link sizes
export const LINK_SIZES: LinkSize[] = ['sm', 'md', 'lg'];

// Available link states
export const LINK_STATES: LinkState[] = ['default', 'hover', 'active', 'disabled'];

// Re-export IconName for convenience
export type { IconName } from '../Icons/index';