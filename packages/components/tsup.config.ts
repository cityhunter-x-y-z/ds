// import { defineConfig } from 'tsup';

// export default defineConfig({
//   entry: ['src/index.ts'],
//   format: ['cjs', 'esm'],
//   dts: true,
//   sourcemap: true,
//   clean: true,
//   splitting: true,
//   external: ['react', 'react-dom'],
//   injectStyle: true,
//   esbuildOptions(options) {
//     options.banner = {
//       js: '"use client";',
//     };
//   },
// });

import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom'],
  esbuildOptions(options) {
    options.banner = {
      js: '"use client"',
    }
  },
})