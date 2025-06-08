// Jest setup file
import '@testing-library/jest-dom';

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock IntersectionObserver
class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | null = null;
  readonly rootMargin: string = '0px';
  readonly thresholds: ReadonlyArray<number> = [0];

  constructor(
    callback: IntersectionObserverCallback,
    options?: IntersectionObserverInit
  ) {
    // Set properties based on options
  }

  disconnect(): void {}
  observe(target: Element): void {}
  unobserve(target: Element): void {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

(global as any).IntersectionObserver = MockIntersectionObserver;

// Mock ResizeObserver
class MockResizeObserver implements ResizeObserver {
  constructor(callback: ResizeObserverCallback) {}
  disconnect(): void {}
  observe(target: Element, options?: ResizeObserverOptions): void {}
  unobserve(target: Element): void {}
}

(global as any).ResizeObserver = MockResizeObserver;

// Clean up after each test
afterEach(() => {
  jest.clearAllMocks();
});