/* ===========================================
   TOGGLE BUTTON COMPONENT - Figma Design System Implementation
   File: packages/ui/src/components/Toggle/ToggleButton.tsx
   Based on Figma Toggle Button specifications (Node: 416-9646)
   Multi-item toggle group with 319ms gentle transitions
   =========================================== */

import { forwardRef, useState, useEffect } from 'react';
import { 
  ToggleButtonProps, 
  ToggleButtonItemProps, 
  ToggleButtonItem,
  isToggleButtonItemSelected,
  isToggleButtonItemDisabled,
  getToggleButtonSelectedItems
} from './ToggleButton.types';
import styles from './ToggleButton.module.css';

// Helper function to get group CSS classes
const getToggleButtonGroupClasses = (
  showIcons: boolean = false,
  disabled: boolean = false,
  className?: string
): string => {
  const classes = [styles.toggleButtonGroup];
  
  // Size variant based on icons
  if (showIcons) {
    classes.push(styles.withIcons);
  } else {
    classes.push(styles.withoutIcons);
  }
  
  // Layout - default to horizontal
  classes.push(styles.horizontal);
  
  // Disabled state
  if (disabled) {
    classes.push(styles.disabled);
  }
  
  if (className) {
    classes.push(className);
  }
  
  return classes.filter(Boolean).join(' ');
};

// Helper function to get item CSS classes
const getToggleButtonItemClasses = (
  selected: boolean = false,
  disabled: boolean = false
): string => {
  const classes = [styles.toggleButtonItem];
  
  if (selected) {
    classes.push(styles.selected);
  }
  
  if (disabled) {
    classes.push(styles.disabled);
  }
  
  return classes.join(' ');
};

// Individual Toggle Button Item Component
const ToggleButtonItemComponent = ({ 
  item, 
  selected, 
  disabled, 
  showIcon, 
  multiple,
  onClick,
  className 
}: ToggleButtonItemProps) => {
  const handleClick = () => {
    if (!disabled) {
      onClick(item);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick();
    }
  };

  const itemClasses = getToggleButtonItemClasses(selected, disabled);

  return (
    <button
      type="button"
      className={`${itemClasses} ${className || ''}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      disabled={disabled}
      aria-selected={selected}
      role={multiple ? 'button' : 'tab'}
      aria-pressed={multiple ? selected : undefined}
      tabIndex={disabled ? -1 : 0}
    >
      {showIcon && item.icon && (
        <span className={styles.toggleButtonIcon}>
          {item.icon}
        </span>
      )}
      {item.label}
    </button>
  );
};

// Main Toggle Button Group Component
export const ToggleButton = forwardRef<HTMLDivElement, ToggleButtonProps>(
  (props, ref) => {
    const {
      items,
      selectedItems: controlledSelectedItems,
      onChange,
      multiple = false,
      disabled = false,
      showIcons = false,
      className,
      'data-testid': dataTestId,
      ...rest
    } = props;

    // Internal state for uncontrolled mode
    const [internalSelectedItems, setInternalSelectedItems] = useState<string[]>(() => {
      const preselected = getToggleButtonSelectedItems(items);
      // For single selection mode, ensure at least one item is selected
      if (!multiple && preselected.length === 0 && items.length > 0) {
        return [items[0].id];
      }
      return preselected;
    });

    // Use controlled or uncontrolled selected items
    const selectedItems = controlledSelectedItems !== undefined 
      ? controlledSelectedItems 
      : internalSelectedItems;

    // Update internal state when items change
    useEffect(() => {
      if (controlledSelectedItems === undefined) {
        const preselected = getToggleButtonSelectedItems(items);
        // For single selection mode, ensure at least one item is selected
        if (!multiple && preselected.length === 0 && items.length > 0) {
          setInternalSelectedItems([items[0].id]);
        } else {
          setInternalSelectedItems(preselected);
        }
      }
    }, [items, controlledSelectedItems, multiple]);

    // Handle item click
    const handleItemClick = (clickedItem: ToggleButtonItem) => {
      if (isToggleButtonItemDisabled(clickedItem, disabled)) {
        return;
      }

      let newSelectedItems: string[];

      if (multiple) {
        // Multiple selection mode
        if (isToggleButtonItemSelected(clickedItem, selectedItems)) {
          // Remove from selection
          newSelectedItems = selectedItems.filter(id => id !== clickedItem.id);
        } else {
          // Add to selection
          newSelectedItems = [...selectedItems, clickedItem.id];
        }
      } else {
        // Single selection mode (tab-like behavior)
        // Always select the clicked item, no deselection allowed
        newSelectedItems = [clickedItem.id];
      }

      // Update internal state if uncontrolled
      if (controlledSelectedItems === undefined) {
        setInternalSelectedItems(newSelectedItems);
      }

      // Call onChange callback
      onChange?.(newSelectedItems);
    };

    // Get CSS classes
    const groupClasses = getToggleButtonGroupClasses(showIcons, disabled, className);

    return (
      <div
        ref={ref}
        className={groupClasses}
        role={multiple ? 'group' : 'tablist'}
        aria-label="Toggle button group"
        data-testid={dataTestId}
        {...rest}
      >
        {items.map((item) => (
          <ToggleButtonItemComponent
            key={item.id}
            item={item}
            selected={isToggleButtonItemSelected(item, selectedItems)}
            disabled={isToggleButtonItemDisabled(item, disabled)}
            showIcon={showIcons}
            multiple={multiple}
            onClick={handleItemClick}
          />
        ))}
      </div>
    );
  }
);

ToggleButton.displayName = 'ToggleButton';

export default ToggleButton;