/* ===================================
   CHIP STORYBOOK STORIES - Figma Design System
   File: packages/ui/src/components/Chip/Chip.stories.tsx
   Based on Figma "1.0 Chip" component specifications
   ================================== */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Chip } from './Chip';
import { SettingsIcon, InfoIcon, XIcon } from '../Icons/index';

const meta: Meta<typeof Chip> = {
  title: 'Components/Chip',
  component: Chip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Chips are compact elements representing an input, attribute, or action. Based on Figma "1.0 Chip" component with support for icons, avatars, status dots, and dismissible functionality.',
      },
    },
  },
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'Whether the chip is disabled (Figma State=Disable)'
    },
    dismissible: {
      control: 'boolean',
      description: 'Whether the chip can be dismissed (Figma Close-icon#94:4)'
    },
    showDot: {
      control: 'boolean',
      description: 'Show status dot indicator (Figma Dot#293:0)'
    },
    children: {
      control: 'text',
      description: 'The content/label of the chip (Figma ✏️ Label#293:24)'
    },
    icon: {
      control: false,
      description: 'Optional leading icon (Figma Icon#94:0)'
    },
    avatar: {
      control: false,
      description: 'Optional user avatar (Figma Avatar#293:6)'
    },
    removeIcon: {
      control: false,
      description: 'Optional custom remove icon for dismissible chips'
    },
    onClick: {
      control: false,
      description: 'Click handler for interactive chips'
    },
    onRemove: {
      control: false,
      description: 'Remove handler for dismissible chips'
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ===== BASIC CHIP (Figma Default State) =====

export const Default: Story = {
  args: {
    children: 'Chip',
  },
};

// ===== CHIP STATES FROM FIGMA =====

export const Disabled: Story = {
  args: {
    children: 'Disabled Chip',
    disabled: true,
  },
};

// ===== CHIP WITH PROPERTIES FROM FIGMA =====

export const WithIcon: Story = {
  args: {
    children: 'With Icon',
    icon: <InfoIcon />,
  },
};

export const WithDot: Story = {
  args: {
    children: 'Status Chip',
    showDot: true,
  },
};

export const WithAvatar: Story = {
  args: {
    children: 'User Chip',
    avatar: <div style={{ width: '16px', height: '16px', background: '#4A4AFC', borderRadius: '50%' }} />,
  },
};

// ===== DISMISSIBLE CHIPS =====

export const Dismissible: Story = {
  args: {
    children: 'Dismissible',
    dismissible: true,
    onRemove: () => console.log('Chip removed'),
  },
};

export const DismissibleWithIcon: Story = {
  args: {
    children: 'Remove Me',
    icon: <SettingsIcon />,
    dismissible: true,
    onRemove: () => console.log('Chip removed'),
  },
};

export const DismissibleWithCustomRemoveIcon: Story = {
  args: {
    children: 'Custom Remove',
    dismissible: true,
    removeIcon: <XIcon />,
    onRemove: () => console.log('Chip removed'),
  },
};

// ===== CLICKABLE CHIPS =====

export const Clickable: Story = {
  args: {
    children: 'Click me',
    onClick: () => console.log('Chip clicked'),
  },
};

export const ClickableWithIcon: Story = {
  args: {
    children: 'Clickable',
    icon: <InfoIcon />,
    onClick: () => console.log('Chip clicked'),
  },
};

// ===== COMPLEX COMBINATIONS =====

export const ClickableAndDismissible: Story = {
  args: {
    children: 'Click & Remove',
    onClick: () => console.log('Chip clicked'),
    dismissible: true,
    onRemove: () => console.log('Chip removed'),
  },
};

export const WithAllFeatures: Story = {
  args: {
    children: 'Full Features',
    showDot: true,
    icon: <InfoIcon />,
    dismissible: true,
    onClick: () => console.log('Chip clicked'),
    onRemove: () => console.log('Chip removed'),
  },
};

export const AvatarWithDismiss: Story = {
  args: {
    children: 'John Doe',
    avatar: <div style={{ width: '16px', height: '16px', background: '#FC4949', borderRadius: '50%' }} />,
    dismissible: true,
    onRemove: () => console.log('User removed'),
  },
};

// ===== DISABLED STATES =====

export const DisabledWithFeatures: Story = {
  args: {
    children: 'Disabled',
    disabled: true,
    icon: <SettingsIcon />,
    dismissible: true,
    onRemove: () => console.log('Should not fire'),
  },
};

// ===== COMPREHENSIVE SHOWCASE =====

export const FigmaStatesShowcase: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 600 }}>Figma Component Properties</h3>
      
      {/* Basic chip */}
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <Chip>Default</Chip>
        <Chip disabled>Disabled</Chip>
      </div>
      
      {/* With properties */}
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <Chip icon={<InfoIcon />}>With Icon</Chip>
        <Chip showDot>With Dot</Chip>
        <Chip avatar={<div style={{ width: '16px', height: '16px', background: '#4A4AFC', borderRadius: '50%' }} />}>
          With Avatar
        </Chip>
      </div>
      
      {/* Dismissible */}
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <Chip dismissible onRemove={() => console.log('removed')}>Dismissible</Chip>
        <Chip icon={<SettingsIcon />} dismissible onRemove={() => console.log('removed')}>
          Icon + Dismiss
        </Chip>
      </div>
      
      {/* Interactive */}
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <Chip onClick={() => console.log('clicked')}>Clickable</Chip>
        <Chip 
          onClick={() => console.log('clicked')} 
          dismissible 
          onRemove={() => console.log('removed')}
        >
          Click & Remove
        </Chip>
      </div>
      
      {/* Complex combinations */}
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <Chip 
          showDot 
          icon={<InfoIcon />} 
          dismissible 
          onRemove={() => console.log('removed')}
        >
          All Features
        </Chip>
        <Chip 
          avatar={<div style={{ width: '16px', height: '16px', background: '#FC4949', borderRadius: '50%' }} />}
          dismissible 
          onRemove={() => console.log('removed')}
        >
          User Tag
        </Chip>
      </div>
    </div>
  ),
};

export const InteractiveDemo: Story = {
  render: () => {
    const [chips, setChips] = React.useState([
      { id: 1, label: 'React', hasIcon: true },
      { id: 2, label: 'TypeScript', hasIcon: false },
      { id: 3, label: 'Design System', hasIcon: true },
      { id: 4, label: 'Figma', hasIcon: false },
    ]);

    const removeChip = (id: number) => {
      setChips(chips.filter(chip => chip.id !== id));
    };

    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {chips.map(chip => (
          <Chip 
            key={chip.id}
            icon={chip.hasIcon ? <InfoIcon /> : undefined}
            dismissible
            onRemove={() => removeChip(chip.id)}
          >
            {chip.label}
          </Chip>
        ))}
      </div>
    );
  },
};