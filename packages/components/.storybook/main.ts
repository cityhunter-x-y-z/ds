/** @type { import('@storybook/react-webpack5').StorybookConfig } */
const config = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
  ],
  
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
  
  core: {
    disableTelemetry: true,
  },

  // Custom webpack config to handle TypeScript properly
  webpackFinal: async (config) => {
    // Handle TypeScript files
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: require.resolve('ts-loader'),
          options: {
            transpileOnly: true,
          },
        },
      ],
    });

    // Handle JSX in .jsx files 
    config.module.rules.push({
      test: /\.jsx$/,
      use: [
        {
          loader: require.resolve('babel-loader'),
          options: {
            presets: [
              ['@babel/preset-react', { runtime: 'automatic' }]
            ],
          },
        },
      ],
    });

    config.resolve.extensions.push('.ts', '.tsx', '.jsx');

    return config;
  },
};

export default config;


// import type { StorybookConfig } from '@storybook/react-vite';

// const config: StorybookConfig = {
//   stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
//   addons: [
//     '@storybook/addon-links',
//     '@storybook/addon-essentials',
//     '@storybook/addon-interactions',
//   ],
//   framework: {
//     name: '@storybook/react-vite',
//     options: {},
//   },
//   docs: {
//     autodocs: 'tag',
//   },
//   typescript: {
//     check: false,
//     reactDocgen: 'react-docgen-typescript',
//     reactDocgenTypescriptOptions: {
//       shouldExtractLiteralValuesFromEnum: true,
//       propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
//     },
//   },
//   viteFinal: async (config) => {
//     if (config.resolve) {
//       config.resolve.alias = {
//         ...config.resolve.alias,
//         '@': '/src',
//       };
//     }
    
//     // Handle CSS modules and imports
//     if (config.css) {
//       config.css.modules = {
//         ...config.css.modules,
//         generateScopedName: '[name]__[local]___[hash:base64:5]',
//       };
//     }
    
//     return config;
//   },
//   core: {
//     disableTelemetry: true,
//   },
// };

// export default config;