/* ===================================
   LOADER EXPORTS - Figma Design System
   File: packages/ui/src/components/Loader/index.ts
   ================================== */

// Main Loader component
export { Loader } from './Loader';

// Type exports
export type { 
  LoaderProps,
  BaseLoaderProps,
  IndeterminateLoaderProps,
  DeterminateLoaderProps,
  LoaderSize,
  LoaderType
} from './Loader.types';

// Utility exports
export { 
  getLoaderSize,
  isValidLoaderSize,
  isDeterminateLoader,
  isIndeterminateLoader,
  LOADER_SIZES
} from './Loader.types';