/* ===================================
   LOADER TESTS - Figma Design System
   File: packages/ui/src/components/Loader/loader.test.tsx
   ================================== */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Loader } from './Loader';
import { LOADER_SIZES } from './Loader.types';

describe('Loader Component', () => {
  // ===== BASIC RENDERING =====
  
  it('renders with default props', () => {
    render(<Loader />);
    const loader = screen.getByRole('status');
    expect(loader).toBeInTheDocument();
    expect(loader).toHaveAttribute('aria-label', 'Loading');
  });

  it('renders with custom aria-label', () => {
    render(<Loader aria-label="Custom loading message" />);
    const loader = screen.getByRole('status');
    expect(loader).toHaveAttribute('aria-label', 'Custom loading message');
  });

  it('renders with data-testid', () => {
    render(<Loader data-testid="my-loader" />);
    const loader = screen.getByTestId('my-loader');
    expect(loader).toBeInTheDocument();
  });

  // ===== SIZE VARIATIONS =====
  
  it('renders with different sizes', () => {
    const sizes: Array<keyof typeof LOADER_SIZES> = ['xs', 'sm', 'md', 'lg'];
    
    sizes.forEach(size => {
      const { container } = render(<Loader size={size} data-testid={`loader-${size}`} />);
      const loader = screen.getByTestId(`loader-${size}`);
      expect(loader).toBeInTheDocument();
      
      // Check if the SVG container has the correct size class
      const svgContainer = container.querySelector('.svgContainer');
      expect(svgContainer).toHaveClass(size);
    });
  });

  // ===== TYPE VARIATIONS =====
  
  it('renders indeterminate loader by default', () => {
    const { container } = render(<Loader />);
    const svgContainer = container.querySelector('.svgContainer');
    expect(svgContainer).toHaveClass('indeterminate');
  });

  it('renders determinate loader with progress', () => {
    const { container } = render(<Loader type="determinate" value={50} />);
    const svgContainer = container.querySelector('.svgContainer');
    expect(svgContainer).toHaveClass('determinate');
  });

  // ===== LABEL FUNCTIONALITY =====
  
  it('renders without label by default', () => {
    render(<Loader />);
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  });

  it('renders with label when showLabel is true', () => {
    render(<Loader showLabel />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders with custom label text', () => {
    render(<Loader showLabel labelText="Processing..." />);
    expect(screen.getByText('Processing...')).toBeInTheDocument();
  });

  it('renders percentage for determinate loader with label', () => {
    render(<Loader type="determinate" value={75} showLabel />);
    expect(screen.getByText('75%')).toBeInTheDocument();
  });

  it('renders hidden text for screen readers when no visible label', () => {
    const { container } = render(<Loader aria-label="Loading content" />);
    const hiddenText = container.querySelector('.visuallyHidden');
    expect(hiddenText).toBeInTheDocument();
    expect(hiddenText).toHaveTextContent('Loading content');
  });

  // ===== SVG STRUCTURE =====
  
  it('renders SVG with correct structure', () => {
    const { container } = render(<Loader size="md" />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('viewBox', '0 0 24 24');
    
    const circles = container.querySelectorAll('circle');
    expect(circles).toHaveLength(2); // background and progress circles
  });

  it('renders correct viewBox for different sizes', () => {
    const { container: xsContainer } = render(<Loader size="xs" />);
    const xsSvg = xsContainer.querySelector('svg');
    expect(xsSvg).toHaveAttribute('viewBox', '0 0 12 12');

    const { container: lgContainer } = render(<Loader size="lg" />);
    const lgSvg = lgContainer.querySelector('svg');
    expect(lgSvg).toHaveAttribute('viewBox', '0 0 32 32');
  });

  // ===== DETERMINATE LOADER SPECIFIC =====
  
  it('applies correct styles for determinate loader', () => {
    const { container } = render(<Loader type="determinate" value={60} />);
    const progressCircle = container.querySelector('.progressCircle');
    
    expect(progressCircle).toHaveStyle({
      transform: 'rotate(-90deg)',
      transformOrigin: 'center'
    });
  });

  it('clamps progress value between 0 and 100', () => {
    render(<Loader type="determinate" value={-10} showLabel />);
    expect(screen.getByText('0%')).toBeInTheDocument();

    render(<Loader type="determinate" value={120} showLabel />);
    expect(screen.getByText('100%')).toBeInTheDocument();
  });

  // ===== ACCESSIBILITY =====
  
  it('has proper ARIA attributes for indeterminate loader', () => {
    render(<Loader />);
    const loader = screen.getByRole('status');
    expect(loader).toHaveAttribute('aria-live', 'polite');
    expect(loader).toHaveAttribute('role', 'status');
    expect(loader).not.toHaveAttribute('aria-valuemin');
    expect(loader).not.toHaveAttribute('aria-valuemax');
    expect(loader).not.toHaveAttribute('aria-valuenow');
  });

  it('has proper ARIA attributes for determinate loader', () => {
    render(<Loader type="determinate" value={45} />);
    const loader = screen.getByRole('status');
    expect(loader).toHaveAttribute('aria-valuemin', '0');
    expect(loader).toHaveAttribute('aria-valuemax', '100');
    expect(loader).toHaveAttribute('aria-valuenow', '45');
  });

  it('has aria-hidden on SVG element', () => {
    const { container } = render(<Loader />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('aria-hidden', 'true');
  });

  it('generates correct aria-label for determinate loader', () => {
    render(<Loader type="determinate" value={33} />);
    const loader = screen.getByRole('status');
    expect(loader).toHaveAttribute('aria-label', 'Loading progress: 33%');
  });

  // ===== CUSTOM STYLING =====
  
  it('applies custom className', () => {
    render(<Loader className="custom-loader" />);
    const loader = screen.getByRole('status');
    expect(loader).toHaveClass('custom-loader');
  });

  // ===== FORWARD REF =====
  
  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Loader ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  // ===== PROPS PASSING =====
  
  it('passes through additional props', () => {
    render(<Loader id="test-loader" tabIndex={0} />);
    const loader = screen.getByRole('status');
    expect(loader).toHaveAttribute('id', 'test-loader');
    expect(loader).toHaveAttribute('tabIndex', '0');
  });

  // ===== CSS CLASSES =====
  
  it('applies correct CSS classes', () => {
    const { container } = render(<Loader size="lg" type="determinate" value={50} />);
    
    const loader = container.firstChild as HTMLElement;
    expect(loader).toHaveClass('loader');
    
    const svgContainer = container.querySelector('.svgContainer');
    expect(svgContainer).toHaveClass('svgContainer', 'lg', 'determinate');
  });

  // ===== COMPONENT DISPLAY NAME =====
  
  it('has correct display name', () => {
    expect(Loader.displayName).toBe('Loader');
  });

  // ===== EDGE CASES =====
  
  it('handles missing value prop for determinate loader', () => {
    // @ts-expect-error - Testing runtime behavior with missing required prop
    render(<Loader type="determinate" showLabel />);
    expect(screen.getByText('0%')).toBeInTheDocument();
  });

  it('handles decimal progress values', () => {
    render(<Loader type="determinate" value={33.7} showLabel />);
    expect(screen.getByText('34%')).toBeInTheDocument(); // Should round
  });

  // ===== SIZE CALCULATIONS =====
  
  it('calculates correct circle properties for different sizes', () => {
    const sizes = ['xs', 'sm', 'md', 'lg'] as const;
    
    sizes.forEach(size => {
      const { container } = render(<Loader size={size} />);
      const circles = container.querySelectorAll('circle');
      
      circles.forEach(circle => {
        expect(circle).toHaveAttribute('cx');
        expect(circle).toHaveAttribute('cy');
        expect(circle).toHaveAttribute('r');
      });
    });
  });
});