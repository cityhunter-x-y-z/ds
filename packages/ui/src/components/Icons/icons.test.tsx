/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { 
  DynamicIcon, 
  IconWrapper, 
  SearchIcon, 
  getAvailableIcons, 
  getIconByName,
  ICON_REGISTRY 
} from './Icons';

describe('Icons Component System', () => {
  describe('DynamicIcon', () => {
    it('renders icon with correct name', () => {
      render(<DynamicIcon name="search" data-testid="search-icon" />);
      const icon = screen.getByTestId('search-icon');
      expect(icon).toBeInTheDocument();
    });

    it('applies custom size', () => {
      render(<DynamicIcon name="search" size={16} data-testid="search-icon" />);
      const icon = screen.getByTestId('search-icon');
      expect(icon).toHaveAttribute('width', '16');
      expect(icon).toHaveAttribute('height', '16');
    });

    it('applies custom stroke color', () => {
      render(<DynamicIcon name="search" stroke="#ff0000" data-testid="search-icon" />);
      const icon = screen.getByTestId('search-icon');
      expect(icon).toHaveAttribute('stroke', '#ff0000');
    });

    it('applies custom className', () => {
      render(<DynamicIcon name="search" className="custom-icon" data-testid="search-icon" />);
      const icon = screen.getByTestId('search-icon');
      expect(icon).toHaveClass('custom-icon');
    });

    it('returns null for invalid icon name', () => {
      const { container } = render(<DynamicIcon name={"invalid-icon" as any} data-testid="invalid-icon" />);
      expect(container.firstChild).toBeNull();
    });
  });

  describe('IconWrapper', () => {
    it('renders with children', () => {
      render(
        <IconWrapper data-testid="icon-wrapper">
          <path d="test-path" />
        </IconWrapper>
      );
      const wrapper = screen.getByTestId('icon-wrapper');
      expect(wrapper).toBeInTheDocument();
      expect(wrapper.querySelector('path')).toBeInTheDocument();
    });

    it('applies default props', () => {
      render(
        <IconWrapper data-testid="icon-wrapper">
          <path d="test-path" />
        </IconWrapper>
      );
      const wrapper = screen.getByTestId('icon-wrapper');
      expect(wrapper).toHaveAttribute('width', '24');
      expect(wrapper).toHaveAttribute('height', '24');
      expect(wrapper).toHaveAttribute('stroke', 'currentColor');
    });
  });

  describe('Individual Icon Components', () => {
    it('renders SearchIcon correctly', () => {
      render(<SearchIcon data-testid="search-icon" />);
      const icon = screen.getByTestId('search-icon');
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute('width', '24');
    });

    it('accepts custom props', () => {
      render(<SearchIcon size={16} stroke="#blue" data-testid="search-icon" />);
      const icon = screen.getByTestId('search-icon');
      expect(icon).toHaveAttribute('width', '16');
      expect(icon).toHaveAttribute('stroke', '#blue');
    });
  });

  describe('Icon Registry', () => {
    it('contains expected icons', () => {
      expect(ICON_REGISTRY).toHaveProperty('search');
      expect(ICON_REGISTRY).toHaveProperty('heart');
      expect(ICON_REGISTRY).toHaveProperty('eye');
      expect(ICON_REGISTRY).toHaveProperty('eye-off');
      expect(ICON_REGISTRY).toHaveProperty('credit-card');
      expect(ICON_REGISTRY).toHaveProperty('loading');
    });

    it('has correct number of icons', () => {
      const iconCount = Object.keys(ICON_REGISTRY).length;
      expect(iconCount).toBeGreaterThanOrEqual(27);
    });
  });

  describe('Icon Utilities', () => {
    it('getAvailableIcons returns array of icon names', () => {
      const icons = getAvailableIcons();
      expect(Array.isArray(icons)).toBe(true);
      expect(icons.length).toBeGreaterThan(0);
      expect(icons).toContain('search');
      expect(icons).toContain('heart');
    });

    it('getIconByName returns correct component', () => {
      const SearchComponent = getIconByName('search');
      expect(SearchComponent).toBeDefined();
      expect(typeof SearchComponent).toBe('function');
    });

    it('getIconByName returns null for invalid name', () => {
      const InvalidComponent = getIconByName('invalid-icon' as any);
      expect(InvalidComponent).toBeNull();
    });
  });

  describe('Icon Registry Types', () => {
    it('all registry icons are valid React components', () => {
      Object.entries(ICON_REGISTRY).forEach(([_name, IconComponent]) => {
        expect(typeof IconComponent).toBe('function');
        
        // Test that each icon can be rendered
        const { container } = render(<IconComponent />);
        expect(container.firstChild).toBeInTheDocument();
      });
    });
  });

  describe('Accessibility', () => {
    it('includes aria-hidden by default', () => {
      render(<DynamicIcon name="search" data-testid="search-icon" />);
      const icon = screen.getByTestId('search-icon');
      expect(icon).toHaveAttribute('aria-hidden', 'true');
    });

    it('can override aria-hidden', () => {
      render(<SearchIcon aria-hidden={false} data-testid="search-icon" />);
      const icon = screen.getByTestId('search-icon');
      expect(icon).toHaveAttribute('aria-hidden', 'false');
    });

    it('includes proper role', () => {
      render(<DynamicIcon name="search" data-testid="search-icon" />);
      const icon = screen.getByTestId('search-icon');
      expect(icon).toHaveAttribute('role', 'img');
    });
  });
});