/* ===================================
   TOGGLE BUTTON TYPES - Figma Design System Implementation
   File: packages/ui/src/components/Toggle/ToggleButton.types.ts
   Based on Figma Toggle Button specifications (Node: 416-9646)
   Multi-item toggle group with button styling
   ================================== */

import React from 'react';

// Toggle button item interface
export interface ToggleButtonItem {
  /** Unique identifier for the item */
  id: string;
  /** Display text for the item */
  label: string;
  /** Whether the item is selected */
  selected?: boolean;
  /** Whether the item is disabled */
  disabled?: boolean;
  /** Optional icon component */
  icon?: React.ReactNode;
  /** Optional value for the item */
  value?: string;
}

// Toggle button props
export interface ToggleButtonProps {
  /** Array of toggle button items */
  items: ToggleButtonItem[];
  /** Selected item IDs */
  selectedItems?: string[];
  /** Change handler */
  onChange?: (selectedItems: string[]) => void;
  /** Whether multiple items can be selected */
  multiple?: boolean;
  /** Whether the entire group is disabled */
  disabled?: boolean;
  /** Whether to show icons */
  showIcons?: boolean;
  /** Custom class name */
  className?: string;
  /** Test ID for testing */
  'data-testid'?: string;
}

// Single toggle button item props
export interface ToggleButtonItemProps {
  /** The item data */
  item: ToggleButtonItem;
  /** Whether the item is selected */
  selected: boolean;
  /** Whether the item is disabled */
  disabled: boolean;
  /** Whether to show icon */
  showIcon: boolean;
  /** Whether multiple selection is enabled */
  multiple: boolean;
  /** Click handler */
  onClick: (item: ToggleButtonItem) => void;
  /** Custom class name */
  className?: string;
}

// Toggle button dimensions from Figma
export const TOGGLE_BUTTON_DIMENSIONS = {
  // Without icons: 151px × 32px
  withoutIcons: {
    width: '151px',
    height: '32px'
  },
  // With icons: 211px × 32px
  withIcons: {
    width: '211px',
    height: '32px'
  },
  // Design specs
  itemPadding: '8px 4px', /* 8px horizontal, 4px vertical */
  itemSpacing: '8px', /* Figma spec */
  cornerRadius: '4px',
  border: '1px'
} as const;

// Toggle button colors from Figma
export const TOGGLE_BUTTON_COLORS = {
  // Text colors
  textDefault: '#1d2938', /* Figma spec */
  textSelected: '#1d2938',
  textDisabled: '#667085',
  
  // Background colors
  backgroundDefault: 'transparent',
  backgroundSelected: '#ffffff', /* White background when active */
  backgroundHover: '#eaecf0',
  backgroundDisabled: '#f5f5f5',
  
  // Border colors
  borderDefault: 'transparent',
  borderSelected: '#e4e7ec',
  borderHover: '#e4e7ec',
  
  // Shadow colors for active state
  shadowPrimary: 'rgba(233, 236, 239, 1)', /* Drop shadow 1 */
  shadowSecondary: 'rgba(223, 228, 231, 1)' /* Drop shadow 2 */
} as const;

// Toggle button animation specs from Figma
export const TOGGLE_BUTTON_ANIMATION = {
  duration: '319ms', /* Figma spec */
  easing: 'ease-out' /* "GENTLE" easing */
} as const;

// Helper functions
export const isToggleButtonItemSelected = (item: ToggleButtonItem, selectedItems: string[]): boolean => {
  return selectedItems.includes(item.id);
};

export const isToggleButtonItemDisabled = (item: ToggleButtonItem, groupDisabled: boolean): boolean => {
  return groupDisabled || item.disabled === true;
};

export const getToggleButtonSelectedItems = (items: ToggleButtonItem[]): string[] => {
  return items.filter(item => item.selected).map(item => item.id);
};