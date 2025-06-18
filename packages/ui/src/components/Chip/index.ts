/* ===================================
   CHIP EXPORTS - Figma Design System
   File: packages/ui/src/components/Chip/index.ts
   ================================== */

// Main Chip component
export { Chip } from './Chip';

// Type exports
export type { 
  ChipProps,
  ChipState
} from './Chip.types';

// Function exports
export { 
  isClickableChip,
  isDismissibleChip,
  hasIcon,
  hasAvatar,
  hasDot,
  CHIP_STATES
} from './Chip.types';

// Re-export IconName for convenience
export type { IconName } from '../Icons/index';