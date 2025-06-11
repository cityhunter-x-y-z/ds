// Global type declarations for testing and components
/// <reference types="react" />
/// <reference types="react-dom" />

declare global {
  var global: typeof globalThis;
  
  namespace NodeJS {
    interface Global {
      IntersectionObserver: typeof IntersectionObserver;
      ResizeObserver: typeof ResizeObserver;
      testUtils: any;
    }
  }

  interface Window {
    matchMedia: jest.MockedFunction<typeof matchMedia>;
  }

  // DOM Extensions
  var IntersectionObserver: {
    prototype: IntersectionObserver;
    new (
      callback: IntersectionObserverCallback,
      options?: IntersectionObserverInit
    ): IntersectionObserver;
  };

  var ResizeObserver: {
    prototype: ResizeObserver;
    new (callback: ResizeObserverCallback): ResizeObserver;
  };

  var testUtils: {
    // Add any global test utilities here
  };

  // Module augmentation for React components
  namespace React {
    interface HTMLAttributes<T> {
      'data-testid'?: string;
    }
    
    interface AriaAttributes {
      'aria-hidden'?: boolean | 'false' | 'true';
    }
  }
}

export {};