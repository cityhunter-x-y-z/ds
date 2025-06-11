/// <reference types="jest" />
/// <reference types="@testing-library/jest-dom" />

declare global {
  // Jest globals
  var jest: typeof import('jest');
  var describe: jest.Describe;
  var it: jest.It;
  var test: jest.It;
  var expect: jest.Expect;
  var beforeAll: jest.Lifecycle;
  var beforeEach: jest.Lifecycle;
  var afterAll: jest.Lifecycle;
  var afterEach: jest.Lifecycle;
  var fit: jest.It;
  var xit: jest.It;
  var xtest: jest.It;
  
  namespace NodeJS {
    interface Global {
      jest: typeof jest;
      describe: typeof describe;
      it: typeof it;
      test: typeof test;
      expect: typeof expect;
    }
  }
}

export {};