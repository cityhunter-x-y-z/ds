/* ===================================
   LABEL EXPORTS - Figma Design System
   File: packages/ui/src/components/Label/index.ts
   ================================== */

// Main Label component
export { Label } from './Label';

// Type exports
export type { 
  LabelProps,
  BaseLabelProps,
  AllLabelProps,
  LabelSize,
  LabelLayout,
  LabelState
} from './Label.types';

// Utility exports
export { 
  getLabelSizeSpecs,
  isRequiredField,
  hasStateStyle,
  LABEL_SIZES
} from './Label.types';