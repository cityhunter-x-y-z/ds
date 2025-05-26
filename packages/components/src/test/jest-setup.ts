// Import jest-dom matchers
import '@testing-library/jest-dom';

// Explicitly extend Jest's matchers
declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
      toHaveClass(className: string): R;
      toBeDisabled(): R;
      toHaveAttribute(attr: string, value?: string): R;
      // Add any other matchers you're using
      toHaveFocus(): R;
      toHaveTextContent(text: string | RegExp): R;
    }
  }
}