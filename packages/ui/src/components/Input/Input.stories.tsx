/* ===================================
   INPUT STORYBOOK STORIES - Complete Figma Implementation
   File: packages/ui/src/components/Input/Input.stories.tsx
   All input variants from Figma (1.0-5.0 series)
   ================================== */

import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';
import { InputProps } from './Input.types';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Complete Input component system supporting all Figma variants (1.0-5.0 series) with full state management and accessibility features.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'text', 'email', 'search', 'password', 'credit-card', 'multi-text', 'number',
        'label', 'phone', 'currency',
        'select', 'multi-select', 'date-picker',
        'textarea',
        'verification'
      ],
      description: 'Input variant from Figma design system',
    },
    size: {
      control: 'select',
      options: ['md', 'lg'],
      description: 'Input size',
    },
    state: {
      control: 'select',
      options: ['default', 'warning', 'focus', 'hover', 'disabled', 'error', 'success'],
      description: 'Input state',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the input',
    },
    required: {
      control: 'boolean',
      description: 'Mark input as required',
    },
    label: {
      control: 'text',
      description: 'Input label text',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    helperText: {
      control: 'text',
      description: 'Helper text below input',
    },
    errorMessage: {
      control: 'text',
      description: 'Error message text',
    },
    successMessage: {
      control: 'text',
      description: 'Success message text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

// ===== 1.0 SERIES - BASIC INPUTS =====

export const Text: Story = {
  args: {
    variant: 'text',
    size: 'lg',
    label: 'Full Name',
    placeholder: 'Enter your full name',
    helperText: 'This will be displayed on your profile',
    state: 'default',
  },
};

export const Email: Story = {
  args: {
    variant: 'email',
    size: 'lg',
    label: 'Email Address',
    placeholder: 'user@example.com',
    helperText: 'We\'ll never share your email',
    state: 'default',
  },
};

export const Search: Story = {
  args: {
    variant: 'search',
    size: 'lg',
    placeholder: 'Search...',
    helperText: 'Press Enter to search',
    state: 'default',
  },
};

export const Password: Story = {
  args: {
    variant: 'password',
    size: 'lg',
    label: 'Password',
    placeholder: 'Enter your password',
    helperText: 'Must be at least 8 characters',
    state: 'default',
  },
};

export const CreditCard: Story = {
  args: {
    variant: 'credit-card',
    size: 'lg',
    label: 'Card Number',
    placeholder: '1234 5678 9012 3456',
    helperText: 'Your card information is secure',
    state: 'default',
  },
};

export const MultiText: Story = {
  args: {
    variant: 'multi-text',
    size: 'lg',
    label: 'Description',
    placeholder: 'Enter a detailed description...',
    helperText: 'Describe your item in detail',
    state: 'default',
  },
};

export const Number: Story = {
  args: {
    variant: 'number',
    size: 'lg',
    label: 'Age',
    placeholder: '25',
    helperText: 'Enter your age in years',
    state: 'default',
  },
};

// ===== 2.0 SERIES - LABEL VARIANTS =====

export const Label: Story = {
  args: {
    variant: 'label',
    size: 'lg',
    label: 'Enhanced Label Input',
    placeholder: 'Type something...',
    helperText: 'This input features enhanced label styling',
    state: 'default',
  },
};

export const Phone: Story = {
  args: {
    variant: 'phone',
    size: 'lg',
    label: 'Phone Number',
    placeholder: '(555) 123-4567',
    helperText: 'Include your area code',
    state: 'default',
  },
};

export const Currency: Story = {
  args: {
    variant: 'currency',
    size: 'lg',
    label: 'Amount',
    placeholder: '$0.00',
    helperText: 'Enter the amount in USD',
    state: 'default',
  },
};

// ===== 3.0 SERIES - SELECTION INPUTS =====

export const Select: Story = {
  args: {
    variant: 'select',
    size: 'lg',
    label: 'Country',
    placeholder: 'Select a country',
    helperText: 'Choose your country of residence',
    state: 'default',
  },
};

export const MultiSelect: Story = {
  args: {
    variant: 'multi-select',
    size: 'lg',
    label: 'Skills',
    placeholder: 'Select multiple skills',
    helperText: 'Choose all that apply',
    state: 'default',
  },
};

export const DatePicker: Story = {
  args: {
    variant: 'date-picker',
    size: 'lg',
    label: 'Birth Date',
    placeholder: 'MM/DD/YYYY',
    helperText: 'Select your date of birth',
    state: 'default',
  },
};

// ===== 4.0 SERIES - EXTENDED TEXT =====

export const Textarea: Story = {
  args: {
    variant: 'textarea',
    size: 'lg',
    label: 'Comments',
    placeholder: 'Enter your comments here...',
    helperText: 'Share your thoughts with us',
    rows: 4,
    showCharacterCount: true,
    maxLength: 500,
    state: 'default',
  },
};

// ===== 5.0 SERIES - VERIFICATION =====

export const Verification: Story = {
  args: {
    variant: 'verification',
    size: 'lg',
    label: 'Verification Code',
    helperText: 'Enter the 6-digit code sent to your email',
    length: 6,
    state: 'default',
  },
};

// ===== STATE DEMONSTRATIONS =====

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '400px' }}>
      <Input
        variant="text"
        label="Default State"
        placeholder="Default input"
        state="default"
      />
      <Input
        variant="text"
        label="Warning State"
        placeholder="Warning input"
        state="warning"
        helperText="This is a warning message"
      />
      <Input
        variant="text"
        label="Error State"
        placeholder="Error input"
        state="error"
        errorMessage="This field is required"
      />
      <Input
        variant="text"
        label="Success State"
        placeholder="Success input"
        state="success"
        successMessage="Input is valid"
      />
      <Input
        variant="text"
        label="Disabled State"
        placeholder="Disabled input"
        state="disabled"
        disabled
      />
    </div>
  ),
};

// ===== SIZE COMPARISON =====

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '400px' }}>
      <Input
        variant="text"
        size="lg"
        label="Large Size"
        placeholder="Large input"
      />
      <Input
        variant="text"
        size="md"
        label="Medium Size"
        placeholder="Medium input"
      />
    </div>
  ),
};

// ===== INTERACTIVE EXAMPLES =====

export const WithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '400px' }}>
      <Input
        variant="search"
        placeholder="Search with icon"
        icon="search"
      />
      <Input
        variant="text"
        label="Email with icon"
        placeholder="user@example.com"
        icon="mail"
        iconPosition="left"
      />
      <Input
        variant="text"
        label="Phone with icon"
        placeholder="Phone number"
        icon="phone"
        iconPosition="right"
      />
    </div>
  ),
};

export const ValidationExample: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '400px' }}>
      <Input
        variant="email"
        label="Email"
        placeholder="user@example.com"
        required
        state="error"
        errorMessage="Please enter a valid email address"
      />
      <Input
        variant="password"
        label="Password"
        placeholder="••••••••"
        required
        state="warning"
        helperText="Password should be at least 8 characters"
      />
      <Input
        variant="text"
        label="Full Name"
        placeholder="John Doe"
        value="John Doe"
        state="success"
        successMessage="Looks good!"
      />
    </div>
  ),
};

export const FormExample: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '400px' }}>
      <h3 style={{ margin: 0, color: 'var(--text-neutral-extreme)' }}>User Registration</h3>
      
      <Input
        variant="text"
        label="First Name"
        placeholder="Enter your first name"
        required
      />
      
      <Input
        variant="text"
        label="Last Name"
        placeholder="Enter your last name"
        required
      />
      
      <Input
        variant="email"
        label="Email Address"
        placeholder="user@example.com"
        required
      />
      
      <Input
        variant="phone"
        label="Phone Number"
        placeholder="(555) 123-4567"
      />
      
      <Input
        variant="password"
        label="Password"
        placeholder="••••••••"
        required
        helperText="Must be at least 8 characters"
      />
      
      <Input
        variant="textarea"
        label="Bio"
        placeholder="Tell us about yourself..."
        rows={3}
        showCharacterCount
        maxLength={200}
      />
    </div>
  ),
};

// ===== SPECIALIZED INPUT EXAMPLES =====

export const VerificationExample: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
      <h3 style={{ margin: 0, color: 'var(--text-neutral-extreme)' }}>Email Verification</h3>
      <p style={{ margin: 0, color: 'var(--text-neutral-moderate)', textAlign: 'center' }}>
        We've sent a 6-digit code to your email address
      </p>
      <Input
        variant="verification"
        length={6}
        autoFocus
      />
      <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-neutral-subtle)' }}>
        Didn't receive the code? <a href="#" style={{ color: 'var(--text-link-default)' }}>Resend</a>
      </p>
    </div>
  ),
};

export const PaymentExample: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '400px' }}>
      <h3 style={{ margin: 0, color: 'var(--text-neutral-extreme)' }}>Payment Information</h3>
      
      <Input
        variant="credit-card"
        label="Card Number"
        placeholder="1234 5678 9012 3456"
        required
      />
      
      <div style={{ display: 'flex', gap: '12px' }}>
        <Input
          variant="text"
          label="Expiry Date"
          placeholder="MM/YY"
          required
          style={{ flex: 1 }}
        />
        <Input
          variant="text"
          label="CVV"
          placeholder="123"
          required
          style={{ flex: 1 }}
        />
      </div>
      
      <Input
        variant="text"
        label="Cardholder Name"
        placeholder="John Doe"
        required
      />
    </div>
  ),
};

// ===== ACCESSIBILITY EXAMPLE =====

export const AccessibilityExample: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '400px' }}>
      <h3 style={{ margin: 0, color: 'var(--text-neutral-extreme)' }}>Accessibility Features</h3>
      
      <Input
        variant="text"
        label="Name"
        placeholder="Enter your name"
        required
        aria-label="Full name (required)"
        helperText="This field is required for account creation"
      />
      
      <Input
        variant="email"
        label="Email"
        placeholder="user@example.com"
        required
        aria-label="Email address (required)"
        state="error"
        errorMessage="Please enter a valid email address"
        aria-describedby="email-error"
      />
      
      <Input
        variant="password"
        label="Password"
        placeholder="••••••••"
        required
        aria-label="Password (required)"
        helperText="Password must be at least 8 characters long and contain uppercase, lowercase, and numbers"
      />
    </div>
  ),
};

// ===== ALL VARIANTS SHOWCASE =====

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', width: '100%' }}>
      <div>
        <h4 style={{ margin: '0 0 16px 0', color: 'var(--text-neutral-extreme)' }}>1.0 Series - Basic Inputs</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Input variant="text" placeholder="Text input" />
          <Input variant="email" placeholder="Email input" />
          <Input variant="search" placeholder="Search input" />
          <Input variant="password" placeholder="Password input" />
          <Input variant="credit-card" placeholder="Credit card input" />
          <Input variant="number" placeholder="Number input" />
        </div>
      </div>
      
      <div>
        <h4 style={{ margin: '0 0 16px 0', color: 'var(--text-neutral-extreme)' }}>2.0 Series - Label Variants</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Input variant="label" placeholder="Label input" />
          <Input variant="phone" placeholder="Phone input" />
          <Input variant="currency" placeholder="Currency input" />
        </div>
      </div>
      
      <div>
        <h4 style={{ margin: '0 0 16px 0', color: 'var(--text-neutral-extreme)' }}>3.0 Series - Selection</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Input variant="select" placeholder="Select input" />
          <Input variant="multi-select" placeholder="Multi-select input" />
          <Input variant="date-picker" placeholder="Date picker input" />
        </div>
      </div>
      
      <div>
        <h4 style={{ margin: '0 0 16px 0', color: 'var(--text-neutral-extreme)' }}>4.0 & 5.0 Series</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Input variant="textarea" placeholder="Textarea input" rows={3} />
          <Input variant="verification" length={4} />
        </div>
      </div>
    </div>
  ),
};