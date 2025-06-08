/// <reference types="jest" />

declare global {
  const jest: typeof import('jest');
  const describe: jest.Describe;
  const it: jest.It;
  const test: jest.It;
  const expect: jest.Expect;
  const beforeAll: jest.Lifecycle;
  const beforeEach: jest.Lifecycle;
  const afterAll: jest.Lifecycle;
  const afterEach: jest.Lifecycle;
}

export {};