// Global type declarations for testing and components
/// <reference types="react" />
/// <reference types="react-dom" />

declare global {
  var global: typeof globalThis;
    var describe: jest.Describe;
    var it: jest.It;
    var expect: jest.Expect;
    var test: jest.It;
    var beforeAll: jest.Lifecycle;
    var beforeEach: jest.Lifecycle;
    var afterAll: jest.Lifecycle;
    var afterEach: jest.Lifecycle;
    var jest: typeof import('jest');
  
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

// CSS Modules
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.module.sass' {
  const classes: { [key: string]: string };
  export default classes;
}

export {};