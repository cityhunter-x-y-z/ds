/* ===================================
   LOADER STORYBOOK STORIES - Figma Design System
   File: packages/ui/src/components/Loader/Loader.stories.tsx
   Based on Figma specifications
   ================================== */

import type { Meta, StoryObj } from '@storybook/react';
import { Loader } from './Loader';
import React from 'react';

const meta: Meta<typeof Loader> = {
  title: 'Components/Loader',
  component: Loader,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Loading indicator component following Figma design specifications. Available in two types: indeterminate (spinning) and determinate (progress). Sizes: XS(12px), SM(16px), MD(24px), LG(32px).'
      }
    }
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Size of the loader: XS(12px), SM(16px), MD(24px), LG(32px)',
      table: {
        defaultValue: { summary: 'md' }
      }
    },
    type: {
      control: 'select',
      options: ['indeterminate', 'determinate'],
      description: 'Type of loader: indeterminate (spinning) or determinate (progress)',
      table: {
        defaultValue: { summary: 'indeterminate' }
      }
    },
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Progress value (0-100) - only for determinate type',
      if: { arg: 'type', eq: 'determinate' }
    },
    showLabel: {
      control: 'boolean',
      description: 'Show/hide label text',
      table: {
        defaultValue: { summary: 'false' }
      }
    },
    labelText: {
      control: 'text',
      description: 'Custom label text (default: "Loading...")',
      if: { arg: 'showLabel', eq: true }
    },
    'aria-label': {
      control: 'text',
      description: 'Accessible label for screen readers'
    },
    className: {
      control: 'text',
      description: 'Custom CSS class'
    },
    'data-testid': {
      control: 'text',
      description: 'Test ID for testing'
    }
  }
};

export default meta;
type Story = StoryObj<typeof Loader>;

// ===== BASIC STORIES =====

export const Default: Story = {
  args: {
    size: 'md',
    type: 'indeterminate'
  }
};

export const WithLabel: Story = {
  args: {
    size: 'md',
    type: 'indeterminate',
    showLabel: true,
    labelText: 'Loading...'
  }
};

export const DeterminateProgress: Story = {
  args: {
    size: 'md',
    type: 'determinate',
    value: 65,
    showLabel: true
  }
};

// ===== SIZE VARIATIONS =====

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
      <div style={{ textAlign: 'center' }}>
        <Loader size="xs" showLabel labelText="XS" />
        <p style={{ margin: '8px 0 0 0', fontSize: '12px', color: '#666' }}>12px</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Loader size="sm" showLabel labelText="SM" />
        <p style={{ margin: '8px 0 0 0', fontSize: '12px', color: '#666' }}>16px</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Loader size="md" showLabel labelText="MD" />
        <p style={{ margin: '8px 0 0 0', fontSize: '12px', color: '#666' }}>24px</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Loader size="lg" showLabel labelText="LG" />
        <p style={{ margin: '8px 0 0 0', fontSize: '12px', color: '#666' }}>32px</p>
      </div>
    </div>
  )
};

// ===== INDETERMINATE LOADERS =====

export const IndeterminateVariations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <Loader size="md" type="indeterminate" />
        <span>Default indeterminate loader</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <Loader size="md" type="indeterminate" showLabel />
        <span>With default label</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <Loader size="md" type="indeterminate" showLabel labelText="Processing..." />
        <span>With custom label</span>
      </div>
    </div>
  )
};

// ===== DETERMINATE LOADERS =====

export const DeterminateVariations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <Loader size="md" type="determinate" value={25} showLabel />
        <span>25% complete</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <Loader size="md" type="determinate" value={50} showLabel />
        <span>50% complete</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <Loader size="md" type="determinate" value={75} showLabel />
        <span>75% complete</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <Loader size="md" type="determinate" value={100} showLabel />
        <span>Complete!</span>
      </div>
    </div>
  )
};

// ===== INTERACTIVE PROGRESS =====

export const InteractiveProgress: Story = {
  render: () => {
    const [progress, setProgress] = React.useState(0);
    
    React.useEffect(() => {
      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) return 0;
          return prev + 1;
        });
      }, 100);
      
      return () => clearInterval(timer);
    }, []);
    
    return (
      <div style={{ textAlign: 'center' }}>
        <Loader 
          size="lg" 
          type="determinate" 
          value={progress} 
          showLabel 
        />
        <p style={{ margin: '16px 0 0 0', color: '#666' }}>
          Animated progress: {progress}%
        </p>
      </div>
    );
  }
};

// ===== SIZE COMPARISON =====

export const SizeComparison: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
      <Loader size="xs" type="indeterminate" />
      <Loader size="sm" type="indeterminate" />
      <Loader size="md" type="indeterminate" />
      <Loader size="lg" type="indeterminate" />
    </div>
  )
};

// ===== USAGE EXAMPLES =====

export const InlineUsage: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
      <span>Processing your request</span>
      <Loader size="sm" type="indeterminate" />
      <span>please wait...</span>
    </div>
  )
};

export const ButtonStates: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <button 
        style={{ 
          padding: '12px 24px', 
          border: '1px solid #e5e7eb', 
          borderRadius: '8px', 
          background: '#f9fafb',
          color: '#374151',
          cursor: 'default',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}
        disabled
      >
        <Loader size="xs" type="indeterminate" />
        Saving...
      </button>
      <button 
        style={{ 
          padding: '12px 24px', 
          border: '1px solid #3b82f6', 
          borderRadius: '8px', 
          background: '#3b82f6',
          color: 'white'
        }}
      >
        Save Changes
      </button>
    </div>
  )
};

export const FormUpload: Story = {
  render: () => (
    <div style={{ 
      width: '300px', 
      padding: '24px', 
      border: '2px dashed #d1d5db', 
      borderRadius: '8px',
      textAlign: 'center',
      backgroundColor: '#f9fafb'
    }}>
      <Loader size="lg" type="determinate" value={73} showLabel />
      <p style={{ margin: '16px 0 8px 0', fontWeight: 'medium' }}>
        Uploading file...
      </p>
      <p style={{ margin: '0', fontSize: '14px', color: '#666' }}>
        document.pdf (2.4 MB)
      </p>
    </div>
  )
};

// ===== ACCESSIBILITY EXAMPLE =====

export const AccessibilityDemo: Story = {
  args: {
    size: 'md',
    type: 'indeterminate',
    'aria-label': 'Loading user profile data',
    'data-testid': 'profile-loader'
  }
};

// ===== ALL VARIANTS SHOWCASE =====

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 'semibold' }}>
          Indeterminate Loaders
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <Loader size="xs" type="indeterminate" showLabel labelText="XS" />
          <Loader size="sm" type="indeterminate" showLabel labelText="SM" />
          <Loader size="md" type="indeterminate" showLabel labelText="MD" />
          <Loader size="lg" type="indeterminate" showLabel labelText="LG" />
        </div>
      </div>
      
      <div>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 'semibold' }}>
          Determinate Loaders
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <Loader size="xs" type="determinate" value={25} showLabel />
          <Loader size="sm" type="determinate" value={50} showLabel />
          <Loader size="md" type="determinate" value={75} showLabel />
          <Loader size="lg" type="determinate" value={100} showLabel />
        </div>
      </div>
    </div>
  )
};