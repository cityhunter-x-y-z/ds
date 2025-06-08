/** @type { import('@storybook/react').Preview } */
import React from 'react';

// Import your theme
import '../../tokens/src/theme.css';

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
        { name: 'dark', value: '#1d2939' },
        { name: 'neutral', value: '#f8fafc' },
        { name: 'gray', value: '#f5f5f5' },
      ],
    },
    // Disable docs for now to avoid CSS issues
    docs: {
      disable: true,
    },
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: {
            width: '375px',
            height: '667px',
          },
        },
        tablet: {
          name: 'Tablet',
          styles: {
            width: '768px',
            height: '1024px',
          },
        },
        desktop: {
          name: 'Desktop',
          styles: {
            width: '1024px',
            height: '768px',
          },
        },
        large: {
          name: 'Large Desktop',
          styles: {
            width: '1440px',
            height: '900px',
          },
        },
      },
    },
  },
  
  decorators: [
    (Story) => React.createElement('div', 
      { 
        style: { 
          padding: '1rem',
          fontFamily: 'Red Hat Display, system-ui, sans-serif'
        } 
      }, 
      React.createElement(Story)
    ),
  ],

  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },

  // Remove autodocs tag to prevent automatic docs generation
  // tags: ['autodocs'],
};

export default preview;