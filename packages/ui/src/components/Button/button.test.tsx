/**
 * @jest-environment jsdom
 */
/// <reference types="jest" />
/// <reference types="@testing-library/jest-dom" />

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Button } from './Button';

// Mock CSS modules
(global as any).jest.mock('./Button.module.css', () => ({}));

describe('Button Component', () => {
  it('renders button with text', () => {
    render(<Button variant="primary">Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('renders with custom className', () => {
    render(<Button variant="primary" className="custom-class">Test</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
  });

  it('handles click events', async () => {
    const handleClick = (global as any).jest.fn();
    const user = userEvent.setup();
    
    render(<Button variant="primary" onClick={handleClick}>Click me</Button>);
    
    await user.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders primary variant', () => {
    render(<Button variant="primary">Primary</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('btn-primary');
  });

  it('renders secondary variant', () => {
    render(<Button variant="secondary">Secondary</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('btn-secondary');
  });

  it('renders large size', () => {
    render(<Button variant="primary" size="lg">Large</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('btn-lg');
  });

  it('renders medium size by default', () => {
    render(<Button variant="primary">Default</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('btn-md');
  });

  it('renders disabled state', () => {
    render(<Button variant="primary" disabled>Disabled</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveClass('btn-disabled');
  });

  it('renders loading state', () => {
    render(<Button variant="primary" loading>Loading</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveClass('btn-loading');
  });

  it('does not call onClick when disabled', async () => {
    const handleClick = (global as any).jest.fn();
    const user = userEvent.setup();
    
    render(<Button variant="primary" onClick={handleClick} disabled>Disabled</Button>);
    
    await user.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('supports button types', () => {
    render(<Button variant="primary" type="submit">Submit</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', 'submit');
  });

  it('supports aria-label', () => {
    render(<Button variant="primary" aria-label="Custom label">Test</Button>);
    expect(screen.getByLabelText('Custom label')).toBeInTheDocument();
  });

  it('handles keyboard events', async () => {
    const handleClick = (global as any).jest.fn();
    const user = userEvent.setup();
    
    render(<Button variant="primary" onClick={handleClick}>Test</Button>);
    const button = screen.getByRole('button');
    
    button.focus();
    await user.keyboard('{Enter}');
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});