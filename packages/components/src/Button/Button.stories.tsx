import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

// Example icons for demonstration
const ChevronRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="9,18 15,12 9,6"></polyline>
  </svg>
);

const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

const DownloadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="7,10 12,15 17,10"></polyline>
    <line x1="12" y1="15" x2="12" y2="3"></line>
  </svg>
);

const meta: Meta<typeof Button> = {
  title: 'Gazebo Design System/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Simple Button Component

A simple, accessible button component built with React Aria following the Gazebo Design System from Figma.

## Features
- Single button style (primary red from Figma)
- Two sizes: medium (32px) and large (40px)
- All interactive states: default, hover, focus, pressed, loading, disabled
- Left and right icon support
- Full accessibility with React Aria
- Design token integration matching your Figma specifications

## Design Tokens
The component uses CSS custom properties that map directly to your Figma design tokens for consistent theming.
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['md', 'lg'],
      description: 'Button size (md: 32px height, lg: 40px height)',
      table: {
        defaultValue: { summary: 'md' },
        type: { summary: 'ButtonSize' },
      },
    },
    isLoading: {
      control: { type: 'boolean' },
      description: 'Loading state - shows spinner and disables interaction',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    loadingText: {
      control: { type: 'text' },
      description: 'Text to show when loading',
      if: { arg: 'isLoading', eq: true },
    },
    isDisabled: {
      control: { type: 'boolean' },
      description: 'Disabled state',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    iconLeft: {
      control: { type: 'boolean' },
      description: 'Show left icon',
      mapping: {
        true: <PlusIcon />,
        false: undefined,
      },
    },
    iconRight: {
      control: { type: 'boolean' },
      description: 'Show right icon',
      mapping: {
        true: <ChevronRightIcon />,
        false: undefined,
      },
    },
    children: {
      control: { type: 'text' },
      description: 'Button content',
    },
    onPress: {
      action: 'pressed',
      description: 'Callback fired when the button is pressed',
    },
  },
  args: {
    children: 'Button',
    size: 'md',
    isLoading: false,
    isDisabled: false,
    iconLeft: false,
    iconRight: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ========== BASIC EXAMPLES ==========

export const Default: Story = {
  args: {
    children: 'Button',
  },
};

export const WithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <Button iconLeft={<PlusIcon />}>Add Item</Button>
      <Button iconRight={<ChevronRightIcon />}>Continue</Button>
      <Button iconLeft={<DownloadIcon />} iconRight={<ChevronRightIcon />}>
        Download & Continue
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Buttons with left icons, right icons, or both.',
      },
    },
  },
};

// ========== SIZE EXAMPLES ==========

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <Button size="md">Medium (32px)</Button>
      <Button size="lg">Large (40px)</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Button component supports two sizes matching your Figma design specifications.',
      },
    },
  },
};

export const SizesWithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <span style={{ minWidth: '80px', fontSize: '14px', color: '#667085' }}>Medium:</span>
        <Button size="md" iconLeft={<PlusIcon />}>Add Item</Button>
        <Button size="md" iconRight={<ChevronRightIcon />}>Continue</Button>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <span style={{ minWidth: '80px', fontSize: '14px', color: '#667085' }}>Large:</span>
        <Button size="lg" iconLeft={<PlusIcon />}>Add Item</Button>
        <Button size="lg" iconRight={<ChevronRightIcon />}>Continue</Button>
      </div>
    </div>
  ),
};

// ========== STATE EXAMPLES ==========

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: '600' }}>
          Button States (Medium)
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <Button size="md">Default</Button>
          <Button size="md" isDisabled>Disabled</Button>
          <Button size="md" isLoading>Loading</Button>
          <Button size="md" isLoading loadingText="Processing...">
            Custom Loading
          </Button>
        </div>
      </div>
      
      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: '600' }}>
          Button States (Large)
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <Button size="lg">Default</Button>
          <Button size="lg" isDisabled>Disabled</Button>
          <Button size="lg" isLoading>Loading</Button>
          <Button size="lg" isLoading loadingText="Processing...">
            Custom Loading
          </Button>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All button states from your Figma design: Default, Disabled, and Loading states in both sizes.',
      },
    },
  },
};

// ========== INTERACTIVE EXAMPLES ==========

export const Interactive: Story = {
  args: {
    children: 'Click me',
    onPress: () => alert('Button clicked!'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive button with click handler. Uses React Aria for accessibility.',
      },
    },
  },
};

// ========== DESIGN SYSTEM OVERVIEW ==========

export const DesignSystemOverview: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h2 style={{ marginBottom: '24px', fontSize: '18px', fontWeight: '700' }}>
          Gazebo Design System - Simple Button Component
        </h2>
        <p style={{ marginBottom: '24px', color: '#667085', fontSize: '14px' }}>
          Complete overview of the button component with different sizes and states matching your Figma design specifications.
        </p>
      </div>
      
      {/* Medium Size */}
      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: '600' }}>
          Medium Size (32px)
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <Button size="md">Default</Button>
          <Button size="md" isDisabled>Disabled</Button>
          <Button size="md" isLoading>Loading</Button>
          <Button size="md" iconLeft={<PlusIcon />}>With Icon</Button>
          <Button size="md" iconLeft={<PlusIcon />} iconRight={<ChevronRightIcon />}>Both Icons</Button>
        </div>
      </div>
      
      {/* Large Size */}
      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: '600' }}>
          Large Size (40px)
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <Button size="lg">Default</Button>
          <Button size="lg" isDisabled>Disabled</Button>
          <Button size="lg" isLoading>Loading</Button>
          <Button size="lg" iconLeft={<PlusIcon />}>With Icon</Button>
          <Button size="lg" iconLeft={<PlusIcon />} iconRight={<ChevronRightIcon />}>Both Icons</Button>
        </div>
      </div>

      {/* Loading States */}
      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: '600' }}>
          Loading States
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <Button isLoading>Default Loading</Button>
          <Button isLoading loadingText="Saving...">Custom Text</Button>
          <Button isLoading loadingText="Processing..." size="lg">Large Loading</Button>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Complete design system overview showing all button combinations for design review and development reference.',
      },
    },
  },
};

// ========== INDIVIDUAL EXAMPLES ==========

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Large Button',
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
    children: 'Button',
  },
};

export const Disabled: Story = {
  args: {
    isDisabled: true,
    children: 'Disabled Button',
  },
};

export const CustomLoadingText: Story = {
  args: {
    isLoading: true,
    loadingText: 'Submitting...',
    children: 'Submit Form',
  },
  parameters: {
    docs: {
      description: {
        story: 'Button with custom loading text for better user experience.',
      },
    },
  },
};

// ========== REAL-WORLD EXAMPLES ==========

export const RealWorldExamples: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: '600' }}>
          Form Actions
        </h3>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Button iconLeft={<PlusIcon />}>Create New</Button>
          <Button isDisabled>Cancel</Button>
          <Button size="lg" isLoading loadingText="Deleting...">Delete</Button>
        </div>
      </div>
      
      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: '600' }}>
          Navigation
        </h3>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Button>Back</Button>
          <Button iconRight={<ChevronRightIcon />}>Next Step</Button>
          <Button size="lg">Continue</Button>
        </div>
      </div>
      
      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: '600' }}>
          Downloads & Actions
        </h3>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Button iconLeft={<DownloadIcon />} size="lg">
            Download Report
          </Button>
          <Button iconLeft={<PlusIcon />}>Add to Cart</Button>
          <Button isLoading>Processing</Button>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Real-world usage examples showing common button combinations and use cases.',
      },
    },
  },
};