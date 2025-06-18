/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Link } from './Link';
import { InfoIcon } from '../Icons/index';

describe('Link Component', () => {
  // ===== BASIC RENDERING =====
  
  it('renders link with text', () => {
    render(<Link href="/test">Test Link</Link>);
    expect(screen.getByText('Test Link')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', '/test');
  });

  it('renders with custom className', () => {
    render(<Link className="custom-class" href="/test">Test</Link>);
    const link = screen.getByRole('link');
    expect(link).toHaveClass('custom-class');
  });

  it('renders with data-testid', () => {
    render(<Link data-testid="test-link" href="/test">Test</Link>);
    expect(screen.getByTestId('test-link')).toBeInTheDocument();
  });

  // ===== VARIANTS =====

  it('applies correct variant classes', () => {
    const { rerender } = render(<Link variant="default" href="/test">Default</Link>);
    let link = screen.getByRole('link');
    expect(link).toHaveClass('default');

    rerender(<Link variant="button" href="/test">Button</Link>);
    link = screen.getByRole('link');
    expect(link).toHaveClass('button');
  });

  // ===== SIZES =====

  it('applies correct size classes', () => {
    const { rerender } = render(<Link size="sm" href="/test">Small</Link>);
    let link = screen.getByRole('link');
    expect(link).toHaveClass('sm');

    rerender(<Link size="md" href="/test">Medium</Link>);
    link = screen.getByRole('link');
    expect(link).toHaveClass('md');

    rerender(<Link size="lg" href="/test">Large</Link>);
    link = screen.getByRole('link');
    expect(link).toHaveClass('lg');
  });

  // ===== UNDERLINE STYLES =====

  it('applies correct underline classes', () => {
    const { rerender } = render(<Link underline="always" href="/test">Always</Link>);
    let link = screen.getByRole('link');
    expect(link).toHaveClass('underlineAlways');

    rerender(<Link underline="hover" href="/test">Hover</Link>);
    link = screen.getByRole('link');
    expect(link).toHaveClass('underlineHover');

    rerender(<Link underline="none" href="/test">None</Link>);
    link = screen.getByRole('link');
    expect(link).toHaveClass('underlineNone');
  });

  // ===== DISABLED STATE =====

  it('applies disabled styles when disabled', () => {
    render(<Link disabled href="/test">Disabled Link</Link>);
    const link = screen.getByRole('link');
    expect(link).toHaveClass('disabled');
    expect(link).toHaveAttribute('aria-disabled', 'true');
    expect(link).not.toHaveAttribute('href');
    expect(link).toHaveAttribute('tabIndex', '-1');
  });

  it('does not call onClick when disabled', async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();
    
    render(<Link disabled onClick={handleClick} href="/test">Disabled</Link>);
    
    await user.click(screen.getByText('Disabled'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  // ===== CLICK FUNCTIONALITY =====

  it('handles click events', async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();
    
    render(<Link onClick={handleClick} href="/test">Clickable Link</Link>);
    
    await user.click(screen.getByRole('link'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('handles keyboard events', async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();
    
    render(<Link onClick={handleClick} href="/test">Keyboard Link</Link>);
    
    const link = screen.getByRole('link');
    link.focus();
    
    await user.keyboard('{Enter}');
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('has proper accessibility attributes', () => {
    render(<Link aria-label="Custom label" href="/test">Accessible Link</Link>);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('aria-label', 'Custom label');
    expect(link).toHaveAttribute('tabIndex', '0');
  });

  // ===== ICON FUNCTIONALITY =====

  it('renders with leading icon', () => {
    render(<Link icon={<InfoIcon data-testid="info-icon" />} iconPosition="left" href="/test">With Icon</Link>);
    expect(screen.getByTestId('info-icon')).toBeInTheDocument();
    expect(screen.getByText('With Icon')).toBeInTheDocument();
  });

  it('renders with trailing icon', () => {
    render(<Link icon={<InfoIcon data-testid="info-icon" />} iconPosition="right" href="/test">With Icon</Link>);
    expect(screen.getByTestId('info-icon')).toBeInTheDocument();
    expect(screen.getByText('With Icon')).toBeInTheDocument();
  });

  it('renders with icon name string', () => {
    render(<Link icon="info" href="/test">With Icon Name</Link>);
    expect(screen.getByText('With Icon Name')).toBeInTheDocument();
  });

  // ===== EXTERNAL LINK FUNCTIONALITY =====

  it('handles external links correctly', () => {
    render(<Link href="https://example.com" external>External Link</Link>);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', 'https://example.com');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('auto-detects external links', () => {
    render(<Link href="https://example.com">Auto External</Link>);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('rel', 'noopener');
  });

  it('shows external link indicator when no icon present', () => {
    render(<Link href="https://example.com" external>External</Link>);
    const link = screen.getByRole('link');
    expect(link.querySelector('[aria-hidden="true"]')).toBeInTheDocument();
  });

  it('does not show external indicator when icon is present', () => {
    render(
      <Link href="https://example.com" external icon={<InfoIcon />}>
        External with Icon
      </Link>
    );
    const link = screen.getByRole('link');
    // Should not have the external icon since there's already an icon
    const externalIcons = link.querySelectorAll('[aria-hidden="true"]');
    // Only the icon should be aria-hidden, not the external indicator
    expect(externalIcons).toHaveLength(1);
  });

  // ===== TARGET AND REL ATTRIBUTES =====

  it('handles custom target attribute', () => {
    render(<Link href="/test" target="_parent">Custom Target</Link>);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('target', '_parent');
  });

  it('handles custom rel attribute', () => {
    render(<Link href="/test" rel="custom">Custom Rel</Link>);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('rel', 'custom');
  });

  it('combines external and custom rel attributes', () => {
    render(<Link href="https://example.com" external rel="custom">Combined Rel</Link>);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer custom');
  });

  // ===== HREF HANDLING =====

  it('uses default href when none provided', () => {
    render(<Link>No Href</Link>);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '#');
  });

  it('removes href when disabled', () => {
    render(<Link disabled href="/test">Disabled</Link>);
    const link = screen.getByRole('link');
    expect(link).not.toHaveAttribute('href');
  });

  // ===== EDGE CASES =====

  it('handles complex children', () => {
    render(
      <Link href="/test">
        <span>Complex</span> <strong>Children</strong>
      </Link>
    );
    expect(screen.getByText('Complex')).toBeInTheDocument();
    expect(screen.getByText('Children')).toBeInTheDocument();
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLAnchorElement>();
    render(<Link ref={ref} href="/test">Ref Test</Link>);
    expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
  });

  it('prevents default when disabled and clicked', async () => {
    const preventDefault = jest.fn();
    const stopPropagation = jest.fn();
    const handleClick = jest.fn();
    
    render(<Link disabled onClick={handleClick} href="/test">Disabled</Link>);
    
    const link = screen.getByRole('link');
    
    // Simulate click event with preventDefault and stopPropagation
    const clickEvent = new MouseEvent('click', { bubbles: true, cancelable: true });
    Object.assign(clickEvent, { preventDefault, stopPropagation });
    
    link.dispatchEvent(clickEvent);
    
    expect(handleClick).not.toHaveBeenCalled();
  });

  // ===== TYPE GUARDS AND UTILITIES =====

  it('identifies external links correctly', () => {
    const { isExternalLink } = require('./Link.types');
    
    expect(isExternalLink({ href: 'https://example.com', children: 'test' })).toBe(true);
    expect(isExternalLink({ href: '//example.com', children: 'test' })).toBe(true);
    expect(isExternalLink({ href: '/internal', children: 'test' })).toBe(false);
    expect(isExternalLink({ external: true, href: '/test', children: 'test' })).toBe(true);
  });

  it('identifies icons correctly', () => {
    const { hasIcon } = require('./Link.types');
    
    expect(hasIcon({ icon: <InfoIcon />, children: 'test' })).toBe(true);
    expect(hasIcon({ icon: 'info', children: 'test' })).toBe(true);
    expect(hasIcon({ children: 'test' })).toBe(false);
  });
});