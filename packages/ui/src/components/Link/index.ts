/* ===================================
   LINK EXPORTS - Design System
   File: packages/ui/src/components/Link/index.ts
   ================================== */

// Main Link component
export { Link } from './Link';

// Type exports
export type { 
  LinkProps,
  InternalLinkProps,
  AllLinkProps,
  LinkVariant,
  LinkSize,
  LinkState
} from './Link.types';

// Function exports
export { 
  isInternalLink,
  isExternalLink,
  hasIcon,
  LINK_VARIANTS,
  LINK_SIZES,
  LINK_STATES
} from './Link.types';

// Re-export IconName for convenience
export type { IconName } from '../Icons/index';