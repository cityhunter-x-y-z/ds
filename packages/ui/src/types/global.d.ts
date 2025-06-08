// Global type declarations for testing

declare global {
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
  interface Matchers<R> {
        toBeInTheDocument(): R;
        toHaveClass(className: string): R;
        toBeDisabled(): R;
        toHaveFocus(): R;
        toHaveAttribute(attribute: string, value?: string): R;
      }
      
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
}

export {};