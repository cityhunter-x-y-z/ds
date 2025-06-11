/* ===================================
   BUTTON EXPORTS - Corrected
   File: packages/ui/src/components/Button/index.ts
   ================================== */

// Main Button component
export { Button } from './Button';

// Type exports that actually exist
export type { 
  ButtonProps, 
  TextButtonProps, 
  IconButtonProps,
  ButtonVariant,
  ButtonSize,
  IconPosition
} from './Button.types';

// Function exports that actually exist
export { 
  isIconButton,
  isIconButtonProps,
  isTextButtonProps
} from './Button.types';

// Re-export IconName for convenience
export type { IconName } from '../Icons/index';