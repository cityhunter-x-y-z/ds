/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Input } from './Input';

describe('Input Component', () => {
  // ===== BASIC RENDERING TESTS =====
  
  describe('Basic Rendering', () => {
    it('renders text input correctly', () => {
      render(<Input variant="text" placeholder="Test placeholder" data-testid="test-input" />);
      const input = screen.getByTestId('test-input');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('placeholder', 'Test placeholder');
    });

    it('renders with custom className', () => {
      render(<Input variant="text" className="custom-class" data-testid="test-input" />);
      const input = screen.getByTestId('test-input');
      expect(input).toHaveClass('custom-class');
    });

    it('renders with label', () => {
      render(<Input variant="text" label="Test Label" id="test-input" />);
      const label = screen.getByLabelText('Test Label');
      expect(label).toBeInTheDocument();
    });

    it('renders required indicator', () => {
      render(<Input variant="text" label="Required Field" required id="test-input" />);
      expect(screen.getByText('*')).toBeInTheDocument();
    });
  });

  // ===== 1.0 SERIES TESTS =====
  
  describe('1.0 Series - Basic Inputs', () => {
    it('renders text input variant', () => {
      render(<Input variant="text" data-testid="text-input" />);
      const input = screen.getByTestId('text-input');
      expect(input).toHaveAttribute('type', 'text');
    });

    it('renders email input variant', () => {
      render(<Input variant="email" data-testid="email-input" />);
      const input = screen.getByTestId('email-input');
      expect(input).toHaveAttribute('type', 'email');
    });

    it('renders search input variant', () => {
      render(<Input variant="search" data-testid="search-input" />);
      const input = screen.getByTestId('search-input');
      expect(input).toHaveAttribute('type', 'search');
    });

    it('renders password input variant', () => {
      render(<Input variant="password" data-testid="password-input" />);
      const input = screen.getByTestId('password-input');
      expect(input).toHaveAttribute('type', 'password');
    });

    it('renders credit card input variant', () => {
      render(<Input variant="credit-card" data-testid="creditcard-input" />);
      const input = screen.getByTestId('creditcard-input');
      expect(input).toBeInTheDocument();
    });

    it('renders number input variant', () => {
      render(<Input variant="number" data-testid="number-input" />);
      const input = screen.getByTestId('number-input');
      expect(input).toHaveAttribute('type', 'number');
    });

    it('renders textarea variant', () => {
      render(<Input variant="textarea" data-testid="textarea-input" />);
      const textarea = screen.getByTestId('textarea-input');
      expect(textarea.tagName).toBe('TEXTAREA');
    });
  });

  // ===== INPUT STATES TESTS =====
  
  describe('Input States', () => {
    it('applies default state classes', () => {
      render(<Input variant="text" state="default" data-testid="test-input" />);
      const container = screen.getByTestId('test-input').closest('.container');
      expect(container).toHaveClass('containerDefault');
    });

    it('applies error state classes', () => {
      render(<Input variant="text" state="error" data-testid="test-input" />);
      const container = screen.getByTestId('test-input').closest('.container');
      expect(container).toHaveClass('containerError');
    });

    it('applies success state classes', () => {
      render(<Input variant="text" state="success" data-testid="test-input" />);
      const container = screen.getByTestId('test-input').closest('.container');
      expect(container).toHaveClass('containerSuccess');
    });

    it('applies warning state classes', () => {
      render(<Input variant="text" state="warning" data-testid="test-input" />);
      const container = screen.getByTestId('test-input').closest('.container');
      expect(container).toHaveClass('containerWarning');
    });

    it('applies disabled state', () => {
      render(<Input variant="text" disabled data-testid="test-input" />);
      const input = screen.getByTestId('test-input');
      expect(input).toBeDisabled();
    });
  });

  // ===== SIZE VARIANTS TESTS =====
  
  describe('Size Variants', () => {
    it('applies large size classes', () => {
      render(<Input variant="text" size="lg" data-testid="test-input" />);
      const input = screen.getByTestId('test-input');
      expect(input).toHaveClass('inputLg');
    });

    it('applies medium size classes', () => {
      render(<Input variant="text" size="md" data-testid="test-input" />);
      const input = screen.getByTestId('test-input');
      expect(input).toHaveClass('inputMd');
    });
  });

  // ===== EVENT HANDLING TESTS =====
  
  describe('Event Handling', () => {
    it('handles change events', async () => {
      const handleChange = jest.fn();
      const user = userEvent.setup();
      
      render(<Input variant="text" onChange={handleChange} data-testid="test-input" />);
      const input = screen.getByTestId('test-input');
      
      await user.type(input, 'Hello');
      expect(handleChange).toHaveBeenCalled();
    });

    it('handles focus events', async () => {
      const handleFocus = jest.fn();
      const user = userEvent.setup();
      
      render(<Input variant="text" onFocus={handleFocus} data-testid="test-input" />);
      const input = screen.getByTestId('test-input');
      
      await user.click(input);
      expect(handleFocus).toHaveBeenCalled();
    });

    it('handles blur events', async () => {
      const handleBlur = jest.fn();
      const user = userEvent.setup();
      
      render(<Input variant="text" onBlur={handleBlur} data-testid="test-input" />);
      const input = screen.getByTestId('test-input');
      
      await user.click(input);
      await user.tab();
      expect(handleBlur).toHaveBeenCalled();
    });

    it('handles keyboard events', async () => {
      const handleKeyDown = jest.fn();
      const user = userEvent.setup();
      
      render(<Input variant="text" onKeyDown={handleKeyDown} data-testid="test-input" />);
      const input = screen.getByTestId('test-input');
      
      await user.type(input, '{enter}');
      expect(handleKeyDown).toHaveBeenCalled();
    });
  });

  // ===== MESSAGE DISPLAY TESTS =====
  
  describe('Message Display', () => {
    it('displays helper text', () => {
      render(<Input variant="text" helperText="This is helper text" id="test-input" />);
      expect(screen.getByText('This is helper text')).toBeInTheDocument();
    });

    it('displays error message', () => {
      render(<Input variant="text" state="error" errorMessage="This is an error" id="test-input" />);
      expect(screen.getByText('This is an error')).toBeInTheDocument();
    });

    it('displays success message', () => {
      render(<Input variant="text" state="success" successMessage="Success!" id="test-input" />);
      expect(screen.getByText('Success!')).toBeInTheDocument();
    });

    it('prioritizes error message over helper text', () => {
      render(
        <Input
          variant="text"
          state="error"
          helperText="Helper text"
          errorMessage="Error message"
          id="test-input"
        />
      );
      expect(screen.getByText('Error message')).toBeInTheDocument();
      expect(screen.queryByText('Helper text')).not.toBeInTheDocument();
    });
  });

  // ===== SEARCH INPUT SPECIFIC TESTS =====
  
  describe('Search Input', () => {
    it('calls onSearch when Enter is pressed', async () => {
      const handleSearch = jest.fn();
      const user = userEvent.setup();
      
      render(<Input variant="search" onSearch={handleSearch} data-testid="search-input" />);
      const input = screen.getByTestId('search-input');
      
      await user.type(input, 'test query{enter}');
      expect(handleSearch).toHaveBeenCalledWith('test query');
    });

    it('shows search icon', () => {
      render(<Input variant="search" data-testid="search-input" />);
      // Icon presence would be tested by checking for icon container or specific classes
      const container = screen.getByTestId('search-input').closest('.inputWrapper');
      expect(container).toBeInTheDocument();
    });
  });

  // ===== PASSWORD INPUT SPECIFIC TESTS =====
  
  describe('Password Input', () => {
    it('toggles password visibility', async () => {
      const user = userEvent.setup();
      
      render(<Input variant="password" data-testid="password-input" />);
      const input = screen.getByTestId('password-input');
      
      expect(input).toHaveAttribute('type', 'password');
      
      // Find and click the toggle button
      const toggleButton = screen.getByRole('button', { name: /show password/i });
      await user.click(toggleButton);
      
      expect(input).toHaveAttribute('type', 'text');
    });

    it('calls onPasswordToggle callback', async () => {
      const handlePasswordToggle = jest.fn();
      const user = userEvent.setup();
      
      render(
        <Input
          variant="password"
          onPasswordToggle={handlePasswordToggle}
          data-testid="password-input"
        />
      );
      
      const toggleButton = screen.getByRole('button', { name: /show password/i });
      await user.click(toggleButton);
      
      expect(handlePasswordToggle).toHaveBeenCalledWith(true);
    });
  });

  // ===== CREDIT CARD INPUT SPECIFIC TESTS =====
  
  describe('Credit Card Input', () => {
    it('formats credit card numbers with spaces', async () => {
      const user = userEvent.setup();
      
      render(<Input variant="credit-card" data-testid="creditcard-input" />);
      const input = screen.getByTestId('creditcard-input');
      
      await user.type(input, '1234567890123456');
      expect(input).toHaveValue('1234 5678 9012 3456');
    });

    it('detects card type', async () => {
      const handleCardTypeDetected = jest.fn();
      const user = userEvent.setup();
      
      render(
        <Input
          variant="credit-card"
          onCardTypeDetected={handleCardTypeDetected}
          data-testid="creditcard-input"
        />
      );
      const input = screen.getByTestId('creditcard-input');
      
      await user.type(input, '4');
      expect(handleCardTypeDetected).toHaveBeenCalledWith('visa');
    });
  });

  // ===== VERIFICATION INPUT SPECIFIC TESTS =====
  
  describe('Verification Input', () => {
    it('renders multiple input fields', () => {
      render(<Input variant="verification" length={6} data-testid="verification-input" />);
      const container = screen.getByTestId('verification-input');
      const inputs = container.querySelectorAll('input');
      expect(inputs).toHaveLength(6);
    });

    it('moves focus to next field on input', async () => {
      const user = userEvent.setup();
      
      render(<Input variant="verification" length={4} data-testid="verification-input" />);
      const container = screen.getByTestId('verification-input');
      const inputs = container.querySelectorAll('input');
      
      await user.type(inputs[0], '1');
      expect(inputs[1]).toHaveFocus();
    });

    it('calls onComplete when all fields are filled', async () => {
      const handleComplete = jest.fn();
      const user = userEvent.setup();
      
      render(
        <Input
          variant="verification"
          length={4}
          onComplete={handleComplete}
          data-testid="verification-input"
        />
      );
      const container = screen.getByTestId('verification-input');
      const inputs = container.querySelectorAll('input');
      
      for (let i = 0; i < 4; i++) {
        await user.type(inputs[i], `${i + 1}`);
      }
      
      expect(handleComplete).toHaveBeenCalledWith('1234');
    });

    it('moves focus to previous field on backspace', async () => {
      const user = userEvent.setup();
      
      render(<Input variant="verification" length={4} data-testid="verification-input" />);
      const container = screen.getByTestId('verification-input');
      const inputs = container.querySelectorAll('input');
      
      inputs[1].focus();
      await user.keyboard('{backspace}');
      expect(inputs[0]).toHaveFocus();
    });
  });

  // ===== TEXTAREA SPECIFIC TESTS =====
  
  describe('Textarea Input', () => {
    it('renders with specified rows', () => {
      render(<Input variant="textarea" rows={5} data-testid="textarea-input" />);
      const textarea = screen.getByTestId('textarea-input');
      expect(textarea).toHaveAttribute('rows', '5');
    });

    it('shows character count when enabled', () => {
      render(
        <Input
          variant="textarea"
          showCharacterCount
          maxLength={100}
          data-testid="textarea-input"
        />
      );
      expect(screen.getByText('0/100')).toBeInTheDocument();
    });

    it('updates character count on input', async () => {
      const user = userEvent.setup();
      
      render(
        <Input
          variant="textarea"
          showCharacterCount
          maxLength={100}
          data-testid="textarea-input"
        />
      );
      const textarea = screen.getByTestId('textarea-input');
      
      await user.type(textarea, 'Hello');
      expect(screen.getByText('5/100')).toBeInTheDocument();
    });
  });

  // ===== ACCESSIBILITY TESTS =====
  
  describe('Accessibility', () => {
    it('supports aria-label', () => {
      render(<Input variant="text" aria-label="Custom label" data-testid="test-input" />);
      const input = screen.getByTestId('test-input');
      expect(input).toHaveAttribute('aria-label', 'Custom label');
    });

    it('supports aria-describedby for messages', () => {
      render(
        <Input
          variant="text"
          id="test-input"
          helperText="Helper text"
          data-testid="test-input"
        />
      );
      const input = screen.getByTestId('test-input');
      expect(input).toHaveAttribute('aria-describedby', 'test-input-message');
    });

    it('sets aria-invalid for error state', () => {
      render(<Input variant="text" state="error" data-testid="test-input" />);
      const input = screen.getByTestId('test-input');
      expect(input).toHaveAttribute('aria-invalid', 'true');
    });

    it('associates label with input using id', () => {
      render(<Input variant="text" label="Test Label" id="test-input" />);
      const input = screen.getByLabelText('Test Label');
      expect(input).toHaveAttribute('id', 'test-input');
    });

    it('supports keyboard navigation', async () => {
      const user = userEvent.setup();
      
      render(
        <div>
          <Input variant="text" data-testid="input1" />
          <Input variant="text" data-testid="input2" />
        </div>
      );
      
      const input1 = screen.getByTestId('input1');
      const input2 = screen.getByTestId('input2');
      
      input1.focus();
      await user.tab();
      expect(input2).toHaveFocus();
    });
  });

  // ===== CONTROLLED vs UNCONTROLLED TESTS =====
  
  describe('Controlled vs Uncontrolled', () => {
    it('works as controlled component', async () => {
      const handleChange = jest.fn();
      const user = userEvent.setup();
      
      const { rerender } = render(
        <Input variant="text" value="initial" onChange={handleChange} data-testid="test-input" />
      );
      const input = screen.getByTestId('test-input');
      
      expect(input).toHaveValue('initial');
      
      await user.type(input, ' updated');
      
      rerender(
        <Input
          variant="text"
          value="initial updated"
          onChange={handleChange}
          data-testid="test-input"
        />
      );
      
      expect(input).toHaveValue('initial updated');
    });

    it('works as uncontrolled component', async () => {
      const user = userEvent.setup();
      
      render(<Input variant="text" defaultValue="initial" data-testid="test-input" />);
      const input = screen.getByTestId('test-input');
      
      expect(input).toHaveValue('initial');
      
      await user.clear(input);
      await user.type(input, 'updated');
      
      expect(input).toHaveValue('updated');
    });
  });

  // ===== FORM INTEGRATION TESTS =====
  
  describe('Form Integration', () => {
    it('submits form data correctly', () => {
      const handleSubmit = jest.fn((e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        expect(formData.get('testInput')).toBe('test value');
      });
      
      render(
        <form onSubmit={handleSubmit}>
          <Input variant="text" name="testInput" defaultValue="test value" />
          <button type="submit">Submit</button>
        </form>
      );
      
      fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
      expect(handleSubmit).toHaveBeenCalled();
    });

    it('validates required fields', () => {
      render(
        <form>
          <Input variant="text" name="required-input" required data-testid="test-input" />
          <button type="submit">Submit</button>
        </form>
      );
      
      const input = screen.getByTestId('test-input');
      expect(input).toHaveAttribute('required');
    });
  });

  // ===== ERROR BOUNDARY TESTS =====
  
  describe('Error Handling', () => {
    it('handles invalid icon names gracefully', () => {
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
      
      render(<Input variant="text" icon="invalid-icon" data-testid="test-input" />);
      
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('Icon name "invalid-icon" not found in registry')
      );
      
      consoleSpy.mockRestore();
    });

    it('handles missing props gracefully', () => {
      expect(() => {
        render(<Input variant="text" />);
      }).not.toThrow();
    });
  });
});