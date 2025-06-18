/* ===================================
   LABEL STORYBOOK STORIES - Figma Design System
   File: packages/ui/src/components/Label/Label.stories.tsx
   Based only on Figma Label documentation
   ================================== */

import type { Meta, StoryObj } from '@storybook/react';
import { Label } from './Label';

const meta: Meta<typeof Label> = {
  title: 'Components/Label',
  component: Label,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Label component following exact Figma documentation. Shows only standalone text labels as documented in Figma.'
      }
    }
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Main label text'
    },
    size: {
      control: 'select',
      options: ['md', 'lg'],
      description: 'Size variant - MD (14px) or LG (16px)'
    },
    required: {
      control: 'boolean',
      description: 'Whether the field is required (shows asterisk)'
    },
    subtitle: {
      control: 'boolean',
      description: 'Whether to show supporting text'
    },
    className: {
      control: 'text',
      description: 'Custom CSS class'
    }
  }
};

export default meta;
type Story = StoryObj<typeof Label>;

// ===== BASIC STORIES =====

export const Default: Story = {
  args: {
    children: 'Label',
    size: 'lg'
  }
};

export const WithSubtitle: Story = {
  args: {
    children: 'Email Address',
    subtitle: true,
    size: 'lg'
  }
};

export const Required: Story = {
  args: {
    children: 'Password',
    subtitle: true,
    required: true,
    size: 'lg'
  }
};

// ===== SIZE VARIANTS =====

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 'semibold' }}>
          Medium (14px)
        </h3>
        <Label size="md" subtitle={true}>
          Medium Label
        </Label>
      </div>
      <div>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 'semibold' }}>
          Large (16px)
        </h3>
        <Label size="lg" subtitle={true}>
          Large Label
        </Label>
      </div>
    </div>
  )
};