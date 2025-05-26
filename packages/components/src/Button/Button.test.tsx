// import React from 'react';
// import { render, screen, fireEvent } from '@testing-library/react';
// import '@testing-library/jest-dom';
// import { Button } from './Button';

// describe('Button component', () => {
//   it('renders correctly with default props', () => {
//     render(<Button>Click me</Button>);
    
//     const button = screen.getByRole('button');
//     expect(button).toBeInTheDocument();
//     expect(button).toHaveTextContent('Click me');
//     expect(button).toHaveClass('button');
//     expect(button).toHaveClass('button--primary');
//     expect(button).toHaveClass('button--md');
//   });

//   it('applies proper classes based on props', () => {
//     render(<Button variant="secondary" size="lg">Click me</Button>);
    
//     const button = screen.getByRole('button');
//     expect(button).toHaveClass('button--secondary');
//     expect(button).toHaveClass('button--lg');
//   });

//   it('handles disabled state correctly', () => {
//     render(<Button isDisabled>Disabled Button</Button>);
    
//     const button = screen.getByRole('button');
//     expect(button).toBeDisabled();
//     expect(button).toHaveAttribute('data-disabled', 'true');
//   });

//   it('handles loading state correctly', () => {
//     render(<Button isLoading loadingText="Saving...">Loading Button</Button>);
    
//     const button = screen.getByRole('button');
//     expect(button).toBeDisabled();
//     expect(button).toHaveClass('button--loading');
//     expect(screen.getByText('Saving...')).toBeInTheDocument();
    
//     // Check for loading spinner
//     const loader = button.querySelector('.button-loader');
//     expect(loader).toBeInTheDocument();
//   });

//   it('renders with right icon', () => {
//     const iconElement = <span data-testid="right-icon">→</span>;
    
//     render(
//       <Button iconRight={iconElement}>
//         With Icon
//       </Button>
//     );
    
//     expect(screen.getByTestId('right-icon')).toBeInTheDocument();
//     expect(screen.getByRole('button')).toHaveClass('button--has-icon-right');
//   });

//   it('renders with left icon', () => {
//     const iconElement = <span data-testid="left-icon">←</span>;
    
//     render(
//       <Button iconLeft={iconElement}>
//         With Left Icon
//       </Button>
//     );
    
//     expect(screen.getByTestId('left-icon')).toBeInTheDocument();
//     expect(screen.getByRole('button')).toHaveClass('button--has-icon-left');
//   });

//   it('calls onPress handler when clicked', () => {
//     const mockHandler = jest.fn();
//     render(<Button onPress={mockHandler}>Click me</Button>);
    
//     fireEvent.click(screen.getByRole('button'));
//     expect(mockHandler).toHaveBeenCalledTimes(1);
//   });

//   it('supports focus state', () => {
//     render(<Button>Focus Button</Button>);
//     const button = screen.getByRole('button');
    
//     // Test that the button is focusable
//     expect(button).toHaveAttribute('tabindex', '0');
//     expect(button).not.toHaveAttribute('disabled');
    
//     // Alternative: Test focus with user event (install @testing-library/user-event if needed)
//     // import userEvent from '@testing-library/user-event';
//     // await userEvent.click(button);
//     // expect(button).toHaveFocus();
//   });

//   it('renders default loading text when no loadingText provided', () => {
//     render(<Button isLoading>Save</Button>);
    
//     expect(screen.getByText('Loading...')).toBeInTheDocument();
//     expect(screen.queryByText('Save')).not.toBeInTheDocument();
//   });

//   it('hides icons when loading', () => {
//     const leftIcon = <span data-testid="left-icon">←</span>;
//     const rightIcon = <span data-testid="right-icon">→</span>;
    
//     render(
//       <Button iconLeft={leftIcon} iconRight={rightIcon} isLoading>
//         Loading Button
//       </Button>
//     );
    
//     expect(screen.queryByTestId('left-icon')).not.toBeInTheDocument();
//     expect(screen.queryByTestId('right-icon')).not.toBeInTheDocument();
//     expect(screen.getByText('Loading...')).toBeInTheDocument();
//   });

//   it('supports custom className', () => {
//     render(<Button className="custom-button">Custom Button</Button>);
    
//     const button = screen.getByRole('button');
//     expect(button).toHaveClass('custom-button');
//     expect(button).toHaveClass('button'); // Should still have base class
//   });

//   it('supports all button variants', () => {
//     const variants = [
//       'primary', 'secondary', 'tertiary', 'ghost', 'link', 
//       'destructive', 'success', 'warning', 'info', 'neutral'
//     ] as const;
    
//     variants.forEach((variant) => {
//       const { unmount } = render(<Button variant={variant}>Test</Button>);
//       const button = screen.getByRole('button');
//       expect(button).toHaveClass(`button--${variant}`);
//       unmount();
//     });
//   });
// });



import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';
import '@testing-library/jest-dom';

// Mock icons for testing
const TestIcon = () => <span data-testid="test-icon">🔥</span>;

describe('Button Component', () => {
  // Basic rendering tests
  describe('Basic Rendering', () => {
    it('renders with default props', () => {
      render(<Button>Click me</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass('button');
      expect(button).toHaveClass('button--md');
    });

    it('renders with custom children', () => {
      render(<Button>Custom Text</Button>);
      expect(screen.getByText('Custom Text')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<Button className="custom-class">Button</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('custom-class');
    });
  });

  // Size variant tests (MD and LG from Figma)
  describe('Size Variants', () => {
    it('renders medium size by default', () => {
      render(<Button>Medium Button</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('button--md');
    });

    it('renders large size when specified', () => {
      render(<Button size="lg">Large Button</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('button--lg');
    });

    it('renders medium size when explicitly specified', () => {
      render(<Button size="md">Medium Button</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('button--md');
    });
  });

  // State tests (matching Figma states)
  describe('Button States', () => {
    // Default state (no additional classes needed)
    it('renders in default state', () => {
      render(<Button>Default State</Button>);
      const button = screen.getByRole('button');
      expect(button).not.toHaveClass('button--loading');
      expect(button).not.toBeDisabled();
    });

    // Loading state (Figma Loading state)
    it('renders loading state correctly', () => {
      render(<Button isLoading>Loading Button</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('button--loading');
      expect(button).toBeDisabled();
      expect(document.querySelector('.loading-spinner')).toBeInTheDocument();
    });

    it('shows custom loading text', () => {
      render(
        <Button isLoading loadingText="Processing...">
          Submit
        </Button>
      );
      expect(screen.getByText('Processing...')).toBeInTheDocument();
    });

    it('shows spinner without original text when loading', () => {
      render(<Button isLoading>Submit</Button>);
      const spinner = document.querySelector('.loading-spinner');
      expect(spinner).toBeInTheDocument();
      // The original text "Submit" should not be visible when loading without loadingText
      expect(screen.queryByText('Submit')).not.toBeInTheDocument();
    });

    // Disabled state (Figma Disable state)
    it('renders disabled state correctly', () => {
      render(<Button isDisabled>Disabled Button</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });

    it('disables button when loading', () => {
      render(<Button isLoading>Loading Button</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });
  });

  // Icon tests
  describe('Icons', () => {
    it('renders with left icon', () => {
      render(
        <Button iconLeft={<TestIcon />}>
          Button with left icon
        </Button>
      );
      const icon = screen.getByTestId('test-icon');
      const iconContainer = icon.closest('.button-icon-left');
      expect(iconContainer).toBeInTheDocument();
    });

    it('renders with right icon', () => {
      render(
        <Button iconRight={<TestIcon />}>
          Button with right icon
        </Button>
      );
      const icon = screen.getByTestId('test-icon');
      const iconContainer = icon.closest('.button-icon-right');
      expect(iconContainer).toBeInTheDocument();
    });

    it('renders with both left and right icons', () => {
      render(
        <Button 
          iconLeft={<TestIcon />} 
          iconRight={<TestIcon />}
        >
          Button with both icons
        </Button>
      );
      const leftIcon = document.querySelector('.button-icon-left');
      const rightIcon = document.querySelector('.button-icon-right');
      expect(leftIcon).toBeInTheDocument();
      expect(rightIcon).toBeInTheDocument();
    });
  });

  // Interaction tests (react-aria-components uses onPress)
  describe('Interactions', () => {
    it('calls onPress when clicked', async () => {
      const handlePress = jest.fn();
      const user = userEvent.setup();
      
      render(<Button onPress={handlePress}>Clickable Button</Button>);
      
      const button = screen.getByRole('button');
      await act(async () => {
        await user.click(button);
      });
      
      expect(handlePress).toHaveBeenCalledTimes(1);
    });

    it('does not call onPress when disabled', async () => {
      const handlePress = jest.fn();
      const user = userEvent.setup();
      
      render(
        <Button onPress={handlePress} isDisabled>
          Disabled Button
        </Button>
      );
      
      const button = screen.getByRole('button');
      await act(async () => {
        await user.click(button);
      });
      
      expect(handlePress).not.toHaveBeenCalled();
    });

    it('does not call onPress when loading', async () => {
      const handlePress = jest.fn();
      const user = userEvent.setup();
      
      render(
        <Button onPress={handlePress} isLoading>
          Loading Button
        </Button>
      );
      
      const button = screen.getByRole('button');
      await act(async () => {
        await user.click(button);
      });
      
      expect(handlePress).not.toHaveBeenCalled();
    });

    // Test keyboard interactions (react-aria-components handles this)
    it('responds to Enter key', async () => {
      const handlePress = jest.fn();
      const user = userEvent.setup();
      
      render(<Button onPress={handlePress}>Keyboard Button</Button>);
      
      const button = screen.getByRole('button');
      await act(async () => {
        button.focus();
        await user.keyboard('{Enter}');
      });
      
      expect(handlePress).toHaveBeenCalledTimes(1);
    });

    it('responds to Space key', async () => {
      const handlePress = jest.fn();
      const user = userEvent.setup();
      
      render(<Button onPress={handlePress}>Keyboard Button</Button>);
      
      const button = screen.getByRole('button');
      await act(async () => {
        button.focus();
        await user.keyboard(' ');
      });
      
      expect(handlePress).toHaveBeenCalledTimes(1);
    });
  });

  // Accessibility tests (react-aria-components provides better defaults)
  describe('Accessibility', () => {
    it('has correct ARIA attributes', () => {
      render(<Button aria-label="Custom ARIA label">Button</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute('aria-label', 'Custom ARIA label');
    });

    it('uses children text as accessible name when no aria-label', () => {
      render(<Button>Accessible Button Text</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent('Accessible Button Text');
    });

    it('has proper loading state accessibility', () => {
      render(<Button isLoading loadingText="Loading...">Submit</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      
      const spinner = document.querySelector('.loading-spinner');
      expect(spinner).toHaveAttribute('aria-hidden', 'true');
    });

    it('hides icons from screen readers', () => {
      render(
        <Button iconLeft={<TestIcon />} iconRight={<TestIcon />}>
          Button with icons
        </Button>
      );
      
      const leftIconContainer = document.querySelector('.button-icon-left');
      const rightIconContainer = document.querySelector('.button-icon-right');
      
      expect(leftIconContainer).toHaveAttribute('aria-hidden', 'true');
      expect(rightIconContainer).toHaveAttribute('aria-hidden', 'true');
    });

    it('maintains focus management', async () => {
      render(<Button>Focusable Button</Button>);
      const button = screen.getByRole('button');
      
      await act(async () => {
        button.focus();
      });
      
      expect(button).toHaveFocus();
    });
  });

  // react-aria-components specific props
  describe('React Aria Components Props', () => {
    it('accepts and forwards aria props', () => {
      render(
        <Button 
          aria-describedby="description"
          aria-expanded={false}
        >
          ARIA Button
        </Button>
      );
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-describedby', 'description');
      expect(button).toHaveAttribute('aria-expanded', 'false');
    });

    it('handles form submission type', () => {
      render(<Button type="submit">Submit Button</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'submit');
    });

    it('supports data attributes', () => {
      render(<Button data-testid="custom-button">Button</Button>);
      const button = screen.getByTestId('custom-button');
      expect(button).toBeInTheDocument();
    });
  });

  // Combined state tests
  describe('Combined States', () => {
    it('handles large size with loading state', () => {
      render(
        <Button size="lg" isLoading loadingText="Processing...">
          Large Loading Button
        </Button>
      );
      const button = screen.getByRole('button');
      expect(button).toHaveClass('button--lg');
      expect(button).toHaveClass('button--loading');
      expect(button).toBeDisabled();
      expect(screen.getByText('Processing...')).toBeInTheDocument();
    });

    it('handles large size with icons', () => {
      render(
        <Button size="lg" iconLeft={<TestIcon />} iconRight={<TestIcon />}>
          Large Button with Icons
        </Button>
      );
      const button = screen.getByRole('button');
      expect(button).toHaveClass('button--lg');
      expect(document.querySelector('.button-icon-left')).toBeInTheDocument();
      expect(document.querySelector('.button-icon-right')).toBeInTheDocument();
    });

    it('handles disabled state with icons', () => {
      render(
        <Button isDisabled iconLeft={<TestIcon />}>
          Disabled Button with Icon
        </Button>
      );
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(document.querySelector('.button-icon-left')).toBeInTheDocument();
    });
  });

  // Edge cases
  describe('Edge Cases', () => {
    it('handles empty children gracefully', () => {
      render(<Button aria-label="Empty button" />);
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute('aria-label', 'Empty button');
    });

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLButtonElement>();
      render(<Button ref={ref}>Button with ref</Button>);
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });

    it('maintains loading state when props change', () => {
      const { rerender } = render(<Button isLoading>Loading</Button>);
      expect(screen.getByRole('button')).toBeDisabled();
      
      rerender(<Button isLoading loadingText="Still loading">Loading</Button>);
      expect(screen.getByRole('button')).toBeDisabled();
      expect(screen.getByText('Still loading')).toBeInTheDocument();
    });
  });
});