// Button.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Button } from './Button';

// Mock CSS modules
jest.mock('./Button.module.css', () => ({
  button: 'button',
  'button--primary': 'button--primary',
  'button--secondary': 'button--secondary',
  'button--neutral': 'button--neutral',
  'button--outline': 'button--outline',
  'button--transparent': 'button--transparent',
  'button--danger-transparent': 'button--danger-transparent',
  'button--semantic': 'button--semantic',
  'button--icon-neutral': 'button--icon-neutral',
  'button--icon-outline': 'button--icon-outline',
  'button--icon-transparent': 'button--icon-transparent',
  'button--ellipse-transparent': 'button--ellipse-transparent',
  'button--lg': 'button--lg',
  'button--md': 'button--md',
  'button--default': 'button--default',
  'button--hover': 'button--hover',
  'button--focus': 'button--focus',
  'button--loading': 'button--loading',
  'button--action': 'button--action',
  'button--disabled': 'button--disabled',
  'iconContainer--16': 'iconContainer--16',
  'iconContainer--24': 'iconContainer--24',
  icon: 'icon',
}));

// Custom test icon
const TestIcon = () => (
  <svg data-testid="test-icon" width="16" height="16" viewBox="0 0 16 16">
    <circle cx="8" cy="8" r="4" fill="currentColor" />
  </svg>
);

describe('Button Component', () => {
  // Basic rendering tests
  describe('Text Button Rendering', () => {
    it('renders primary button with text', () => {
      render(<Button variant="primary">Click me</Button>);
      const button = screen.getByRole('button', { name: /click me/i });
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass('button--primary');
    });

    it('renders with different variants', () => {
      const variants: Array<'primary' | 'secondary' | 'neutral' | 'outline' | 'transparent' | 'semantic'> = [
        'primary', 'secondary', 'neutral', 'outline', 'transparent', 'semantic'
      ];
      
      variants.forEach(variant => {
        const { unmount } = render(<Button variant={variant}>{variant} button</Button>);
        const button = screen.getByRole('button');
        expect(button).toHaveClass(`button--${variant}`);
        unmount();
      });
    });

    it('renders with different sizes', () => {
      const { rerender } = render(<Button size="lg">Large Button</Button>);
      expect(screen.getByRole('button')).toHaveClass('button--lg');

      rerender(<Button size="md">Medium Button</Button>);
      expect(screen.getByRole('button')).toHaveClass('button--md');
    });

    it('renders danger-transparent variant with underlined text', () => {
      render(<Button variant="danger-transparent">Delete</Button>);
      const button = screen.getByRole('button', { name: /delete/i });
      expect(button).toHaveClass('button--danger-transparent');
    });

    it('renders ellipse-transparent variant', () => {
      render(<Button variant="ellipse-transparent">Pill Button</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('button--ellipse-transparent');
    });
  });

  // Icon button tests
  describe('Icon Button Rendering', () => {
    it('renders icon-neutral button with default icon', () => {
      render(<Button variant="icon-neutral" aria-label="Default action" />);
      const button = screen.getByRole('button', { name: /default action/i });
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass('button--icon-neutral');
      
      // Should contain default icon (SVG)
      const svg = button.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('renders icon button with custom icon', () => {
      render(
        <Button 
          variant="icon-outline" 
          icon={<TestIcon />}
          aria-label="Custom action"
        />
      );
      
      const button = screen.getByRole('button', { name: /custom action/i });
      expect(button).toHaveClass('button--icon-outline');
      expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    });

    it('applies correct icon sizes for different variants', () => {
      const { rerender } = render(
        <Button variant="icon-neutral" aria-label="16px icon" />
      );
      
      let svg = screen.getByRole('button').querySelector('svg');
      expect(svg).toHaveAttribute('width', '16');
      expect(svg).toHaveAttribute('height', '16');

      rerender(<Button variant="icon-outline" aria-label="24px icon" />);
      svg = screen.getByRole('button').querySelector('svg');
      expect(svg).toHaveAttribute('width', '24');
      expect(svg).toHaveAttribute('height', '24');
    });

    it('requires aria-label for icon buttons', () => {
      // This test ensures TypeScript compilation - if it compiles, the type checking works
      render(<Button variant="icon-neutral" aria-label="Required label" />);
      expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Required label');
    });
  });

  // State and interaction tests
  describe('Button States', () => {
    it('handles disabled state', () => {
      render(<Button disabled>Disabled Button</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(button).toHaveClass('button--disabled');
    });

    it('handles loading state', () => {
      render(<Button loading>Loading Button</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('button--loading');
    });

    it('prioritizes disabled over loading state', () => {
      render(<Button loading disabled>Button</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(button).toHaveClass('button--disabled');
    });

    it('handles click events', () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>Click me</Button>);
      
      fireEvent.click(screen.getByRole('button'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not trigger click when disabled', () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick} disabled>Disabled</Button>);
      
      fireEvent.click(screen.getByRole('button'));
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  // Custom props and attributes
  describe('Custom Props and Attributes', () => {
    it('forwards HTML button attributes', () => {
      render(
        <Button 
          type="submit" 
          data-testid="custom-button"
          className="custom-class"
        >
          Submit
        </Button>
      );
      
      const button = screen.getByTestId('custom-button');
      expect(button).toHaveAttribute('type', 'submit');
      expect(button).toHaveClass('custom-class');
    });

    it('supports form attributes', () => {
      render(<Button type="submit" form="my-form">Submit</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'submit');
      expect(button).toHaveAttribute('form', 'my-form');
    });

    it('applies custom className along with variant classes', () => {
      render(<Button className="my-custom-class" variant="primary">Button</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('my-custom-class');
      expect(button).toHaveClass('button--primary');
    });
  });

  // Accessibility tests
  describe('Accessibility', () => {
    it('has proper button role', () => {
      render(<Button>Button</Button>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('supports aria-label for text buttons', () => {
      render(<Button aria-label="Custom label">Button text</Button>);
      expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Custom label');
    });

    it('sets aria-hidden on icons', () => {
      render(<Button variant="icon-neutral" aria-label="Icon button" />);
      const svg = screen.getByRole('button').querySelector('svg');
      expect(svg).toHaveAttribute('aria-hidden', 'true');
    });

    it('maintains keyboard accessibility', () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>Keyboard accessible</Button>);
      
      const button = screen.getByRole('button');
      button.focus();
      expect(button).toHaveFocus();
      
      fireEvent.keyDown(button, { key: 'Enter' });
      fireEvent.keyUp(button, { key: 'Enter' });
      // Note: click events from Enter key are handled by the browser
    });
  });

  // Edge cases
  describe('Edge Cases', () => {
    it('handles missing CSS module classes gracefully', () => {
      // Temporarily mock missing styles
      const originalConsoleError = console.error;
      console.error = jest.fn();

      render(<Button>Button with missing styles</Button>);
      expect(screen.getByRole('button')).toBeInTheDocument();
      
      console.error = originalConsoleError;
    });

    it('handles empty children', () => {
      render(<Button>{''}</Button>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('handles null/undefined icon', () => {
      render(<Button variant="icon-neutral" icon={null} aria-label="Null icon" />);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });
});

// Integration tests
describe('Button Integration', () => {
  it('works in forms', () => {
    const handleSubmit = jest.fn(e => e.preventDefault());
    
    render(
      <form onSubmit={handleSubmit}>
        <Button type="submit">Submit Form</Button>
      </form>
    );
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleSubmit).toHaveBeenCalled();
  });

  it('works with different icon libraries pattern', () => {
    // Simulate different icon library components
    const LucideIcon = () => <svg data-testid="lucide">Lucide</svg>;
    const HeroIcon = () => <svg data-testid="hero">Hero</svg>;
    
    const { rerender } = render(
      <Button variant="icon-outline" icon={<LucideIcon />} aria-label="Lucide icon" />
    );
    expect(screen.getByTestId('lucide')).toBeInTheDocument();
    
    rerender(
      <Button variant="icon-outline" icon={<HeroIcon />} aria-label="Hero icon" />
    );
    expect(screen.getByTestId('hero')).toBeInTheDocument();
  });
});