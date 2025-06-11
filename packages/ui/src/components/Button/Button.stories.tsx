/* ===================================
   BUTTON STORYBOOK STORIES - UPDATED
   File: packages/ui/src/components/Button/Button.stories.tsx
   ================================== */

import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import { SearchIcon, HeartIcon } from '../Icons/index';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    // Disable docs for this component due to CSS custom property issues
    docs: {
      disable: true,
    },
  },
  argTypes: {
    // Hide variant since it's controlled by story selection
    variant: {
      table: { disable: true }
    },
    // Size control
    size: {
      control: 'select',
      options: ['md', 'lg'],
      description: 'Button size'
    },
    // Use actual Button props
    disabled: {
      control: 'boolean',
      description: 'Disable the button'
    },
    loading: {
      control: 'boolean',
      description: 'Show loading state'
    },
    children: {
      control: 'text',
      description: 'Button text content'
    },
    // Icon props (for future use)
    icon: {
      control: 'text',
      description: 'Icon name or element'
    },
    iconPosition: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Icon position'
    },
    // Hide internal props
    onClick: {
      table: { disable: true }
    },
    className: {
      table: { disable: true }
    },
    type: {
      table: { disable: true }
    },
    'aria-label': {
      table: { disable: true }
    },
    'data-testid': {
      table: { disable: true }
    }
  },
  // Remove autodocs tag
  // tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof Button>;

// ===== TEXT BUTTON STORIES =====

export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'lg',
    children: 'Primary Button',
    disabled: false,
    loading: false
  }
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    size: 'lg',
    children: 'Secondary Button'
  }
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    size: 'lg',
    children: 'Outline Button'
  }
};

export const Transparent: Story = {
  args: {
    variant: 'transparent',
    size: 'lg',
    children: 'Transparent Button'
  }
};

export const Neutral: Story = {
  args: {
    variant: 'neutral',
    size: 'lg',
    children: 'Neutral Button'
  }
};

export const Semantic: Story = {
  args: {
    variant: 'semantic',
    size: 'lg',
    children: 'Semantic Button'
  }
};

export const DangerTransparent: Story = {
  args: {
    variant: 'danger-transparent',
    size: 'lg',
    children: 'Delete Item'
  }
};

export const EllipseTransparent: Story = {
  args: {
    variant: 'ellipse-transparent',
    size: 'lg',
    children: 'Ellipse Button'
  }
};

// ===== TEXT BUTTONS WITH ICONS (commented out until icon system is ready) =====

// export const WithIconLeft: Story = {
//   args: {
//     variant: 'primary',
//     size: 'lg',
//     children: 'Download File',
//     icon: 'download',
//     iconPosition: 'left'
//   }
// };

// export const WithIconRight: Story = {
//   args: {
//     variant: 'outline',
//     size: 'lg',
//     children: 'Next Page',
//     icon: 'chevron-right',
//     iconPosition: 'right'
//   }
// };

// ===== ICON BUTTONS (commented out until icon system is ready) =====

// export const IconNeutral: Story = {
//   args: {
//     variant: 'icon-neutral',
//     size: 'lg',
//     iconName: 'settings',
//     'aria-label': 'Settings'
//   }
// };

// export const IconOutline: Story = {
//   args: {
//     variant: 'icon-outline',
//     size: 'lg',
//     iconName: 'edit',
//     'aria-label': 'Edit'
//   }
// };

// export const IconTransparent: Story = {
//   args: {
//     variant: 'icon-transparent',
//     size: 'lg',
//     iconName: 'x',
//     'aria-label': 'Close'
//   }
// };

// ===== SIZE VARIATIONS =====

export const SizeComparison: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Button variant="primary" size="md">
        Medium
      </Button>
      <Button variant="primary" size="lg">
        Large
      </Button>
    </div>
  )
};

// ===== STATE VARIATIONS =====

export const LoadingState: Story = {
  args: {
    variant: 'primary',
    size: 'lg',
    children: 'Uploading...',
    loading: true
  }
};

export const DisabledState: Story = {
  args: {
    variant: 'primary',
    size: 'lg',
    children: 'Disabled Button',
    disabled: true
  }
};

// ===== VARIANT SHOWCASE =====

export const AllTextVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '300px' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="transparent">Transparent</Button>
      <Button variant="neutral">Neutral</Button>
      <Button variant="semantic">Semantic</Button>
      <Button variant="danger-transparent">Danger Transparent</Button>
      <Button variant="ellipse-transparent">Ellipse Transparent</Button>
    </div>
  )
};

// ===== INTERACTIVE EXAMPLES =====

export const Interactive: Story = {
  args: {
    variant: 'primary',
    size: 'lg',
    children: 'Click me!',
    onClick: () => alert('Button clicked!')
  }
};

export const FormExample: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px' }}>
      <Button variant="primary">
        Save Changes
      </Button>
      <Button variant="outline">
        Cancel
      </Button>
    </div>
  )
};