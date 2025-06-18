/* ===================================
   LINK STORYBOOK STORIES - Design System
   File: packages/ui/src/components/Link/Link.stories.tsx
   Based on design tokens and best practices
   ================================== */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Link } from './Link';
import { SettingsIcon, InfoIcon, XIcon } from '../Icons/index';

const meta: Meta<typeof Link> = {
  title: 'Components/Link',
  component: Link,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Links are interactive elements that navigate users to other pages, sections, or resources. Built with design tokens and accessibility best practices.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'button'],
      description: 'Visual style variant of the link'
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the link'
    },
    underline: {
      control: 'select',
      options: ['always', 'hover', 'none'],
      description: 'When to show underline decoration'
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the link is disabled'
    },
    external: {
      control: 'boolean',
      description: 'Whether this is an external link (opens in new tab)'
    },
    iconPosition: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Position of the icon relative to text'
    },
    children: {
      control: 'text',
      description: 'The content/label of the link'
    },
    href: {
      control: 'text',
      description: 'The URL the link points to'
    },
    target: {
      control: 'select',
      options: ['_blank', '_self', '_parent', '_top'],
      description: 'Where to open the linked document'
    },
    icon: {
      control: false,
      description: 'Optional icon to display with the link'
    },
    onClick: {
      control: false,
      description: 'Click handler for the link'
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ===== BASIC LINKS =====

export const Default: Story = {
  args: {
    children: 'Default Link',
    href: '#',
  },
};

export const ButtonVariant: Story = {
  args: {
    children: 'Button Link',
    variant: 'button',
    href: '#',
  },
};

// ===== LINK SIZES =====

export const Small: Story = {
  args: {
    children: 'Small Link',
    size: 'sm',
    href: '#',
  },
};

export const Medium: Story = {
  args: {
    children: 'Medium Link',
    size: 'md',
    href: '#',
  },
};

export const Large: Story = {
  args: {
    children: 'Large Link',
    size: 'lg',
    href: '#',
  },
};

// ===== UNDERLINE STYLES =====

export const UnderlineAlways: Story = {
  args: {
    children: 'Always Underlined',
    underline: 'always',
    href: '#',
  },
};

export const UnderlineHover: Story = {
  args: {
    children: 'Underline on Hover',
    underline: 'hover',
    href: '#',
  },
};

export const UnderlineNone: Story = {
  args: {
    children: 'No Underline',
    underline: 'none',
    href: '#',
  },
};

// ===== WITH ICONS =====

export const WithLeftIcon: Story = {
  args: {
    children: 'Link with Icon',
    icon: <InfoIcon />,
    iconPosition: 'left',
    href: '#',
  },
};

export const WithRightIcon: Story = {
  args: {
    children: 'Link with Icon',
    icon: <SettingsIcon />,
    iconPosition: 'right',
    href: '#',
  },
};

export const ButtonWithIcon: Story = {
  args: {
    children: 'Button Link',
    variant: 'button',
    icon: <SettingsIcon />,
    iconPosition: 'left',
    href: '#',
  },
};

// ===== EXTERNAL LINKS =====

export const ExternalLink: Story = {
  args: {
    children: 'External Link',
    href: 'https://example.com',
    external: true,
  },
};

export const ExternalWithIcon: Story = {
  args: {
    children: 'Visit Website',
    href: 'https://example.com',
    external: true,
    icon: <InfoIcon />,
    iconPosition: 'left',
  },
};

// ===== DISABLED STATES =====

export const Disabled: Story = {
  args: {
    children: 'Disabled Link',
    disabled: true,
    href: '#',
  },
};

export const DisabledWithIcon: Story = {
  args: {
    children: 'Disabled Link',
    disabled: true,
    icon: <SettingsIcon />,
    href: '#',
  },
};

export const DisabledButton: Story = {
  args: {
    children: 'Disabled Button Link',
    variant: 'button',
    disabled: true,
    href: '#',
  },
};

// ===== INTERACTIVE EXAMPLES =====

export const WithClickHandler: Story = {
  args: {
    children: 'Click Handler Link',
    href: '#',
    onClick: () => console.log('Link clicked!'),
  },
};

export const PreventDefault: Story = {
  args: {
    children: 'Prevent Default',
    href: '#',
    onClick: (e) => {
      e.preventDefault();
      console.log('Default prevented');
    },
  },
};

// ===== SIZE SHOWCASE =====

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-start' }}>
      <Link size="sm" href="#">Small Link</Link>
      <Link size="md" href="#">Medium Link</Link>
      <Link size="lg" href="#">Large Link</Link>
    </div>
  ),
};

// ===== VARIANT SHOWCASE =====

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Link variant="default" href="#">Default Link</Link>
      <Link variant="button" href="#">Button Link</Link>
    </div>
  ),
};

// ===== COMPREHENSIVE SHOWCASE =====

export const Showcase: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 600 }}>Link Variants</h3>
      
      {/* Basic variants */}
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <Link href="#">Default</Link>
        <Link variant="button" href="#">Button</Link>
      </div>
      
      {/* With icons */}
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <Link icon={<InfoIcon />} href="#">With Icon</Link>
        <Link variant="button" icon={<SettingsIcon />} href="#">Button + Icon</Link>
      </div>
      
      {/* External links */}
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <Link href="https://example.com" external>External Link</Link>
        <Link href="https://example.com" external icon={<InfoIcon />}>External + Icon</Link>
      </div>
      
      {/* Sizes */}
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <Link size="sm" href="#">Small</Link>
        <Link size="md" href="#">Medium</Link>
        <Link size="lg" href="#">Large</Link>
      </div>
      
      {/* Underline styles */}
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <Link underline="always" href="#">Always Underlined</Link>
        <Link underline="hover" href="#">Hover Underline</Link>
        <Link underline="none" href="#">No Underline</Link>
      </div>
      
      {/* Disabled states */}
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <Link disabled href="#">Disabled</Link>
        <Link variant="button" disabled href="#">Disabled Button</Link>
        <Link disabled icon={<SettingsIcon />} href="#">Disabled + Icon</Link>
      </div>
    </div>
  ),
};

export const NavigationExample: Story = {
  render: () => (
    <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 600 }}>Navigation Menu</h3>
      <Link href="#home">Home</Link>
      <Link href="#about">About</Link>
      <Link href="#services" icon={<SettingsIcon />}>Services</Link>
      <Link href="#contact">Contact</Link>
      <Link href="https://blog.example.com" external>Blog</Link>
    </nav>
  ),
};