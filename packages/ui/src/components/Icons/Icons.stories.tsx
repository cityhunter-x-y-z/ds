/* ===================================
   ICONS STORYBOOK STORIES
   File: packages/ui/src/components/Icons/Icons.stories.tsx
   ================================== */

import type { Meta, StoryObj } from '@storybook/react';
import { DynamicIcon, getAvailableIcons } from './Icons';

const meta: Meta<typeof DynamicIcon> = {
  title: 'Components/Icons',
  component: DynamicIcon,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Complete icon system with 27+ icons supporting multiple sizes and customizable styling.',
      },
    },
  },
  argTypes: {
    name: {
      control: 'select',
      options: getAvailableIcons(),
      description: 'Icon name from the registry'
    },
    size: {
      control: 'select',
      options: [16, 20, 24],
      description: 'Icon size in pixels'
    },
    stroke: {
      control: 'color',
      description: 'Icon stroke color'
    },
    fill: {
      control: 'color',
      description: 'Icon fill color'
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes'
    }
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    name: 'search',
    size: 24,
    stroke: 'currentColor',
    fill: 'none',
  },
};

// Size variants
export const Small: Story = {
  args: {
    name: 'heart',
    size: 16,
    stroke: '#ef4444',
  },
};

export const Medium: Story = {
  args: {
    name: 'check',
    size: 20,
    stroke: '#10b981',
  },
};

export const Large: Story = {
  args: {
    name: 'warning',
    size: 24,
    stroke: '#f59e0b',
  },
};

// Navigation icons
export const NavigationIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <DynamicIcon name="chevron-left" size={24} stroke="#374151" />
      <DynamicIcon name="chevron-up" size={24} stroke="#374151" />
      <DynamicIcon name="chevron-down" size={24} stroke="#374151" />
      <DynamicIcon name="chevron-right" size={24} stroke="#374151" />
    </div>
  ),
};

// Action icons
export const ActionIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <DynamicIcon name="plus" size={24} stroke="#10b981" />
      <DynamicIcon name="edit" size={24} stroke="#3b82f6" />
      <DynamicIcon name="delete" size={24} stroke="#ef4444" />
      <DynamicIcon name="download" size={24} stroke="#8b5cf6" />
    </div>
  ),
};

// All Icons Grid
export const AllIcons: Story = {
  render: () => {
    const icons = getAvailableIcons();
    return (
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', 
        gap: '16px',
        maxWidth: '800px'
      }}>
        {icons.map(iconName => (
          <div key={iconName} style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            padding: '12px',
            border: '1px solid #e5e7eb',
            borderRadius: '8px'
          }}>
            <DynamicIcon name={iconName} size={24} stroke="#374151" />
            <span style={{ 
              fontSize: '12px', 
              marginTop: '8px', 
              textAlign: 'center',
              color: '#6b7280'
            }}>
              {iconName}
            </span>
          </div>
        ))}
      </div>
    );
  },
};