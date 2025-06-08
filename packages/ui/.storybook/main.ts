import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-controls',
    '@storybook/addon-docs'
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
  viteFinal: async (config) => {
    // Ensure CSS imports work properly
    config.css = {
      ...config.css,
      modules: {
        localsConvention: 'camelCase',
      },
    };

    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve?.alias,
          '@': '/src',
          // Remove the tokens alias for now to avoid import issues
          // '@gazebo/tokens': '../tokens/src'
        }
      },
      // Add external CSS handling
      optimizeDeps: {
        ...config.optimizeDeps,
        include: ['react', 'react-dom'],
      },
    };
  }
};

export default config;