/* ===================================
   LABEL TESTS - Figma Design System
   File: packages/ui/src/components/Label/label.test.tsx
   Based only on Figma Label documentation
   ================================== */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Label } from './Label';

describe('Label Component', () => {
  // ===== BASIC RENDERING =====
  
  it('renders with default props', () => {
    render(<Label>Test Label</Label>);
    const label = screen.getByText('Test Label');
    expect(label).toBeInTheDocument();
  });

  it('renders with custom text', () => {
    render(<Label>Custom Label Text</Label>);
    expect(screen.getByText('Custom Label Text')).toBeInTheDocument();
  });

  it('renders with data-testid', () => {
    render(<Label data-testid="test-label">Label</Label>);
    const label = screen.getByTestId('test-label');
    expect(label).toBeInTheDocument();
  });

  // ===== SIZE VARIANTS =====
  
  it('renders with different sizes', () => {
    const sizes = ['md', 'lg'] as const;
    
    sizes.forEach(size => {
      render(<Label size={size} data-testid={`label-${size}`}>Label</Label>);
      const label = screen.getByTestId(`label-${size}`);
      expect(label).toBeInTheDocument();
      expect(label).toHaveClass(`size${size.charAt(0).toUpperCase() + size.slice(1)}`);
    });
  });

  // ===== REQUIRED FIELD =====
  
  it('shows asterisk for required fields', () => {
    const { container } = render(<Label required>Required Label</Label>);
    const mainText = container.querySelector('.mainText');
    expect(mainText).toHaveClass('required');
  });

  it('does not show asterisk for non-required fields', () => {
    const { container } = render(<Label>Optional Label</Label>);
    const mainText = container.querySelector('.mainText');
    expect(mainText).not.toHaveClass('required');
  });

  // ===== SUBTITLE =====
  
  it('renders with subtitle when true', () => {
    render(<Label subtitle={true}>Label</Label>);
    expect(screen.getByText('This is supporting text')).toBeInTheDocument();
  });

  it('does not render subtitle when false or not provided', () => {
    const { container } = render(<Label subtitle={false}>Label</Label>);
    const subtitle = container.querySelector('.subtitle');
    expect(subtitle).not.toBeInTheDocument();
  });

  it('does not render subtitle when not provided', () => {
    const { container } = render(<Label>Label</Label>);
    const subtitle = container.querySelector('.subtitle');
    expect(subtitle).not.toBeInTheDocument();
  });

  // ===== HTML ELEMENT =====
  
  it('renders as label element', () => {
    const { container } = render(<Label>Label</Label>);
    expect(container.firstChild?.nodeName.toLowerCase()).toBe('label');
  });

  // ===== ACCESSIBILITY =====
  
  it('generates unique ID for accessibility', () => {
    const { container: container1 } = render(<Label>Label 1</Label>);
    const { container: container2 } = render(<Label>Label 2</Label>);
    
    const label1 = container1.firstChild as HTMLElement;
    const label2 = container2.firstChild as HTMLElement;
    
    expect(label1.id).toBeTruthy();
    expect(label2.id).toBeTruthy();
    expect(label1.id).not.toBe(label2.id);
  });

  // ===== CUSTOM STYLING =====
  
  it('applies custom className', () => {
    const { container } = render(<Label className="custom-label">Label</Label>);
    const label = container.firstChild as HTMLElement;
    expect(label).toHaveClass('custom-label');
  });

  // ===== FORWARD REF =====
  
  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLLabelElement>();
    render(<Label ref={ref}>Label</Label>);
    expect(ref.current).toBeInstanceOf(HTMLLabelElement);
  });

  // ===== PROPS PASSING =====
  
  it('passes through additional props', () => {
    render(<Label title="Custom title" tabIndex={0}>Label</Label>);
    const label = screen.getByText('Label').closest('label');
    expect(label).toHaveAttribute('title', 'Custom title');
    expect(label).toHaveAttribute('tabIndex', '0');
  });

  // ===== CSS CLASSES =====
  
  it('applies correct CSS classes combination', () => {
    const { container } = render(
      <Label 
        size="lg" 
        className="custom"
      >
        Label
      </Label>
    );
    
    const label = container.firstChild as HTMLElement;
    expect(label).toHaveClass('label', 'sizeLg', 'custom');
  });

  // ===== COMPONENT DISPLAY NAME =====
  
  it('has correct display name', () => {
    expect(Label.displayName).toBe('Label');
  });
});