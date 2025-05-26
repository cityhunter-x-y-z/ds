/** @type { import('@storybook/react').Preview } */
import React from 'react';

// Import your component styles if they exist
// import '../dist/index.css'; // If you have built CSS
// OR import from source if you prefer:
// import '../src/styles/globals.css';

const preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    layout: 'centered',
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#333333' },
        { name: 'gray', value: '#f5f5f5' },
      ],
    },
    docs: {
      toc: true,
    },
  },
  
  // Global decorators
  decorators: [
    (Story) => React.createElement('div', 
      { style: { padding: '1rem' } }, 
      React.createElement(Story)
    ),
  ],

  // Tags for autodocs
  tags: ['autodocs'],
};

export default preview;

// import { Preview } from '@storybook/react';

// // Import your design tokens/theme CSS
// // Uncomment and adjust the path to your theme CSS file
// // import '../../../tokens/theme.css';

// const preview: Preview = {
//   parameters: {
//     actions: { argTypesRegex: '^on[A-Z].*' },
//     controls: {
//       matchers: {
//         color: /(background|color)$/i,
//         date: /Date$/,
//       },
//     },
//     docs: {
//       theme: {
//         brandTitle: 'Gazebo Design System',
//         brandUrl: '#',
//       },
//     },
//     layout: 'centered',
//     backgrounds: {
//       default: 'light',
//       values: [
//         {
//           name: 'light',
//           value: '#ffffff',
//         },
//         {
//           name: 'dark',
//           value: '#1a1a1a',
//         },
//         {
//           name: 'gray',
//           value: '#f5f5f5',
//         },
//       ],
//     },
//     viewport: {
//       viewports: {
//         mobile: {
//           name: 'Mobile',
//           styles: {
//             width: '375px',
//             height: '667px',
//           },
//         },
//         tablet: {
//           name: 'Tablet',
//           styles: {
//             width: '768px',
//             height: '1024px',
//           },
//         },
//         desktop: {
//           name: 'Desktop',
//           styles: {
//             width: '1024px',
//             height: '768px',
//           },
//         },
//         large: {
//           name: 'Large Desktop',
//           styles: {
//             width: '1440px',
//             height: '900px',
//           },
//         },
//       },
//     },
//   },
//   globalTypes: {
//     theme: {
//       description: 'Global theme for components',
//       defaultValue: 'light',
//       toolbar: {
//         title: 'Theme',
//         icon: 'paintbrush',
//         items: [
//           { value: 'light', title: 'Light' },
//           { value: 'dark', title: 'Dark' },
//         ],
//         dynamicTitle: true,
//       },
//     },
//   },
// };

// export default preview;