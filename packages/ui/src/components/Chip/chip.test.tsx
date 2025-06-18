/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Chip } from './Chip';
import { InfoIcon } from '../Icons/index';

describe('Chip Component', () => {
  // ===== BASIC RENDERING =====
  
  it('renders chip with text', () => {
    render(<Chip>Test Chip</Chip>);
    expect(screen.getByText('Test Chip')).toBeInTheDocument();
  });

  it('renders with custom className', () => {
    render(<Chip className="custom-class">Test</Chip>);
    const chip = screen.getByText('Test').closest('div');
    expect(chip).toHaveClass('custom-class');
  });

  it('renders with data-testid', () => {
    render(<Chip data-testid="test-chip">Test</Chip>);
    expect(screen.getByTestId('test-chip')).toBeInTheDocument();
  });

  // ===== DISABLED STATE =====

  it('applies disabled styles when disabled', () => {
    render(<Chip disabled>Disabled Chip</Chip>);
    const chip = screen.getByText('Disabled Chip').closest('div');
    expect(chip).toHaveClass('disabled');
  });

  it('does not call onClick when disabled', async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();
    
    render(<Chip disabled onClick={handleClick}>Disabled</Chip>);
    
    await user.click(screen.getByText('Disabled'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  // ===== CLICKABLE FUNCTIONALITY =====

  it('handles click events when clickable', async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();
    
    render(<Chip onClick={handleClick}>Clickable Chip</Chip>);
    
    const chip = screen.getByRole('button');
    expect(chip).toBeInTheDocument();
    
    await user.click(chip);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('handles keyboard events when clickable', async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();
    
    render(<Chip onClick={handleClick}>Clickable Chip</Chip>);
    
    const chip = screen.getByRole('button');
    chip.focus();
    
    await user.keyboard('{Enter}');
    expect(handleClick).toHaveBeenCalledTimes(1);
    
    await user.keyboard(' ');
    expect(handleClick).toHaveBeenCalledTimes(2);
  });

  it('applies clickable class when onClick is provided', () => {
    render(<Chip onClick={() => {}}>Clickable</Chip>);
    const chip = screen.getByRole('button');
    expect(chip).toHaveClass('clickable');
  });

  it('has proper accessibility attributes when clickable', () => {
    render(<Chip onClick={() => {}} aria-label="Custom label">Clickable</Chip>);
    const chip = screen.getByRole('button');
    expect(chip).toHaveAttribute('role', 'button');
    expect(chip).toHaveAttribute('tabIndex', '0');
    expect(chip).toHaveAttribute('aria-label', 'Custom label');
  });

  // ===== ICON FUNCTIONALITY =====

  it('renders with leading icon', () => {
    render(<Chip icon={<InfoIcon data-testid="info-icon" />}>With Icon</Chip>);
    expect(screen.getByTestId('info-icon')).toBeInTheDocument();
    expect(screen.getByText('With Icon')).toBeInTheDocument();
  });

  it('renders with icon name string', () => {
    render(<Chip icon="info">With Icon Name</Chip>);
    expect(screen.getByText('With Icon Name')).toBeInTheDocument();
  });

  // ===== STATUS DOT FUNCTIONALITY =====

  it('renders status dot when showDot is true', () => {
    render(<Chip showDot>With Dot</Chip>);
    const chip = screen.getByText('With Dot').closest('div');
    const dot = chip?.querySelector('[aria-hidden="true"]');
    expect(dot).toBeInTheDocument();
  });

  it('does not render status dot when showDot is false', () => {
    render(<Chip showDot={false}>Without Dot</Chip>);
    const chip = screen.getByText('Without Dot').closest('div');
    const dot = chip?.querySelector('[aria-hidden="true"]');
    expect(dot).not.toBeInTheDocument();
  });

  // ===== AVATAR FUNCTIONALITY =====

  it('renders avatar when provided', () => {
    const avatar = <div data-testid="test-avatar">Avatar</div>;
    render(<Chip avatar={avatar}>With Avatar</Chip>);
    expect(screen.getByTestId('test-avatar')).toBeInTheDocument();
  });

  // ===== DISMISSIBLE FUNCTIONALITY =====

  it('renders remove button when dismissible', () => {
    const handleRemove = jest.fn();
    render(<Chip dismissible onRemove={handleRemove}>Dismissible</Chip>);
    
    const removeButton = screen.getByRole('button', { name: /remove/i });
    expect(removeButton).toBeInTheDocument();
  });

  it('handles remove events', async () => {
    const handleRemove = jest.fn();
    const user = userEvent.setup();
    
    render(<Chip dismissible onRemove={handleRemove}>Remove me</Chip>);
    
    const removeButton = screen.getByRole('button', { name: /remove/i });
    await user.click(removeButton);
    
    expect(handleRemove).toHaveBeenCalledTimes(1);
  });

  it('handles remove button keyboard events', async () => {
    const handleRemove = jest.fn();
    const user = userEvent.setup();
    
    render(<Chip dismissible onRemove={handleRemove}>Remove me</Chip>);
    
    const removeButton = screen.getByRole('button', { name: /remove/i });
    removeButton.focus();
    
    await user.keyboard('{Enter}');
    expect(handleRemove).toHaveBeenCalledTimes(1);
    
    await user.keyboard(' ');
    expect(handleRemove).toHaveBeenCalledTimes(2);
  });

  it('prevents chip click when remove button is clicked', async () => {
    const handleClick = jest.fn();
    const handleRemove = jest.fn();
    const user = userEvent.setup();
    
    render(
      <Chip onClick={handleClick} dismissible onRemove={handleRemove}>
        Clickable & Dismissible
      </Chip>
    );
    
    const removeButton = screen.getByRole('button', { name: /remove/i });
    await user.click(removeButton);
    
    expect(handleRemove).toHaveBeenCalledTimes(1);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('renders custom remove icon', () => {
    const handleRemove = jest.fn();
    render(
      <Chip dismissible onRemove={handleRemove} removeIcon={<InfoIcon data-testid="custom-remove" />}>
        Custom Remove
      </Chip>
    );
    
    expect(screen.getByTestId('custom-remove')).toBeInTheDocument();
  });

  it('applies custom remove button props', () => {
    const handleRemove = jest.fn();
    render(
      <Chip 
        dismissible 
        onRemove={handleRemove}
        removeButtonProps={{
          'aria-label': 'Delete chip',
          'data-testid': 'delete-button'
        }}
      >
        Custom Props
      </Chip>
    );
    
    const removeButton = screen.getByTestId('delete-button');
    expect(removeButton).toHaveAttribute('aria-label', 'Delete chip');
  });

  it('does not call onRemove when disabled', async () => {
    const handleRemove = jest.fn();
    const user = userEvent.setup();
    
    render(<Chip disabled dismissible onRemove={handleRemove}>Disabled Remove</Chip>);
    
    const removeButton = screen.getByRole('button', { name: /remove/i });
    await user.click(removeButton);
    
    expect(handleRemove).not.toHaveBeenCalled();
  });

  // ===== COMBINED FUNCTIONALITY =====

  it('works as both clickable and dismissible', async () => {
    const handleClick = jest.fn();
    const handleRemove = jest.fn();
    const user = userEvent.setup();
    
    render(
      <Chip onClick={handleClick} dismissible onRemove={handleRemove}>
        Both Interactive
      </Chip>
    );
    
    // Click the chip itself
    const chip = screen.getByRole('button', { name: /both interactive/i });
    await user.click(chip);
    expect(handleClick).toHaveBeenCalledTimes(1);
    
    // Click the remove button
    const removeButton = screen.getByRole('button', { name: /remove/i });
    await user.click(removeButton);
    expect(handleRemove).toHaveBeenCalledTimes(1);
  });

  // ===== FIGMA COMPONENT FEATURES =====

  it('renders all Figma component features together', () => {
    const handleClick = jest.fn();
    const handleRemove = jest.fn();
    const avatar = <div data-testid="test-avatar">Avatar</div>;
    
    render(
      <Chip 
        showDot
        icon={<InfoIcon data-testid="test-icon" />}
        avatar={avatar}
        dismissible
        onClick={handleClick}
        onRemove={handleRemove}
      >
        Full Features
      </Chip>
    );
    
    expect(screen.getByText('Full Features')).toBeInTheDocument();
    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    expect(screen.getByTestId('test-avatar')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /remove/i })).toBeInTheDocument();
    
    // Check if chip is clickable
    const chip = screen.getByRole('button', { name: /full features/i });
    expect(chip).toBeInTheDocument();
  });

  // ===== EDGE CASES =====

  it('handles missing onRemove gracefully', () => {
    render(<Chip dismissible>Missing Handler</Chip>);
    expect(screen.getByText('Missing Handler')).toBeInTheDocument();
    // Should not render remove button without onRemove
    expect(screen.queryByRole('button', { name: /remove/i })).not.toBeInTheDocument();
  });

  it('handles complex children', () => {
    render(
      <Chip>
        <span>Complex</span> <strong>Children</strong>
      </Chip>
    );
    expect(screen.getByText('Complex')).toBeInTheDocument();
    expect(screen.getByText('Children')).toBeInTheDocument();
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Chip ref={ref}>Ref Test</Chip>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});